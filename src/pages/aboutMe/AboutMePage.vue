<template>
  <div class="intro-wrapper">
    <VRow class="ma-0">
      <VCol cols="12" md="8" lg="8">
        <div class="text-md-left pa-7 intro-box">
          <h3 class="font-weight-bold">
            HELLO ALL <VIcon class="text-primary">mdi-duck</VIcon>
          </h3>
          <br />
          <h1 class="pr-3 font-weight-bold">
            All I can imagine is able to create.
          </h1>
          <h4 class="pr-3 font-weight-thin mt-3" v-if="!isMobile">
            {{ t('prMessage') }}
          </h4>
          <div class="mt-2 pt-2">
            <VBtn color="primary" href="https://www.linkedin.com/in/naldpark/" target="_blank" variant="outlined"
              rounded large>
              <VIcon class="mr-2">mdi-linkedin</VIcon>
              Explore me <i class="mdi mdi-arrow-right"></i>
            </VBtn>
          </div>
        </div>
      </VCol>
      <VCol cols="12" md="4" lg="4" class="profile-card" :class="{ isMobile: isMobile }">
        <VCard>
          <VCardText>
            <VImg src="@/assets/images/profiles/me.jpg">
              <div class="innerBorder"></div>
            </VImg>
            <VCardActions>
              <VSpacer></VSpacer>
              <VBtn v-for="(social, i) in aboutDataAsset.snsList" :key="i" :color="social.color" small>
                <VIcon size="x-large" @click="onClickVisit(social.link)">{{
                  social.icon
                }}</VIcon>
              </VBtn>
            </VCardActions>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <div class="starFall starFallOne"></div>
    <div class="starFall starFallTwo"></div>
    <div class="starFall starFallThree"></div>
  </div>
  <VDivider class="mt-5"></VDivider>
  <div class="text-md-left pa-7">
    <VRow>
      <VCol cols="12" sm="6">
        <h2 class="text-primary mb-3">WORK EXPERIENCE</h2>
        <VTimeline>
          <VTimelineItem v-for="(item, index) in aboutDataAsset.workExperience" :key="index" :dot-color="item.dotColor"
            size="x-small" :class="item.class">
            <strong>{{ item.title }}</strong>
            <div class="text-caption">{{ item.subtitle }}</div>
            <div class="text-caption text-grey">{{ item.date }}</div>
          </VTimelineItem>
        </VTimeline>
      </VCol>
      <VCol cols="12" sm="6">
        <h2 class="text-primary mb-3">SKILL AND EXPERTISE</h2>
        <VCard color="rgba(0, 0, 0, 0)" class="mx-auto" tile elevation="0">
          <VListItem>
            <VListItemTitle>FRONTEND</VListItemTitle>
            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-react</VIcon> React
              </p>
              <VProgressLinear class="mb-3 mt-3" rounded height="10" model-value="80" color="primary"></VProgressLinear>
            </VListItemSubtitle>
            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-vuejs</VIcon> Vue.js
              </p>
              <VProgressLinear class="mb-3 mt-3" rounded height="10" model-value="70" color="primary"></VProgressLinear>
            </VListItemSubtitle>

            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-angular</VIcon> Angular
              </p>
              <VProgressLinear class="mb-3 mt-3" rounded height="10" model-value="30" color="primary"></VProgressLinear>
            </VListItemSubtitle>
          </VListItem>
          <VDivider class="mb-3"></VDivider>
          <VListItem>
            <VListItemTitle>BACKEND</VListItemTitle>
            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-language-java</VIcon>
                Java
              </p>
              <VProgressLinear class="mb-3 mt-3" rounded height="10" model-value="60" color="primary"></VProgressLinear>
            </VListItemSubtitle>
          </VListItem>
          <VDivider class="mb-3"></VDivider>
          <VListItem>
            <VListItemTitle>OPERATION</VListItemTitle>
            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-kubernetes</VIcon>
                Kubernetes
              </p>
              <VProgressLinear class="mb-3 mt-3" rounded height="10" model-value="60" color="primary"></VProgressLinear>
            </VListItemSubtitle>
          </VListItem>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <VDivider class="mt-5"></VDivider>
  <div class="text-md-left pa-7 blog-wrapper">
    <h2 class="text-primary mb-3">BLOG EXPLORE</h2>
    <VRow>
      <VCol cols="12" md="4" v-for="(item, index) in cardList" :key="index">
        <div class="blog-wrapper-box mx-auto pa-5" @click="onClickVisit(item.href)">
          <div>
            <div class="text-overline mb-4">
              {{ item.title }} / {{ item.header }}
            </div>
            <h5>{{ item.text }}</h5>
          </div>
          <div>
            <VImg width="200" height="80" contain style="display: block; margin: 0 auto" :src="getImageUrl(item.src)">
            </VImg>
          </div>
        </div>
      </VCol>
    </VRow>
  </div>
  <div class="mt-10 hidden-sm-and-down"></div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { ref, onMounted } from 'vue';
import { useAppStatusStore } from '@/store/useAppStatusStore';
import { getBlogList } from '@/api/commonService';
import { useI18n } from 'vue-i18n';
import { BlogData } from '@/types/about';
import aboutDataAsset from '@/assets/data/about';
const appStatusStore = useAppStatusStore();
const display = useDisplay();
const isMobile: Ref<boolean> = display.smAndDown;
const { t } = useI18n();
const cardList: Ref<BlogData[]> = ref([]);

onMounted(() => {
  appStatusStore.showLoading();
  getBlogList().then((res: any) => {
    console.log(res.data);
    cardList.value = res.data.map((v: any) => ({
      ...v,
      text: t(v.text),
    }));
    appStatusStore.hideLoading();
  });
});

const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href;
};

const onClickVisit = (url: any) => {
  window.open(url, '_blank');
};
</script>

<style lang="scss" scoped>
.intro-wrapper {
  background-image: linear-gradient(rgba(20, 20, 20, 0.6),
      rgba(20, 20, 20, 0.6)),
    url('../../assets/images/main2.jpg');
  padding: 20px 0 20px;
  min-height: 500px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 2;

  .starFall {
    content: ' ';
    position: absolute;
    background: transparent;
    box-shadow: var(--animationBoxShadow);
    z-index: 1;

    &.starFallOne {
      width: 3px;
      height: 3px;
      animation: animStar 10s linear infinite;
    }

    &.starFallTwo {
      width: 3px;
      height: 3px;
      animation: animStar 20s linear infinite;
    }

    &.starFallThree {
      width: 4px;
      height: 4px;
      animation: animStar 30s linear infinite;
    }
  }

  @keyframes animStar {
    0% {
      transform: translateY(-2000px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  .intro-box {
    background-color: rgba(20, 20, 20, 0.6);
    justify-content: left;
    display: block;
    width: 100%;
    border-radius: 30px;
    color: #d5d5d5;

    h4 {
      b {
        font-weight: 800;
        color: white !important;
      }
    }
  }
}

.profile-card {
  position: absolute;
  max-width: 320px;
  bottom: 3%;
  right: 3%;
  z-index: 2;

  &.isMobile {
    position: relative !important;
    margin: auto;
  }

  .innerBorder {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1.5px solid #fff8e8;
  }
}

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
