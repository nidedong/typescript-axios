import { AxiosInstance } from '../types'
import Axios from '../core/Axios'
import { extend } from '../helpers/utils'
import { create } from 'domain'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return (instance as any) as AxiosInstance
}

const axios = createInstance()

export default axios
