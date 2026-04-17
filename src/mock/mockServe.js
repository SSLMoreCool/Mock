import banner from './banner.json'
import floor from './floor.json'

// 本地 mock 路由表（路径 → 响应数据）
const mockRoutes = {
  '/mock/banner': { code: 200, data: banner },
  '/mock/floor': { code: 200, data: floor }
}

// 拦截 XMLHttpRequest，对匹配 /mock/* 的请求返回本地 JSON
const OriginalXHR = window.XMLHttpRequest

class MockXHR extends OriginalXHR {
  open(method, url, ...rest) {
    this._mockUrl = typeof url === 'string' ? url : url?.toString()
    return super.open(method, url, ...rest)
  }

  send(body) {
    const matched = Object.keys(mockRoutes).find(
      (key) => this._mockUrl && this._mockUrl.endsWith(key)
    )
    if (matched) {
      // Simulate an async response so callers behave the same as real XHR
      setTimeout(() => {
        Object.defineProperty(this, 'status', { value: 200, writable: false })
        Object.defineProperty(this, 'statusText', { value: 'OK', writable: false })
        Object.defineProperty(this, 'responseText', {
          value: JSON.stringify(mockRoutes[matched]),
          writable: false
        })
        Object.defineProperty(this, 'response', {
          value: JSON.stringify(mockRoutes[matched]),
          writable: false
        })
        Object.defineProperty(this, 'readyState', { value: 4, writable: false })
        this.dispatchEvent(new Event('readystatechange'))
        this.dispatchEvent(new Event('load'))
        this.dispatchEvent(new Event('loadend'))
      }, 0)
    } else {
      return super.send(body)
    }
  }
}

window.XMLHttpRequest = MockXHR
