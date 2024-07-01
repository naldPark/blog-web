<template>
  <div class="project-history-wrap" :class="{ 'is-mobile': isMobile }">
    <v-timeline side="end">
      <v-timeline-item
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
          <v-card class="mx-auto history-card" variant="outlined">
            <template v-slot:title>
              <span class="text-subtitle-1 text-secondary">
                {{ entry.icon }} {{ entry.cardTitle }}</span
              >
            </template>
            <v-card-text class="font-weight-light text-white">
              <div>{{ entry.cardText }}</div>
              <v-btn
                v-if="entry.link"
                :href="entry.link"
                target="_blank"
                variant="outlined"
                size="small"
                class="mt-3"
                color="btnPrimary"
              >
                <span>More detail here </span
                ><i class="mdi mdi-link-variant"></i>
              </v-btn>
            </v-card-text>
          </v-card>
        </template>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script lang="ts" setup>
  import timelineEntries from '@/assets/data/timelineEntries';

  const props = defineProps<{ isMobile?: boolean }>();

  const isMobile = props.isMobile ?? false;
</script>

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
