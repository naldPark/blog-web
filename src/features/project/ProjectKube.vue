<script lang="ts" setup>
import { ref } from 'vue';
import infraService from '@/api/infraService';
import useCustomQuery from '@/hook/useCustomQuery';
import { COMMON_QUERY_KEY } from '@/types/queryEnum';
import { ApiResponse } from '@/types/axios';

interface NodeInfo {
  name: string;
  cpu: string;
  memory: string;
  os: string;
  condition: string;
  createdDt: string;
  roles: string;
}

interface PodInfo {
  name: string;
  age: string;
  labels: string;
  namespace: string;
  nodeName: string;
  runningTime: string;
  status: string;
  containers: number;
}

const nodesHeader = [
  { title: 'Name', value: 'name' },
  { title: 'CPU', value: 'cpu' },
  { title: 'Memory', value: 'memory' },
  { title: 'Os', value: 'os' },
  { title: 'Roles', value: 'roles' },
  { title: 'Condition', value: 'condition' },
  { title: 'createdDt', value: 'createdDt' },
];
const nodeInfo = ref<NodeInfo[]>([]);
const podsHeader = [
  { title: 'Name', value: 'name' },
  { title: 'Namespace', value: 'namespace', width: 140 },
  { title: 'Containers', value: 'containers', width: 120 },
  { title: 'Node', value: 'nodeName', width: 90 },
  { title: 'Age', value: 'runningTime', width: 90 },
  { title: 'Status', value: 'status', width: 120 },
];
const podInfo = ref<PodInfo[]>([]);

const getColor = (text: string) => {
  switch (text) {
    case 'Ready':
    case 'Running':
    case 'Succeeded':
      return '#49c54e';
    case 'Pending':
    case 'NotReady':
      return 'orange';
    case 'Failed':
      return 'red';
    default:
      return 'grey';
  }
};

/** k8sInfo Query */
const { hardFetch: k8sRefetch } = useCustomQuery({
  queryKey: [COMMON_QUERY_KEY.K8S_LIST],
  queryFn: () => infraService.getClusterInfo(),
  onSuccess: (res: ApiResponse) => {
    const result = res.data;
    nodeInfo.value = result.nodeResult.map((v: any) => ({
      name: v.name,
      cpu: v.percentCpu,
      memory: v.percentMemory,
      os: v.labels['beta.kubernetes.io/os'],
      condition: v.condition,
      createdDt: v.createdDt.substr(0, 10),
      roles: Object.keys(v.labels)
        .filter((v) => v.startsWith('node-role.kubernetes.io'))[0]
        .replace('node-role.kubernetes.io/', ''),
    }));
    podInfo.value = result.podResult;
  },
});
</script>

<template>
  <div style="background-color: #121212">
    <div class="k8s-wrapper">
      <h1 class="font-weight-bold text-h4">
        Cluster Information
        <VIcon class="text-primary ml-3" icon="mdi-lan-connect" />
      </h1>
    </div>
    <div class="text-md-left pa-7">
      <h2 class="text-primary mb-3">NODES</h2>
      <VDataTable
        :calculate-widths="true"
        fixed-header
        class="custom-table use-head"
        :headers="nodesHeader"
        :items="nodeInfo"
        hide-default-footer
      >
        <template v-slot:[`item.cpu`]="{ item }">
          <div>
            <span>{{ item.cpu }}</span>
            <VProgressLinear color="blue" :model-value="item.cpu" />
          </div>
        </template>
        <template v-slot:[`item.memory`]="{ item }">
          <div>
            <span>{{ item.memory }}</span>
            <VProgressLinear color="purple" :model-value="item.memory" />
          </div>
        </template>
        <template v-slot:[`item.condition`]="{ item }">
          <div :style="{ color: getColor(item.condition) }">
            {{ item.condition }}
          </div>
        </template>
      </VDataTable>
      <VDivider class="mt-5 mb-5" />
      <h2 class="text-primary mb-3">PODS</h2>
      <VDataTable
        fixed-header
        class="custom-table text-truncate"
        :headers="podsHeader"
        :items="podInfo"
      >
        <template v-slot:[`item.name`]="{ item }">
          <div class="text-truncate ellipsis" style="max-width: 30vw">
            {{ item.name }}
          </div>
        </template>
        <template v-slot:[`item.containers`]="{ item }">
          <div style="color: #49c54e">
            {{ '&#9632;'.repeat(item.containers) }}
          </div>
        </template>
        <template v-slot:[`item.runningTime`]="{ item }">
          <div>{{ item.age }}</div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <div :style="{ color: getColor(item.status) }">{{ item.status }}</div>
        </template>
      </VDataTable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.k8s-wrapper {
  background-image: url('../../assets/images/k8sCover.png');
  background-size: cover;
  min-height: 300px;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
