import { RejectFn, ResolveFn, Interceptor } from '../types'

export default class InterceptorManager<T> {
  private interceptor: Array<Interceptor<T> | null>

  constructor() {
    this.interceptor = []
  }

  use(resolve: ResolveFn<T>, reject?: RejectFn): number {
    this.interceptor.push({
      resolve,
      reject
    })
    return this.interceptor.length - 1
  }

  eject(id: number) {
    if (this.interceptor[id]) {
      this.interceptor[id] = null
    }
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptor.forEach(interceptor => {
      interceptor !== null && fn(interceptor)
    })
  }
}
