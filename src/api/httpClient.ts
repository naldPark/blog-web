import Axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useUserStore } from '@/store/userStore';
import { useAppCommonStore } from '@/store/appCommonStore';
import Config from '@/config';
import { ApiErrorResponse } from '@/types/axios';

const createHttpClient = (): AxiosInstance => {
  const axiosInstance: AxiosInstance = Axios.create({
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    } as unknown as AxiosHeaders, // 여기서 unknown으로 변환 후 AxiosHeaders로 변환
    timeout: 300000, // 5 minutes timeout
  });

  // Request interceptor handler
  const requestInterceptorHandler = async (
    request: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const { authToken } = useUserStore();
    if (!request.headers) {
      request.headers = {} as AxiosHeaders;
    }
    if (!request.headers[Config.AUTH_TOKEN_HEADER_KEY]) {
      if (authToken) {
        request.headers[Config.AUTH_TOKEN_HEADER_KEY] = `${authToken}`;
      }
      request.headers['requestPath'] = location.pathname;
    }
    return request;
  };

  const responseInterceptorHandler = async (
    response: AxiosResponse,
  ): Promise<AxiosResponse> => {
    return response;
  };

  const errorResponseInterceptorHandler = async (
    error: AxiosError,
  ): Promise<never> => {
    const appStatusStore = useAppCommonStore();

    if (error.response && error.response.data) {
      const errorData = error.response.data as ApiErrorResponse;

      if (errorData.status_code === 401) {
        const userStore = useUserStore();
        appStatusStore.showToast({
          type: 'error',
          message: errorData.error_i18n,
        });
        userStore.resetAccountInfo();
        if (location.pathname !== '/' && location.pathname !== '/main') {
          location.href = `${location.origin}`;
        }
      }
    }
    appStatusStore.hideLoading();

    throw error;
  };

  /** request interceptor 사용 */
  axiosInstance.interceptors.request.use(
    requestInterceptorHandler as unknown as (
      request: InternalAxiosRequestConfig,
    ) => Promise<InternalAxiosRequestConfig>,
  );

  /** response interceptor 사용 */
  axiosInstance.interceptors.response.use(
    responseInterceptorHandler,
    errorResponseInterceptorHandler,
  );

  return axiosInstance;
};

/** 싱클톤 패턴 httpClient */
const httpClient = createHttpClient();

export default httpClient;
