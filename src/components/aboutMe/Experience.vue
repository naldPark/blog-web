<script lang="ts" setup>
import { computed } from 'vue';
import SkillCategory from '@/components/aboutMe/SkillCategory.vue';
import aboutDataAsset from '@/assets/data/about';
</script>

<template>
  <div class="text-md-left pa-7">
    <VRow>
      <VCol cols="12" sm="6">
        <h2 class="text-primary mb-3">WORK EXPERIENCE</h2>
        <VTimeline>
          <VTimelineItem
            v-for="(item, index) in aboutDataAsset.workExperience"
            :key="index"
            :dot-color="item.dotColor"
            size="x-small"
            :class="item.class"
          >
            <strong>{{ item.title }}</strong>
            <div class="text-caption">{{ item.subtitle }}</div>
            <div class="text-caption text-grey">{{ item.date }}</div>
          </VTimelineItem>
        </VTimeline>
      </VCol>
      <VCol cols="12" sm="6">
        <h2 class="text-primary mb-3">SKILL AND EXPERTISE</h2>
        <VCard color="rgba(0, 0, 0, 0)" class="mx-auto" tile elevation="0">
          <SkillCategory
            title="FRONTEND"
            :skills="aboutDataAsset.skills.frontend"
          />
          <SkillCategory
            title="BACKEND"
            :skills="aboutDataAsset.skills.backend"
          />
          <SkillCategory
            title="OPERATION"
            :skills="aboutDataAsset.skills.operation"
          />
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped></style>
