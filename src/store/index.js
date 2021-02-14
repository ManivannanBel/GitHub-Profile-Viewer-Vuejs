import Vuex from "vuex";
import Vue from "vue";
import search from "./modules/search";
import profile from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search,
    profile
  }
});
