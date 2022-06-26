export default {
  path: 'notice',
  name: 'notice',
  component: () => import('@/views/notice/index.vue'),
  meta: {
    locale: 'menu.notice',
    requiresAuth: true,
    icon: 'icon-file',
  },
  children: [
    {
      path: 'sendNotice',
      name: 'sendNotice',
      component: () => import('@/views/notice/send/index.vue'),
      meta: {
        locale: 'menu.notice.send',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'sendSuccess',
      name: 'sendSuccess',
      component: () => import('@/views/notice/success/index.vue'),
      meta: {
        locale: 'menu.notice.success',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true
      },
    },
  ],
};
