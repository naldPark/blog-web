<template>
  <v-dialog
    v-model="visible"
    :max-width="maxWidth"
    :max-height="maxHeight"
    :persistent="persistent"
    :scrollable="scrollable"
    :fullscreen="fullscreen"
    :hide-overlay="hideOverlay"
    :return-focus="returnFocus"
    :eager="eager"
    :width="width"
    :height="height"
    @click:outside="onClickOutside"
    @click:inside="onClickInside"
    @drag="onDrag"
    @dragend="onDragEnd"
    @dragstart="onDragStart"
    @resize="onResize"
    @resizeend="onResizeEnd"
    @resizestart="onResizeStart"
  >
    <template #default>
      <v-card>
        <v-card-title>
          <slot name="header">{{ header }}</slot>
          <v-spacer />
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions>
          <slot name="footer">
            <v-btn @click="closeDialog">{{ t('cancel') }}</v-btn>
            <v-btn @click="confirm">{{ t('confirm') }}</v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ref, defineProps, defineEmits, computed, onMounted, watch } from 'vue';
// Props 정의
const props = defineProps({
  maxWidth: {
    type: [String, Number],
    default: '600px',
  },
  maxHeight: {
    type: [String, Number],
    default: '80vh',
  },
  persistent: Boolean,
  scrollable: Boolean,
  fullscreen: Boolean,
  hideOverlay: Boolean,
  returnFocus: Boolean,
  eager: Boolean,
  width: {
    type: [String, Number],
    default: 'auto',
  },
  height: {
    type: [String, Number],
    default: 'auto',
  },
  header: String,
  footer: String,
});

// Emits 정의
const emit = defineEmits([
  'update:modelValue',
  'confirm',
  'click:outside',
  'click:inside',
  'drag',
  'dragend',
  'dragstart',
  'resize',
  'resizeend',
  'resizestart',
]);

const { t } = useI18n();

const visible = defineModel('visible', {
  type: Boolean,
});

// Dialog 닫기 함수
const closeDialog = () => {
  emit('update:modelValue', false);
};

// Dialog 확인 함수
const confirm = () => {
  emit('confirm');
  closeDialog();
};

// 이벤트 핸들러
const onClickOutside = (event: Event) => emit('click:outside', event);
const onClickInside = (event: Event) => emit('click:inside', event);
const onDrag = (event: Event) => emit('drag', event);
const onDragEnd = (event: Event) => emit('dragend', event);
const onDragStart = (event: Event) => emit('dragstart', event);
const onResize = (event: Event) => emit('resize', event);
const onResizeEnd = (event: Event) => emit('resizeend', event);
const onResizeStart = (event: Event) => emit('resizestart', event);
</script>

<style lang="scss" scoped></style>
