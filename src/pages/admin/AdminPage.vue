<template>
  <div class="page">
    <h3 class="display-1 font-weight-bold mb-3 text-right text--disabled">
      Admin Page
    </h3>
    <VTabs right icons-and-text background-color="#0e0e0e" v-model="currentTab">
      <VTab>
        {{ t('userManage') }}
        <VIcon>mdi-account-wrench-outline</VIcon>
      </VTab>
      <VTab>
        {{ t('resourceManage') }}
        <VIcon>mdi-video-outline</VIcon>
      </VTab>
      <VTab>
        {{ t('emptyManage') }}
        <VIcon>mdi-help</VIcon>
      </VTab>
    </VTabs>
    <UserManage v-if="currentTab === 0" :isMobile="isMobile" />
    <!-- <resource-manage v-if="currentTab === 1" :isMobile="isMobile"></resource-manage> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted, Ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import UserManage from '@/features/admin/UserManage.vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const display = useDisplay();
  const isMobile: Ref<boolean> = display.smAndDown;
  const currentTab = ref(0);
  const route = useRoute();
  const router = useRouter();

  watch(currentTab, (newTab) => {
    router
      .replace({
        name: 'AdminPage',
        query: { tab: newTab.toString() },
      })
      .catch((err) => err);
  });

  onMounted(() => {
    if (route.query.tab) {
      currentTab.value = Number(route.query.tab);
    }
  });
</script>

<style lang="scss" scoped></style>
