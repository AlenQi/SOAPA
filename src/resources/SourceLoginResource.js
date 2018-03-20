import { SourceLoginResource } from './'

export default {
  handleLogin: params =>
    SourceLoginResource.post('/api/login', {
      ...params
    })
}
