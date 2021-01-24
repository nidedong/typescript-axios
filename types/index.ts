import { rejects } from 'assert'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosResponsePromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  interceptors: Interceptors

  request<T = any>(config: AxiosRequestConfig): AxiosResponsePromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosResponsePromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosResponsePromise<T>
}

export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}
export interface Interceptor<T> {
  resolve: ResolveFn<T>
  reject?: RejectFn
}
export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number

  eject(id: number): void

  forEach(fn: (interceptor: Interceptor<T>) => void): void
}

export interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}
