import axios from 'axios';
import { RoleType, UserState } from '@/store/modules/user/types';
import {Manager, WxOrg} from '@/types/global';
import qs from 'query-string';


export function setInfo(data: WxOrg) {
  return axios.post('/WxOrg/setInfo', {
    ...data,
  });
}

export function addManager(data: WxOrg) {
  return axios.post('/WxOrg/addWxOrg', {
    ...data,
  });
}

export function deleteManager(params: { wxOrgId: number }) {
  return axios.get('/WxOrg/deleteWxOrg', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getByOrgId(params: { orgId: number }) {
  return axios.get('/WxOrg/getByOrgId', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
