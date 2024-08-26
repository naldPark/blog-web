import { Ref, ref, onMounted, onUnmounted, watch } from 'vue';

type EffectCallback = () => void;
type Dependencies = Ref<any>[];

export const useEffect = (callback: EffectCallback, deps: Dependencies) => {
  const hasChanged = ref(true);

  const runEffect = () => {
    if (hasChanged.value) {
      callback();
      hasChanged.value = false;
    }
  };

  onMounted(() => {
    runEffect();
  });

  watch(
    deps,
    (newDeps, oldDeps) => {
      const hasAnyChanged = newDeps.some(
        (dep, index) => dep !== oldDeps[index],
      );
      if (hasAnyChanged) {
        hasChanged.value = true;
        runEffect();
      }
    },
    { deep: true, immediate: true },
  );

  onUnmounted(() => {
    hasChanged.value = false;
  });
};
