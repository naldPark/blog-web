import { ref } from 'vue';
import { useQuery, useQueryClient, VueQueryPlugin } from 'vue-query';
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
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
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
      /** 호출 종료시 로딩 종료 */
      hideLoading();
    },
    /** 데이터가 stale 상태일 경우 재 연결 될 때 refetch를 실행하는 옵션 */
    refetchOnWindowFocus: false,
    enabled: true,
  });

  /* 캐시 삭제 후 refetch */
  const hardFetch = () => {
    queryClient.refetchQueries();
  };

  /** 타입 가드 && narrowing */
  const isApiErrorResponse = (error: any): error is ApiErrorResponse =>
    typeof error.error_i18n === 'string';

  return {
    data: ref(data),
    isLoading: ref(isLoading),
    isError: ref(isError),
    hardFetch,
  };
};

export default useCustomQuery;
