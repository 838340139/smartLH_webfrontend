export default {
  path: 'personnel',
  name: 'personnel',
  component: () => import('@/views/personnel/index.vue'),
  meta: {
    locale: 'menu.personnel',
    requiresAuth: true,
    roles: ['*'],
    icon: 'icon-list',
  }
};
