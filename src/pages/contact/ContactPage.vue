<template>
  <div class="contact-page-wrap">
    <VRow justify="center" no-gutters>
      <VCol cols="10" md="4" lg="4">
        <VCard
          color="rgba(0, 0, 0, 0)"
          elevation="0"
          max-width="400"
          style="display: block; margin: 0 auto"
        >
          <VCardText class="text-center">
            <h1 class="font-weight-bold mb-1 text-grey">Nald Park</h1>
            <h4 class="font-weight-light mb-3 text-grey">WEB DEVELOPER</h4>
            <VImg
              max-height="400"
              style="display: block; margin: 0 auto"
              src="@/assets/images/profiles/me.jpg"
            >
              <div class="inner-border"></div>
            </VImg>
            <VCardActions>
              <VSpacer></VSpacer>
              <VBtn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                small
              >
                <VIcon @click="exploreSNS(social.link)">{{
                  social.icon
                }}</VIcon>
              </VBtn>
            </VCardActions>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="10" md="6">
        <div class="text-md-left pa-7 contact-box">
          <h1 class="font-weight-bold">
            Contact <span class="text-primary">Me.</span>
          </h1>
          <p class="font-weight-light text-grey">
            {{ t('contactMsg') }}
          </p>
          <br />
          <VThemeProvider>
            <VRow class="pa-2">
              <VCol cols="12">
                <VTextField
                  flat
                  v-model="messageData.name"
                  :rules="[rules.required]"
                  :label="`${t('name')} *`"
                  :placeholder="`${t('name')} *`"
                ></VTextField>
              </VCol>
              <VCol cols="12">
                <VTextField
                  flat
                  v-model="messageData.email"
                  :rules="[rules.required, rules.email]"
                  :label="`${t('email')} *`"
                  :placeholder="`${t('email')} *`"
                ></VTextField>
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="messageData.title"
                  :rules="[rules.required]"
                  :label="`${t('title')} *`"
                  :placeholder="`${t('title')} *`"
                ></VTextField>
              </VCol>
              <VCol cols="12">
                <VTextarea
                  v-model="messageData.content"
                  :rules="[rules.required]"
                  auto-grow
                  flat
                  solo
                  :label="`${t('content')} *`"
                  :placeholder="`${t('content')} *`"
                ></VTextarea>
              </VCol>
              <VCol class="mx-auto" cols="auto">
                <VBtn
                  color="primary"
                  rounded
                  variant="outlined"
                  @click="sendMessage"
                >
                  <VIcon>mdi-check</VIcon>
                  {{ t('send') }}
                </VBtn>
              </VCol>
            </VRow>
          </VThemeProvider>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { sendMail } from '@/api/commonService';
import router from '@/router';
import { useI18n } from 'vue-i18n';

const appStatusStore = useAppCommonStore();
const { t } = useI18n();
const messageData: any = ref({
  name: '',
  email: '',
  title: '',
  content: '',
});

const rules = {
  required: (value: any) => !!value || 'Required.',
  email: (value: any) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid e-mail.';
  },
};

const validateCheck = () => {
  let res = '';
  for (const key in messageData) {
    if (key === 'email') {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      res = !pattern.test(messageData[key]) ? `${t('emailValidate')}` : res;
    }
    res = messageData[key] === '' ? `${t('inputEmpty')}` : res;
  }
  return res;
};

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

const exploreSNS = (url: string) => {
  window.open(url);
};

const sendMessage = async () => {
  appStatusStore.showLoading();
  const validate = validateCheck();
  if (validate === '') {
    try {
      const res = await sendMail(messageData.value);
      let type: string;
      let message: string;

      if (res.status_code === 200) {
        Object.keys(messageData).forEach((key) => {
          messageData[key] = '';
        });
        type = 'success';
        message = `${t('complete')}`;
      } else {
        type = 'error';
        message = `${t('unknownError')}`;
      }
      appStatusStore.hideLoading();
      appStatusStore.showDialog({
        title: type,
        description: message,
        showCloseButton: true,
        action: () => {
          router.push({ name: 'MainPage' }).catch((err: any) => err);
        },
      });
    } catch (error) {
      appStatusStore.hideLoading();
      appStatusStore.addToastMessage({
        type: 'error',
        message: `${t('unknownError')}`,
        buttonMsg: null,
        buttonCallback: null,
      });
    }
  } else {
    appStatusStore.hideLoading();
    appStatusStore.addToastMessage({
      type: 'error',
      message: validate as string,
      buttonMsg: null,
      buttonCallback: null,
    });
  }
};
</script>

<style lang="scss" scoped>
.contact-page-wrap {
  margin-top: 50px;

  .inner-border {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1.5px solid #fff8e8;
  }

  .contact-box {
    background-color: rgba(20, 20, 20, 0.6);
    justify-content: left;
    display: block;
    width: 100%;
    border-radius: 30px;
    font-weight: 200;
    color: #d5d5d5;
    background-image: linear-gradient(
        rgba(10, 10, 10, 0.99),
        rgba(30, 30, 30, 0.2)
      ),
      url('../../assets/images/contactBackground.png');
  }
}
</style>
