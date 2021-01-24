import { isDate, isPlainObject } from './utils'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, data?: any): string {
  if (!data) return url
  const parts: string[] = []
  Object.keys(data).map(key => {
    // 为空值
    const val = data[key]
    if (val === null || val === undefined) return

    //为数组
    let values = []
    if (Array.isArray(val)) {
      values = val
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializeParams = parts.join('&')

  if (serializeParams) {
    const markIndex = url.indexOf('#') // 丢弃哈希
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams // 保留原带有参数的url
  }

  return url
}
