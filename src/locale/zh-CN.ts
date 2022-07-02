import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/locale/zh-CN';
/** simple */

import localePersonnelSearch from '@/views/personnel/search/locale/zh-CN';
import localePersonnelAnalysis from '@/views/personnel/analysis/locale/zh-CN';

import localeOrgSearch from '@/views/organization/search/locale/zh-CN';
import localeOrgAnalysis from '@/views/organization/analysis/locale/zh-CN';
import localeOrgAudit from '@/views/organization/audit/locale/zh-CN';

import localeRecruitmentPublish from '@/views/recruitment/publish/locale/zh-CN';
import localeRecruitmentSearch from '@/views/recruitment/search/locale/zh-CN';
import localeRecruitmentAnalysis from '@/views/recruitment/analysis/locale/zh-CN';
import localeRecruitmentSuccess from '@/views/recruitment/success/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

import localeSuccess from '@/views/result/success/locale/zh-CN';
import localeError from '@/views/result/error/locale/zh-CN';

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';

import localeSettingAdmin from '@/views/setting/admin/locale/zh-CN';
import localeSettingSetting from '@/views/setting/setting/locale/zh-CN';

import localeNoticeSend from '@/views/notice/send/locale/zh-CN';
import localeNoticeSuccess from '@/views/notice/success/locale/zh-CN';
import localeNoticeList from '@/views/notice/list/locale/zh-CN';
/** simple end */
import localeGlobal from './zh-CN/global';
import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '工作台',
  'menu.personnel': '人才信息管理',
  'menu.organization': '单位信息管理',
  'menu.recruitment': '招聘信息管理',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.notice': '消息管理',
  'menu.visualization': '数据可视化',
  'menu.setting': '系统设置',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  /** simple */
  ...localePersonnelAnalysis,
  ...localePersonnelSearch,
  ...localeOrgSearch,
  ...localeOrgAnalysis,
  ...localeOrgAudit,
  ...localeOrgSearch,
  ...localeRecruitmentPublish,
  ...localeRecruitmentAnalysis,
  ...localeRecruitmentSearch,
  ...localeRecruitmentSuccess,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeSettingAdmin,
  ...localeSettingSetting,
  ...localeNoticeSend,
  ...localeNoticeSuccess,
  ...localeNoticeList,
  ...localeGlobal,
  /** simple end */
};
