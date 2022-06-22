import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/dashboard/mock';
/** simple */

import '@/views/personnel/mock';

import '@/views/form/step/mock';

import '@/views/profile/basic/mock';

import '@/views/visualization/user-info-analysis/mock';
import '@/views/visualization/org-info-analysis/mock';
import '@/views/visualization/recruit-info-analysis/mock';

import '@/views/user/info/mock';
import '@/views/user/setting/mock';
/** simple end */

Mock.setup({
  timeout: '600-1000',
});
