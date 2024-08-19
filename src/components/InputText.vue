<!-- ok -->
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  /** 다국어 사용  */
  const { t } = useI18n();

  /** Props정의 required 기본값: true*/
  const { type, passwordIcon, icon, placeholder } = defineProps({
    color: { type: String, default: 'primary', required: false },
    label: { type: String, required: false },
    required: { type: Boolean, required: false },
    type: { type: String, required: false },
    placeholder: {
      type: String,
      required: false,
    },
    icon: { type: String, required: false },
    passwordIcon: { type: Boolean, required: false },
  });

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
