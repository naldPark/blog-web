<template>
  <VDialog
    v-model="visible"
    :max-width="maxWidth ? maxWidth : '100%'"
    :max-height="maxHeight"
    :persistent="persistent"
    :scrollable="scrollable"
    :fullscreen="fullscreen"
    :eager="eager"
    :width="width"
    :height="height"
  >
    <template #default>
      <VCard rounded="lg">
        <VCardTitle class="fs-3 d-flex justify-space-between align-center">
          <div class="text-h6 text-medium-emphasis">
            <slot name="header">{{ title }}</slot>
          </div>
          <Button
            color="gray"
            icon="mdi-close"
            variant="text"
            size="xs"
            @click="closeDialog"
          />
        </VCardTitle>
        <VDivider class="mb-4" />
        <VCardText>
          <slot></slot>
        </VCardText>
        <VDivider class="mt-2" />
        <VCardActions class="ma-2 d-flex justify-end">
          <slot name="footer">
            <Button rounded="xl" :label="t('cancel')" @click="closeDialog" />
            <Button
              color="primary"
              :label="t('confirm')"
              variant="flat"
              @click="confirm"
            />
          </slot>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import Button from './Button.vue';
// Props 정의
const props = defineProps({
  maxWidth: {
    type: [String, Number],
    default: '600px',
  },
  maxHeight: {
    type: [String, Number],
    default: '80vh',
  },
  persistent: Boolean,
  scrollable: Boolean,
  fullscreen: Boolean,
  eager: Boolean,
  width: {
    type: [String, Number],
    default: 'auto',
  },
  height: {
    type: [String, Number],
    default: 'auto',
  },
  title: String,
});

// Emits 정의
const emit = defineEmits(['confirm']);

const { t } = useI18n();

// 필수 defineModel({ required: true })

// 기본값  defineModel({ default: 0 })

// 타입 설정 defineModel({ type: String })

// 로컬 변수로 설정하여 부모로부터 전달되지 않아도 사용. defineModel({ local: true })

// 첫 번째 매개변수에 이름, 두번째에 설정값 defineModel('model', { required: true })

const visible = defineModel('visible', {
  type: Boolean,
});

// Dialog 닫기 함수
const closeDialog = () => {
  visible.value = false;
  // emit('update:modelValue', false);
};

// Dialog 확인 함수
const confirm = () => {
  emit('confirm');
  closeDialog();
};
</script>

<style lang="scss" scoped></style>
