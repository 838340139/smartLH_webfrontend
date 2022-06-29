import axios from 'axios';
import {RoleType, UserState} from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return {
    code:6,
    message:'',
    data:{
      token: '12345'
    }
  };
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return {
    code:6,
    message: '',
    data:{
    name: '王立群',
        avatar:
    '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        email: 'wangliqun@email.com',
      job: 'frontend',
      jobName: '前端艺术家',
      organization: 'Frontend',
      organizationName: '前端',
      location: 'beijing',
      locationName: '北京',
      introduction: '人潇洒，性温存',
      personalWebsite: 'https://www.arco.design',
      phone: '150****0000',
      registrationDate: '2013-05-10 12:10:00',
      accountId: '15012312300',
      certification: 1,
      role: 'admin',
    }
  }
};
