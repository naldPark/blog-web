<!-- <template>

  <VNavigationDrawer v-model="drawer" app fixed left temporary>
    <VList dense :class="{ beforeLoginNav: !accountInfo }">
      <div class="text-center mt-3">
        <VAvatar class="profile pa-3" color="secondary" size="80" v-if="accountInfo && accountInfo.accountName">
          <VImg contain src="../../assets/icons/avatar_online.png" />
        </VAvatar>
        <VAvatar class="profile pa-3" color="grey darken-4" size="80" v-else @click="clickShowLoginDialog">
          <VImg contain src="../../assets/icons/avatar_offline.png" />
        </VAvatar>
      </div>

      <VListItem color="rgba(0, 0, 0, .4)" dark class="text-center" v-if="accountInfo && accountInfo.accountName">
        <VListItemTitle class="text-primary">
          {{ accountInfo.accountName }}
        </VListItemTitle>
        <VListItemSubtitle> {{ accountInfo.email }} </VListItemSubtitle>
      </VListItem>
      <VListItem color="rgba(0, 0, 0, .4)" dark class="text-center" v-else>
        <VListItemTitle class="text-error" @click="clickShowLoginDialog">
          {{ t('doLogin') }}
        </VListItemTitle>
        <VListItemSubtitle>
          {{ t('noGuestAccess') }}
        </VListItemSubtitle>
      </VListItem>
    </VList>
    <VDivider></VDivider>
    <VList density="compact">
      <template v-for="menu in menuInfo" :key="menu.title">
        <VListItem v-if="!menu.subMenus" v-model="menu.active" no-action @click="onChangePage(menu)"
          :append-icon="menu.subMenus ? 'mdi-chevron-up' : null">
          <template v-slot:prepend>
            <VIcon :icon="menu.icon"></VIcon>
          </template>
          <VListItemTitle>{{ menu.title }}</VListItemTitle>
        </VListItem>
        <VListGroup v-else>
          <template v-slot:activator="{ props }">
            <VListItem v-bind="props">
              <template v-slot:prepend>
                <VIcon :icon="menu.icon"></VIcon>
              </template>
              <VListItemTitle>{{ menu.title }}</VListItemTitle>
            </VListItem>
          </template>
          <VListItem v-for="child in menu.subMenus" :key="child.title" :prepend-icon="child.icon" :title="child.title"
            :value="child.title" @click="onChangePage(child)"></VListItem>
        </VListGroup>
      </template>
    </VList>
  </VNavigationDrawer>
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
