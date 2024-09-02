<script lang="ts" setup>
import BlogExplore from '@/components/aboutMe/BlogExplore.vue';
import IntroSection from '@/components/aboutMe/IntroSection.vue';
import Experience from '@/components/aboutMe/Experience.vue';
</script>

<template>
  <IntroSection />
  <VDivider class="mt-5" />
  <Experience />
  <VDivider class="mt-5" />
  <BlogExplore />
  <div class="mt-10 hidden-sm-and-down" />
</template>

<style lang="scss" scoped></style>
