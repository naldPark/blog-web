<template>
  <div class="mt-3">
    <VSheet color="#0E0E0E" elevation="3" rounded="lg">
      <VTabs
        v-model="currentTab"
        :fixedTabs="true"
        align-tabs="center"
        color="primary"
        height="60"
        slider-color="primary"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.value"
          :text="tab.text"
          :value="tab.value"
        >
        </VTab>
      </VTabs>
      <VTabsWindow v-model="currentTab">
        <VTabsWindowItem
          value="diagram"
          :transition="false"
          :reverseTransition="false"
        >
          <ProjectDiagram />
        </VTabsWindowItem>
        <VTabsWindowItem
          value="kube"
          :transition="false"
          :reverseTransition="false"
        >
          <ProjectKube />
        </VTabsWindowItem>
        <VTabsWindowItem
          value="history"
          :transition="false"
          :reverseTransition="false"
        >
          <ProjectHistory :isMobile="isMobile" />
        </VTabsWindowItem>
      </VTabsWindow>
    </VSheet>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import ProjectKube from '@/features/project/ProjectKube.vue';
import ProjectDiagram from '@/features/project/ProjectDiagram.vue';
import ProjectHistory from '@/features/project/ProjectHistory.vue';
import { useDisplay } from 'vuetify';

const { smAndDown: isMobile } = useDisplay();
const currentTab = ref<string>('diagram');
const tabs: any = [
  {
    icon: 'mdi-blur-linear',
    text: 'Diagram',
    value: 'diagram',
  },
  {
    icon: 'mdi-kubernetes',
    text: 'NavigateKube',
    value: 'kube',
  },
  {
    icon: 'mdi-history',
    text: 'History',
    value: 'history',
  },
];
</script>

<style lang="scss" scoped></style>
