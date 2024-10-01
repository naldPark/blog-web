<script setup lang="ts">
import { Ref, ref } from 'vue';
import DiagramItem from './DiagramItem.vue';
import story from '@/assets/data/story';
import { useDisplay } from 'vuetify';
import { getImageUrl } from '@/utils/commonUtil';
interface Node {
  icon: string;
  name: string;
  value: string;
}

interface NodeDesc {
  title: string;
  content: string;
}

const { smAndDown: isMobile } = useDisplay();
const selectedNode: Ref<Node> = ref({ icon: '', name: '', value: '' });
const selectedNodeDesc: Ref<NodeDesc> = ref({ title: '', content: '' });
const modelData = ref(null);
const diagram: Ref<any> = ref(null);

const emitData = (item: any) => {
  modelData.value = item;
};

const diagramChange = (item: any) => {
  diagram.value = item;
};

const nodeSelected = (e: any) => {
  selectedNode.value = e;
  selectedNodeDesc.value = story[e.name];
};
</script>

<template>
  <VRow dense class="mb-3">
    <VCol cols="12" md="8">
      <DiagramItem
        @modelData="emitData"
        @change="diagramChange"
        :selectedNodeDesc="selectedNodeDesc"
        @nodeSelected="nodeSelected"
        :selectedNode="selectedNode"
      />
    </VCol>
    <VCol cols="12" md="4" v-if="!isMobile">
      <VCard
        v-if="selectedNode && selectedNode.icon"
        class="pa-3 h-full w-full"
      >
        <VCardText>
          <VRow class="mb-4 align-center">
            <VAvatar rounded class="mr-4" size="30">
              <VImg
                :src="
                  getImageUrl('/assets/diagram', `${selectedNode.icon}.png`)
                "
              />
            </VAvatar>
            <strong class="text-h6">{{ selectedNode.name }}</strong>
            <VSpacer />
          </VRow>
          <VDivider class="mt-2 mb-4" />
          <p class="text-h6 font-weight-bold mb-10">
            ▶ {{ selectedNodeDesc.title }}
          </p>
          <p
            class="text-subtitle-1 font-weight-light"
            style="white-space: pre-line"
          >
            {{ selectedNodeDesc.content }}
          </p>
        </VCardText>
      </VCard>
      <VCard class="pa-3" v-else height="100%" flat>
        <VCardText>
          <VRow class="mb-4 align-center">
            <VAvatar rounded class="mr-4" size="30">
              <VImg :src="getImageUrl('/assets/diagram', 'nald.png')" />
            </VAvatar>
            <strong class="text-h6">Nald.me</strong>
            <VSpacer />
          </VRow>
          <VDivider class="mt-2 mb-4" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped></style>
