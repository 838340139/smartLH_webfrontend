export default {
  path: 'setting',
  name: 'setting',
  component: () => import('@/views/setting/index.vue'),
  meta: {
    locale: 'menu.setting',
    icon: 'icon-settings',
    requiresAuth: true,
  },
  children: [
    {
      path: 'adminUser',
      name: 'adminUser',
      component: () => import('@/views/setting/admin/index.vue'),
      meta: {
        locale: 'menu.setting.admin',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'setting',
    //   name: 'setting2',
    //   component: () => import('@/views/setting/setting/index.vue'),
    //   meta: {
    //     locale: 'menu.user.setting',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};
