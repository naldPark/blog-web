<script lang="ts" setup>
import { ref, watch, onMounted, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserManage from '@/features/admin/UserManage.vue';
import DataManage from '@/features/admin/DataManage.vue';
import ResourceManage from '@/features/admin/ResourceManage.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const route = useRoute();
const router = useRouter();
const currentTab = ref(Number(route.query.tab || 0));
watch(currentTab, (newTab) => {
  router
    .replace({
      name: 'AdminPage',
      query: { tab: newTab.toString() },
    })
    .catch((err) => err);
});

onMounted(() => {
  if (route.query.tab) currentTab.value = Number(route.query.tab);
});
</script>

<template>
  <div class="admin-wrapper">
    <v-sheet color="grey-darken-4 pa-5" elevation="3" rounded="lg" width="95%">
      <VIcon icon="mdi-cogs" class="text-orange-lighten-2" />
      <span class="ml-3 text-orange-lighten-2 text-h6">Admin</span>
      <VTabs
        v-model="currentTab"
        class="tab-group"
        slider-color="primary"
        align-tabs="center"
        height="60"
        color="white"
      >
        <VTab>
          <VIcon icon="mdi-account-outline" class="mr-2" />
          <span> {{ t('userManage') }}</span>
        </VTab>
        <VTab>
          <VIcon icon="mdi-video-outline" class="mr-2" />
          <span> {{ t('resourceManage') }}</span>
        </VTab>
        <VTab>
          <VIcon icon="mdi-help" class="mr-2" />
          <span> {{ t('emptyManage') }}</span>
        </VTab>
      </VTabs>
      <div class="tab-content">
        <UserManage v-if="currentTab === 0" />
        <ResourceManage v-if="currentTab === 1" />
        <DataManage v-if="currentTab === 2" />
      </div>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
.admin-wrapper {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  .tab-group {
    margin-bottom: 5px;
    height: 60px;
  }
  .tab-content {
    border: 1px solid #424242;
    min-height: 800px;
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
