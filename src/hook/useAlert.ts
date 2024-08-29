import { ref } from 'vue';

const useAlert = () => {
  const alertIsVisible = ref(false);
  const showAlert = () => {
    alertIsVisible.value = true;
  };
  const hideAlert = () => {
    alertIsVisible.value = false;
  };
  return { alertIsVisible, showAlert, hideAlert };
};

export default useAlert;
