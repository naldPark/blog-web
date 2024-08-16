<template>
  <div>
    <v-card outlined v-if="!onProgressing" class="file-drop-area" @dragenter.prevent
      :class="{ 'grey darken-3': dragover }" @dragover="dragoverHover(true)" @dragleave="dragoverHover(false)"
      @dragover.prevent @drop="onDropFiles" @click="onClickBrowse">
      <v-card-text>
        <v-row class="d-flex flex-column align-center" dense justify="center">
          <VIcon v-if="selectedLocalFiles.length === 0" size="60" color="secondary">
            mdi-cloud-upload
          </VIcon>
          <VIcon v-else size="60" color="grey">
            mdi-cloud-check
          </VIcon>
          <p class="pt-3" v-if="selectedLocalFiles.length === 0">
            {{ $t('video.uploadDetail') }}
          </p>
          <p class="pt-3" v-else>
            {{ $t('video.uploadedDetail') }}
          </p>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else class="file-drop-area">
      <v-card-text>
        <div class="text-center">
          <v-progress-circular indeterminate color="amber"></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
    <v-file-input v-model="fileInput" ref="fileInput" type="file" :multiple="isMultiple" style="display: none"
      :accept="availableFileTypes.join(',')" @change="onFileSelected" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import Config from '@/config';
import { useI18n } from 'vue-i18n';
import { clone } from 'ramda';
import { useAppStatusStore } from '@/store';
const { t } = useI18n();
let fileInput: any = [];
const props = defineProps({
  isMultiple: {
    type: Boolean,
    default: true
  },
  fileTypes: {
    type: Array,
    default: () => ['.mp4']
  }
});

const emit = defineEmits(['updatedUploadfiles']);
const appStatusStore = useAppStatusStore();
const onProgressing = ref(false);
const dragover = ref(false);
const selectedLocalFiles = ref<Array<any>>([]);


const maxFileSize = computed(() => {
  const uploadSize = Config.uploadLocalSize;
  if (uploadSize !== -1) {
    const max = Number(uploadSize) > 0 ? Number(uploadSize) : 1.5;
    return max * 1024 * 1024 * 1024;
  }
  return -1;
});

const maxFileSizeString = computed(() => {
  if (maxFileSize.value / (1024 * 1024 * 1024 * 1024) > 1) {
    return `${Math.floor(maxFileSize.value / (1024 * 1024 * 1024 * 1024)).toFixed(0)}TB`;
  } else if (maxFileSize.value / (1024 * 1024 * 1024) > 1) {
    return `${maxFileSize.value / (1024 * 1024 * 1024)}GB`;
  } else if (maxFileSize.value / (1024 * 1024) > 1) {
    return `${Math.floor(maxFileSize.value / (1024 * 1024)).toFixed(0)}MB`;
  } else if (maxFileSize.value / (1024) > 1) {
    return `${Math.floor(maxFileSize.value / (1024)).toFixed(0)}KB`;
  } else {
    return `${maxFileSize.value}B`;
  }
});

const availableFileTypes = computed(() => {
  return props.fileTypes || ['.mp4'];
});

function dragoverHover(value: boolean) {
  dragover.value = value;
}

async function onDropFiles(e: DragEvent) {
  console.log('???')
  onProgressing.value = true;
  e.stopPropagation();
  e.preventDefault();
  dragover.value = false;
  let dragFiles = null;
  let isFolder = false;
  console.log('??2??2')
  if (props.isMultiple) {
    if (e.dataTransfer?.types[0] !== 'Files' || !e.dataTransfer.items) {
      return;
    }
    console.log('??2??3')
    const entries = [...e.dataTransfer.items].map((item) => item.webkitGetAsEntry());
    const allEntries = await checkFileTree(entries);
    isFolder = allEntries.depth ? true : false;
    dragFiles = await Promise.all(allEntries.files.map((entry) => new Promise((resolve, reject) => entry.file(resolve, reject))));
  } else {
    console.log('??2??4')
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files[0].type === '') {
        isFolder = true;
      }
      dragFiles = e.dataTransfer.files;
    }
  }

  if (dragFiles) {
    console.log('555')
    selectedLocalFiles.value = [];
    for (const file of dragFiles) {
      selectedLocalFiles.value.push({
        status: 'checking',
        file
      });
    }
  }

  doCheckFiles(selectedLocalFiles.value, isFolder);
}

async function checkFileTree(entries: any[], depth?: any) {
  const dirs = entries.filter((entry) => !!entry && entry.isDirectory);
  const files = entries.filter((entry) => !!entry && entry.isFile);

  if (dirs.length && !depth) {
    const childEntries = (
      await Promise.all(dirs.map((dir) => new Promise((resolve, reject) => dir.createReader().readEntries(resolve, reject))))
    ).flat();
    return checkFileTree(childEntries, 1);
  }

  return {
    files: [...files],
    depth
  };
}

function onClickBrowse() {
  if (fileInput) {
    fileInput.click();
  }
}

function onFileSelected() {
  onProgressing.value = true;
  if (fileInput && fileInput.length > 0) {
    selectedLocalFiles.value = [];
    for (const file of fileInput) {
      selectedLocalFiles.value.push({
        status: 'checking',
        file
      });
    }
    doCheckFiles(selectedLocalFiles.value);
  }
}

function doCheckFiles(files: Array<any>, isFolder?: any) {
  const regText = availableFileTypes.value.join('|');
  const regExp = new RegExp('(' + regText + ')$');

  setTimeout(() => {
    let checkFile = false;
    let dialogText = '';
    let availUpload = true;
    const unavailableFiles: Array<any> = [];

    files.forEach((obj) => {
      availUpload = true;
      if (obj.file.name.toLowerCase().match(regExp) == null) {
        checkFile = true;
        if (obj.file.type === '') {
          unavailableFiles.push(obj.file.name + '(Directory)');
        } else {
          unavailableFiles.push(obj.file.name);
        }
        availUpload = false;
      }
      if (maxFileSize.value !== -1 && maxFileSize.value < obj.file.size) {
        checkFile = true;
        availUpload = false;
      }

      if (availUpload) {
        obj.status = 'checked';
        obj.type = obj.file.type;
        obj.size = obj.file.size;
        obj.name = obj.file.name;
        obj.propertyData = null;
      }
    });

    emit('updatedUploadfiles', clone(files));
    onProgressing.value = false;

    if (checkFile) {
      dialogText += isFolder
        ? t('file_check_error.folder_file_error', [unavailableFiles.join(', ')])
        : t('file_check_error.local_file_error');
      dialogText += t('file_check_error.file_extension') + availableFileTypes.value.join(', ') + '\n\n';
      if (maxFileSize.value !== -1) {
        dialogText += t('file_check_error.max_file_size', [maxFileSizeString.value]);
      }
    }

    if (dialogText !== '') {
      appStatusStore.showDialog({
        title: `${t('error')}`,
        description: dialogText,
        invisibleClose: true,
        action: () => { }
      });
    }
    fileInput = [];
  }, 2000);
}
</script>

<style scoped lang="scss">
.file-drop-area {
  min-height: 120px;

  div {
    min-height: 120px;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
}
</style>
