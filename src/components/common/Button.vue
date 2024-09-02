<script lang="ts" setup>
import { computed, PropType } from 'vue';

/** Props정의 */
const { shape, href } = defineProps({
  color: { type: String, default: 'primary', required: false },
  href: { type: String, required: false },
  variant: {
    type: String as PropType<
      'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
    >,
    default: 'tonal',
    required: false,
  },
  label: { type: String, required: false },
  size: { type: String, required: false },
  icon: { type: String, required: false },
  shape: { type: String, default: 'rounded', required: false },
});

/** computed로 기본 placeholder 값 설정 */
const computedRounded = computed(() => {
  if (!shape || shape == 'rounded') return 'xl';
  return 0;
});
</script>

<template>
  <!-- 최상단에 baseComponent가 오는 경우 props필요없음 -->
  <VBtn
    :rounded="computedRounded"
    :color="color"
    :href="href"
    :size="size"
    :icon="icon"
    :variant="variant"
    :target="href != undefined ? '_blank' : undefined"
    @click="$emit('onClick')"
    class="app-g-button line-button size-xsmall"
  >
    <slot name="text" v-if="label">{{ label }}</slot>
    <VIcon v-if="icon" :icon="icon" />
  </VBtn>
</template>

<style lang="scss" scoped></style>
