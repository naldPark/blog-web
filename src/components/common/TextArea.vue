<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: String,
  rules: {
    type: Array,
    default: () => [],
  },
  label: String,
  placeholder: String,
});

const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <VTextarea
    v-model="modelValue"
    :rules="rules"
    auto-grow
    flat
    solo
    :label="label"
    :placeholder="placeholder"
  ></VTextarea>
</template>
