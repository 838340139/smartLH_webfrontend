import axios from 'axios';
import qs from 'query-string';


export function getByRecruitmentId(params: { recruitmentId: number }) {
  return axios.get<any>('/ResumeDeliver/getByRecruitmentId', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getByDeliverId(params: { deliverId: number }) {
  return axios.get<any>('/ResumeDeliver/getByDeliverId', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function cancel(params: { resumeDeliverId: number }) {
  return axios.get<any>('/ResumeDeliver/cancel', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}