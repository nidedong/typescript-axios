import { AxiosRequestConfig, AxiosResponse, AxiosResponsePromise } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { transFormRequest } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { transFormResponse } from '../helpers/data'
function dispatchRequest(config: AxiosRequestConfig): AxiosResponsePromise {
  processConfig(config)
  return xhr(config).then(res => transFormResponseData(res))
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transfromUrl(config)
  config.headers = transFormHeader(config)
  config.data = transFormRequestData(config)
}

function transfromUrl(config: AxiosRequestConfig) {
  const { url, data } = config
  return buildUrl(url, data)
}

function transFormRequestData(config: AxiosRequestConfig) {
  return transFormRequest(config.data)
}

function transFormHeader(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transFormResponseData(response: AxiosResponse): AxiosResponse {
  response.data = transFormResponse(response.data)
  return response
}

export default dispatchRequest
