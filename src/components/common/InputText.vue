<script lang="ts" setup>
import { ValidationRule } from '@/types/common';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { VTextField } from 'vuetify/lib/components/index.mjs';

/** 다국어 사용  */
const { t } = useI18n();

/** Props정의 required 기본값: true*/
interface Props {
  color?: string;
  counter?: number;
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
  counter,
  placeholder,
  rules = [],
  icon,
  passwordIcon,
} = props;

/**<MyComponent v-model.capitalize="myText" />
 * 부모 컴포넌트에서 v-model뒤에 변수를 붙이면 modifier에서 확인 할 수 있음
 * 
 * const [model, modifiers] = defineModel()
 * console.log(modifiers) // { capitalize: true }
 * 그 modifiers를 토대로 v-model을 가공하는 것이 가능
 *   set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
 */

const [model, modifiers] = defineModel({
  type: String,
  set(value) {
    const modelLength = value.length;
    if (counter && modelLength >= counter) {
      return value.slice(0, 100);
    } else {
      return value;
    }
  },
});

/** 비밀번호 가시성 ref */
const passwordVisible = ref(false);

/**ref: 데이터의 상태를 저장하고 반응형으로 만들어주는 데 사용
computed: 다른 반응형 데이터에 의존하여 자동으로 계산된 값을 제공 */

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
    v-model="model"
    flat
    :required="required"
    :counter="counter"
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
