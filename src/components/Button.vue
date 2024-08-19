<template>
  <VBtn :color="color" class="app-g-button line-button size-xsmall">
    <slot name="icon">
    </slot>
    <template v-if="$slots.text">
      <slot name="text"></slot>
    </template>
    <slot></slot>
  </VBtn>
</template>


<script lang="ts" setup>
defineProps({
  color: { type: String, default: 'red', required: false },
})
</script>

<style lang="scss" scoped></style>
