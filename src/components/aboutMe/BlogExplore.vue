<template>
  <div class="blog-wrapper">
    <h2 class="text-primary mb-3">BLOG EXPLORE</h2>
    <VRow>
      <VCol cols="12" md="4" v-for="(item, index) in cardList" :key="index">
        <div
          class="blog-wrapper-box mx-auto pa-5"
          @click="onClickVisit(item.href)"
        >
          <div>
            <div class="text-overline mb-4">
              {{ item.title }} / {{ item.header }}
            </div>
            <h5>{{ item.text }}</h5>
          </div>
          <div>
            <VImg
              width="200"
              height="80"
              contain
              style="display: block; margin: 0 auto"
              :src="getImageUrl(item.src)"
            />
          </div>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getBlogList } from '@/api/commonService';
  import { useI18n } from 'vue-i18n';
  import { BlogData } from '@/types/about';

  const { t } = useI18n();
  const cardList = ref<BlogData[]>([]);

  onMounted(async () => {
    const response = await getBlogList();
    cardList.value = response.data.map((v: BlogData) => ({
      ...v,
      text: t(v.text),
    }));
  });

  const getImageUrl = (name: string) =>
    new URL(`/src/assets/images/${name}`, import.meta.url).href;

  const onClickVisit = (url: string) => window.open(url, '_blank');
</script>

<style scoped>
  /* Add specific styles for BlogExplore here */
</style>
