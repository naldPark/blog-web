<script lang="ts" setup>
import { useRef } from '@/hook/useRef';
import { ValidationRule } from '@/types/common';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

/** 다국어 사용  */
const { t } = useI18n();

/** Props정의 required 기본값: true*/
const props = defineProps<{
  modelValue: any;
  items: any[];
  itemValue: string;
  itemTitle: string;
  placeholder?: string;
  label: string;
}>();

// Emits 정의
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

// Computed property로 modelValue를 v-select와 연결
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const { items, label, placeholder } = props;

/** computed로 기본 placeholder 값 설정 */
const computedPlaceholder = computed(
  () => placeholder || t('defaultSelectPlaceHolder'),
);
</script>

<template>
  <VSelect
    v-model="modelValue"
    :items="items"
    :item-value="itemValue"
    :item-title="itemTitle"
    :label="label"
    :placeholder="computedPlaceholder"
  />
</template>

<style lang="scss" scoped></style>
