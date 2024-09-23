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
import Button from '@/components/common/Button.vue';
import useMutation from '@/hook/useMutation';
import { MessageDataRequestBody } from '@/types/admin';

const appStatusStore = useAppCommonStore();
const { t } = useI18n();

// Define messageData with the MessageData interface
const messageData = ref<MessageDataRequestBody>({
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
  required: (value: string) => !!value || t('required'),
  email: (value: string) => {
    return emailRegExp().test(value) || t('emailValidate');
  },
};

// Validate form data
const validateCheck = (): boolean => {
  let res = '';
  for (const key in messageData.value) {
    if (key === 'email') {
      res = !emailRegExp().test(
        messageData.value[key as keyof MessageDataRequestBody],
      )
        ? `${t('emailValidate')}`
        : res;
    }
    res =
      messageData.value[key as keyof MessageDataRequestBody] === ''
        ? `${t('inputEmpty')}`
        : res;
  }
  if (res !== '') {
    appStatusStore.showToast({
      type: 'error',
      message: res,
    });
    return false;
  }
  return true;
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

/** 메세지 발송 Mutation */
const { mutate: onSendMessage } = useMutation({
  mutationFn: () => sendMail(messageData.value),
  onSuccess: () => {
    appStatusStore.showToast({
      type: 'success',
      message: t('complete'),
    });
    for (const key in messageData.value) {
      messageData.value[key as keyof MessageDataRequestBody] = '';
    }
    router.push({ name: 'MainPage' });
  },
});

// Send message function
const sendMessage = async (): Promise<void> => {
  appStatusStore.showLoading();
  if (!validateCheck()) return;
  onSendMessage();
};
</script>

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
              <div class="inner-border" />
            </VImg>
            <VCardActions>
              <VSpacer />
              <Button
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                small
                :icon="social.icon"
                @click="exploreSNS(social.link)"
              />
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
                  <VIcon icon="mdi-check" />
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

<style lang="scss" scoped>
.contact-page-wrap {
  margin-top: 50px;

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
