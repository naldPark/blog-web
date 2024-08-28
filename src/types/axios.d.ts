/** API 응답 성공 타입 */
export interface ApiResponse<T = any> {
  status_code: number;
  data?: T;
  success: boolean;
}

/** API 응답 에러 타입 */
export interface ApiErrorResponse extends ApiResponse {
  error_message: string;
  error_i18n: string;
  error_code: number;
}

/** API 응답 유니온 타입 */
export type ApiResult<T = any> = ApiResponse<T> | ApiErrorResponse;

/** useMutation 공통 타입 반환 정의 */
export type CustomMutationReturnType<TData, TError, TVariables, TContext> = {
  mutate: UseMutationReturnType<
    ApiResponse<TData>,
    TError,
    TVariables,
    TContext
  >['mutate'];
  loading: ReturnType<typeof computed>;
  error: UseMutationReturnType<
    ApiErrorResponse<TData>,
    TError,
    TVariables,
    TContext
  >['error'];
  data: UseMutationReturnType<
    ApiResponse<TData>,
    TError,
    TVariables,
    TContext
  >['data'];
};
