<script setup lang="ts">
import { VideoDetailData } from '@/types/wonderwall/video';

defineProps<{
  videoList: Array<VideoDetailData>;
}>();
const emits = defineEmits(['onClickMovie']);
</script>

<template>
  <v-row>
    <v-col
      v-for="(item, index) in videoList"
      :key="index"
      cols="6"
      sm="4"
      v-if="!!videoList.length"
    >
      <v-card
        color="transparent"
        :item="item"
        class="mx-auto"
        @click="emits('onClickMovie', item)"
      >
        <v-img
          :src="item.fileCover"
          class="align-end"
          aspect-ratio="0.7"
          height="100%"
          width="100%"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,1)"
          cover
        />
        <v-card-item>
          <div class="text-caption">
            {{ item.fileName }}
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
