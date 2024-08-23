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
      <template v-for="menu in menuItems" :key="menu.title">
        <VListItem
          v-if="!menu.subMenus"
          v-model="menu.active"
          no-action
          @click="onChangePage(menu)"
          :append-icon="menu.subMenus ? 'mdi-chevron-up' : null"
        >
          <template v-slot:prepend>
            <VIcon :icon="menu.icon"></VIcon>
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
            v-for="child in menu.subMenus"
            :key="child.title"
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

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import menuItems from '@/assets/data/menu';

const router = useRouter();
const { t } = useI18n();

const avatarOnline = '../../assets/icons/avatar_online.png';
const avatarOffline = '../../assets/icons/avatar_offline.png';

const props = defineProps<{
  showLoginDialog: boolean;
  accountInfo: { accountName?: string; email?: string } | null;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: 'update:showLoginDialog', value: boolean): void;
}>();

const updateShowValue = (value: boolean) => emit('update:modelValue', value);
const clickShowLoginDialog = () =>
  emit('update:showLoginDialog', !props.showLoginDialog);

const handleAvatarClick = () => {
  if (!props.accountInfo) clickShowLoginDialog();
};

const onChangePage = (menu: {
  url?: string;
  value?: string;
  subMenus?: any[];
  active?: boolean;
}) => {
  if (menu.subMenus) {
    menu.active = !menu.active;
  } else if (menu.url) {
    window.location.href = menu.url;
  } else {
    router.push({ name: menu.value });
  }
};
</script>

<style lang="scss" scoped></style>
