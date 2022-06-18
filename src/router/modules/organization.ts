export default {
  path: 'organization',
  name: 'organization',
  component: () => import('@/views/organization/index.vue'),
  meta: {
    locale: 'menu.organization',
    requiresAuth: true,
    icon: 'icon-list',
  },
  children: [
    {
      path: 'audit',
      name: 'audit',
      component: () => import('@/views/organization/audit/index.vue'),
      meta: {
        locale: 'menu.organization.audit',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'search-org', // The midline path complies with SEO specifications
      name: 'searchOrg',
      component: () => import('@/views/organization/search-org/index.vue'),
      meta: {
        locale: 'menu.organization.searchOrg',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
