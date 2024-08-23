<template>
  <VAppBar color="rgba(22, 22, 22, 0.95)" density="compact" class="nald-header">
    <VAppBarNavIcon variant="text" @click="toggleDrawer"></VAppBarNavIcon>
    <VToolbarTitle @click="onChangePage(menuInfo[0])" style="cursor: pointer">
      <VAvatar rounded size="30px">
        <VImg src="@/assets/logo.png"></VImg>
      </VAvatar>
      <span> Nald</span>
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
            {{ lang }}
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
import { ref, computed, watch, watchEffect, onMounted } from 'vue';
import Button from '@/components/common/Button.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LoginDialog from '@/features/dialog/LoginDialog.vue';
import ChangePasswordDialog from '@/features/dialog/ChangePasswordDialog.vue';
import { useUserStore } from '@/store/userStore';
import { useLanguageStore } from '@/store/languageStore';
import HeaderDrawer from './HeaderDrawer.vue';
import menuItems from '@/assets/data/menu';
import { LOCAL_STORAGE_KEYS } from '@/types/enum';
const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();
const languageStatusStore = useLanguageStore();
const languageValue = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) || 'ko';
const langSetting = ref<string>(languageValue);
const drawer = ref(false);
const showEditPasswordDialog = ref(false);
const showLoginDialog = ref(false);
const showDrawer = ref(false);

const toggleDrawer = () => {
  showDrawer.value = !showDrawer.value;
  console.log('Drawer toggled:', drawer.value);
};

// 계산된 메뉴 정보
const menuInfo = computed(() => {
  const currentAuthority = userStore.accountInfo?.authority;
  if (!currentAuthority) {
    return [];
  }

  // 권한이 0인 경우에는 모든 메뉴를 보여줍니다.
  if (currentAuthority == 0) {
    return menuItems;
  } else {
    // 권한이 0이 아닌 경우에는 권한 범위에 맞는 메뉴만 필터링합니다.
    const filteredMenu = menuItems.filter(
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
const accountInfo = computed(() => userStore.accountInfo);

// 현재 언어 설정
const lang = computed(
  () =>
    LANGUAGE_TYPE[
      langSetting.value === 'ko' ? 'en' : ('ko' as keyof typeof LANGUAGE_TYPE)
    ],
);

// 로그인 다이얼로그 열기/닫기 함수
const clickToShowLoginDialog = () => {
  showLoginDialog.value = !showLoginDialog.value;
};

const clickToShowEditPassword = () => {
  showEditPasswordDialog.value = true;
};

// 언어 변경 함수
const clickToChangeLang = () => {
  const newLang = langSetting.value === 'ko' ? 'en' : 'ko';
  langSetting.value = newLang;
  localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, newLang);
  languageStatusStore.saveLanguage(newLang);
};

// 관리자 페이지로 이동 함수
const clickToAdmin = () => {
  router.push({ name: 'AdminPage' });
};

// 로그아웃 함수
const clickToLogout = () => {
  userStore.setAuthToken(null);
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

onMounted(() => {
  console.log('헤더마운트');
});

// watchEffect(() => {
//   // langSetting.value가 변경될 때마다 UI를 자동으로 업데이트합니다.
//   const watchs = languageStatusStore.language;
//   console.log('watchs', watchs);
// });
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
