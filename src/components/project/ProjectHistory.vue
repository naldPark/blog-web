<template>
  <div class="project-history-wrap">
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
        min-width="100%"
      >
        <template v-if="entry.title" class="timeline-title">
          <h2 class="timeline-title-text">{{ entry.title }}</h2>
        </template>
        <template v-else>
          <v-card variant="outlined" class="history-card">
            <v-card-title class="text-subtitle-1 text-secondary">
              {{ entry.icon }} {{ entry.cardTitle }}
            </v-card-title>
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
                More detail here <i class="mdi mdi-link-variant"></i>
              </v-btn>
            </v-card-text>
          </v-card>
        </template>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script lang="ts" setup>
  import timelineEntries from '@/assets/data/about';
</script>

<style lang="scss" scoped>
  .project-history-wrap {
    max-width: 1300px;
    margin: auto;
    padding: 50px;
    background-color: #1e1e1e;
    .history-card {
      border: 0.5px solid grey;
    }
  }
</style>
