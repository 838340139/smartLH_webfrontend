import axios from 'axios';
import qs from 'query-string';
import { Notice, Personnel } from '@/types/global';

export interface SendNoticeParams{
  notice: Notice;
  receiverIds?: number[];
}

export function sendMessage(params: SendNoticeParams) {
  return axios.post('/Notice/sendMessage', {
    ...params,
  });
}

export interface QueryPersonnelParams {
  size: number;
  pageNum: number;
  userName?: string;
  phone?: string;
}

export interface QueryPersonnelRes {
  list: Personnel[];
  total: number;
  hasNextPage: boolean;
};

export function getUserBySearch(params: QueryPersonnelParams) {
  return axios.get<QueryPersonnelRes>('/User/getUserBySearch', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface QueryNoticeParams{
  size: number;
  pageNum: number;
  title: string;
};

export interface QueryNoticeRes{
  list: Notice[];
  total: number;
  hasNextPage: boolean;
  pages: number;
  pageSize: number;
  size: number;
}

export function getNotices(params: QueryNoticeParams) {
  return axios.get<QueryNoticeRes>('/web/getNotices', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function deleteNotices(params: { noticeId: number }) {
  return axios.get<QueryNoticeRes>('/Notice/delete', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}