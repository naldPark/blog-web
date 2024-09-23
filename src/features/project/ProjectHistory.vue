<script lang="ts" setup>
import timelineEntries from '@/assets/data/timelineEntries';
import Button from '@/components/common/Button.vue';
const props = defineProps<{ isMobile?: boolean }>();

const isMobile = props.isMobile;
</script>

<template>
  <div class="project-history-wrap" :class="{ 'is-mobile': isMobile }">
    <VTimeline side="end">
      <VTimelineItem
        v-for="(entry, index) in timelineEntries"
        :key="index"
        :hide-dot="entry.hideDot"
        class="mb-1"
        :class="entry.class"
        :large="entry.large"
        dot-color="grey"
        fill-dot
        size="15"
      >
        <template v-if="entry.title">
          <h2>{{ entry.title }}</h2>
        </template>
        <template v-else>
          <VCard class="mx-auto history-card" variant="outlined">
            <template v-slot:title>
              <span class="text-subtitle-1 text-secondary">
                {{ entry.icon }} {{ entry.cardTitle }}</span
              >
            </template>
            <VCardText class="font-weight-light text-white">
              <div>{{ entry.cardText }}</div>
              <Button
                v-if="entry.link"
                :href="entry.link"
                target="_blank"
                variant="outlined"
                :rounded="false"
                class="mt-3"
                size="small"
                append-icon="mdi-link-variant"
                label="More detail here"
              />
            </VCardText>
          </VCard>
        </template>
      </VTimelineItem>
    </VTimeline>
  </div>
</template>

<style lang="scss" scoped>
.project-history-wrap {
  max-width: 1300px;
  margin: auto;
  padding: 50px;
  background-color: #1e1e1e;

  &.is-mobile {
    padding: 5px;
  }

  .history-card {
    border: 0.5px solid dimgrey;
  }
}
</style>
