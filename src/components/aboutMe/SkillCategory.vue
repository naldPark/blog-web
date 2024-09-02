<script lang="ts" setup>
defineProps<{
  title: string;
  skills: Array<{
    name: string;
    icon: string;
    value: number;
  }>;
}>();
</script>

<template>
  <VListItem>
    <VListItemTitle>{{ title }}</VListItemTitle>
    <VListItemSubtitle v-for="skill in skills" :key="skill.name" class="pa-2">
      <p class="font-weight-regular text-h6">
        <VIcon class="text-secondary" :icon="skill.icon" />
        {{ skill.name }}
      </p>
      <VProgressLinear
        class="mb-3 mt-3"
        rounded
        height="10"
        :model-value="skill.value"
        color="primary"
      />
    </VListItemSubtitle>
  </VListItem>
</template>

<style lang="scss" scoped></style>
