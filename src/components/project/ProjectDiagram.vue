<template>
    <v-row dense class="projectPage">
        asdsada
        <v-col cols="12" md="8">
            <!-- <diagram-item @modelData="emitData" @change="diagramChange" @nodeSelected="nodeSelected"
                :selectedNodeDesc="selectedNodeDesc" :selectedNode="selectedNode">
            </diagram-item> -->
        </v-col>
        <v-col cols="12" md="4" v-if="!isMobile">
            <v-card v-if="selectedNode && selectedNode.icon" class="pa-3" height="100%" width="100%">
                <v-card-text>
                    <v-row class="mb-4" align="center">
                        <v-avatar rounded class="mr-4" size="30">
                            <v-img :src="`@/assets/diagram/${selectedNode.icon}.png`"></v-img>
                        </v-avatar>
                        <strong class="text-h6">{{ selectedNode.name }}</strong>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-divider class="mt-2 mb-4"></v-divider>
                    <p class="text-h6 font-weight-bold mb-10">
                        ▶ {{ selectedNodeDesc.title }}
                    </p>
                    <p class="text-subtitle-1 font-weight-light" style="white-space: pre-line;">
                        {{ selectedNodeDesc.content }}
                    </p>
                </v-card-text>
            </v-card>
            <v-card class="pa-3" v-else height="100%" flat>
                <v-card-text>
                    <v-row class="mb-4" align="center">
                        <v-avatar rounded class="mr-4" size="30">
                            <v-img :src="`@/assets/diagram/nald.png`"></v-img>
                        </v-avatar>
                        <strong class="text-h6">Nald.me</strong>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-divider class="mt-2 mb-4"></v-divider>
                    <p class="text-subtitle-1"
                        v-html="selectedNodeDesc ? selectedNodeDesc.content : 'No description available.'" />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import story from './story';
import { useDisplay } from 'vuetify';

const display = useDisplay();
let selectedNode: any = null;
let selectedNodeDesc: any = null;
let diagram: any = null;
let modelData: any = null;
const isMobile: Ref<boolean> = display.smAndDown;

const emitData = (item: any) => {
    modelData = item;
}

const diagramChange = (item: any) => {
    diagram = item;
}

// const nodeSelected = (e: any) => {
//     selectedNode = e;
//     selectedNodeDesc = story[e.name] || { title: 'No title', content: 'No description available.' };
// }

const resetClick = (e: any) => {
    selectedNode = null;
    selectedNodeDesc = null;
}

</script>

<style lang="scss" scoped>
.descP {
    color: '#fcd97c';
    font-size: 100pt;
}
</style>
