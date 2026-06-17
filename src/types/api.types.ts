export interface ApiError {
  message: string
}

export interface LoginResponse {
  token: string
}

export interface HealthResponse {
  status: string
  database: string
  timestamp: string
}
