// src/store/index.ts
import { defineStore } from 'pinia';
import { useAppCommonStore } from './appCommonStore';
import { useLanguageStore } from './languageStore';
import { useUserStore } from './userStore';

// 스토어를 내보냅니다.
// export { useAppCommonStore, useLanguageStore, useUserStore };

// 다른 스토어를 정의하고 추가할 수도 있습니다.
// 예를 들어, 다른 스토어를 추가하고 싶다면 아래와 같이 정의할 수 있습니다:
export const useAnotherStore = defineStore('anotherStore', {
  state: () => ({
    // 초기 상태 변수 정의
  }),
  actions: {
    // 상태를 변경하는 액션 정의
  },
  getters: {
    // 계산된 속성 정의
  },
});
