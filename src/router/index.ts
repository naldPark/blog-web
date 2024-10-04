import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import WonderwallLayout from '@/layouts/WonderwallLayout.vue';
import { useUserStore } from '@/store/userStore';

const perRouteGuardForLogging = (to: { path: any }, from: { path: any }) => {
  console.log(`from: ${from.path} => to: ${to.path}`);
  return true;
};

const moveToMain = () => {
  router
    .push({
      name: 'MainPage',
    })
    .catch((err) => console.error(err));
};

const routes = [
  {
    path: '/main',
    component: () => import('@/pages/MainPage.vue'),
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
        path: 'admin',
        name: 'AdminPage',
        component: () => import('@/pages/admin/AdminPage.vue'),
        meta: {
          anonymousAccess: false,
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
          {
            path: 'chat',
            name: 'ChatRoomPage',
            component: () => import('@/pages/wonderwall/chat/ChatRoomPage.vue'),
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
        beforeEnter: [perRouteGuardForLogging],
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
    const userStore = useUserStore();
    if (to.matched.some((route) => route.meta.anonymousAccess)) {
      /* 익명 접근이 허용된 경우 */
      next();
    } else if (userStore.isSignIn) {
      /* 사용자가 로그인한 경우 */
      next();
    } else {
      /** 사용자가 로그인하지 않은 경우 메인 페이지로 리디렉션 */
      router.push({ name: 'MainPage' });
      next();
    }
  },
);

export default router;
