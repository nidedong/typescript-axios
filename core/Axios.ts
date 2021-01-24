import {
  Method,
  AxiosResponse,
  AxiosResponsePromise,
  AxiosRequestConfig,
  ResolveFn,
  RejectFn,
  Interceptors
} from '../types'
import dispatchRequest from './diaptchRequest'
import interceptorManager from '../core/axiosInterceptorManager'

interface PromiseChain {
  resolve: ResolveFn | ((config: AxiosRequestConfig) => AxiosResponsePromise)
  reject?: RejectFn
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new interceptorManager<AxiosRequestConfig>(),
      response: new interceptorManager<AxiosResponse>()
    }
  }
  request(url: string, config?: AxiosRequestConfig): AxiosResponsePromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const promiseChain: PromiseChain[] = [
      {
        resolve: dispatchRequest
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      promiseChain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      promiseChain.push(interceptor)
    })
    let promise = Promise.resolve(config)

    while (promiseChain.length) {
      const { resolve, reject } = promiseChain.shift()!
      promise = promise.then(resolve, reject)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this._requestMethodWithoutData('GET', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosResponsePromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(url, Object.assign({ method, url, data }, config))
  }
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(url, Object.assign({ method, url }, config))
  }
}
