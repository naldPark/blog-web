<template>
  <v-footer padless absolute dark color="grey darken-4">
    <v-row class="overline text-center" justify="center" no-gutters>
      <v-col cols="12" sm="auto">
        <v-card class="pa-2 grey darken-4 text-xs-right" flat v-if="!isMobile">
          COPYRIGHT BY {{ currentYear }} &nbsp;
        </v-card>
      </v-col>
      <v-col cols="12" sm="auto">
        <v-card class="grey darken-4 text-xs" flat :class="{ notMobile: !isMobile, 'pa-2': !isMobile }">
          &copy; nald
          &nbsp;
        </v-card>
      </v-col>
      <v-col cols="12" sm="auto" v-if="!isMobile">
        <v-card class="pa-2 grey darken-4 text-xs-left" flat>
          ALL RIGHTS RESERVED
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'NaldFooter',
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const currentYear = computed(() => new Date().getFullYear());

    return {
      currentYear
    };
  }
});
</script>

<style lang="scss" scoped>
.notMobile:after {
  content: " | ";
}
</style>
