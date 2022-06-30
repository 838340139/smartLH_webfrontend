import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import {getToken} from "@/utils/auth";

export interface HttpResponse<T = unknown> {
  status: number;
  message: string;
  code: number;
  data: T;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      // @ts-ignore
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    console.log(response)
    if (
      response.headers['content-type'] !== 'application/octet-stream' &&
      res.code !== 20000 &&
      res.code !== 6
    ) {
      Message.error({
        content: res.message || 'Error',
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [10, 11, 13].includes(res.code)
      ) {
        Message.error({
          content:
            '登录失效，请重新登录！',
        });
        const userStore = useUserStore();
        userStore.logout().then(() => {
          window.location.reload();
        })
        return res;
      }
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.msg,
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
