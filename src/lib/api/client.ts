import axios from 'axios'

import { getAccessToken, removeAccessToken } from '@/features/auth/storage/auth-storage'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://ticket-sales-3su2.onrender.com'

const PUBLIC_AUTH_PATHS = ['/auth/login', '/customers/register', '/partners/register']

function isPublicAuthPath(url?: string): boolean {
  if (!url) {
    return false
  }

  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path))
}

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30_000
})

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token && !isPublicAuthPath(config.url)) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      if (!isPublicAuthPath(error.config?.url)) {
        removeAccessToken()

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('auth:unauthorized'))
        }
      }
    }

    return Promise.reject(error)
  }
)

export { API_URL }
