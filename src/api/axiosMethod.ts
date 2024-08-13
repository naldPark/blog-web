import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { ApiErrorResponse, ApiResponse } from '@/types/axios.type';
import httpClient from '@/api/httpClient';

/**
 * get
 * @param {string} url
 * @param {AxiosRequestConfig} config
 */
export const get = async <TData = any, TResponse = ApiResponse<TData>>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<TResponse> => {
  try {
    return ((await httpClient.get(url, config)) as AxiosResponse<TResponse>)
      .data;
  } catch (error) {
    const typeAssertedError = error as AxiosError<ApiErrorResponse>;
    throw typeAssertedError?.response?.data as ApiErrorResponse;
  }
};

/**
 * post
 * @param {string} url
 * @param {unknown} body
 * @param {AxiosRequestConfig} config
 */
export const post = async <TData = any, TResponse = ApiResponse<TData>>(
  url: string,
  body: unknown,
  config: AxiosRequestConfig = {},
): Promise<TResponse> => {
  try {
    return (
      (await httpClient.post(url, body, config)) as AxiosResponse<TResponse>
    ).data;
  } catch (error) {
    const typeAssertedError = error as AxiosError<ApiErrorResponse>;
    throw typeAssertedError?.response?.data as ApiErrorResponse;
  }
};

/**
 * put
 * @param {string} url
 * @param {unknown} data
 * @param {AxiosRequestConfig} config
 */
export const put = async <TData = any, TResponse = ApiResponse<TData>>(
  url: string,
  data: unknown,
  config: AxiosRequestConfig = {},
): Promise<TResponse> => {
  try {
    return (
      (await httpClient.put(url, data, config)) as AxiosResponse<TResponse>
    ).data;
  } catch (error) {
    const typeAssertedError = error as AxiosError<ApiErrorResponse>;
    throw typeAssertedError?.response?.data as ApiErrorResponse;
  }
};

/**
 * delete
 * @param {string} url
 * @param {AxiosRequestConfig} config
 */
export const del = async <TData = any, TResponse = ApiResponse<TData>>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<TResponse> => {
  try {
    return ((await httpClient.delete(url, config)) as AxiosResponse<TResponse>)
      .data;
  } catch (error) {
    const typeAssertedError = error as AxiosError<ApiErrorResponse>;
    throw typeAssertedError?.response?.data as ApiErrorResponse;
  }
};
