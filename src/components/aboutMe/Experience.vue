<template>
  <div class="text-md-left pa-7">
    <VRow>
      <VCol cols="12" sm="6">
        <h2 class="text-primary mb-3">WORK EXPERIENCE</h2>
        <VTimeline>
          <VTimelineItem
            v-for="(item, index) in workExperience"
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
          <VListItem>
            <VListItemTitle>FRONTEND</VListItemTitle>
            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-react</VIcon> React
              </p>
              <VProgressLinear
                class="mb-3 mt-3"
                rounded
                height="10"
                model-value="80"
                color="primary"
              ></VProgressLinear>
            </VListItemSubtitle>
            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-vuejs</VIcon> Vue.js
              </p>
              <VProgressLinear
                class="mb-3 mt-3"
                rounded
                height="10"
                model-value="70"
                color="primary"
              ></VProgressLinear>
            </VListItemSubtitle>

            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-angular</VIcon> Angular
              </p>
              <VProgressLinear
                class="mb-3 mt-3"
                rounded
                height="10"
                model-value="30"
                color="primary"
              ></VProgressLinear>
            </VListItemSubtitle>
          </VListItem>
          <VDivider class="mb-3"></VDivider>
          <VListItem>
            <VListItemTitle>BACKEND</VListItemTitle>
            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-language-java</VIcon>
                Java
              </p>
              <VProgressLinear
                class="mb-3 mt-3"
                rounded
                height="10"
                model-value="60"
                color="primary"
              ></VProgressLinear>
            </VListItemSubtitle>
          </VListItem>
          <VDivider class="mb-3"></VDivider>
          <VListItem>
            <VListItemTitle>OPERATION</VListItemTitle>
            <VListItemSubtitle class="pa-2">
              <p class="font-weight-regular text-h6">
                <VIcon class="text-secondary">mdi-kubernetes</VIcon>
                Kubernetes
              </p>
              <VProgressLinear
                class="mb-3 mt-3"
                rounded
                height="10"
                model-value="60"
                color="primary"
              ></VProgressLinear>
            </VListItemSubtitle>
          </VListItem>
          <!-- <SkillCategory title="FRONTEND" skills="frontendSkills" />
        <SkillCategory title="BACKEND" skills="backendSkills" />
        <SkillCategory title="OPERATION" skills="operationSkills" /> -->
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import SkillCategory from '@/components/aboutMe/SkillCategory.vue';
  import aboutDataAsset from '@/assets/data/about';

  const workExperience = computed(() => aboutDataAsset.workExperience);
  // const frontendSkills = computed(() => aboutDataAsset.skills.frontend);
  // const backendSkills = computed(() => aboutDataAsset.skills.backend);
  // const operationSkills = computed(() => aboutDataAsset.skills.operation);
</script>

<style scoped>
  /* Add specific styles for SkillAndExpertise here */
</style>
