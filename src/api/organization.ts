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
  auditState: number;
  orgName: string | undefined;
  pageNum?:  number;
  size?:  number;
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
  return axios.get('/Organization/getOrgByAudit', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function auditOrg(params: { orgId: number; audit: number }) {
  return axios.get('/Organization/auditOrg', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function deleteOrg(params: { orgId: number }) {
  return axios.get('/Organization/deleteOrg', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
