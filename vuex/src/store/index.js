import Vue from 'vue'
import Vuex from '../vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 10
  },
  getters: {
    addAge (state) {
      return state.age + 3
    }
  },
  mutations: {
    syncChange (state, payload) {
      state.age += payload
    }
  },
  actions: {
    asyncChange ({ commit }, paload) {
      setTimeout(() => {
        commit('syncChange', paload)
      }, 1000)
    }
  },
  modules: {
  }
})
