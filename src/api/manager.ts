import axios from 'axios';
import { RoleType, UserState } from '@/store/modules/user/types';
import { Manager } from '@/types/global';
import qs from 'query-string';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
  manager: Manager;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/web/login', {
    ...data,
  });
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.get<Manager>('/web/getInfo', {});
}

export function setInfo(data: Manager) {
  return axios.post('/web/setInfo', {
    ...data,
  });
}

export function addManager(data: Manager) {
  return axios.post('/Manager/addManager', {
    ...data,
  });
}

export function deleteManager(params: { id: number }) {
  return axios.get('/Manager/deleteManager', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getAll() {
  return axios.get<Manager[]>('/Manager/getAll', {});
}
