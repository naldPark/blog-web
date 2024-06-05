<template>
  <div class="main-page">
    <nald-header></nald-header>
    <div class="main-cover">
      <v-row class="pt-5 align-center">
        <div class="main-content" :class="{ 'is-mobile': isMobile }">
          <div>
            <v-icon class="text-primary pr-3">mdi-duck</v-icon>{{ $t('hello') }}
          </div>
          <p class="main-title">
            <b>{{ $t('nald') }}</b>
          </p>
          <span class="main-title-sub"
            >인테리어 확장공사중 (소음심한날: 빨간날, 칼퇴한날)</span
          >
          <p class="typing text-right">
            . . of<span
              class="txt-type ml-1"
              data-wait="3000"
              data-words='["Odds and end.", "Programming.", "Operation."]'
            ></span>
          </p>
          <v-row class="badges-image-wrapper mt-3" style="max-width: 600px">
            <v-chip
              v-for="(item, index) in badges"
              :key="index"
              size="small"
              class="ma-1"
              :color="item.backgroundColor"
              variant="flat"
              :style="`color: ${item.color}`"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ props }">
                  <div
                    v-ripple
                    v-bind="props"
                    class="text-center d-flex align-center justify-space-around"
                  >
                    <img
                      style="width: 17px; height: 17px"
                      :src="item.src"
                      alt="Badge icon"
                    />
                    <span class="pl-1" v-if="appSize !== 'xs'">{{
                      item.name
                    }}</span>
                  </div>
                </template>
                <span>{{ item.name }}</span>
              </v-tooltip>
            </v-chip>
          </v-row>
          <div class="py-4"></div>
        </div>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import NaldHeader from '@/components/common/NaldHeader.vue';
  import { useAccountStatusStore } from '@/store/accountStatusStore';
  import { useAppStatusStore } from '@/store/appStatusStore';
  import { useDisplay } from 'vuetify';
  import { getBadgeList } from '@/api/CommonService';

  class TypeWriter {
    txtElement: HTMLElement | null = null;
    words: string[] = [];
    txt: string = '';
    wordIndex: number = 0;
    wait: number = 3000;
    isDeleting: boolean = false;
  }

  interface Badge {
    backgroundColor: string;
    color: string;
    name: string;
    src: string;
  }

  const display = useDisplay();
  const accountStatusStore = useAccountStatusStore();
  const appStatusStore = useAppStatusStore();
  const accountName: Ref<string | null> = ref(
    useAccountStatusStore().accountInfo.accountName,
  );
  const isMobile: Ref<boolean> = display.smAndDown;
  const appSize: Ref<string> = display.name;
  const showLoginDialog = ref(false);
  const badges = ref<Badge[]>([]);
  const typeWriter = ref<TypeWriter>(new TypeWriter());

  const typingRun = () => {
    const current = typeWriter.value.wordIndex % typeWriter.value.words.length;
    const fullTxt = typeWriter.value.words[current];

    if (typeWriter.value.isDeleting) {
      typeWriter.value.txt = fullTxt.substring(
        0,
        typeWriter.value.txt.length - 1,
      );
    } else {
      typeWriter.value.txt = fullTxt.substring(
        0,
        typeWriter.value.txt.length + 1,
      );
    }

    typeWriter.value.txtElement!.innerHTML = `<span class="txt" style="border-right: 0.2rem solid #FFB800 !important;">${typeWriter.value.txt}</span>`;

    let typeSpeed = 300;

    if (typeWriter.value.isDeleting) {
      typeSpeed /= 2;
    }

    if (!typeWriter.value.isDeleting && typeWriter.value.txt === fullTxt) {
      typeSpeed = typeWriter.value.wait;
      typeWriter.value.isDeleting = true;
    } else if (typeWriter.value.isDeleting && typeWriter.value.txt === '') {
      typeWriter.value.isDeleting = false;
      typeWriter.value.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(typingRun, typeSpeed);
  };

  const typingAnimation = () => {
    const txtElement = document.querySelector<HTMLElement>('.txt-type');
    if (!txtElement) return;

    const words = JSON.parse(txtElement.getAttribute('data-words') as string);
    const wait = parseInt(txtElement.getAttribute('data-wait') as string, 10);

    typeWriter.value = new TypeWriter();
    typeWriter.value.txtElement = txtElement;
    typeWriter.value.words = words;
    typeWriter.value.txt = '';
    typeWriter.value.wordIndex = 0;
    typeWriter.value.wait = wait;
    typingRun();
  };

  onMounted(async () => {
    appStatusStore.showLoading();
    await getBadgeList().then((res: any) => {
      badges.value = res.data.data.map((m: any) => ({
        ...m,
        src: `src/assets/svgs/${m.src}`, // src 속성 지정
      }));
      appStatusStore.hideLoading();
    });
    typingAnimation();
  });
</script>

<style lang="scss" scoped>
  html {
    overflow-y: hidden;

    .main-page {
      height: 100vh;

      .main-cover {
        height: 100vh;
        background:
          linear-gradient(to top, rgba(20, 20, 20, 0.8), rgb(0, 0, 0)),
          url('./../assets/images/network.gif') no-repeat;
        background-position: 60% center;
        /* GIF를 컨테이너 중간에서 오른쪽으로 배치 */
        overflow: hidden;
        display: flex;
        background-color: black;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding: 0 3rem;
        font-family: var(--font-Raleway) !important;
        background-position: 70% 50%;

        .main-content {
          margin-left: 10%;
          font-size: 2rem;

          .main-title {
            font-size: 3rem;
            color: #ccc;
          }

          .main-title-sub {
            margin-bottom: 0px;
            font-size: 1.2rem;
            color: #ccc;
          }

          .typing {
            font-weight: 100;
            font-size: 1.5rem;
            color: #ccc;
            animation:
              typing 3.5s steps(30, end),
              blink 0.5s step-end infinite;
          }

          button {
            width: 170px;
          }

          &.is-mobile {
            margin-left: 0;

            button {
              width: 100px;
            }

            .main-title {
              font-size: 2rem;
            }
          }
        }
      }
    }
  }
</style>
