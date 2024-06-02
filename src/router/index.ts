import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import { useAccountStatusStore } from '@/store/accountStatusStore';

const routes = [
  {
    path: '/main',
    component: () => import('./../pages/MainPage.vue'),
    name: 'MainPage',
    meta: {
      anonymousAccess: true,
    },
  },
  {
    path: '/',
    name: 'MainLayout',
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
      {
        path: 'contact',
        name: 'ContactPage',
        component: () => import('@/pages/contact/ContactPage.vue'),
        meta: {
          anonymousAccess: true,
        },
      },
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

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const accountStatusStore = useAccountStatusStore();
    await accountStatusStore.loadAuthToken();
    if (to.matched.some((route) => route.meta.anonymousAccess)) {
      next();
    } else if (accountStatusStore.isSignIn) {
      next();
    } else {
      moveToMain();
    }
  },
);

const moveToMain = () => {
  router
    .push({
      name: 'MainPage',
    })
    .catch((err) => console.error(err));
};

export default router;
