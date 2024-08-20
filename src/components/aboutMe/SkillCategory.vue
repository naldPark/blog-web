<template>
  <VListItem>
    <VListItemTitle>{{ title }}</VListItemTitle>
    <VListItemSubtitle v-for="skill in skills" :key="skill.name" class="pa-2">
      <p class="font-weight-regular text-h6">
        <VIcon :class="skill.iconClass">{{ skill.icon }}</VIcon>
        {{ skill.name }}
      </p>
      <VProgressLinear
        class="mb-3 mt-3"
        rounded
        height="10"
        :model-value="skill.level"
        color="primary"
      />
    </VListItemSubtitle>
  </VListItem>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';

  const props = defineProps<{
    title: string;
    skills: Array<{
      name: string;
      iconClass: string;
      icon: string;
      level: number;
    }>;
  }>();
</script>

<style scoped>
  /* Add specific styles for SkillCategory here */
</style>
