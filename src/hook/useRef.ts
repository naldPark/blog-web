import { ref, Ref, UnwrapRef } from 'vue';

// Custom ref function that abstracts .value
export function useRef<T>(initialValue: T): {
  value: T;
  set: (value: T) => void;
  toggle?: () => void;
} {
  // Create a ref with the initial value
  const innerRef: Ref<UnwrapRef<T>> = ref(initialValue);

  // Method to toggle the value if it's a boolean
  const toggle = () => {
    if (typeof innerRef.value === 'boolean') {
      innerRef.value = !innerRef.value as UnwrapRef<T>;
    } else {
      console.warn('Toggle method only works for boolean values');
    }
  };

  // Return an object that abstracts the ref's .value
  return {
    get value() {
      return innerRef.value as T;
    },
    set value(val: T) {
      innerRef.value = val as UnwrapRef<T>;
    },
    set: (value: T) => {
      innerRef.value = value as UnwrapRef<T>;
    },
    toggle,
  };
}
