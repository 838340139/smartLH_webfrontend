import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/dashboard/locale/en-US';
/** simple */

import localeSearchTable from '@/views/personnel/locale/en-US';

import localeStepForm from '@/views/form/step/locale/en-US';
import localeGroupForm from '@/views/form/group/locale/en-US';

import localeBasicProfile from '@/views/profile/basic/locale/en-US';

import localeDataAnalysis from '@/views/visualization/user-info-analysis/locale/en-US';
import localeMultiDAnalysis from '@/views/visualization/org-info-analysis/locale/en-US';
import localeRecruitDAnalysis from '@/views/visualization/recruit-info-analysis/locale/en-US';

import localeSuccess from '@/views/result/success/locale/en-US';
import localeError from '@/views/result/error/locale/en-US';

import locale403 from '@/views/exception/403/locale/en-US';
import locale404 from '@/views/exception/404/locale/en-US';
import locale500 from '@/views/exception/500/locale/en-US';

import localeSettingAdmin from '@/views/setting/admin/locale/en-US';
import localeSettingSetting from '@/views/setting/setting/locale/en-US';

import localeNoticeSend from '@/views/notice/send/locale/en-US'
import localeNoticeSuccess from '@/views/notice/success/locale/en-US'
import localeNoticeList from '@/views/notice/list/locale/en-US'
/** simple end */
import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.personnel': 'personnel',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.setting': 'User Center',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  /** simple */
  ...localeSearchTable,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeRecruitDAnalysis,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeNoticeSend,
  ...localeNoticeSuccess,
  ...localeNoticeList,
  ...localeSettingAdmin,
  ...localeSettingSetting,
  /** simple end */
};
