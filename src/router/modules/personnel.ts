export default {
  path: 'personnel',
  name: 'personnel',
  component: () => import('@/views/personnel/index.vue'),
  meta: {
    locale: 'menu.personnel',
    requiresAuth: true,
    roles: ['*'],
    icon: 'icon-list',
  },
  children: [
    {
      path: 'search',
      name: 'search-search',
      component: () => import('@/views/personnel/search/index.vue'),
      meta: {
        locale: 'menu.personnel.search',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'analysis', // The midline path complies with SEO specifications
      name: 'analysis-personnel',
      component: () => import('@/views/personnel/analysis/index.vue'),
      meta: {
        locale: 'menu.personnel.analysis',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
