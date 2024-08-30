<script lang="ts" setup>
import { useRef } from '@/hook/useRef';
import { ValidationRule } from '@/types/common';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

/** 다국어 사용  */
const { t } = useI18n();

/** Props정의 required 기본값: true*/
interface Props {
  items: any;
  label?: string;
  placeholder?: string;
}
const props = defineProps<Props>();

const model = defineModel();

const { items, label, placeholder } = props;

/** computed로 기본 placeholder 값 설정 */
const computedPlaceholder = computed(
  () => placeholder || t('defaultSelectPlaceHolder'),
);
</script>

<template>
  <VSelect
    :items="items"
    :placeholder="computedPlaceholder"
    v-model="model"
    :label="label"
  />
</template>

<style lang="scss" scoped></style>
