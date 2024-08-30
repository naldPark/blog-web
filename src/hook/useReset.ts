// 기본 타입 정의
type Primitive = number | string | boolean | null;

// 재귀적으로 초기화 타입 정의
type InitializeType<T> = T extends any[]
  ? []
  : T extends Record<string, any>
    ? { [K in keyof T]: InitializeType<T[K]> }
    : Primitive;

// 초기화 값 매핑
const defaultValues: Record<string, any> = {
  number: 0,
  string: '',
  boolean: false,
  object: null,
  array: [] as any[],
};

// 객체 초기화 함수
const initializeObject = <T>(
  item: Record<string, any>,
  recursive: boolean,
): InitializeType<T> => {
  const initValue: Record<string, any> = {};

  for (const [key, value] of Object.entries(item)) {
    if (recursive && typeof value === 'object' && value !== null) {
      initValue[key] = initialize(value, recursive);
    } else {
      const type = Array.isArray(value) ? 'array' : typeof value;
      initValue[key] =
        defaultValues[type] !== undefined
          ? type === 'array'
            ? ([] as InitializeType<T>)
            : defaultValues[type]
          : null;
    }
  }

  return initValue as InitializeType<T>;
};

// 초기화 함수
const initialize = <T>(
  item: T,
  recursive: boolean = true,
): InitializeType<T> => {
  if (Array.isArray(item)) {
    return [] as InitializeType<T>;
  }

  if (item !== null && typeof item === 'object') {
    return initializeObject(item, recursive);
  }

  // 원시 타입의 경우 그대로 반환
  return item as InitializeType<T>;
};

const useReset = () => {
  return {
    initialize,
  };
};

export default useReset;
