export default {
  path: 'recruitment',
  name: 'recruitment',
  component: () => import('@/views/recruitment/index.vue'),
  meta: {
    locale: 'menu.recruitment',
    requiresAuth: true,
    icon: 'icon-message',
  },
};
