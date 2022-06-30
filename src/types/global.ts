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
  orgName?: string;
  position?: string;
  number?: number;
  age?: number;
  subject?: string;
  fresh?: string;
  education?: string;
  place?: string;
  politics?: string;
  remark?: string;
  publishTime?: string;
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
