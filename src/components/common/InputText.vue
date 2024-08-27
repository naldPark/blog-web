<script lang="ts" setup>
import { useRef } from '@/hook/useRef';
import { ValidationRule } from '@/types/common';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

/** 다국어 사용  */
const { t } = useI18n();

/** Props정의 required 기본값: true*/
interface Props {
  color?: string;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  rules?: ValidationRule[];
  icon?: string;
  passwordIcon?: boolean;
}
const emit = defineEmits<{
  (e: 'enter'): void;
  (e: 'onClick'): void;
}>();
const props = defineProps<Props>();

const {
  color = 'primary',
  label,
  required = false,
  type,
  placeholder,
  rules = [],
  icon,
  passwordIcon,
} = props;

/** 비밀번호 가시성 ref */
const passwordVisible = ref(false);

/** computed로 기본 placeholder 값 설정 */
const computedPlaceholder = computed(
  () => placeholder || t('defaultPlaceHolder'),
);

/** InputText 내부 아이콘 */
const computedIcon = computed(() => {
  if (icon) return icon;
  if (passwordIcon) return passwordVisible.value ? 'mdi-eye-off' : 'mdi-eye';
  return '';
});

/** 비밀번호인 경우에 보기 or 암호화 */
const togglePasswordVisibility = () => {
  if (passwordIcon) {
    passwordVisible.value = !passwordVisible.value;
  }
};
</script>

<template>
  <VTextField
    flat
    :required="required"
    :rules="rules"
    :color="color"
    :placeholder="computedPlaceholder"
    :label="label"
    :type="passwordVisible ? 'text' : type"
    :append-inner-icon="computedIcon"
    @keyup.enter="$emit('enter')"
    @click:append-inner="togglePasswordVisibility"
    @click="$emit('onClick')"
  />
</template>

<style lang="scss" scoped></style>
