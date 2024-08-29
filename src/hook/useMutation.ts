import {
  useMutation as originUseMutation,
  UseMutationOptions,
} from 'vue-query';
import { ApiErrorResponse, CustomMutationReturnType } from '@/types/axios';
import { computed } from 'vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { useI18n } from 'vue-i18n';

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
  const { t } = useI18n();
  const { mutate, isLoading, isError, data } = originUseMutation({
    ...options,
    mutationFn: async (variables: TVariables) => {
      /** 호출 시 로딩 시작 */
      showLoading();
      return await options.mutationFn!(variables);
    },
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    onError: (error: TError, variables, context) => {
      if (options.onError) options.onError(error, variables, context);
      showErrorToast(error);
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

  /**  ApiErrorResponse타입인 경우 정의된 에러 메세지 반환 */
  const showErrorToast = (error: unknown) => {
    const message = isApiErrorResponse(error)
      ? t(`error_code.${error.error_i18n}`)
      : t('unknown_error');
    appStatusStore.showToast({
      type: 'error',
      message: message,
    });
  };

  /** 타입 가드 && narrowing */
  const isApiErrorResponse = (error: any): error is ApiErrorResponse =>
    typeof error.error_i18n === 'string';

  // 필요한 상태 반환
  return {
    mutate: mutate,
    loading,
    error: isError,
    data: data,
  };
};

export default useCustomMutation;
