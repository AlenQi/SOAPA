import { SourceBlogsResource } from './'

export default {
  searchBlogInfo: (params, urlParams) =>
    SourceBlogsResource.post(`/log_an/api/v1.0/log/logs${urlParams}`, {
      ...params
    }),
  queryBlogList: params =>
    SourceBlogsResource.get('/log_an/api/v1.0/log/logs', {
      params: {
        ...params
      }
    }),
  queryBlogDetail: id => SourceBlogsResource.get(`/log_an/api/v1.0/log/logs/${id}`),
  modifyBlogStatus: log_id => SourceBlogsResource.put(`/log_an/api/v1.0/log/logs/${log_id}`)
}
