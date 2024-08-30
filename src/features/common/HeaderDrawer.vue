<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import menuItems from '@/assets/data/menu';
import { computed } from 'vue';
import { useUserStore } from '@/store/userStore';
import { MenuInfo, SubMenuInfo } from '@/types/common';
import { storeToRefs } from 'pinia';
import avatarOnline from '@/assets/icons/avatar_online.png';
import avatarOffline from '@/assets/icons/avatar_offline.png';

const router = useRouter();
const { t } = useI18n();
const { accountInfo } = storeToRefs(useUserStore());

const props = defineProps<{
  showLoginDialog: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: 'update:showLoginDialog', value: boolean): void;
}>();

const updateShowValue = (value: boolean) => emit('update:modelValue', value);
const clickShowLoginDialog = () =>
  emit('update:showLoginDialog', !props.showLoginDialog);

const handleAvatarClick = () => {
  if (!accountInfo) clickShowLoginDialog();
};

/** 권한에 따른 메뉴  */
const menuInfo = computed(() => {
  const currentAuthority: number = accountInfo.value.authority;
  if (currentAuthority === -1) return [];
  if (currentAuthority == 0) return menuItems;

  /** 권한이 0이 아닌 사용자에 대해 필터링 */
  return menuItems
    .filter(
      (menu) =>
        menu.anonymousAccess ||
        menu.subMenus?.some((subMenu) => subMenu.availableRange !== 1),
    )
    .map((menu) => ({
      ...menu,
      subMenus: menu.subMenus?.filter(
        (subMenu) => subMenu.availableRange !== 1,
      ),
    }));
});

const onChangePage = (menu: MenuInfo | SubMenuInfo) => {
  if ('active' in menu) menu.active = !menu.active;
  router.push({ name: menu.value });
};
</script>

<template>
  <VNavigationDrawer
    @update:model-value="updateShowValue"
    app
    fixed
    left
    temporary
  >
    <VList dense :class="{ beforeLoginNav: !accountInfo }">
      <div class="text-center mt-3">
        <VAvatar
          class="profile pa-3"
          :color="accountInfo ? 'secondary' : 'grey darken-4'"
          size="80"
          @click="handleAvatarClick"
        >
          <VImg contain :src="accountInfo ? avatarOnline : avatarOffline" />
        </VAvatar>
      </div>
      <VListItem
        color="rgba(0, 0, 0, .4)"
        dark
        class="text-center"
        v-if="accountInfo?.accountName"
      >
        <VListItemTitle class="text-primary">
          {{ accountInfo.accountName }}
        </VListItemTitle>
        <VListItemSubtitle>{{ accountInfo.email }}</VListItemSubtitle>
      </VListItem>
      <VListItem color="rgba(0, 0, 0, .4)" dark class="text-center" v-else>
        <VListItemTitle class="text-error" @click="clickShowLoginDialog">
          {{ t('doLogin') }}
        </VListItemTitle>
        <VListItemSubtitle>{{ t('noGuestAccess') }}</VListItemSubtitle>
      </VListItem>
    </VList>
    <VDivider />
    <VList density="compact">
      <template v-for="(menu, index) in menuInfo" :key="index">
        <VListItem
          v-if="!menu.subMenus"
          v-model="menu.active"
          no-action
          @click="onChangePage(menu)"
          :append-icon="menu.subMenus ? 'mdi-chevron-up' : undefined"
        >
          <template v-slot:prepend>
            <VIcon :icon="menu.icon" />
          </template>
          <VListItemTitle>{{ t(menu.title) }}</VListItemTitle>
        </VListItem>
        <VListGroup v-else>
          <template v-slot:activator="{ props }">
            <VListItem v-bind="props">
              <template v-slot:prepend>
                <VIcon :icon="menu.icon"></VIcon>
              </template>
              <VListItemTitle>{{ t(menu.title) }}</VListItemTitle>
            </VListItem>
          </template>
          <VListItem
            v-for="(child, index) in menu.subMenus"
            :key="index"
            :prepend-icon="child.icon"
            @click="onChangePage(child)"
          >
            {{ t(child.title) }}
          </VListItem>
        </VListGroup>
      </template>
    </VList>
  </VNavigationDrawer>
</template>

<style lang="scss" scoped></style>
