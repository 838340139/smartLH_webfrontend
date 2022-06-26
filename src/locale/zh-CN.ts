import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/locale/zh-CN';
/** simple */

import localeSearchTable from '@/views/personnel/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

import localeDataAnalysis from '@/views/visualization/user-info-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/visualization/org-info-analysis/locale/zh-CN';
import localeRecruitDAnalysis from '@/views/visualization/recruit-info-analysis/locale/zh-CN';

import localeSuccess from '@/views/result/success/locale/zh-CN';
import localeError from '@/views/result/error/locale/zh-CN';

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';

import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';

import localeOrgSearchTable from '@/views/organization/search-org/locale/zh-CN';
import localeOrgCardList from '@/views/organization/audit/locale/zh-CN';

import localeOrgRecruitment from '@/views/recruitment/locale/zh-CN';

import localeNoticeSend from '@/views/notice/send/locale/zh-CN'
import localeNoticeSuccess from '@/views/notice/success/locale/zh-CN'
/** simple end */
import localeGlobal from './zh-CN/global';
import localeSettings from './zh-CN/settings';


export default {
  'menu.dashboard': '工作台',
  'menu.personnel': '人才信息查询',
  'menu.organization': '单位信息管理',
  'menu.recruitment': '招聘信息管理',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.notice': '消息管理',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
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
  ...localeUserInfo,
  ...localeUserSetting,
  ...localeOrgCardList,
  ...localeOrgSearchTable,
  ...localeNoticeSend,
  ...localeNoticeSuccess,
  ...localeOrgRecruitment,
  ...localeGlobal
  /** simple end */
};
