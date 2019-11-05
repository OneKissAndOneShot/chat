import Vue from "vue";
import Vuex from "vuex";
import scoket from './modules/scoket';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    scoket
  }
});

export default store;
