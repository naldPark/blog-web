<template>
  <div>
    <VCard
      class="movie-item-card text-grey font-weight-light"
      color="transparent"
      elevation="0"
      dark
      @click="changeMovie"
    >
      <div class="d-flex flex-no-wrap align-start">
        <VAvatar class="ma-3" size="120" tile>
          <VImg cover aspect-ratio="2/4" :src="item.fileCover"></VImg>
        </VAvatar>
        <div class="movie-card">
          <VCardTitle class="mb-3 body-1">{{ item.fileName }}</VCardTitle>
          <VCardSubtitle class="body-2 hidden-sm-and-down overflow-hidden">{{
            item.fileDesc
          }}</VCardSubtitle>
        </div>
      </div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any;
}>();

const emits = defineEmits(['selectMovie']);

const changeMovie = () => {
  emits('selectMovie', props.item);
};
</script>

<style scoped lang="scss">
.movie-item-card {
  display: flex;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }

  .movie-card {
    max-width: 1200px;
  }
}
</style>
