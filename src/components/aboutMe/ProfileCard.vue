<script lang="ts" setup>
import Button from '../common/Button.vue';

defineProps<{
  snsList: Array<{
    color: string;
    icon: string;
    link: string;
  }>;
}>();
</script>

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

<style lang="scss" scoped></style>
