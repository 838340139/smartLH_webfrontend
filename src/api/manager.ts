import axios from 'axios';
import { RoleType, UserState } from '@/store/modules/user/types';
import {Manager} from "@/types/global";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
  manager: Manager
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/Manager/login', {
    ...data,
  });
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.get<Manager>('/Manager/getInfo', {});
}

export function setInfo(data: Manager) {
  return axios.post('/Manager/setInfo', {
    ...data
  });
}

export function addManager(data: Manager) {
  return axios.post('/Manager/addManager', {
    ...data
  });
}
