import axios from 'axios';
import qs from 'query-string';
import { Options } from '@/types/global';

export interface Organization {
  id: number;
  type?: string;
  name: string;
  address: string;
  phone: string;
  audit: number;
  material: string;
  serialNumber: string;
  introduction: string;
  isDeleted: number;
}

export interface OrgListParams{
  orgType?: string;
  orgName?: string;
  orgAddress?: string;
  pageNum: number;
  size: number;
}

export interface OrgListRes {
  list: Organization[];
  total: number;
}

export function queryOrgList(params: OrgListParams) {
  return axios.get<OrgListRes>('/Organization/getOrgBySearch', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}