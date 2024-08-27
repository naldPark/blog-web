import { ref, Ref, UnwrapRef } from 'vue';

type UseState<T> = [Ref<UnwrapRef<T>>, (value: UnwrapRef<T>) => void];

export const useState = <T>(initialValue: T): UseState<T> => {
  const state = ref(initialValue);

  const setState = (value: UnwrapRef<T>) => {
    state.value = value;
  };

  return [state, setState];
};
