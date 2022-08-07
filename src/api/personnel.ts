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

export function queryPerList(params: PerListParams) {
  return axios.get<PerListRes>('/User/getUserBySearch', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function setUserInfo(params: Personnel) {
  return axios.post('/User/setUserInfo', {
    ...params,
  });
}

export function addUser(params: Personnel) {
  return axios.post('/User/addUser', {
    ...params
  });
}
export function exportExcel(params: PerListParams) {
  return axios.get('/User/exportExcel', {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    responseType: 'blob',
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function exportExcelTemplate(params: any) {
  return axios.get('/User/exportExcelTemplate', {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    responseType: 'blob',
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function deleteUser(params: { userId: number }) {
  return axios.get('/User/deleteUser', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
