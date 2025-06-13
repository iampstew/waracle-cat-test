import axios from 'axios'
import { useGlobal } from '@/composables/useGlobal'
const { baseUrl, apiKey } = useGlobal();

export const baseApi = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey
  }
});