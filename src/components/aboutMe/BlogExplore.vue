<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getBlogList } from '@/api/commonService';
import { useI18n } from 'vue-i18n';
/** 타입만 가져올때는 import type 이라고 명시
 *  이렇게 하면 런타임은 차이가 없지만 컴파일시 불필요한 코드 번들링을 하지 않음
 */
import type { BlogData } from '@/types/about';
import { ApiErrorResponse, ApiResponse, ApiResult } from '@/types/axios';
import { useQuery } from 'vue-query';
import { COMMON_QUERY_KEY } from '@/types/queryEnum';
import { isEmpty } from 'ramda';
import useCustomQuery from '@/hook/useCustomQuery';

const cardList = ref<BlogData[]>([]);

/** useQuery는 마운팅 전에 실행 됨 */
// const {
//   // isError: hasError,
//   // data: blogList,
//   // isLoading,
//   // refetch,
//   // error,
// } = useQuery({
//   /**쿼리 키 - 고유성 보장 */
//   queryKey: [COMMON_QUERY_KEY.BADGE_LIST],
//   queryFn: () => getBlogList(),
//   /** 데이터를 패칭하는 동안 이전 데이터는 유지, default : false */
//   keepPreviousData: false,
//   staleTime: 5 * 60 * 1000, // 또는 Infinity
//   /** 해당 변수가 없을 때만 쿼리가 실행
//    * 반대로 해당변수가 존재할 때만 이라는 조건을 걸고 싶다면 !!cardList
//    */
//   enabled: isEmpty(cardList.value),
//   onError: (err: ApiErrorResponse) => {
//     console.log('error', err);
//   },
//   onSuccess: (res: ApiResponse) => {
//     cardList.value = res.data;
//   },
//   onSettled: () => {
//     /**성공 실패 여부 상관없이 실행되는 함수 */
//   },
// });

const { hardFetch: blogRefetch } = useCustomQuery({
  queryKey: [COMMON_QUERY_KEY.BLOG_LIST],
  queryFn: () => getBlogList(),
  onSuccess: (res: ApiResponse) => {
    cardList.value = res.data;
  },
});

const getImageUrl = (name: string) =>
  new URL(`/src/assets/images/${name}`, import.meta.url).href;

const onClickVisit = (url: string) => window.open(url, '_blank');
</script>

<template>
  <div class="text-md-left pa-7">
    <div class="blog-wrapper">
      <h2 class="text-primary mb-3">BLOG EXPLORE</h2>
      <VRow>
        <VCol v-for="(item, index) in cardList" :key="index" cols="12" md="4">
          <div
            class="blog-wrapper-box mx-auto pa-5"
            @click="onClickVisit(item.href)"
          >
            <div>
              <div class="text-overline mb-4">
                {{ item.title }} / {{ item.header }}
              </div>
              <h5>{{ item.text }}</h5>
            </div>
            <VImg
              width="200"
              height="80"
              contain
              class="mx-auto"
              :src="getImageUrl(item.src)"
            />
          </div>
        </VCol>
      </VRow>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-wrapper-box {
  border: 0;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.8);
  background-color: rgba(20, 20, 20, 0.3);
  border-radius: 24px;

  max-height: 400px;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
}
</style>
