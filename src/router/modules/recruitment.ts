export default {
  path: 'recruitment',
  name: 'recruitment',
  component: () => import('@/views/recruitment/index.vue'),
  meta: {
    locale: 'menu.recruitment',
    requiresAuth: true,
    icon: 'icon-file',
  },
  children: [
    {
      path: 'publish',
      name: 'publish-recruitment',
      component: () => import('@/views/recruitment/publish/index.vue'),
      meta: {
        locale: 'menu.recruitment.publish',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'search',
      name: 'search-recruitment',
      component: () => import('@/views/recruitment/search/index.vue'),
      meta: {
        locale: 'menu.recruitment.searchRec',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'analysis', // The midline path complies with SEO specifications
      name: 'analysis-recruitment',
      component: () => import('@/views/recruitment/analysis/index.vue'),
      meta: {
        locale: 'menu.recruitment.analysis',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'success', // The midline path complies with SEO specifications
      name: 'success-recruitment',
      component: () => import('@/views/recruitment/success/index.vue'),
      meta: {
        locale: 'menu.recruitment.success',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};
