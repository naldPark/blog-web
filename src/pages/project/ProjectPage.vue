<script lang="ts" setup>
import { ref } from 'vue';
import ProjectKube from '@/features/project/ProjectKube.vue';
import ProjectDiagram from '@/features/project/ProjectDiagram.vue';
import ProjectHistory from '@/features/project/ProjectHistory.vue';
import { useDisplay } from 'vuetify';

/* 화면 크기에 따라 모바일 여부 확인 */
const { smAndDown: isMobile } = useDisplay();

/* 현재 선택된 탭 */
const currentTab = ref<string>('diagram');

/* 탭 목록 */
const tabs = ref([
  { text: 'Diagram', value: 'diagram' },
  { text: 'NavigateKube', value: 'kube' },
  { text: 'History', value: 'history' },
]);

/** 탭 별 컴포넌트 매핑 */
const getComponent = (tabValue: string) => {
  switch (tabValue) {
    case 'kube':
      return ProjectKube;
    case 'history':
      return ProjectHistory;
    default:
      return ProjectDiagram;
  }
};
</script>

<template>
  <div class="mt-3">
    <VSheet color="#0E0E0E" elevation="3" rounded="lg">
      <VTabs
        v-model="currentTab"
        fixed-tabs
        align-tabs="center"
        color="primary"
        height="60"
        slider-color="primary"
      >
        <!-- 탭 리스트 렌더링 -->
        <VTab v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.text }}
        </VTab>
      </VTabs>
      <!-- 탭 내용 렌더링 -->
      <VTabsWindow v-model="currentTab">
        <VTabsWindowItem
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          :transition="false"
          :reverse-transition="false"
        >
          <component :is="getComponent(tab.value)" :isMobile="isMobile" />
        </VTabsWindowItem>
      </VTabsWindow>
    </VSheet>
  </div>
</template>

<style lang="scss" scoped></style>
