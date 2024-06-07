<template>
  <v-footer padless absolute dark color="grey-darken-4">
    <v-row class="overline text-center justify-center" no-gutters>
      <v-col cols="12" sm="auto">
        <v-card class="pa-2 text-xs-right" flat v-if="!isMobile">
          COPYRIGHT BY {{ currentYear }} &nbsp;
        </v-card>
      </v-col>
      <v-col cols="12" sm="auto">
        <v-card class="text-xs" flat :class="{ 'not-mobile': !isMobile, 'pa-2': !isMobile }">
          &copy; nald
          &nbsp;
        </v-card>
      </v-col>
      <v-col cols="12" sm="auto" v-if="!isMobile">
        <v-card class="pa-2 text-xs-left" flat>
          ALL RIGHTS RESERVED
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';

const display = useDisplay();
const isMobile: Ref<boolean> = display.smAndDown;
const currentYear = computed(() => new Date().getFullYear());

</script>

<style lang="scss" scoped >
.not-mobile:after {
  content: " | ";
}
</style>
