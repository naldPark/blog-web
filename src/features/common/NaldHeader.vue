<template>
  <VAppBar color="rgba(22, 22, 22, 0.95)" density="compact" class="nald-header">
    <VAppBarNavIcon variant="text" @click="toggleDrawer"></VAppBarNavIcon>
    <VToolbarTitle @click="clickToMain()" style="cursor: pointer">
      <VAvatar rounded size="30px">
        <VImg src="@/assets/logo.png"></VImg>
      </VAvatar>
      <span> Nald{{ isSignIn }}{{ accountInfo.accountName }}</span>
    </VToolbarTitle>
    <VSpacer></VSpacer>
    <Button
      v-if="!accountInfo.accountId"
      @onClick="clickToShowLoginDialog"
      :label="t('login')"
      prepend-icon="mdi-account-outline"
      class="ma-2"
    />

    <VMenu v-else>
      <template v-slot:activator="{ props }">
        <Button
          shape="none"
          variant="text"
          color="secondary"
          v-bind="props"
          id="menu-activator"
          prepend-icon="mdi-face-man"
          append-icon="mdi-menu-down"
        ></Button>
      </template>
      <VList>
        <VListSubheader>{{ accountInfo.accountName }}</VListSubheader>
        <VListItem class="right-panel-item" v-if="accountInfo.authority === 0">
          <VListItemTitle @click="clickToShowEditPassword">
            <VIcon :icon="'mdi-account-edit-outline'" />
            {{ t('editPassword') }}
          </VListItemTitle>
        </VListItem>
        <VListItem class="right-panel-item">
          <VListItemTitle @click="clickToChangeLang">
            <VIcon>mdi-swap-horizontal</VIcon>
            {{ langSetting }}
            <VAvatar tile size="20" left>
              <VImg
                v-if="langSetting === 'ko'"
                src="../../assets/icons/america.png"
              ></VImg>
              <VImg v-else src="../../assets/icons/korea.png"></VImg>
            </VAvatar>
          </VListItemTitle>
        </VListItem>
        <VListItem class="right-panel-item" v-if="accountInfo.authority === 0">
          <VListItemTitle @click="clickToAdmin">
            <VIcon>mdi-security</VIcon>
            {{ t('adminPage') }}
          </VListItemTitle>
        </VListItem>
        <VListItem class="right-panel-item">
          <VListItemTitle @click="clickToLogout">
            <VIcon>mdi-logout-variant</VIcon>
            {{ t('logout') }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VAppBar>
  <HeaderDrawer
    v-model="showDrawer"
    :showLoginDialog="showLoginDialog"
    :accountInfo="accountInfo"
    @update:showLoginDialog="showLoginDialog = $event"
  />
  <LoginDialog
    v-model="showLoginDialog"
    msg="Vue 3 + TypeScript + Vite + Vuetify 3"
  />
  <ChangePasswordDialog
    v-model="showEditPasswordDialog"
    v-if="accountInfo?.accountId"
    :accountId="accountInfo.accountId"
  />
</template>

<script lang="ts">
export enum LANGUAGE_TYPE {
  ko = '한국어',
  en = 'English',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import Button from '@/components/common/Button.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LoginDialog from '@/features/dialog/LoginDialog.vue';
import ChangePasswordDialog from '@/features/dialog/ChangePasswordDialog.vue';
import { useUserStore } from '@/store/userStore';
import { LanguageType, useLanguageStore } from '@/store/languageStore';
import HeaderDrawer from './HeaderDrawer.vue';
import { storeToRefs } from 'pinia';
const router = useRouter();
const { t } = useI18n();

const { saveLanguage, getOppositeLanguage, language } = useLanguageStore();
const langSetting = ref<LanguageType>(language);
const showEditPasswordDialog = ref(false);
const showLoginDialog = ref(false);
const showDrawer = ref(false);

/** 잘못된 방법
 *  store는 reactive로 래핑된 객체
 * 디스트럭처링(destructuring : 구조 분해 할당)이 불가능함
 * 이런식의 사용이 올바름
 * const { accountInfo } = storeToRefs(useUserStore)
 * storeToRefs 는 반응형으로 작동하게 해줌
 */
const userStore = useUserStore();
const { accountInfo, isSignIn } = storeToRefs(userStore);

const toggleDrawer = () => {
  showDrawer.value = !showDrawer.value;
};

// 로그인 다이얼로그 열기/닫기 함수
const clickToShowLoginDialog = () => {
  showLoginDialog.value = !showLoginDialog.value;
};

const clickToShowEditPassword = () => {
  showEditPasswordDialog.value = true;
};

// 언어 변경 함수
const clickToChangeLang = () => {
  langSetting.value = getOppositeLanguage(langSetting.value);
  saveLanguage(langSetting.value);
};

// 관리자 페이지로 이동 함수
const clickToAdmin = () => {
  console.log('userStore', userStore.isSignIn);
  console.log('isSignIn', isSignIn);
  router.push({ name: 'AdminPage' });
};

// 로그아웃 함수
const clickToLogout = () => {
  userStore.resetAccountInfo();
  router.push({ name: 'MainPage' });
};

// 페이지 변경 함수
const clickToMain = () => {
  router.push('/');
};
</script>

<style lang="scss" scoped>
.nald-header {
  z-index: 1000;
}

.right-panel-item {
  cursor: pointer;
  height: 10px;

  :hover {
    opacity: 0.7;
  }
}
</style>
