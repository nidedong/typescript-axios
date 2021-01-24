import { AxiosRequestConfig, AxiosResponse, AxiosResponsePromise } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosResponsePromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout = 0 } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.timeout = timeout

    request.open(method.toUpperCase(), url, true)

    request.onerror = function handleError() {
      reject(createError('NETWORK Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`TIMEOUT IN ${timeout}`, config, 'ECONNABORTED', request))
    }

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) return

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)

      function handleResponse(res: AxiosResponse): void {
        if (res.status >= 200 && res.status < 300) {
          resolve(res)
        } else {
          reject(
            createError(`request failed with code ${res.status}`, config, null, request, response)
          )
        }
      }
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toUpperCase() === 'Content-Type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
