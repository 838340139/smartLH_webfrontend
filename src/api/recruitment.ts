import axios from 'axios';
import qs from 'query-string';
import { Recruitment } from '@/types/global';

export interface RecListParams {
  orgName?: string;
  place?: string;
  education?: string;
  pageNum: number;
  size: number;
}

export interface RecListRes {
  list: Recruitment[];
  total: number;
}

export function queryRecList(params: RecListParams) {
  return axios.get<RecListRes>('/Recruitment/getRecBySearch', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function addRecruitment(params: Recruitment) {
  return axios.post('/Recruitment/addRecruitment', {
    ...params,
  });
}

export function setRecruitInfo(params: Recruitment) {
  return axios.post('/Recruitment/setRecruitInfo', {
    ...params,
  });
}

export function deleteRecruit(params: { recruitmentId: number }) {
  return axios.get('/Recruitment/deleteRecruit', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
