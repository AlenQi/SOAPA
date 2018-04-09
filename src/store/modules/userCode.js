import * as types from '../mutation-type/userCodeTypes'
import { AssetsIP } from 'conf/url.conf'

const state = {
  url: AssetsIP,
  inspId: null
}

const actions = {
  setInspId({ commit, state }, params) {
    commit(types.SET_INSP_ID, { params })
  }
}

const mutations = {
  [types.SET_INSP_ID](state, { params }) {
    state.inspId = params
  }
}

export default {
  state,
  actions,
  mutations
}
