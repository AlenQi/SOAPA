import nprogress from 'nprogress'
import { Button, Table } from 'iview'
import { AssetsIP } from 'conf/url.conf'

class Interceptor {
  constructor({
    progress = false,
    configure = {},
    beforeRequest = [],
    afterResponse = []
  } = {}) {
    progress && this.progressInit(configure)

    this.beforeRequest = [
      config => {
        progress && this.progressStart()
        if (beforeRequest[0]) {
          beforeRequest[0](config)
        } else {
          return config
        }
      },
      error => {
        progress && this.progressStop()
        if (beforeRequest[1]) {
          beforeRequest[1](error)
        } else {
          return Promise.reject(error)
        }
      }
    ]

    this.afterResponse = [
      response => {
        progress && this.progressStop()
        if (afterResponse[0]) {
          afterResponse[0](response)
        } else {
          // if (response.data.status.code === 16149) {
          //   const error = response.data.status
          //   window.location.href = '/login'
          //   return Promise.reject(error)
          // }
          return response
          // if (!response.data.status) {
          //   const error = response.data
          //   Message.error({ content: error.desc })
          //   return Promise.reject(error)
          // } else {
          // }
        }
      },
      ...error => {
        progress && this.progressStop()
        if (afterResponse[1]) {
          afterResponse[1](error)
        } else {
          return Promise.reject(error)
        }
      }
    ]
  }

  progressStart() {
    nprogress.start()
  }

  progressStop() {
    nprogress.done()
  }

  progressInit(configure) {
    nprogress.configure({ showSpinner: false, configure })
  }
}

const BASE_URL = AssetsIP

export { BASE_URL }
export default Interceptor
