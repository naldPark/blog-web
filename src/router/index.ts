import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import MainLayout from '@/pages/MainLayout.vue';
// import ProjectPage from '@/pages/project/ProjectPage.vue';
// import ContactPage from '@/pages/contact/ContactPage.vue';
// import AboutMePage from '@/pages/aboutMe/AboutMePage.vue';
// import StreamingPage from '@/pages/wonderWall/streaming/StreamingPage.vue';
// import StreamingListPage from '@/pages/wonderWall/streaming/StreamingListPage.vue';
// import CrawlingPage from '@/pages/wonderWall/crawling/CrawlingPage.vue';
// import CharacterTestPage from '@/pages/wonderWall/characterTest/CharacterTestPage.vue';
// import UtilsPage from '@/pages/wonderWall/utils/UtilsPage.vue';
// import WonderWallPage from '@/pages/wonderWall/WonderWallPage.vue';
// import BlogPage from '@/pages/blog/BlogPage.vue';
import { useAccountStatusStore } from '@/store/accountStatusStore';
// import WonderWallLayout from '@/pages/wonderWall/WonderWallLayout.vue';
// import AdminPage from '@/pages/admin/AdminPage.vue';
// import CoinLockerPage from '@/pages/wonderWall/coinLocker/CoinLockerPage.vue';
// import DoodlePage from '@/pages/wonderWall/doodle/DoodlePage.vue';
// import DrawingPage from '@/pages/wonderWall/catchDrawing/DrawingPage.vue';
// import CliLendorPage from '@/pages/wonderWall/clilendor/CliLendorPage.vue';
// import SandboxPage from '@/pages/wonderWall/sandbox/SandboxPage.vue';
// import SandboxTerminalPage from '@/pages/wonderWall/sandbox/SandboxTerminalPage.vue';


const routes = [
  {
    path: '/main',
    name: MainPage.name,
    component: MainPage,
    meta: {
      anonymousAccess: true,
    },
  },
  {
    path: '/',
    name: MainLayout.name,
    component: MainLayout,
    redirect: { path: '/main' },
    children: [
      // {
      //   path: 'project',
      //   name: ProjectPage.name,
      //   component: ProjectPage,
      //   meta: {
      //     anonymousAccess: false,
      //   },
      // },
      // {
      //   path: 'wonderWall',
      //   name: WonderWallLayout.name,
      //   component: WonderWallLayout,
      //   redirect: { name: WonderWallPage.name },
      //   meta: {
      //     anonymousAccess: false,
      //   },
      //   children: [
      //     {
      //       path: 'main',
      //       name: WonderWallPage.name,
      //       component: WonderWallPage,
      //     },
      //     {
      //       path: 'video',
      //       name: StreamingListPage.name,
      //       component: StreamingListPage,
      //     },
      //     {
      //       path: 'video/play',
      //       name: StreamingPage.name,
      //       component: StreamingPage,
      //     },
      //     {
      //       path: 'crawling',
      //       name: CrawlingPage.name,
      //       component: CrawlingPage,
      //     },
      //     {
      //       path: 'utils',
      //       name: UtilsPage.name,
      //       component: UtilsPage,
      //     },
      //     {
      //       path: 'characterTest',
      //       name: CharacterTestPage.name,
      //       component: CharacterTestPage,
      //     },
      //     {
      //       path: 'sandbox',
      //       name: SandboxPage.name,
      //       component: SandboxPage,
      //     },
      //     {
      //       path: 'sandboxTerminal',
      //       name: SandboxTerminalPage.name,
      //       component: SandboxTerminalPage,
      //     },
      //     {
      //       path: 'clilendor',
      //       name: CliLendorPage.name,
      //       component: CliLendorPage,
      //     },
      //     {
      //       path: 'coinLocker',
      //       name: CoinLockerPage.name,
      //       component: CoinLockerPage,
      //     },
      //     {
      //       path: 'catchDrawing',
      //       name: DrawingPage.name,
      //       component: DrawingPage,
      //     },
      //     {
      //       path: 'doodle',
      //       name: DoodlePage.name,
      //       component: DoodlePage,
      //     },
      //   ],
      // },
      // {
      //   path: 'aboutMe',
      //   name: AboutMePage.name,
      //   component: AboutMePage,
      //   meta: {
      //     anonymousAccess: false,
      //   },
      // },
      // {
      //   path: 'blog',
      //   name: BlogPage.name,
      //   component: BlogPage,
      //   meta: {
      //     anonymousAccess: false,
      //   },
      // },
      // {
      //   path: 'contact',
      //   name: ContactPage.name,
      //   component: ContactPage,
      //   meta: {
      //     anonymousAccess: true,
      //   },
      // },
      // {
      //   path: 'admin',
      //   name: AdminPage.name,
      //   component: AdminPage,
      //   meta: {
      //     anonymousAccess: false,
      //   },
      // },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

  const accountStatusStore = useAccountStatusStore();
  await accountStatusStore.loadAuthToken();
  if (to.matched.some(route => route.meta.anonymousAccess)) {
    next();
  } else if (accountStatusStore.isSignIn) {
    next();
  } else {
    moveToMain();
  }
});

const moveToMain = () => {
  router.push({
    name: MainPage.name,
  }).catch((err) => console.error(err));
};

export default router;