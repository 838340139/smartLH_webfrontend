import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/dashboard/mock';
/** simple */

// import '@/views/search/mock';

import '@/views/form/step/mock';

import '@/views/profile/basic/mock';

import '@/views/visualization/user-info-analysis/mock';
import '@/views/visualization/analysis/mock';
import '@/views/visualization/analysis/mock';

import '@/views/user/info/mock';
import '@/views/user/setting/mock';
/** simple end */

Mock.setup({
  timeout: '600-1000',
});
