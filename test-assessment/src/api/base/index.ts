import { useGlobal } from '@/composables/useGlobal';
import axios from 'axios';

export const baseApi = axios.create({
  baseURL: useGlobal().baseUrl
});