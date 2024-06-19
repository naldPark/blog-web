<template>
  <div>
    <v-card class="movie-item-card text-grey font-weight-light" color="transparent" elevation="0" dark
      @click="changeMovie">
      <div class="d-flex flex-no-wrap align-start">
        <v-avatar class="ma-3" size="120" tile>
          <v-img cover aspect-ratio="2/4" :src="item.fileCover"></v-img>
        </v-avatar>
        <div class="movie-card">
          <v-card-title class="mb-3 body-1">{{ item.fileName }}</v-card-title>
          <v-card-subtitle class="body-2 hidden-sm-and-down overflow-hidden">{{ item.fileDesc }}</v-card-subtitle>
        </div>
      </div>
    </v-card>
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
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }

  .movie-card {
    max-width: 1200px;
  }

  display: flex;
}
</style>
