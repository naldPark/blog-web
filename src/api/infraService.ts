import { get } from './axiosMethod';
import Config from '@/config';

const infraService = {
  defaultAPI: `${Config.backend}`,

  getDiagramList() {
    return get(`${this.defaultAPI}/infra/diagram/list`);
  },
  getClusterInfo() {
    return get(`${this.defaultAPI}/infra/clusterInfo`);
  },
  getSandboxAccessPoint() {
    return get(`${this.defaultAPI}/infra/sandboxAccessPoint`);
  },
};

export default infraService;
