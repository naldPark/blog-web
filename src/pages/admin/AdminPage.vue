<template>
  <div class="page">
    <h3 class="display-1 font-weight-bold mb-3 text-right text--disabled">
      Admin Page
    </h3>
    <v-tabs
      right
      icons-and-text
      background-color="#0e0e0e"
      v-model="currentTab"
    >
      <v-tab>
        {{ $t('userManage') }}
        <v-icon>mdi-account-wrench-outline</v-icon>
      </v-tab>
      <v-tab>
        {{ $t('resourceManage') }}
        <v-icon>mdi-video-outline</v-icon>
      </v-tab>
      <v-tab>
        {{ $t('emptyManage') }}
        <v-icon>mdi-help</v-icon>
      </v-tab>
    </v-tabs>
    <UserManage v-if="currentTab === 0" :isMobile="isMobile" />
    <!-- <resource-manage v-if="currentTab === 1" :isMobile="isMobile"></resource-manage> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import UserManage from '@/components/admin/UserManage.vue';
  import { useDisplay } from 'vuetify';

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
