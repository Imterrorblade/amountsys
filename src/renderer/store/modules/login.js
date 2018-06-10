const state = {
  loginUser: {
    username: localStorage.getItem('username'),
    loginType: 'login'
  }
}

const mutations = {
  CHANGE_LOGINTYPE (state, type) {
    state.loginUser.loginType = type
  },
  LOGIN (state, user) {
    state.loginUser.username = user.username
    localStorage.setItem('username', user.username)
  },
  LOGIN_OUT (state) {
    state.loginUser.username = ''
    localStorage.setItem('username', '')
  }
}

const actions = {
  changeLoginType ({ commit }, type) {
    // do something async
    commit('CHANGE_LOGINTYPE', type)
  },
  login ({commit}, user) {
    commit('LOGIN', user)
  },
  loginOut ({commit}) {
    commit('LOGIN_OUT')
  }
}
const getters = {
  loginUser (state) {
    return state.loginUser
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
