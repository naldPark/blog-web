<template>
  <div class="admin-wrapper">
    <v-sheet color="grey-darken-4 pa-5" elevation="3" rounded="lg" width="95%">
      <VIcon icon="mdi-cogs" />
      <span class="ml-3 text-orange-lighten-1 text-h6">Admin</span>
      <VTabs
        v-model="currentTab"
        class="tab-group"
        slider-color="primary"
        align-tabs="center"
        height="60"
        color="white"
      >
        <VTab>
          <VIcon icon="mdi-account-outline" />
          {{ t('userManage') }}
        </VTab>
        <VTab>
          <VIcon icon="mdi-video-outline" />
          {{ t('resourceManage') }}
        </VTab>
        <VTab>
          <VIcon icon="mdi-help" />
          {{ t('emptyManage') }}
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

<script lang="ts" setup>
import { ref, watch, onMounted, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserManage from '@/features/admin/UserManage.vue';
import DataManage from '@/features/admin/DataManage.vue';
import ResourceManage from '@/features/admin/ResourceManage.vue';
import { useDisplay } from 'vuetify';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { smAndDown: isMobile } = useDisplay();

const route = useRoute();
const router = useRouter();
const currentTab = ref(Number(route.query.tab));
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
