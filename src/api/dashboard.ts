import axios from 'axios';
import qs from 'query-string';
import { Notice, Recruitment } from '@/types/global';

export interface ContentDataRecord {
  x: string;
  y: number;
}

export function queryContentData() {
  return axios.get<ContentDataRecord[]>('/api/content-data');
}

export interface PopularRecord {
  key: number;
  clickNumber: string;
  title: string;
  increases: number;
}

export function queryPopularList(params: { type: string }) {
  return axios.get<PopularRecord[]>('/api/popular/list', { params });
}

export interface TypeCount {
  type: string;
  count: number;
}

export function getTypesCount() {
  return axios.get<TypeCount[]>('/dashboard/getTypesCount', {});
}

export interface DataSummary {
  perVisitCount: number;
  orgVisitCount: number;
  managerVisitCount: number;
  historyTotal: number;
  perCount: number;
  orgCount: number;
  recruitCount: number;
}

export function getDataSummary() {
  return axios.get<DataSummary>('/dashboard/getDataSummary', {});
}

export interface Visit {
  id: number;
  managerVisit: number;
  userVisit: number;
  orgVisit: number;
  visitTime: string;
}

export interface PeriodVisit {
  from: string;
  to: string;
  intervalDay: number;
  list: Visit[];
}

export function getRecentVisit() {
  return axios.get<PeriodVisit>('/dashboard/getRecentVisit', {});
}

export function getPopularRecruitment(params: { type: number }) {
  return axios.get<Recruitment[]>('/dashboard/getPopularRecruitment', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ToDoWork {
  toAuditOrg: number;
}

export function getToDoWork() {
  return axios.get<ToDoWork>('/dashboard/getToDoWork', {});
}

export function getRecentNotices(params: { topN: number }) {
  return axios.get<Notice[]>('/Notice/getRecentNotices', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
