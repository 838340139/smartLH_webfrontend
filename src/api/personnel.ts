import axios from 'axios';
import qs from 'query-string';
import { Personnel } from '@/types/global';

export interface PerListParams {
  userName?: string;
  sex?: string;
  subject?: string;
  academic?: string;
  fresh?: number;
  politics?: string;
  pageNum: number;
  size: number;
}

export interface PerListRes {
  list: Personnel[];
  total: number;
}

// export interface QueryAuditParams {
//   auditState: number;
//   orgName: string | undefined;
//   pageNum?: number;
//   size?: number;
// }

// export function getTypes() {
//   return axios.get<[string]>('/Organization/getTypes');
// }

export function queryPerList(params: PerListParams) {
  return axios.get<PerListRes>('/User/getUserBySearch', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

// export function addPer(params: Personnel) {
//   return axios.post('/User/addOrg', {
//     ...params
//   });
// }

export function setUserInfo(params: Personnel) {
  return axios.post('/User/setUserInfo', {
    ...params
  });
}

// export function getAuditOrgs(params: QueryAuditParams) {
//   return axios.get('/Organization/getOrgByAudit', {
//     params,
//     paramsSerializer: (obj) => {
//       return qs.stringify(obj);
//     },
//   });
// }

// export function auditOrg(params: { orgId: number; audit: number }) {
//   return axios.get('/Organization/auditOrg', {
//     params,
//     paramsSerializer: (obj) => {
//       return qs.stringify(obj);
//     },
//   });
// }
export function deleteUser(params: { userId: number }) {
  return axios.get('/User/deleteUser', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
