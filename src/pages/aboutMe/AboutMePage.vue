<template>
  <v-container class="text-center main">
    <div class="intro-wrapper">
      <v-row class="ma-0">
        <v-col cols="12" md="8" lg="8">
          <div class="text-md-left pa-7 intro-box">
            <h3 class="font-weight-bold">
              HELLO ALL <v-icon class="text-primary">mdi-duck</v-icon>
            </h3>
            <br />
            <h1 class="pr-3 font-weight-bold">
              All I can imagine is able to create.
            </h1>
            <h4 class="pr-3 font-weight-thin mt-3" v-if="!isMobile" v-html="t('prMessage')" />
            <div class="mt-2 pt-2">
              <v-btn color="primary" href="https://www.linkedin.com/in/naldpark/" target="_blank" variant="outlined"
                rounded large>
                <v-icon class="mr-2">mdi-linkedin</v-icon>
                Explore me <i class="mdi mdi-arrow-right"></i>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4" lg="4" class="profile-card" :class="{ isMobile: isMobile }">
          <v-card>
            <v-card-text>
              <v-img src="@/assets/images/profiles/me.jpg">
                <div class="innerBorder"></div>
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-for="( social, i ) in  socials " :key="i" :color="social.color" icon small>
                  <v-icon size="x-large" @click="exploreSNS(social.link)">{{ social.icon }}</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="starFall starFallOne"></div>
      <div class="starFall starFallTwo"></div>
      <div class="starFall starFallThree"></div>
    </div>
    <v-divider class="mt-5"></v-divider>
    <div class="text-md-left pa-7">
      <v-row>
        <v-col cols="12" sm="6">
          <h2 class="text-primary mb-3">WORK EXPERIENCE</h2>
          <v-timeline>
            <v-timeline-item dot-color="primary" size="x-small" class="text-left">
              <strong>Web Developer</strong>
              <div class="text-caption">Frontend, Backend, DevOps</div>
              <div class="text-caption text-grey">2021.10 - present</div>
            </v-timeline-item>
            <v-timeline-item dot-color="grey" size="x-small" class="text-right">
              <strong>Java Programming Courses</strong>
              <div class="text-caption">
                KH Information Educational Institute
              </div>
              <div class="text-caption text-grey">2021.01 - 2021.08</div>
            </v-timeline-item>
            <v-timeline-item dot-color="grey-darken-4" class="text-left" size="x-small">
              <strong>HR Manager</strong>
              <div class="text-caption text-grey">- 2020.10</div>
            </v-timeline-item>
          </v-timeline>
        </v-col>
        <v-col cols="12" sm="6">
          <h2 class="text-primary mb-3">SKILL AND EXPERTISE</h2>
          <v-card color="rgba(0, 0, 0, 0)" class="mx-auto" tile elevation="0">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>FRONTEND</v-list-item-title>
                <v-list-item-subtitle class="pa-2">
                  <p class="font-weight-regular text-h6">
                    <v-icon class='text-secondary'>mdi-react</v-icon> React
                  </p>
                  <v-progress-linear class="mb-3 mt-3" rounded height="10" model-value="80"
                    color="primary"></v-progress-linear>
                </v-list-item-subtitle>
                <v-list-item-subtitle class="pa-2">
                  <p class="font-weight-regular text-h6">
                    <v-icon class='text-secondary'>mdi-vuejs</v-icon> Vue.js
                  </p>
                  <v-progress-linear class="mb-3 mt-3" rounded height="10" model-value="70"
                    color="primary"></v-progress-linear>
                </v-list-item-subtitle>

                <v-list-item-subtitle class="pa-2">
                  <p class="font-weight-regular text-h6">
                    <v-icon class='text-secondary'>mdi-angular</v-icon> Angular
                  </p>
                  <v-progress-linear class="mb-3 mt-3" rounded height="10" model-value="30"
                    color="primary"></v-progress-linear>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class='mb-3'></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>BACKEND</v-list-item-title>
                <v-list-item-subtitle class="pa-2">
                  <p class="font-weight-regular text-h6">
                    <v-icon class='text-secondary'>mdi-language-java</v-icon> Java
                  </p>
                  <v-progress-linear class="mb-3 mt-3" rounded height="10" model-value="60"
                    color="primary"></v-progress-linear>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class='mb-3'></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>OPERATION</v-list-item-title>
                <v-list-item-subtitle class="pa-2">
                  <p class="font-weight-regular text-h6">
                    <v-icon class='text-secondary'>mdi-kubernetes</v-icon> Kubernetes
                  </p>
                  <v-progress-linear class="mb-3 mt-3" rounded height="10" model-value="60"
                    color="primary"></v-progress-linear>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-divider class="mt-5"></v-divider>
    <div class="text-md-left pa-7 blog-wrapper">
      <h2 class="text-primary mb-3">BLOG EXPLORE</h2>
      <v-row>
        <v-col cols="12" md="4" v-for="( item, index ) in  cardList " :key="index">
          <div class="blog-wrapper-box mx-auto pa-5" @click="onClickVisit(item)">
            <div>
              <div class="text-overline mb-4">
                {{ item.title }} / {{ item.header }}
              </div>
              <h5>{{ item.text }}</h5>
            </div>
            <div>
              <v-img width="200" height="80" contain style="display: block; margin: 0px auto"
                :src="getImageUrl(item.src)"></v-img>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="mt-10 hidden-sm-and-down"></div>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { ref, onMounted } from 'vue';
import { useAppStatusStore } from '@/store/appStatusStore';
import { getBlogList } from '@/api/CommonService';
import { useI18n } from 'vue-i18n';
const appStatusStore = useAppStatusStore();
const display = useDisplay();
const isMobile: Ref<boolean> = display.smAndDown;
const { t } = useI18n();
const cardList: any = ref([]);
function getImageUrl(name: string) {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href;
}
const socials = [
  {
    icon: 'mdi-linkedin',
    color: '#0A66C2',
    link: 'https://www.linkedin.com/in/naldpark/',
  },
  {
    icon: 'mdi-instagram',
    color: '#FF5A51',
    link: 'https://www.instagram.com/youngik_nald/',
  },
  {
    icon: 'mdi-facebook',
    color: 'indigo',
    link: 'https://www.facebook.com/nald873',
  },
];

function exploreSNS(url: string) {
  window.open(url);
}

onMounted(() => {
  appStatusStore.showLoading();
  getBlogList().then((res: any) => {
    console.log(res.data);
    cardList.value = res.data.data.map((v: any) => ({
      ...v,
      text: t(v.text),
    }));
    appStatusStore.hideLoading();
  });
});

function onClickVisit(item: any) {
  window.open(item.href, '_blank');
}
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
  border: 0px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.8);
  background-color: rgba(20, 20, 20, 0.3);
  border-radius: 24px;

  max-height: 400px;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
}
</style>
