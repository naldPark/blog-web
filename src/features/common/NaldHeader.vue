<template>
  <VAppBar color="rgba(22, 22, 22, 0.95)" density="compact" class="nald-header">
    <VAppBarNavIcon variant="text" @click.stop="drawer = !drawer"></VAppBarNavIcon>
    <VToolbarTitle @click="onChangePage(menuInfo[0])" style="cursor: pointer">
      <VAvatar rounded size="30px">
        <VImg src="@/assets/logo.png"></VImg>
      </VAvatar>
      <span> Nald</span>
    </VToolbarTitle>
    <VSpacer></VSpacer>
    <VBtn v-if="!accountInfo.accountId" @click="updateShowLoginDialog(true)" color="primary" variant="outlined" rounded
      class="ma-2">
      {{ t('login') }}
      <VIcon dark right>mdi-account-outline</VIcon>
    </VBtn>
    <VBtn v-else color="primary">
      <VIcon class="text-secondary">mdi-face-man</VIcon>
      <VIcon class="text-secondary">mdi-menu-down</VIcon>
      <VMenu activator="parent">
        <VList>
          <VListSubheader>{{ accountInfo.accountName }}</VListSubheader>
          <VListItem class="right-panel-item" v-if="accountInfo.authority === 0">
            <VListItemTitle @click="clickToChangeAccountInfo">
              <VIcon :icon="'mdi-account-edit-outline'" />
              {{ t('editPassword') }}
            </VListItemTitle>
          </VListItem>
          <VListItem class="right-panel-item">
            <VListItemTitle @click="clickToChangeLang">
              <VIcon>mdi-swap-horizontal</VIcon>
              {{ lang }}
              <VAvatar tile size="20" left>
                <VImg v-if="langSetting === 'ko'" src="../../assets/icons/america.png"></VImg>
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
    </VBtn>
  </VAppBar>
  <VNavigationDrawer v-model="drawer" app fixed left temporary>
    <VList dense :class="{ beforeLoginNav: !accountInfo }">
      <div class="text-center mt-3">
        <VAvatar class="profile pa-3" color="secondary" size="80" v-if="accountInfo && accountInfo.accountName">
          <VImg contain src="../../assets/icons/avatar_online.png" />
        </VAvatar>
        <VAvatar class="profile pa-3" color="grey darken-4" size="80" v-else @click="clickShowLoginDialog">
          <VImg contain src="../../assets/icons/avatar_offline.png" />
        </VAvatar>
      </div>
      <VListItem color="rgba(0, 0, 0, .4)" dark class="text-center" v-if="accountInfo && accountInfo.accountName">
        <VListItemTitle class="text-primary">
          {{ accountInfo.accountName }}
        </VListItemTitle>
        <VListItemSubtitle> {{ accountInfo.email }} </VListItemSubtitle>
      </VListItem>
      <VListItem color="rgba(0, 0, 0, .4)" dark class="text-center" v-else>
        <VListItemTitle class="text-error" @click="clickShowLoginDialog">
          {{ t('doLogin') }}
        </VListItemTitle>
        <VListItemSubtitle>
          {{ t('noGuestAccess') }}
        </VListItemSubtitle>
      </VListItem>
    </VList>
    <VDivider></VDivider>
    <VList density="compact">
      <template v-for="menu in menuInfo" :key="menu.title">
        <VListItem v-if="!menu.subMenus" v-model="menu.active" no-action @click="onChangePage(menu)"
          :append-icon="menu.subMenus ? 'mdi-chevron-up' : null">
          <template v-slot:prepend>
            <VIcon :icon="menu.icon"></VIcon>
          </template>
          <VListItemTitle>{{ menu.title }}</VListItemTitle>
        </VListItem>
        <VListGroup v-else>
          <template v-slot:activator="{ props }">
            <VListItem v-bind="props">
              <template v-slot:prepend>
                <VIcon :icon="menu.icon"></VIcon>
              </template>
              <VListItemTitle>{{ menu.title }}</VListItemTitle>
            </VListItem>
          </template>
          <VListItem v-for="child in menu.subMenus" :key="child.title" :prepend-icon="child.icon" :title="child.title"
            :value="child.title" @click="onChangePage(child)"></VListItem>
        </VListGroup>
      </template>
    </VList>
  </VNavigationDrawer>
  <LoginDialog v-model:modelValue="showLoginDialog" msg="Vue 3 + TypeScript + Vite + Vuetify 3" />
  <ChangePasswordDialog v-model="showEditAccountInfoDialog" v-if="accountInfo?.accountId"
    :accountId="accountInfo.accountId" />
</template>

<script lang="ts">
export enum LANGUAGE_TYPE {
  ko = '한국어',
  en = 'English',
}
</script>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LoginDialog from '@/features/dialog/LoginDialog.vue';
import ChangePasswordDialog from '@/features/dialog/ChangePasswordDialog.vue';
import { useAccountStatusStore } from '@/store/accountStatusStore';
import { useLanguageStatusStore } from '@/store/languageStatusStore';

const router = useRouter();
const { t } = useI18n();
const accountStatusStore = useAccountStatusStore();
const languageStatusStore = useLanguageStatusStore();
const languageValue = localStorage.getItem('language') || 'ko';
const langSetting = ref<string>(languageValue);
const drawer = ref(false);
const showEditAccountInfoDialog = ref(false);
const showLoginDialog = ref(false); // 다이얼로그가 열린 상태로 초기화

// v-model에 대한 update 이벤트를 처리하는 함수를 정의합니다.
const updateShowLoginDialog = (newValue: boolean) => {
  showLoginDialog.value = newValue;
};

// Menu 아이템 목록
const menuItems = [
  {
    name: 'home',
    icon: 'mdi-home',
    title: t('menubar.home'),
    value: 'MainPage',
    anonymousAccess: true,
    active: false,
  },
  {
    name: 'infra',
    icon: 'mdi-duck',
    title: t('menubar.infra'),
    value: 'ProjectPage',
    anonymousAccess: false,
    active: false,
  },
  {
    name: 'aboutMe',
    icon: 'mdi-robot-happy-outline',
    title: t('menubar.aboutMe'),
    value: 'AboutMePage',
    anonymousAccess: false,
    active: false,
  },
  {
    name: 'wonderwall',
    icon: 'mdi-space-invaders',
    title: t('menubar.wonderwall'),
    value: 'WonderwallPage',
    anonymousAccess: false,
    subMenus: [
      {
        name: 'sandbox',
        icon: 'mdi-server',
        title: t('menubar.sandbox'),
        value: 'SandboxPage',
      },
      {
        name: 'share',
        icon: 'mdi-share',
        title: t('menubar.shareLocker'),
        value: 'SharePage',
        availableRange: 1,
        url: 'https://upload.nald.me',
      },
      {
        name: 'webApp',
        icon: 'mdi-cellphone-text',
        title: t('menubar.webApp'),
        value: 'WebAppPage',
        url: 'https://pwa.nald.me',
      },
      {
        name: 'video',
        icon: 'mdi-television-box',
        title: t('menubar.video'),
        value: 'StreamingListPage',
      },
      {
        name: 'chat',
        icon: 'mdi-gamepad',
        title: t('menubar.clilendor'),
        value: 'ChatRoomPage',
      },
      {
        name: 'characterTest',
        icon: 'mdi-penguin',
        title: t('menubar.characterTest'),
        value: 'CharacterTestPage',
      },
    ],
  },
  {
    name: 'contactPage',
    icon: 'mdi-email-outline',
    title: t('menubar.contact'),
    value: 'ContactPage',
    anonymousAccess: true,
    active: false,
  },
];

// 계산된 메뉴 정보
const menuInfo = computed(() => {
  const currentAuthority = accountStatusStore.accountInfo?.authority;
  if (currentAuthority === undefined || currentAuthority === null) {
    return [];
  }

  // 권한이 0인 경우에는 모든 메뉴를 보여줍니다.
  if (currentAuthority == 0) {
    return menuItems;
  } else {
    // 권한이 0이 아닌 경우에는 권한 범위에 맞는 메뉴만 필터링합니다.
    let filteredMenu = menuItems.filter(
      (menu) =>
        menu.anonymousAccess ||
        (menu.subMenus &&
          menu.subMenus.some(
            (subMenu) =>
              subMenu.availableRange === null || subMenu.availableRange !== 1,
          )),
    );
    filteredMenu.forEach((menu) => {
      if (menu.subMenus) {
        menu.subMenus = menu.subMenus.filter(
          (subMenu) =>
            subMenu.availableRange === null || subMenu.availableRange !== 1,
        );
      }
    });
    return filteredMenu;
  }
});

// 현재 로그인 상태 정보
const accountInfo = computed(() => accountStatusStore.accountInfo);

// 현재 언어 설정
const lang = computed(
  () =>
    LANGUAGE_TYPE[
    langSetting.value === 'ko' ? 'en' : ('ko' as keyof typeof LANGUAGE_TYPE)
    ],
);

// 로그인 다이얼로그 열기/닫기 함수
const clickShowLoginDialog = () => {
  showLoginDialog.value = !showLoginDialog.value;
};

const clickToChangeAccountInfo = () => {
  showEditAccountInfoDialog.value = true;
};

// 언어 변경 함수
const clickToChangeLang = () => {
  const newLang = langSetting.value === 'ko' ? 'en' : 'ko';
  langSetting.value = newLang;
  localStorage.setItem('language', newLang);
  languageStatusStore.saveLanguage(newLang);
  location.reload();
};

// 관리자 페이지로 이동 함수
const clickToAdmin = () => {
  router.push({ name: 'AdminPage' });
};

// 로그아웃 함수
const clickToLogout = () => {
  accountStatusStore.setAuthToken(null);
  router.push({ name: 'MainPage' });
};

// 페이지 변경 함수
const onChangePage = (menu: any) => {
  console.log('menu', menu);
  if (menu.subMenus) {
    menu.active = !menu.active;
  } else if (menu.url) {
    location.href = menu.url;
  } else {
    router.push({ name: menu.value });
  }
};

// 언어 변경 감시
watch(langSetting, (newLang: string) => {
  languageStatusStore.saveLanguage(newLang);
});
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
