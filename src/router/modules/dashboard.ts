import {ManagerType} from "@/types/global";

export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    roles: [ManagerType.superAdmin, ManagerType.normalAdmin],
  },
};
