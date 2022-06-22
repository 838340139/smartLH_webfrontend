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
  'show-total': true;
  'show-jumper': true;
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
  material?: string;
  serialNumber?: string;
  introduction?: string;
  isDeleted?: number;
}

export const AuditEnum = {
  0: '未审核',
  1: '已通过',
  2: '未通过',
  toAudit: 0,
  passAudit: 1,
  notPassAudit: 2,
};
