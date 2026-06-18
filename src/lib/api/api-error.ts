import { isAxiosError } from 'axios'

import type { ApiError } from '@/types/api.types'

const FRIENDLY_LOGIN_ERROR = 'E-mail ou senha inválidos. Verifique os dados e tente novamente.'
const FRIENDLY_GENERIC_ERROR = 'Não foi possível concluir a operação. Tente novamente em instantes.'
const FRIENDLY_REGISTER_ERROR =
  'Não foi possível concluir o cadastro. Verifique os dados informados e tente novamente.'
const FRIENDLY_NETWORK_ERROR = 'Não foi possível conectar ao servidor. Verifique sua conexão.'

function extractApiMessage(error: unknown): string | undefined {
  if (!isAxiosError(error)) {
    return undefined
  }

  const data = error.response?.data as ApiError | undefined
  return data?.message
}

function isSensitiveMessage(message: string): boolean {
  const lower = message.toLowerCase()

  return (
    lower.includes('token') ||
    lower.includes('jwt') ||
    lower.includes('sql') ||
    lower.includes('stack') ||
    lower.includes('internal server')
  )
}

export function getLoginErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return FRIENDLY_GENERIC_ERROR
  }

  if (!error.response) {
    return FRIENDLY_NETWORK_ERROR
  }

  return FRIENDLY_LOGIN_ERROR
}

export function getRegisterErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return FRIENDLY_REGISTER_ERROR
  }

  if (!error.response) {
    return FRIENDLY_NETWORK_ERROR
  }

  const status = error.response.status
  const message = extractApiMessage(error)

  if (status === 409) {
    return 'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.'
  }

  if (message && !isSensitiveMessage(message)) {
    return FRIENDLY_REGISTER_ERROR
  }

  return FRIENDLY_REGISTER_ERROR
}

const FRIENDLY_TICKET_CONFLICT =
  'Um ou mais ingressos selecionados não estão mais disponíveis. Atualize a seleção e tente novamente.'
const FRIENDLY_CUSTOMER_ONLY = 'Esta operação está disponível apenas para contas de cliente.'

export function getTicketOperationErrorMessage(
  error: unknown,
  fallback = FRIENDLY_GENERIC_ERROR
): string {
  if (!isAxiosError(error)) {
    return fallback
  }

  if (!error.response) {
    return FRIENDLY_NETWORK_ERROR
  }

  const status = error.response.status
  const message = extractApiMessage(error)

  if (status === 409) {
    return FRIENDLY_TICKET_CONFLICT
  }

  if (status === 400 && message?.toLowerCase().includes('customer')) {
    return FRIENDLY_CUSTOMER_ONLY
  }

  if (status === 404) {
    return 'Ingresso não encontrado. Atualize a página e tente novamente.'
  }

  return fallback
}

export function getApiErrorMessage(error: unknown, fallback = FRIENDLY_GENERIC_ERROR): string {
  if (!isAxiosError(error)) {
    return fallback
  }

  if (!error.response) {
    return FRIENDLY_NETWORK_ERROR
  }

  const message = extractApiMessage(error)

  if (message && !isSensitiveMessage(message)) {
    return fallback
  }

  return fallback
}
