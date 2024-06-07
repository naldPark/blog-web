import HttpClient from './HttpClient';
import Config from '@/config';

const infraService = {
  dafaultAPI: `${Config.backend}`,

  getDiagramList() {
    return HttpClient.get(`${this.dafaultAPI}/infra/diagramList`);
  },
  getClusterInfo() {
    return HttpClient.get(`${this.dafaultAPI}/infra/clusterInfo`);
  },
  getSandboxAccessPoint() {
    return HttpClient.get(`${this.dafaultAPI}/infra/sandboxAccessPoint`);
  },
};

export default infraService;
