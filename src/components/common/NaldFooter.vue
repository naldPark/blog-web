<template>
  <v-footer padless absolute dark color="grey-darken-4">
    <v-row class="overline text-center justify-center" no-gutters>
      <v-col cols="12" sm="auto">
        <v-card class="pa-2 text-xs-right" flat v-if="!smAndDown">
          COPYRIGHT BY {{ currentYear }} &nbsp;
        </v-card>
      </v-col>
      <v-col cols="12" sm="auto">
        <v-card class="text-xs" flat :class="{ notMobile: !smAndDown, 'pa-2': !smAndDown }">
          &copy; nald
          &nbsp;
        </v-card>
      </v-col>
      <v-col cols="12" sm="auto" v-if="!smAndDown">
        <v-card class="pa-2 text-xs-left" flat>
          ALL RIGHTS RESERVED
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts" setup>
import { defineComponent, computed, ref } from 'vue';
import { useDisplay } from 'vuetify';


const { smAndDown } = ref(useDisplay()).value;
const currentYear = computed(() => new Date().getFullYear());

</script>

<style lang="scss" >
* {
  font-family: 'Raleway';
}

.notMobile:after {
  content: " | ";
}
</style>
