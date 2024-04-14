<template>
  <div>
    <v-app-bar color="rgba(22, 22, 22, 0.95)" app height="50" class="header-bar" dense dark fixed elevation="0">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline" @click="onChangePage(menuInfo[0])">
        <v-avatar rounded size="30px">
          <v-img src="@/assets/logo.png"></v-img>
        </v-avatar>
        Nald
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!accountInfo.accountId" @click="clickShowLoginDialog" color="primary" variant="outlined" rounded
        class="ma-2">
        {{ t('login') }}
        <v-icon dark right> mdi-account-outline </v-icon>
      </v-btn>
      <v-menu v-else left bottom>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon class="text-secondary">mdi-face-man</v-icon>
            <v-icon class="text-secondary">mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-subheader>{{ accountInfo.accountName }}</v-list-subheader>
          <v-list-item v-if="accountInfo.authority === 0" style="height: 10px">
            <v-list-item-title>
              <v-icon :icon="'mdi-account-edit-outline'" />
              {{ t('editPassword') }}</v-list-item-title>
          </v-list-item>
          <v-list-item style="height: 10px">
            <v-list-item-title @click="clickToChangeLang">
              <v-icon>mdi-swap-horizontal</v-icon>
              {{ lang }}
              <v-avatar tile size="20" left>
                <v-img v-if="langSetting === 'ko'" src="../../assets/icons/america.png"></v-img>
                <v-img v-else src="../../assets/icons/korea.png"></v-img>
              </v-avatar>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="accountInfo.authority === 0" style="height: 10px">
            <v-list-item-title @click="clickToAdmin">
              <v-icon>mdi-security</v-icon>
              {{ t('adminPage') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item style="height: 10px;">
            <v-list-item-title @click="clickToLogout">
              <v-icon>mdi-logout-variant</v-icon>
              {{ t('logout') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
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
            {{ accountInfo.accountName }}</v-list-item-title>
                 <v-list-item-subtitle>   {{ accountInfo.email }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item color="rgba(0, 0, 0, .4)" dark class="text-center" v-else>
            <v-list-item-title class="text-error" @click="clickShowLoginDialog">
              {{ t('doLogin') }}
            </v-list-item-title>
            <v-list-item-subtitle> {{ t('noGuestAccess') }} </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
   <v-list density="compact">


          <v-list-group v-for="menu in menuInfo" :key="menu.title" v-model="menu.active"  no-action
          >
   <v-list-item
                   :key="menu.title"
                    :prepend-icon="menu.icon"
                    :title="menu.title"
                    :value="menu.title"
                    @click="onChangePage(menu)"
                  ></v-list-item>
          </v-list-group>

  <!-- </v-list>

    <v-list density="compact">
        <v-list-subheader>REPORTS</v-list-subheader>

        <v-list-item
          v-for="(item, i) in [
            { text: 'Real-Time', icon: 'mdi-clock' },
            { text: 'Audience', icon: 'mdi-account' },
            { text: 'Conversions', icon: 'mdi-flag' },
          ]"
          :key="i"
          :value="item"
          color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list> -->


        <v-list-item v-for="menu in menuInfo" :key="menu.title" v-model="menu.active"  no-action
          @click="onChangePage(menu)" :append-icon="menu.subMenus ? 'mdi-chevron-up' : null">

          <template v-slot:prepend >
            <v-icon :icon="menu.icon"></v-icon>
          </template>

          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
            <v-list-group value="subMenu">
                <!-- <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    title="Actions"
                  ></v-list-item>
                </template>

                <v-list-item
                  v-for="child in menu.subMenus"
                 :key="child.title"
                  :prepend-icon="child.icon"
                  :title="child.title"
                  :value="child.title"
                  @click="onChangePage(child)"
                ></v-list-item> -->
              </v-list-group>

      </v-list>
      
    </v-navigation-drawer>
    <login-dialog v-model="showLoginDialog"></login-dialog>
    <edit-account-info-dialog v-model="showEditAccountInfoDialog" v-if="accountInfo?.accountId"
      :accountId="accountInfo.accountId"></edit-account-info-dialog>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ContactPage from '@/pages/contact/ContactPage.vue';
import LoginDialog from './LoginDialog.vue';
import EditAccountInfoDialog from './EditAccountInfoDialog.vue';
import { useAccountStatusStore } from '@/store/accountStatusStore';
import { useAppStatusStore } from '@/store/appStatusStore';
import { useLanguageStatusStore } from '@/store/languageStatusStore';

export enum LANGUAGE_TYPE {
  ko = '한국어',
  en = 'English',
}

export default defineComponent({
  name: 'NaldHeader',
  components: {
    ContactPage,
    LoginDialog,
    EditAccountInfoDialog,
  },
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const accountStatusStore = useAccountStatusStore();
    const appStatusStore = useAppStatusStore();
    const languageStatusStore = useLanguageStatusStore();
    const languageValue = localStorage.getItem('language') || 'ko';
    const langSetting: Ref<string> = ref(languageValue);
    const drawer = ref(false);
    const showLoginDialog = ref(false);
    const showEditAccountInfoDialog = ref(false);

    const menuItems = [
      {
        name: 'home',
        icon: 'mdi-home',
        title: t('menubar.home'),
        value: 'MainPage',
        anonymousAccess: true,
        active: false,
      },
      {
        name: 'infra',
        icon: 'mdi-duck',
        title: t('menubar.infra'),
        value: 'ProjectPage',
        anonymousAccess: false,
        active: false,
      },
      {
        name: 'aboutMe',
        icon: 'mdi-robot-happy-outline',
        title: t('menubar.aboutMe'),
        value: 'AboutMePage',
        anonymousAccess: false,
        active: false,
      },
      {
        name: 'wonderWall',
        icon: 'mdi-space-invaders',
        title: t('menubar.wonderWall'),
        value: 'WonderWallPage',
        anonymousAccess: false,
        subMenus: [
          {
            name: 'sandbox',
            icon: 'mdi-server',
            title: t('menubar.sandbox'),
            value: 'SandboxPage',
          },
          {
            name: 'share',
            icon: 'mdi-share',
            title: t('menubar.shareLocker'),
            value: 'SharePage',
            availableRange: 1,
          },
          {
            name: 'video',
            icon: 'mdi-television-box',
            title: t('menubar.video'),
            value: 'StreamingListPage',
          },
          {
            name: 'clilendor',
            icon: 'mdi-gamepad',
            title: t('menubar.clilendor'),
            value: 'CliLendorPage',
          },
          {
            name: 'characterTest',
            icon: 'mdi-penguin',
            title: t('menubar.characterTest'),
            value: 'CharacterTestPage',
          },
          {
            name: 'contactPage',
            icon: 'mdi-mail',
            title: t('menubar.contact'),
            value: 'ContactPage',
          },
        ],
      },
      {
        name: 'contactPage',
        icon: 'mdi-email-outline',
        title: t('menubar.contact'),
        value: 'ContactPage',
        anonymousAccess: true,
        active: false,
      },
    ];
    const menuInfo = computed(() => {
      const currentAuthority = accountStatusStore.accountInfo?.authority;
      if (currentAuthority === undefined || currentAuthority === null) {
        return [];
      }
      if (currentAuthority === 0) {
        return menuItems;
      } else {
        let menu = menuItems.filter((e: any) => e.availableRange === null || e.availableRange !== 1);
        menu.forEach((m: any, idx: number) => {
          if (m.subMenus) menu[idx].subMenus = m.subMenus.filter((e: any) => e.availableRange === null || e.availableRange !== 1);
        });
        return menu;
      }
    });

    const accountInfo = computed(() => accountStatusStore.accountInfo);
    const lang = computed(() => LANGUAGE_TYPE[langSetting.value as keyof typeof LANGUAGE_TYPE]);

    const clickShowLoginDialog = () => {
      showLoginDialog.value = true;
    };

    const clickToChangeAccountInfo = () => {
      showEditAccountInfoDialog.value = true;
    };

    const clickToChangeLang = () => {
      const newLang = langSetting.value === 'ko' ? 'en' : 'ko';
      langSetting.value = newLang;
      localStorage.setItem('language', newLang);
      languageStatusStore.saveLanguage(newLang);
    };

    const clickToAdmin = () => {
      router.push({ name: 'AdminPage' });
    };

    const clickToLogout = () => {
      accountStatusStore.setAuthToken(null);
      appStatusStore.addToastMessage({
        type: 'success',
        message: t("loggedOut") as string,
        buttonMsg: null,
        timeout: 2000,
        buttonCallback: null
      });

      router.push({ name: 'MainPage' });
    };

    const onChangePage = (menu: any) => {
      if (menu.subMenus) {
        menu.active = !menu.active;
      } else {
        router.push({ name: menu.value });
      }
    };

    watch(langSetting, (newLang: string) => {
      languageStatusStore.saveLanguage(newLang);
    });

    return {
      langSetting,
      drawer,
      showLoginDialog,
      showEditAccountInfoDialog,
      menuInfo,
      accountInfo,
      lang,
      t,
      clickShowLoginDialog,
      clickToChangeAccountInfo,
      clickToChangeLang,
      clickToAdmin,
      clickToLogout,
      onChangePage,
    };
  },
});
</script>
