<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import aboutDataAsset from '@/assets/data/about';
import Button from '@/components/common/Button.vue';
import { useI18n } from 'vue-i18n';
import { getCurrentInstance } from 'vue';

/** globalConfig 사용 */
const { proxy: pxy } = getCurrentInstance()!;
const { smAndDown: isMobile } = useDisplay();

const stars = Array(3).fill(null);

/** 애니메이션 star falling 효과 구현  */
const getStarStyle = (index: number) => {
  /** 사이즈 다르게 */
  const size = index === 2 ? '4px' : '3px';
  /** 속도 다르게 */
  const duration = index === 2 ? '30s' : index === 1 ? '20s' : '10s';
  /** 위치 다르게 */
  const left = `${(index + 1) * 20}%`;
  const top = `${(index + 1) * 30}%`;
  return {
    width: size,
    height: size,
    animationDuration: duration,
    left,
    top,
  };
};
</script>

<template>
  <div class="intro-wrapper">
    <!-- <v-img height="100%" src="../../assets/images/aboutBackground.jpg" cover> -->
    <VRow class="ma-0">
      <VCol cols="12" md="8" lg="8">
        <div class="text-md-left pa-7 intro-box">
          <h3 class="font-weight-bold">
            <span>HELLO ALL </span>
            <VIcon class="text-primary" icon="mdi-duck" />
          </h3>
          <br />
          <h1 class="pr-3 font-weight-bold">
            All I can imagine is able to create.
          </h1>
          <h4 class="pr-3 font-weight-thin mt-3" v-if="!isMobile">
            {{ pxy!.$t('prMessage') }}
          </h4>
          <div class="mt-2 pt-2">
            <Button
              href="https://www.linkedin.com/in/naldpark/"
              prepend-icon="mdi-linkedin"
              append-icon="mdi-arrow-right"
              label="Explore me"
            />
          </div>
        </div>
      </VCol>
      <VCol
        cols="12"
        md="4"
        lg="4"
        class="profile-card"
        :class="{ 'is-mobile': isMobile }"
      >
        <VCard>
          <VCardText>
            <VImg src="@/assets/images/profiles/me.jpg">
              <div class="inner-border" />
            </VImg>
            <VCardActions>
              <VSpacer />
              <Button
                v-for="(social, i) in aboutDataAsset.snsList"
                :key="i"
                :color="social.color"
                :icon="social.icon"
                :href="social.link"
              />
            </VCardActions>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <!-- </v-img> -->

    <div
      class="falling-star"
      v-for="(star, index) in stars"
      :key="index"
      :style="getStarStyle(index)"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/components/aboutMe';
.intro-wrapper {
  background-image: linear-gradient(
      rgba(20, 20, 20, 0.6),
      rgba(20, 20, 20, 0.6)
    ),
    url('../../assets/images/aboutBackground.jpg');
  padding: 20px 0 20px;
  min-height: 500px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 2;

  .profile-card {
    position: absolute;
    max-width: 320px;
    bottom: 3%;
    right: 3%;
    z-index: 2;

    &.is-mobile {
      position: relative !important;
      margin: auto;
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

  .falling-star {
    position: absolute;
    background: transparent;
    @extend .star-shadow; /* box-shadow를 포함시키는 방법 */
    z-index: 1;

    animation: anim-star linear infinite;
    @keyframes anim-star {
      0% {
        transform: translateY(-2000px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
}
</style>
