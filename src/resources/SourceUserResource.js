import { SourceUserResource } from './'

export default {
  modifyUserInfo: (params, id) =>
    SourceUserResource.put(`/user/api/v1.0/users/${id}`, {
      ...params
    }),
  addUser: params =>
    SourceUserResource.post('/user/api/v1.0/users', {
      ...params
    }),
  modifyPassword: params =>
    SourceUserResource.post('/user/api/v1.0/password', {
      ...params
    }),
  delUser: id => SourceUserResource.delete(`/user/api/v1.0/users/${id}`),
  delUser2: id => SourceUserResource.delete(`/group/api/v1.0/groups/${id}`),
  delUser3: id => SourceUserResource.delete(`/selector/api/v1.0/selectors/${id}`),
  queryUsers: () => SourceUserResource.get('/user/api/v1.0/users'),
  queryUserGroup: () => SourceUserResource.get('/group/api/v1.0/groups'),
  queryUserPower: () => SourceUserResource.get('/selector/api/v1.0/selectors'),
  addUserGroup: params =>
    SourceUserResource.post('/group/api/v1.0/groups', {
      ...params
    }),
  modifyUserGroup: (params, id) =>
    SourceUserResource.put(`/group/api/v1.0/groups/${id}`, {
      ...params
    }),
  addUserJurisdiction: params =>
    SourceUserResource.post('/selector/api/v1.0/selectors', {
      ...params
    }),
  modifyUserJurisdiction: (params, id) =>
    SourceUserResource.put(`/selector/api/v1.0/selectors${id}`, {
      ...params
    })
}
