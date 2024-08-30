import { ref } from 'vue';
import { useQuery } from 'vue-query';
import { ApiResponse, ApiErrorResponse } from '@/types/axios';
import { useAppCommonStore } from '@/store/appCommonStore';

interface QueryData {
  queryKey: string | string[];
  queryFn: () => void;
  onSuccess: (res: ApiResponse) => void;
}

const useCustomQuery = ({
  queryKey: customQueryKey,
  queryFn: customQueryFn,
  onSuccess: customSuccess,
}: QueryData) => {
  const { showLoading, hideLoading, showTransErrorToast } = useAppCommonStore();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: customQueryKey,
    queryFn: () => {
      /** 호출 시 로딩 시작 */
      showLoading();
      return customQueryFn();
    },
    onSuccess: (res: ApiResponse) => {
      customSuccess(res);
    },
    onError: (error: ApiErrorResponse) => {
      showTransErrorToast({
        type: 'error',
        message: isApiErrorResponse(error) ? error.error_i18n : 'error_unknown',
      });
    },
    onSettled: (...args) => {
      hideLoading();
    },
  });

  /** 타입 가드 && narrowing */
  const isApiErrorResponse = (error: any): error is ApiErrorResponse =>
    typeof error.error_i18n === 'string';

  /** refetch가 fn 타입으로 선언이 안되어서 임시 조치 */
  const customRefetch = () => refetch;

  return {
    data: ref(data),
    isLoading: ref(isLoading),
    isError: ref(isError),
    refetch: customRefetch,
  };
};

export default useCustomQuery;
