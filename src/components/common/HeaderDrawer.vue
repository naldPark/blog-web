<!-- <template>

  <v-navigation-drawer v-model="drawer" app fixed left temporary>
    <v-list dense :class="{ beforeLoginNav: !accountInfo }">
      <div class="text-center mt-3">
        <v-avatar class="profile pa-3" color="secondary" size="80" v-if="accountInfo && accountInfo.accountName">
          <v-img contain src="../../assets/icons/avatar_online.png" />
        </v-avatar>
        <v-avatar class="profile pa-3" color="grey darken-4" size="80" v-else @click="clickShowLoginDialog">
          <v-img contain src="../../assets/icons/avatar_offline.png" />
        </v-avatar>
      </div>

      <v-list-item color="rgba(0, 0, 0, .4)" dark class="text-center" v-if="accountInfo && accountInfo.accountName">
        <v-list-item-title class="text-primary">
          {{ accountInfo.accountName }}
        </v-list-item-title>
        <v-list-item-subtitle> {{ accountInfo.email }} </v-list-item-subtitle>
      </v-list-item>
      <v-list-item color="rgba(0, 0, 0, .4)" dark class="text-center" v-else>
        <v-list-item-title class="text-error" @click="clickShowLoginDialog">
          {{ t('doLogin') }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ t('noGuestAccess') }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact">
      <template v-for="menu in menuInfo" :key="menu.title">
        <v-list-item v-if="!menu.subMenus" v-model="menu.active" no-action @click="onChangePage(menu)"
          :append-icon="menu.subMenus ? 'mdi-chevron-up' : null">
          <template v-slot:prepend>
            <v-icon :icon="menu.icon"></v-icon>
          </template>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
        <v-list-group v-else>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <template v-slot:prepend>
                <v-icon :icon="menu.icon"></v-icon>
              </template>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item v-for="child in menu.subMenus" :key="child.title" :prepend-icon="child.icon" :title="child.title"
            :value="child.title" @click="onChangePage(child)"></v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  value: Boolean,
});
const modelValue = ref(props.value);
const items = [
  {
    title: 'Foo',
    value: 'foo',
  },
  {
    title: 'Bar',
    value: 'bar',
  },
  {
    title: 'Fizz',
    value: 'fizz',
  },
  {
    title: 'Buzz',
    value: 'buzz',
  },
];
</script>

<style lang="scss" scoped>
.right-panel-item {
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
}
</style> -->
