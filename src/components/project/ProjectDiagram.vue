<template>
  <v-row dense class="projectPage">
    <v-col cols="12" md="8">
      <DiagramItem @modelData="emitData" @change="diagramChange" :selectedNodeDesc="selectedNodeDesc"
        @nodeSelected="nodeSelected" :selectedNode="selectedNode">
      </DiagramItem>
    </v-col>
    <v-col cols="12" md="4" v-if="!isMobile">
      <v-card v-if="selectedNode && selectedNode.icon" class="pa-3" height="100%" width="100%">
        <v-card-text>
          <v-row class="mb-4 align-center">
            <v-avatar rounded class="mr-4" size="30">
              <v-img :src="`src/assets/diagram/${selectedNode.icon}.png`"></v-img>
            </v-avatar>
            <strong class="text-h6">{{ selectedNode.name }}</strong>
            <v-spacer></v-spacer>
          </v-row>
          <v-divider class="mt-2 mb-4"></v-divider>
          <p class="text-h6 font-weight-bold mb-10">
            ▶ {{ selectedNodeDesc.title }}
          </p>
          <p class="text-subtitle-1 font-weight-light" style="white-space: pre-line">
            {{ selectedNodeDesc.content }}
          </p>
        </v-card-text>
      </v-card>
      <v-card class="pa-3" v-else height="100%" flat>
        <v-card-text>
          <v-row class="mb-4 align-center">
            <v-avatar rounded class="mr-4" size="30">
              <v-img :src="`@/assets/diagram/nald.png`"></v-img>
            </v-avatar>
            <strong class="text-h6">Nald.me</strong>
            <v-spacer></v-spacer>
          </v-row>
          <v-divider class="mt-2 mb-4"></v-divider>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DiagramItem from './DiagramItem.vue';
import story from '@/assets/data/story';
import { useDisplay } from 'vuetify';
interface Node {
  icon: string;
  name: string;
  value: string;
}

interface NodeDesc {
  title: string;
  content: string;
}

const display = useDisplay();
const isMobile: Ref<boolean> = display.smAndDown;
const selectedNode: Ref<Node> = ref({ icon: '', name: '', value: '' });
const selectedNodeDesc: Ref<NodeDesc> = ref({ title: '', content: '' });
const modelData = ref(null);
const images = import.meta.glob('@/assets/diagram/*.png');
let diagram: Ref<any> = ref(null);

const onChangeDiagram = (e: any) => {
  diagram.value = e;
};

const emitData = (item: any) => {
  modelData.value = item;
};

const diagramChange = (item: any) => {
  diagram.value = item;
};

const changedSelection = (e: any) => {
  // console.log('체인지드셀렉션');
  selectedNode.value = e;
};

const groupSelected = (e: any) => {
  // console.log('그룹클릭', e);
  selectedNode.value = e;
};

const nodeSelected = (e: any) => {
  selectedNode.value = e;
  selectedNodeDesc.value = story[e.name];
};

const linkSelected = (e: any) => {
  // selectedNode.value = null;
};

const resetClick = (e: any) => {
  selectedNode.value.value = '';
};

const modelChanged = (e: any) => {
  // console.log(e)
  diagram.value = e;
};
</script>

<style lang="scss" scoped></style>
