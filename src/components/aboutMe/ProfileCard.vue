<template>
  <VCard>
    <VCardText>
      <VImg src="@/assets/images/profiles/me.jpg">
        <div class="innerBorder"></div>
      </VImg>
      <VCardActions>
        <VSpacer />
        <Button
          v-for="(social, index) in snsList"
          :key="index"
          :color="social.color"
          :icon="social.icon"
          :href="social.link"
        />
      </VCardActions>
    </VCardText>
  </VCard>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';

  const props = defineProps<{
    snsList: Array<{
      color: string;
      icon: string;
      link: string;
    }>;
  }>();
</script>

<style scoped>
  /* Add specific styles for ProfileCard here */
</style>
