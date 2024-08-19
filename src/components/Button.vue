<template>
  <VBtn
    :color="color"
    @click="$emit('onClick')"
    class="app-g-button line-button size-xsmall"
  >
    <slot name="icon"> </slot>
    <template v-if="label">
      <slot name="text">{{ label }}</slot>
    </template>
    <slot></slot>
  </VBtn>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue';
  defineProps({
    color: { type: String, default: 'red', required: false },
    label: { type: String, required: false },
  });

  // const slots = defineSlots<{
  //   default(props: { msg: string }): any,
  //   text: string,
  //   icon: string,
  // }>()

  // onMounted(() => {
  //   console.log('slots,', slots.text)
  //   console.log('slots,', slots.icon)
  //   // console.log('color', color)
  // })

  // watch([requiredAtry, userAtry], ([newRequiredAtry, newUserAtry], [oldRequiredAtry, oldUserAtry]) => {
  //   checkAtry(newRequiredAtry, newUserAtry);
  // }, {
  //   immediate: true // 컴포넌트가 처음 렌더링될 때도 호출되도록 설정
  // });

  // watchEffect를 사용하여 데이터의 변화를 감시
  // watchEffect(() => {
  //   checkAtry(requiredAtry.value, userAtry.value);
  // });
</script>

<style lang="scss" scoped></style>
