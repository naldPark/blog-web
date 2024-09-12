<script lang="ts" setup>
import { computed, PropType } from 'vue';

/** Props정의 */
const { href, rounded } = defineProps({
  color: { type: String, default: 'primary', required: false },
  href: { type: String, required: false },
  variant: {
    type: String as PropType<
      'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
    >,
    default: 'tonal',
    required: false,
  },
  appendIcon: { type: String, required: false },
  prependIcon: { type: String, required: false },
  label: { type: String, required: false },
  size: { type: String, required: false },
  icon: { type: String, required: false },
  rounded: { type: Boolean, default: true, required: false },
});

/** computed로 기본 placeholder 값 설정 */
const computedRounded = computed(() => {
  if (rounded) return 'xl';
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
    class="app-g-button line-button"
  >
    <VIcon v-if="prependIcon" :icon="prependIcon" class="mr-2" />
    <VIcon v-if="icon" :icon="icon" />
    <slot name="text" v-if="label">{{ label }}</slot>
    <VIcon v-if="appendIcon" :icon="appendIcon" class="ml-2" />
  </VBtn>
</template>

<style lang="scss" scoped></style>
