export default {
  path: 'visualization',
  name: 'visualization',
  component: () => import('@/views/visualization/index.vue'),
  meta: {
    locale: 'menu.visualization',
    requiresAuth: true,
    icon: 'icon-apps',
  },
  children: [
    {
      path: 'user-info-analysis',
      name: 'userInfoAnalysis',
      component: () => import('@/views/visualization/user-info-analysis/index.vue'),
      meta: {
        locale: 'menu.visualization.userInfoAnalysis',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    // {
    //   path: 'org-info-analysis',
    //   name: 'orgInfoAnalysis',
    //   component: () =>
    //     import('@/views/visualization/org-info-analysis/index.vue'),
    //   meta: {
    //     locale: 'menu.visualization.orgInfoAnalysis',
    //     requiresAuth: true,
    //     roles: ['admin'],
    //   },
    // },
    // {
    //   path: 'recruit-info-analysis',
    //   name: 'recruitInfoAnalysis',
    //   component: () =>
    //       import('@/views/visualization/recruit-info-analysis/index.vue'),
    //   meta: {
    //     locale: 'menu.visualization.recruitInfoAnalysis',
    //     requiresAuth: true,
    //     roles: ['admin'],
    //   },
    // },
  ],
};
