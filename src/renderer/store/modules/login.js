const state = {
  loginUser: {
    username: localStorage.getItem('username'),
    loginType: 'login'
  }
}

const mutations = {
  CHANGE_LOGINTYPE (state, type) {
    state.loginUser.loginType = type
  }
}

const actions = {
  changeLoginType ({ commit }, type) {
    // do something async
    commit('CHANGE_LOGINTYPE', type)
  }
}

export default {
  state,
  mutations,
  actions
}
