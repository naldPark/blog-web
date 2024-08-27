import {
  useMutation,
  UseMutationOptions,
  UseMutationReturnType,
} from 'vue-query';
import { ApiResponse, ApiResult } from '@/types/axios';

const useCustomMutation = <
  TData,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => Promise<ApiResult<TData>>,
  options?: UseMutationOptions<
    ApiResponse<TData>,
    TError,
    TVariables,
    TContext
  >,
): UseMutationReturnType<ApiResponse<TData>, TError, TVariables, TContext> => {
  return useMutation<ApiResponse<TData>, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const result = await mutationFn(variables);
      // 성공 응답으로 타입 캐스팅
      return result as ApiResponse<TData>;
    },
    ...options,
  });
};

export default useCustomMutation;
