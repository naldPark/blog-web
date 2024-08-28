<script lang="ts" setup>
import { ref } from 'vue';
import { getImageUrl } from '@/utils/commonUtil';
import Button from '@/components/common/Button.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LoginDialog from '@/features/dialog/LoginDialog.vue';
import ChangePasswordDialog from '@/features/dialog/ChangePasswordDialog.vue';
import { useUserStore } from '@/store/userStore';
import { LanguageType, useLanguageStore } from '@/store/languageStore';
import HeaderDrawer from './HeaderDrawer.vue';
import { storeToRefs } from 'pinia';

interface RightMenuItems {
  text: string;
  icon: string;
  onClick: () => void;
  requiresAdmin?: boolean;
  showAvatar?: boolean;
}

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
const { accountInfo } = storeToRefs(userStore);

const toggleDrawer = () => (showDrawer.value = !showDrawer.value);

// 로그인 다이얼로그 열기/닫기 함수
const clickToShowLoginDialog = () =>
  (showLoginDialog.value = !showLoginDialog.value);

const listItems: RightMenuItems[] = [
  {
    text: t('editPassword'),
    icon: 'mdi-account-edit-outline',
    onClick: () => (showEditPasswordDialog.value = true),
    requiresAdmin: true,
  },
  {
    text: getOppositeLanguage(langSetting.value),
    icon: 'mdi-swap-horizontal',
    onClick: () => {
      langSetting.value = getOppositeLanguage(langSetting.value);
      saveLanguage(langSetting.value);
    },
    showAvatar: true,
  },
  {
    text: t('adminPage'),
    icon: 'mdi-security',
    onClick: () => router.push({ name: 'AdminPage' }),
    requiresAdmin: true,
  },
  {
    text: t('logout'),
    icon: 'mdi-logout-variant',
    onClick: () => {
      userStore.resetAccountInfo();
      router.push({ name: 'MainPage' });
    },
  },
];
</script>

<template>
  <VAppBar color="rgba(22, 22, 22, 0.95)" density="compact" class="nald-header">
    <VAppBarNavIcon variant="text" @click="toggleDrawer" />
    <VToolbarTitle @click="() => router.push('/')" style="cursor: pointer">
      <VAvatar
        size="30px"
        rounded="0"
        :tile="true"
        :image="getImageUrl('/logo.png')"
        :border="0"
      />
      <span> Nald</span>
    </VToolbarTitle>
    <VSpacer />
    <Button
      v-if="!accountInfo.accountId"
      @onClick="clickToShowLoginDialog"
      :label="t('login')"
      variant="outlined"
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
        />
      </template>
      <VList>
        <VListSubheader>{{ accountInfo.accountName }}</VListSubheader>
        <VListItem
          v-for="(item, index) in listItems"
          :key="index"
          class="right-panel-item"
        >
          <template v-if="!item.requiresAdmin || accountInfo.authority === 0">
            <VListItemTitle @click="item.onClick">
              <VIcon :icon="item.icon" />
              {{ item.text }}
              <VAvatar
                v-if="item.showAvatar"
                :image="
                  getImageUrl(
                    `/assets/svgs/${langSetting === 'ko' ? 'us' : 'kr'}.svg`,
                  )
                "
                size="20px"
                rounded="0"
                :tile="true"
              />
            </VListItemTitle>
          </template>
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
  <LoginDialog v-model:showDialog="showLoginDialog" />
  <ChangePasswordDialog
    v-model:showDialog="showEditPasswordDialog"
    v-if="accountInfo?.accountId"
    :accountId="accountInfo.accountId"
  />
</template>

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
