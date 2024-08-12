export interface ApiResponse<T = any> {
  status_code: number;
  data: T;
}

export interface ApiErrorResponse {
  error_message: string;
  code: string;
  http_status_code: number;
  error_code: number;
  error: true;
}
