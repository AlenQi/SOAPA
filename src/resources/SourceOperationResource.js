import { SourceOperationResource } from './'

export default {
  // experts
  querySecurityField: params =>
    SourceOperationResource.get('/ops/api/v1.0/sec_field_types', {
      params: {
        ...params
      }
    }),
  queryRuleList: params =>
    SourceOperationResource.get('/log_an/api/v1.0/ops/rule/types', {
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
  queryLoginExpertList: id => SourceOperationResource.get(`/log_an/api/v1.0/log/experts/${id}`),
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
  delExpert: id => SourceOperationResource.delete(`/ops/api/v1.0/experts/${id}`),

  // event
  queryEventList: params =>
    SourceOperationResource.get('/ops/api/v1.0/solutions', {
      params: {
        ...params
      }
    }),
  addEvent: params =>
    SourceOperationResource.post('/ops/api/v1.0/solutions', {
      ...params
    }),
  delEvent: id => SourceOperationResource.delete(`/ops/api/v1.0/solutions/${id}`),
  modifyEvent: (params, id) =>
    SourceOperationResource.put(`/ops/api/v1.0/solutions/${id}`, {
      ...params
    }),

  // agent
  queryAgentList: params =>
    SourceOperationResource.get('/ops/api/v1.0/agents', {
      params: {
        ...params
      }
    }),
  queryAgentDetails: id => SourceOperationResource.get(`/ops/api/v1.0/agents/${id}`),
  queryAgentKey: agent_id => SourceOperationResource.get(`/ops/api/v1.0/agents/${agent_id}?key`),
  addAgent: params =>
    SourceOperationResource.post('/ops/api/v1.0/agents', {
      ...params
    }),
  delAgent: agent_id => SourceOperationResource.delete(`/ops/api/v1.0/agents/${agent_id}`),
  restartAllAgent: () => SourceOperationResource.put('/ops/api/v1.0/agents'),
  restartPartAgent: params =>
    SourceOperationResource.post('/ops/api/v1.0/agents?restart=yes', {
      ...params
    }),
  queryAgentSummary: id => SourceOperationResource.get('/ops/api/v1.0/agents/summary'),
  queryAgentOS: () => SourceOperationResource.get('/ops/api/v1.0/agents/summary?os'),
  applyAgentRule: () => SourceOperationResource.put('/ops/api/v1.0/agents/rules/apply'),

  // 系统配置
  querySystemConfList: params => SourceOperationResource.get('/ops/api/v1.0/conf'),
  addSystemConf: params =>
    SourceOperationResource.post('/ops/api/v1.0/conf', {
      ...params
    }),
  modifySystemConf: (params, id) =>
    SourceOperationResource.put(`/ops/api/v1.0/conf/${id}`, {
      ...params
    }),
  delSystemConf: id => SourceOperationResource.delete(`/ops/api/v1.0/conf/${id}`)
}
