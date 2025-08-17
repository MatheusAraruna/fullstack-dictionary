import axios from 'axios'
import { config } from '../config'
import { getToken } from '../utils/token'

export const api = axios.create({
  baseURL: config.api.baseUrl
})

api.interceptors.request.use((request) => {
  const token = getToken()
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }
  return request
})