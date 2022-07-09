export interface AnyObject {
  [key: string]: unknown;
}

export interface Options {
  value: unknown;
  label: string;
}

export interface NodeOptions extends Options {
  children?: NodeOptions[];
}

export interface GetParams {
  body: null;
  type: string;
  url: string;
}

export interface PostData {
  body: string;
  type: string;
  url: string;
}

export interface Pagination {
  'show-total'?: true;
  'show-jumper'?: true;
  'current': number;
  'pageSize': number;
  'total'?: number;
}

export type TimeRanger = [string, string];

export interface GeneralChart {
  xAxis: string[];
  data: Array<{ name: string; value: number[] }>;
}

export interface Organization {
  id?: number;
  type?: string;
  name?: string;
  address?: string;
  phone?: string;
  audit?: number;
  material?: string | string[];
  serialNumber?: string;
  introduction?: string;
  auditTime?: string;
  isDeleted?: number;
}

export interface Personnel {
  id?: number;
  wxAccount?: string;
  name?: string;
  sex?: string;
  home?: string;
  place?: string;
  subject?: number;
  academic?: string;
  education?: string;
  marriage?: string;
  nation?: number;
  phone?: string;
  politics?: string;
  photo?: string;
  post?: string;
  fresh?: number;
  mailbox?: string;
  work?: string;
  prize?: string;
  introduction?: string;
  undergo?: string;
  status?: number;
}

export interface Recruitment {
  id?: number;
  orgId?: number;
  orgName?: string;
  position?: string;
  number?: string;
  age?: string;
  subject?: string;
  fresh?: string;
  education?: string;
  place?: string;
  politics?: string;
  remark?: string;
  publishTime?: string;
  endTime?: string;
  title?: string;
  content?: string;
  salaryFloor?: number;
  salaryCell?: number;
  experience?: string;
}
export const AuditEnum = {
  0: '未审核',
  1: '已通过',
  2: '未通过',
  toAudit: 0,
  passAudit: 1,
  notPassAudit: 2,
};
export const NoticeType = {
  massPersonnel: 1,
  massOrg: 2,
  massAll: 5,
  privatePersonnel: 3,
  privateOrg: 4,
};

export const PopularTypeEnum = {
  lastWeek: 0,
  lastMonth: 1,
  total: 2,
};

export interface Notice {
  id?: number;
  managerId?: number;
  type?: number;
  sendTime?: string;
  title?: string;
  receiverInfo?: string;
  content?: string;
}

export const ManagerType = {
  superAdmin: 1,
  normalAdmin: 0,
};

export interface Manager {
  id?: number;
  username?: string;
  password?: string;
  phone?: string;
  mailbox?: string;
  isManager?: number;
}

export const educationType = [
  {
    label: '小学',
    value: '小学',
  },
  {
    label: '初中',
    value: '初中',
  },
  {
    label: '高中(中专、职高、中技等)',
    value: '高中(中专、职高、中技等)',
  },
  {
    label: '专科',
    value: '专科',
  },
  {
    label: '本科',
    value: '本科',
  },
  {
    label: '硕士',
    value: '硕士',
  },
  {
    label: '博士',
    value: '博士',
  },
  {
    label: '不限',
    value: '不限',
  },
];

export const sexType = [
  {
    label: '男',
    value: '男',
  },
  {
    label: '女',
    value: '女',
  },
]

export const freshType = [
  {
    label: '是',
    value: '是',
  },
  {
    label: '否',
    value: '否',
  },
]

export const politicsType = [
  {
    label: '共青团员',
    value: '共青团员',
  },
  {
    label: '群众',
    value: '群众',
  },
  {
    label: '中共党员（含预备党员）',
    value: '中共党员（含预备党员）',
  },

]

export const experienceType = [
  {
    label: '1年工作经验',
    value: '1年工作经验',
  },
  {
    label: '2年工作经验',
    value: '2年工作经验',
  },
  {
    label: '3年工作经验',
    value: '3年工作经验',
  },
  {
    label: '5年工作经验',
    value: '5年工作经验',
  },
  {
    label: '8年工作经验',
    value: '8年工作经验',
  },
  {
    label: '10年工作经验',
    value: '10年工作经验',
  },
]

export const countryType = [
  {
    label: '桃花坪街道',
    value: '桃花坪街道',
  },
  {
    label: '花门街道',
    value: '花门街道',
  },
  {
    label: '小沙江镇',
    value: '小沙江镇',
  },
  {
    label: '金石桥镇',
    value: '金石桥镇',
  },
  {
    label: '司门前镇',
    value: '司门前镇',
  },
  {
    label: '高平镇',
    value: '高平镇',
  },
  {
    label: '六督寨镇',
    value: '六督寨镇',
  },
  {
    label: '荷香桥镇',
    value: '荷香桥镇',
  },
  {
    label: '横板桥镇',
    value: '横板桥镇',
  },
  {
    label: '周旺镇',
    value: '周旺镇',
  },
  {
    label: '滩头镇',
    value: '滩头镇',
  },
  {
    label: '鸭田镇',
    value: '鸭田镇',
  },
  {
    label: '西洋江镇',
    value: '西洋江镇',
  },
  {
    label: '岩口镇',
    value: '岩口镇',
  },
  {
    label: '北山镇',
    value: '北山镇',
  },
  {
    label: '三阁司镇',
    value: '三阁司镇',
  },
  {
    label: '南岳庙镇',
    value: '南岳庙镇',
  },
  {
    label: '七江镇',
    value: '七江镇',
  },
  {
    label: '羊古坳镇',
    value: '羊古坳镇',
  },
  {
    label: '罗洪镇',
    value: '罗洪镇',
  },
  {
    label: '麻塘山乡',
    value: '麻塘山乡',
  },
  {
    label: '虎形山瑶族乡',
    value: '虎形山瑶族乡',
  },
  {
    label: '大水田乡',
    value: '大水田乡',
  },
  {
    label: '和田乡',
    value: '和田乡',
  },
  {
    label: '山界回族乡',
    value: '山界回族乡',
  },
]