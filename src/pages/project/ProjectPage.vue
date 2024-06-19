<template>
  <div class="mt-3">
    <v-sheet color="#0E0E0E" elevation="3" rounded="lg">
      <v-tabs v-model="currentTab" :fixedTabs=true align-tabs="center" color="primary" height="60" slider-color="primary">
        <v-tab v-for="tab in tabs" :key="tab.value" :text="tab.text" :value="tab.value"> </v-tab>
      </v-tabs>
      <v-tabs-window v-model="currentTab">
        <v-tabs-window-item value="diagram" :transition=false :reverseTransition=false>
          <ProjectDiagram />
        </v-tabs-window-item>
        <v-tabs-window-item value="kube" :transition=false :reverseTransition=false>
          <project-kube />
        </v-tabs-window-item>
        <v-tabs-window-item value="history" :transition=false :reverseTransition=false>
          <project-history />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-sheet>
  </div>
</template>


<script lang="ts" setup>
import { defineComponent, ref, computed, onMounted } from "vue";
import ProjectKube from '@/components/project/ProjectKube.vue';
import ProjectDiagram from '@/components/project/ProjectDiagram.vue';
import ProjectHistory from '@/components/project/ProjectHistory.vue';

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
