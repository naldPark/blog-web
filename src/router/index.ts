import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import WonderwallLayout from '@/layouts/WonderwallLayout.vue';
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
      {
        path: 'about',
        name: 'AboutMePage',
        component: () => import('@/pages/aboutMe/AboutMePage.vue'),
        meta: {
          anonymousAccess: true,
        },
      },
      {
        path: 'project',
        name: 'ProjectPage',
        component: () => import('@/pages/project/ProjectPage.vue'),
        meta: {
          anonymousAccess: true,
        },
      },
      {
        path: 'wonderwall',
        component: WonderwallLayout,
        children: [
          {
            path: 'main',
            name: 'WonderwallPage',
            component: () => import('@/pages/wonderwall/WonderwallPage.vue'),
          },
          {
            path: 'sandbox',
            name: 'SandboxPage',
            component: () =>
              import('@/pages/wonderwall/sandbox/SandboxPage.vue'),
          },
          {
            path: 'sandbox/terminal',
            name: 'SandboxTerminalPage',
            component: () =>
              import('@/pages/wonderwall/sandbox/SandboxTerminalPage.vue'),
          },
          {
            path: 'sandbox/terminal',
            name: 'SandboxTerminalPage',
            component: () =>
              import('@/pages/wonderwall/sandbox/SandboxTerminalPage.vue'),
          },
          {
            path: 'video',
            name: 'StreamingListPage',
            component: () =>
              import('@/pages/wonderwall/streaming/StreamingListPage.vue'),
          },
          {
            path: 'video/play',
            name: 'StreamingPage',
            component: () =>
              import('@/pages/wonderwall/streaming/StreamingPage.vue'),
          },
        ],
      },
      {
        path: 'contact',
        name: 'ContactPage',
        component: () => import('@/pages/contact/ContactPage.vue'),
        meta: {
          anonymousAccess: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    console.log('감자러쉬', to);
    const accountStatusStore = useAccountStatusStore();
    accountStatusStore.loadAuthToken();
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
