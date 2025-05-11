import axios from 'axios'

import { getItem, MMKV_KEYS } from '@Storage'

const axiosClient = axios.create({
  baseURL: 'your_baseUrl',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await getItem(MMKV_KEYS.ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('API Error:', error?.response?.data || error.message)
    return Promise.reject(error?.response?.data || error)
  }
)

export default axiosClient