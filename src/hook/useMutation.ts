import {
  useMutation as originUseMutation,
  UseMutationOptions,
} from 'vue-query';
import { ApiErrorResponse, CustomMutationReturnType } from '@/types/axios';
import { computed } from 'vue';
import { useAppCommonStore } from '@/store';

const useCustomMutation = <
  TData = unknown,
  TError = ApiErrorResponse,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): CustomMutationReturnType<TData, TError, TVariables, TContext> => {
  const appStatusStore = useAppCommonStore(); // Pinia store 사용
  const { showLoading, hideLoading } = appStatusStore;
  const { mutate, isLoading, isError, data } = originUseMutation({
    ...options,
    mutationFn: async (variables: TVariables) => {
      /** 호출 시 로딩 시작 */
      showLoading();
      if (options.mutationFn) {
        const result = await options.mutationFn(variables);
        console.log('result', result);
        return result;
      } else {
        throw new Error('mutationFn is not defined');
      }
    },
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    onError: (...args) => {
      if (options.onError) options.onError(...args);
    },
    onSettled: (...args) => {
      /** 사용자가 onSettled를 설정할 경우에 먼저 실행 */
      if (options.onSettled) options.onSettled(...args);
      /** success, error상관없이 api 호출 종료 후 로딩 종료 */
      hideLoading();
    },
  });

  /** 로딩상태인지 확인 */
  const loading = computed(() => isLoading);

  // 필요한 상태 반환
  return {
    mutate: mutate,
    loading,
    error: isError,
    data: data,
  };
};

export default useCustomMutation;
