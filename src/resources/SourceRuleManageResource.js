import { SourceRuleManageResource } from './'

export default {
  queryRuleDetail: id => SourceRuleManageResource.get(`/log_an/api/v1.0/rule/rules/${id}`),
  queryRuleList: (params) =>
    SourceRuleManageResource.get('/log_an/api/v1.0/rule/types', {
      params: {
        ...params
      }
    }),
  addRules: params =>
    SourceRuleManageResource.post('/log_an/api/v1.0/rule/types', {
      ...params
    }),
  delRule: id => SourceRuleManageResource.delete(`/log_an/api/v1.0/rule/types/${id}`)
}
