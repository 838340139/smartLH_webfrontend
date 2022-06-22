import axios from 'axios';
import qs from 'query-string';
import { Organization } from '@/types/global';

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

export interface QueryAuditParams {
  audit: number;
}

export function getTypes() {
  return axios.get<[string]>('/Organization/getTypes');
}

export function queryOrgList(params: OrgListParams) {
  return axios.get<OrgListRes>('/Organization/getOrgBySearch', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function addOrg(params: Organization) {
  return axios.post('/Organization/addOrg', {
    ...params
  });
}

export function setOrgInfo(params: Organization) {
  return axios.post('/Organization/setOrgInfo', {
    ...params
  });
}

export function getAuditOrgs(params: QueryAuditParams) {
  return axios.get('/Organization/getAuditOrgs', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
