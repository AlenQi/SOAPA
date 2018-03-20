import { SourceHomeResource } from './'

export default {
  queryAssetList: params =>
    SourceHomeResource.get('/asset/api/v1.0/assets', {
      params: {
        ...params
      }
    }),
  addAssetInfo: (params) =>
    SourceHomeResource.post('/asset/api/v1.0/assets', {
      ...params
    }),
  modifyAssetInfo: (params, urlParams) =>
    SourceHomeResource.put(`/asset/api/v1.0/assets/${urlParams}`, {
      ...params
    }),
  delAssetInfo: (urlParams) =>
    SourceHomeResource.delete(`/asset/api/v1.0/assets/${urlParams}`),
}
