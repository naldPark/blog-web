<template>
  <IntroSection />
  <VDivider class="mt-5" />
  <Experience />
  <VDivider class="mt-5" />
  <BlogExplore />
  <div class="mt-10 hidden-sm-and-down"></div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { ref, onMounted, Ref } from 'vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { getBlogList } from '@/api/commonService';
import { useI18n } from 'vue-i18n';
import { BlogData } from '@/types/about';
import BlogExplore from '@/components/aboutMe/BlogExplore.vue';
import IntroSection from '@/components/aboutMe/IntroSection.vue';
import Experience from '@/components/aboutMe/Experience.vue';
const appStatusStore = useAppCommonStore();
const display = useDisplay();
const { t } = useI18n();
const cardList: Ref<BlogData[]> = ref([]);

// onMounted(() => {
//   appStatusStore.showLoading();
//   getBlogList().then((res: any) => {
//     console.log(res.data);
//     cardList.value = res.data.map((v: any) => ({
//       ...v,
//       text: t(v.text),
//     }));
//     appStatusStore.hideLoading();
//   });
// });

const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href;
};

const onClickVisit = (url: any) => {
  window.open(url, '_blank');
};
</script>

<style lang="scss" scoped>
.blog-wrapper-box {
  border: 0;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.8);
  background-color: rgba(20, 20, 20, 0.3);
  border-radius: 24px;

  max-height: 400px;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
}
</style>

<!-- <template>
  <div>
    <IntroSection />
    <VDivider class="mt-5" />
    <SkillAndExpertise />
    <VDivider class="mt-5" />
    <BlogExplore />
    <div class="mt-10 hidden-sm-and-down"></div>
  </div>
</template>

<script lang="ts" setup>
  import IntroSection from '@/components/aboutMe/IntroSection.vue';
  import SkillAndExpertise from '@/components/aboutMe/SkillAndExpertise.vue';
  import BlogExplore from '@/components/aboutMe/BlogExplore.vue';
</script>

<style scoped>
  /* Add any global styles here */
</style> -->
