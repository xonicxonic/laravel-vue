import Vue from "vue";
import Vuex from "vuex";
import ToDosModule from './todo-module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ToDosModule
  }
})