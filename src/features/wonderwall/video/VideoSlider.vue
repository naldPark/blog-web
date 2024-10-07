<script setup lang="ts">
import { VideoDetailData } from '@/types/wonderwall/video';
import { VSlideGroupItem } from 'vuetify/lib/components/index.mjs';
defineProps<{
  videoList: Array<VideoDetailData>;
}>();
const emits = defineEmits(['onClickMovie']);
</script>
<template>
  <v-sheet class="mx-auto" elevation="8">
    <v-slide-group
      class="pa-4"
      style="background-color: #212121"
      show-arrows
      v-if="!!videoList.length"
    >
      <v-slide-group-item v-for="item in videoList" :key="item.storageId">
        <v-card
          class="movie-item"
          :class="['ma-3 rounded-11', { disabled: !item.fileSrc }]"
          :minHeight="300"
          :minWidth="200"
          :maxHeight="300"
          :maxWidth="200"
          @click="emits('onClickMovie', item)"
        >
          <v-img
            :src="item.fileCover"
            class="align-end"
            height="100%"
            width="100%"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,1)"
            cover
          >
            <v-card-title v-html="item.fileName" />
          </v-img>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
