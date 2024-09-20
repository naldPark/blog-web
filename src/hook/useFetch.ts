import { useAppCommonStore } from '@/store/appCommonStore';
import { ref, Ref } from 'vue';

type FetchState<T> = {
  data: Ref<T | null>;
  isLoading: Ref<boolean>;
  fetchData: (apiMethod: () => Promise<T>) => Promise<void>;
};

export const useFetch = <T>(): FetchState<T> => {
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const { showToast } = useAppCommonStore();
  const fetchData = async (apiMethod: () => Promise<T>) => {
    isLoading.value = true;
    error.value = null;

    try {
      data.value = await apiMethod();
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'error';
      }
    } finally {
      isLoading.value = false;
      if (error.value) showToast({ type: 'error', message: error.value });
    }
  };

  return {
    data,
    isLoading,
    fetchData,
  };
};
