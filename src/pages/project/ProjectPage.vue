<template>
  <div class="mt-3">
    <v-sheet color="#0E0E0E" elevation="3" rounded="lg">
      <v-tabs v-model="currentTab" :fixedTabs=true align-tabs="center" color="primary" height="60"
        slider-color="primary">
        <v-tab v-for="tab in tabs" :key="tab.value" :text="tab.text" :value="tab.value"> </v-tab>
      </v-tabs>
      <v-tabs-window v-model="currentTab">
        <v-tabs-window-item value="diagram" :transition=false :reverseTransition=false>
          <ProjectDiagram />
        </v-tabs-window-item>
        <v-tabs-window-item value="kube" :transition=false :reverseTransition=false>
          <ProjectKube />
        </v-tabs-window-item>
        <v-tabs-window-item value="history" :transition=false :reverseTransition=false>
          <ProjectHistory :isMobile="isMobile" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-sheet>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import ProjectKube from '@/components/project/ProjectKube.vue';
import ProjectDiagram from '@/components/project/ProjectDiagram.vue';
import ProjectHistory from '@/components/project/ProjectHistory.vue';
import { useDisplay } from 'vuetify';


const display = useDisplay();
const isMobile: Ref<boolean> = display.smAndDown;
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
