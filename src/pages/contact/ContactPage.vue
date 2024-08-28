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
                <InputText
                  flat
                  v-model="messageData.name"
                  :rules="[rules.required]"
                  :label="`${t('name')} *`"
                  :placeholder="`${t('name')} *`"
                />
              </VCol>
              <VCol cols="12">
                <InputText
                  v-model="messageData.email"
                  :rules="[rules.required, rules.email]"
                  :label="`${t('email')} *`"
                  :placeholder="`${t('email')} *`"
                />
              </VCol>
              <VCol cols="12">
                <InputText
                  v-model="messageData.title"
                  :rules="[rules.required]"
                  :label="`${t('title')} *`"
                  :placeholder="`${t('title')} *`"
                />
              </VCol>
              <VCol cols="12">
                <Textarea
                  v-model="messageData.content"
                  :rules="[rules.required]"
                  :label="`${t('content')} *`"
                  :placeholder="`${t('content')} *`"
                />
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
import Textarea from '@/components/common/TextArea.vue';
import InputText from '@/components/common/InputText.vue';
import { ValidationRule } from '@/types/common';
import { emailRegExp } from '@/utils/regExpUtil';

// Interface for messageData
interface MessageData {
  name: string;
  email: string;
  title: string;
  content: string;
}

const appStatusStore = useAppCommonStore();
const { t } = useI18n();

// Define messageData with the MessageData interface
const messageData = ref<MessageData>({
  name: '',
  email: '',
  title: '',
  content: '',
});

/** 검증 rules */
const rules: {
  required: ValidationRule;
  email: ValidationRule;
} = {
  required: (value: string) => !!value || 'Required.',
  email: (value: string) => {
    return emailRegExp().test(value) || 'Invalid e-mail.';
  },
};

// Validate form data
const validateCheck = (): string => {
  let res = '';
  for (const key in messageData.value) {
    if (key === 'email') {
      res = !emailRegExp().test(messageData.value[key as keyof MessageData])
        ? `${t('emailValidate')}`
        : res;
    }
    res =
      messageData.value[key as keyof MessageData] === ''
        ? `${t('inputEmpty')}`
        : res;
  }
  return res;
};

// Social media links
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

// Open social media link
const exploreSNS = (url: string) => {
  window.open(url);
};

// Send message function
const sendMessage = async (): Promise<void> => {
  appStatusStore.showLoading();
  const validate = validateCheck();
  if (validate === '') {
    try {
      const res = await sendMail(messageData.value);
      let type: 'success' | 'error';
      let message: string;

      if (res.status_code === 200) {
        // Clear messageData after successful send
        for (const key in messageData.value) {
          messageData.value[key as keyof MessageData] = '';
        }
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
          router.push({ name: 'MainPage' }).catch((err: unknown) => {
            if (err instanceof Error) {
              console.error(err.message);
            }
          });
        },
      });
    } catch (error: unknown) {
      appStatusStore.hideLoading();
      appStatusStore.showToast({
        type: 'error',
        message: `${t('unknownError')}`,
      });
    }
  } else {
    appStatusStore.hideLoading();
    appStatusStore.showToast({
      type: 'error',
      message: validate,
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
