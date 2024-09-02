import { get } from './axiosMethod';
import Config from '@/config';

const infraService = {
  dafaultAPI: `${Config.backend}`,

  getDiagramList() {
    return get(`${this.dafaultAPI}/infra/diagram/list`);
  },
  getClusterInfo() {
    return get(`${this.dafaultAPI}/infra/clusterInfo`);
  },
  getSandboxAccessPoint() {
    return get(`${this.dafaultAPI}/infra/sandboxAccessPoint`);
  },
};

export default infraService;
