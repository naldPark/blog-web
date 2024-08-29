// useFetch.ts
import { ref, Ref } from 'vue';

type FetchState<T> = {
  data: Ref<T | null>;
  error: Ref<string | null>;
  isLoading: Ref<boolean>;
};

export const useFetch = <T>(url: string): FetchState<T> => {
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<string | null>(null);
  const isLoading = ref(true);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      data.value = (await response.json()) as T;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'An unknown error occurred';
      }
    } finally {
      isLoading.value = false;
    }
  };

  fetchData();

  return {
    data,
    error,
    isLoading,
  };
};
