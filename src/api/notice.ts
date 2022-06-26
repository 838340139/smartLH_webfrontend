import axios from 'axios';
import qs from 'query-string';
import { Notice } from '@/types/global';

export interface SendNoticeParams{
  notice: Notice,
  receiverIds?: number[]
};

export function sendMessage(params: SendNoticeParams) {
  return axios.post('/Notice/sendMessage', {
    ...params
  });
}