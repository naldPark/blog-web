/** API 응답 성공 타입 */
export interface ApiResponse<T = any> {
  status_code: number;
  data: T;
  success: boolean;
}

/** API 응답 에러 타입 */
export interface ApiErrorResponse {
  error_message: string;
  error_i18n: string;
  status_code: number;
  error_code: number;
  success: boolean;
}

/** API 응답 유니온 타입 */
export type ApiResult<T = any> = ApiResponse<T> | ApiErrorResponse;
