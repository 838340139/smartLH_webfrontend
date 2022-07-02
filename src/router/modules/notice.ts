export default {
  path: 'notice',
  name: 'notice',
  component: () => import('@/views/notice/index.vue'),
  meta: {
    locale: 'menu.notice',
    requiresAuth: true,
    icon: 'icon-message',
  },
  children: [
    {
      path: 'sendNotice',
      name: 'sendNotice',
      component: () => import('@/views/notice/send/index.vue'),
      meta: {
        locale: 'menu.notice.send',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'noticeList',
      name: 'noticeList',
      component: () => import('@/views/notice/list/index.vue'),
      meta: {
        locale: 'menu.notice.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'sendSuccess',
      name: 'sendSuccess',
      component: () => import('@/views/notice/success/index.vue'),
      meta: {
        locale: 'menu.notice.success',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};
