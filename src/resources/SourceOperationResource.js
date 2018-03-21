import { SourceOperationResource } from './'

export default {
  querySecurityField: params =>
    SourceOperationResource.get('/ops/api/v1.0/sec_field_types', {
      params: {
        ...params
      }
    }),
  queryExpertList: params =>
    SourceOperationResource.get('/ops/api/v1.0/experts', {
      params: {
        ...params
      }
    }),
  searchExpertList: params =>
    SourceOperationResource.post('/ops/api/v1.0/search/experts', {
      ...params
    }),
  addExpert: params =>
    SourceOperationResource.post('/ops/api/v1.0/experts', {
      ...params
    }),
  modifyExpert: (params, id) =>
    SourceOperationResource.put(`/ops/api/v1.0/experts/${id}`, {
      ...params
    }),
  delExpert: id =>
    SourceOperationResource.delete(`/ops/api/v1.0/experts/${id}`)
}
