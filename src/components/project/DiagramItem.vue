<template>
  <div>
    <div style="position: relative">
      <!-- diagram div -->
      <div id="diagramDiv" class="pa-2"></div>
      <!-- minimap -->
      <div id="miniMap" class="miniMap" v-if="!isMobile"></div>
      <!-- popup description when it is mobile -->
      <div class="miniMap is-mobile text-center" v-else>
        <v-btn color="primary" :disabled="!selectedNode || !selectedNode.icon" variant="outlined" size="small"
          @click="showSelectedNodeInfo = !showSelectedNodeInfo">
          <v-avatar rounded class="mr-2" size="20" v-if="selectedNode?.icon">
            <v-img :src="`src/assets/diagram/${selectedNode.icon}.png`"></v-img>
          </v-avatar>
          {{ selectedNode ? selectedNode.name : 'Please select node' }}
          <v-icon v-if="selectedNode?.icon" small class="ml-2 blinking">
            mdi-open-in-new
          </v-icon>
        </v-btn>
        <v-bottom-sheet scrollable v-model="showSelectedNodeInfo">
          <v-card>
            <v-card-actions>
              <v-avatar rounded class="mr-2" size="20" v-if="selectedNode?.icon">
                <v-img :src="`src/assets/diagram/${selectedNode.icon}.png`"></v-img>
              </v-avatar>
              <span style="color: #ffb800">{{
                selectedNode ? selectedNode.name : 'Please select node'
              }}</span>
              <v-spacer></v-spacer>
              <v-btn class="justify-end" color="primary" small @click="showSelectedNodeInfo = !showSelectedNodeInfo">Close
              </v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-text>
              <div class="py-3">
                <p class="text-h6 font-weight-bold mb-10">
                  ▶ {{ selectedNodeDesc?.title }}
                </p>
                <p class="text-subtitle-1 font-weight-light" style="white-space: pre-line">
                  {{ selectedNodeDesc?.content }}
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import go, { Diagram } from 'gojs';
import { ref, onMounted, toRaw } from 'vue';
import infraService from '@/api/infraService';
import { useAppStatusStore } from '@/store/appStatusStore';
import { useDisplay } from 'vuetify';

const display = useDisplay();
const isMobile: Ref<boolean> = display.smAndDown;
const gojs = go.GraphObject.make;

interface NodeInfo {
  icon: string;
  name: string;
  value: string;
}

interface SelectedNodeDesc {
  title: string;
  content: string;
}
const { selectedNode, selectedNodeDesc } = defineProps<{
  selectedNode: NodeInfo;
  selectedNodeDesc: SelectedNodeDesc;
}>();
// const selectedNodeDesc: Ref<SelectedNodeDesc> = ref({
//   title: '',
//   content: '',
// });
const showSelectedNodeInfo = ref(false);

const appStatusStore = useAppStatusStore();
const pt180 = new go.Margin(180, 0, 40, 0);
const pt100 = new go.Margin(100, 0, 40, 0);
const mr8 = new go.Margin(0, 10, 0, 0);
const mb8 = new go.Margin(0, 0, 8, 0);
const roundedRectangleParams = {
  parameter1: 10,
  spot1: go.Spot.TopLeft,
  spot2: go.Spot.BottomRight,
};

const divDiagram = ref('diagramDiv');
let myDiagram: Diagram | null = null; // this will hold the diagram object

const myOverview: Ref<any> = ref(null);
const emit = defineEmits(['nodeSelected', 'linkSelected', 'groupSelected']);
let nodeDataArray: Ref<any> = ref(null);

const linkDataArray = [
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 0, to: 1 },
  { from: 1, to: 101 },
  { from: 2, to: 102 },
  { from: 3, to: 103 },
];

onMounted(async () => {
  appStatusStore.showLoading();
  const res = await infraService.getDiagramList();
  console.log(res.data.data);

  if (res.status === 200) {
    nodeDataArray.value = res.data.data;
  } else {
    console.log('?');
  }

  myDiagram = gojs(go.Diagram, 'diagramDiv', {
    initialDocumentSpot: go.Spot.Top,
    initialViewportSpot: go.Spot.Top,
    initialAutoScale: go.Diagram.Uniform,
    padding: isMobile.value ? pt180 : pt100,
    'commandHandler.archetypeGroupData': {
      text: 'Group',
      isGroup: true,
      color: 'blue',
    },
    'undoManager.isEnabled': true,
    maxSelectionCount: 1,
    'panningTool.isEnabled': false,
    'draggingTool.isEnabled': false,
    // BackgroundSingleClicked: (e) => {
    //     resetClick('BackgroundSingleClicked');
    // },
    layout: gojs(go.TreeLayout, {
      isOngoing: false,
      treeStyle: go.TreeLayout.StyleLastParents,
      layerSpacing: 80,
      alternateAngle: 0,
      alternateAlignment: go.TreeLayout.AlignmentStart,
      alternateNodeIndent: 15,
      alternateNodeIndentPastParent: 1,
      alternateNodeSpacing: 15,
      alternateLayerSpacing: 50,
      alternateLayerSpacingParentOverlap: 1,
      alternatePortSpot: new go.Spot(0.001, 1, 20, 0),
      alternateChildPortSpot: go.Spot.Left,
    }),
  });

  myDiagram.toolManager.dragSelectingTool.box = gojs(
    go.Part,
    { layerName: 'Tool', selectable: false },
    gojs(go.Shape, {
      name: 'SHAPE',
      fill: null,
      stroke: 'red',
      strokeWidth: 0,
    }),
  );

  myDiagram.nodeTemplate = gojs(
    go.Node,
    'Auto',
    {
      locationSpot: go.Spot.Top,
      isShadowed: true,
      shadowBlur: 1,
      shadowOffset: new go.Point(0, 1),
      shadowColor: 'rgba(0, 0, 0, .14)',
      click: (e, node: any) => {
        emit('nodeSelected', node.data);
      },
      selectionAdornmentTemplate: gojs(
        go.Adornment,
        'Auto',
        gojs(
          go.Shape,
          'RoundedRectangle',
          roundedRectangleParams,
          { fill: null, stroke: '#ffb700', strokeWidth: 3 }, //테두리
        ),
        gojs(go.Placeholder),
      ),
    },

    gojs(
      go.Shape,
      'RoundedRectangle',
      roundedRectangleParams,
      { name: 'SHAPE', fill: '#ffffff', strokeWidth: 0 },
      new go.Binding('fill', 'isHighlighted', (h) =>
        h ? 'red' : '#1E1E1E',
      ).ofObject(), //노드
    ),
    gojs(
      go.Panel,
      'Vertical',

      gojs(
        go.Panel,
        'Horizontal',
        { margin: 15 },
        gojs(
          go.Picture,
          { margin: mr8, visible: true, desiredSize: new go.Size(50, 50) },
          new go.Binding('source', 'icon', iconConverter),
          new go.Binding('visible', 'icon', (icon) => icon !== undefined),
        ),
        gojs(
          go.Panel,
          'Table',
          gojs(
            go.TextBlock,
            {
              row: 0,
              alignment: go.Spot.Left,
              margin: mb8,
              font: '15px NanumGothic, sans-serif',
              stroke: '#EEEEEE',
              maxSize: new go.Size(160, NaN),
            },
            new go.Binding('text', 'name'),
          ),
          gojs(
            go.TextBlock,
            textStyle('description'),
            {
              row: 1,
              alignment: go.Spot.Left,
              maxSize: new go.Size(160, NaN),
              font: '13px NanumGothic, sans-serif',
              stroke: '#BDBDBD',
            },
            new go.Binding('text', 'description'),
          ),
        ),
      ),
      gojs(go.Panel, 'Vertical', {
        name: 'info',
        stretch: go.GraphObject.Horizontal,
        defaultAlignment: go.Spot.Left,
      }),
    ),
  );

  myDiagram.linkTemplate = gojs(
    go.Link,
    go.Link.Orthogonal,
    { corner: 5, selectable: false },
    gojs(go.Shape, {
      strokeWidth: 2,
      stroke: 'darkgrey',
      click: (e: any, node: any) => {
        emit('linkSelected', node.data);
      },
      //           click: (e, node: any) => {
      //   $emit('nodeSelected', node.data);
      // },
    }),
  );

  myDiagram.groupTemplate = gojs(
    go.Group,
    'Vertical',
    {
      selectionObjectName: 'PANEL', // selection handle goes around shape, not label
      ungroupable: false, // Ctrl-Shift-G 를 누르면 그룹 해제 가능,
      click: (e, groupNode: any) => {
        const node = nodeDataArray.value.find(
          (f: any) => f.name === groupNode.data.name && !f.isGroup,
        );

        emit('groupSelected', node);
      },
      selectionAdornmentTemplate: gojs(
        go.Adornment,
        'Auto',
        gojs(
          go.Shape,
          'RoundedRectangle',
          roundedRectangleParams,
          { fill: null, stroke: '#ffb700', strokeWidth: 3 }, //테두리
        ),
        gojs(go.Placeholder),
      ),
    },
    gojs(
      go.Panel,
      'Auto',
      { name: 'PANEL' },
      gojs(
        go.Shape,
        'Rectangle', //그룹을 감싼 네모
        {
          fill: 'rgba(128,128,128,0.2)',
          stroke: 'gray',
          strokeWidth: 3,
          portId: '',
          cursor: 'pointer', // the Shape is the port, not the whole Node
          fromLinkable: true,
          fromLinkableSelfNode: true,
          fromLinkableDuplicates: true,
          toLinkable: true,
          toLinkableSelfNode: true,
          toLinkableDuplicates: true,
        },
      ),
      gojs(go.Placeholder, { margin: 10, background: 'transparent' }), // represents where the members are
    ),
  );

  myDiagram.model = gojs(go.GraphLinksModel, {
    nodeDataArray: toRaw(nodeDataArray.value),
    linkDataArray: linkDataArray,
  });

  // Overview
  if (!isMobile.value) {
    myOverview.value = gojs(go.Overview, 'miniMap', {
      observed: myDiagram,
      contentAlignment: go.Spot.Center,
    });
    myOverview.value.box.elt(0).stroke = '#ffb700';
  }
  appStatusStore.hideLoading();
  console.log('myDiagram', myDiagram);
});

const textStyle = (field: any) => {
  // description
  return [
    {
      font: '14px NanumGothic, sans-serif',
      stroke: 'rgba(0, 0, 0, .60)',
      visible: true,
    },
  ];
};

const iconConverter = (icon: any) => {
  return 'src/assets/diagram/' + icon + '.png';
};
</script>

<style lang="scss" scoped>
.miniMap {
  position: absolute;
  width: 150px;
  height: 100px;
  top: 10px;
  left: 10px;
  background-color: #333333;
  z-index: 2;
  border: solid 1px rgb(255, 184, 0, 0.2);

  &.is-mobile {
    width: unset;
    height: unset;
    border: 0px;
  }
}

#diagramDiv {
  aspect-ratio: auto 1/1.4; //이거 바꿔야함
  // aspect-ratio: auto 1/1; //이거 바꿔야함
  max-width: 900px;
  background-color: #333333;
  border: solid 1px black;
  width: 100%;
}

.blinking {
  -webkit-animation: blink 0.5s ease-in-out infinite alternate;
  -moz-animation: blink 0.5s ease-in-out infinite alternate;
  animation: blink 0.5s ease-in-out infinite alternate;
}

@-webkit-keyframes blink {
  0% {
    box-shadow: 0 0 15px rgb(255, 184, 0);
  }

  100% {
    box-shadow: none;
  }
}

@-moz-keyframes blink {
  0% {
    box-shadow: 0 0 5px rgb(255, 184, 0);
  }

  100% {
    box-shadow: none;
  }
}

@keyframes blink {
  0% {
    box-shadow: 0 0 5px rgb(255, 184, 0);
  }

  100% {
    box-shadow: none;
  }
}
</style>
