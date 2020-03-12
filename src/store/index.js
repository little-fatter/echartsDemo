import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import dashboard from './modules/dashboard'
import assist from './modules/assist'
import getters from './getters'

Vue.use(Vuex)

/**
 * 定义应用的store
 */
export default new Vuex.Store({
  modules: {
    app,
    dashboard,
    assist
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
