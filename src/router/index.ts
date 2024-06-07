import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import WonderWallLayout from '@/layouts/WonderWallLayout.vue';
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
        path: 'wonderWall',
        component: WonderWallLayout,
        children: [
          {
            path: 'main',
            name: 'WonderWallPage',
            component: () => import('@/pages/wonderWall/WonderWallPage.vue'),
          },
          {
            path: 'sandbox',
            name: 'SandboxPage',
            component: () =>
              import('@/pages/wonderWall/sandbox/SandboxPage.vue'),
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
