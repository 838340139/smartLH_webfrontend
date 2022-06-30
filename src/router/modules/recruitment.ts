export default {
  path: 'recruitment',
  name: 'recruitment',
  component: () => import('@/views/recruitment/index.vue'),
  meta: {
    locale: 'menu.recruitment',
    requiresAuth: true,
    icon: 'icon-message',
  },
  children: [
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
  ],
};
