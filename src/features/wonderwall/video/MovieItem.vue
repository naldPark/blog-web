<script setup lang="ts">
const props = defineProps<{
  item: any;
}>();

const emits = defineEmits(['selectMovie']);

const changeMovie = () => {
  emits('selectMovie', props.item);
};
</script>

<template>
  <div>
    <VCard
      class="movie-item-card text-grey font-weight-light mb-3"
      color="transparent"
      elevation="0"
      dark
      @click="changeMovie"
    >
      <div class="d-flex flex-no-wrap align-start">
        <v-img
          :src="item.fileCover"
          class="align-end"
          aspect-ratio="0.7"
          height="150px"
          width="100px"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,1)"
          cover
        />
        <div class="movie-card">
          <VCardTitle class="mb-3 body-1">{{ item.fileName }}</VCardTitle>
          <VCardSubtitle class="body-2 hidden-sm-and-down overflow-hidden">
            {{ item.fileDesc }}
          </VCardSubtitle>
        </div>
      </div>
    </VCard>
  </div>
</template>

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
