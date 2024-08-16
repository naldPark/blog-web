export interface ApiResponse<T = any> {
  status_code: number;
  data: T;
}

export interface ApiErrorResponse {
  error_message: string;
  error_i18n: string;
  status_code: number;
  error_code: number;
  success: boolean;
}
