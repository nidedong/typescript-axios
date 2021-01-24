import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  request?: any
  response?: AxiosResponse
  code?: string | null

  constructor(
    message: string,
    config: AxiosRequestConfig,
    request?: any,
    response?: AxiosResponse,
    code?: string | null
  ) {
    super(message)
    this.code = code
    this.config = config
    this.request = request
    this.response = response
    this.isAxiosError = true
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,

  response?: AxiosResponse
): AxiosError {
  return new AxiosError(message, config, request, response, code)
}
