import axios from 'axios'
import Interceptor, { BASE_URL } from 'conf/interceptor'

axios.defaults.timeout = 180000

const resources = {
  SourceLoginResource: axios.create({
    baseURL: BASE_URL
  }),
  SourceBlogsResource: axios.create({
    baseURL: BASE_URL
  }),
  SourceHomeResource: axios.create({
    baseURL: BASE_URL
  }),
  SourceOperationResource: axios.create({
    baseURL: BASE_URL
  }),
  SourceUserResource: axios.create({
    baseURL: BASE_URL
  })
}

const interceptor = new Interceptor({ progress: true })

for (const key of Object.keys(resources)) {
  resources[key].interceptors.request.use(...interceptor.beforeRequest)
  resources[key].interceptors.response.use(...interceptor.afterResponse)
}

export const {
  SourceLoginResource,
  SourceBlogsResource,
  SourceHomeResource,
  SourceOperationResource,
  SourceUserResource
} = resources
