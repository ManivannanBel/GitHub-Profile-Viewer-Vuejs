import axios from "axios";

const state = {
  profileDetails: {},
  apiLoading: false
};
const getters = {
  profileDetails: state => state.profileDetails,
  apiLoading: state => state.apiLoading
};
const mutations = {
  setProfileDetails: (state, profile) =>
    (state.profileDetails = {
      ...state.profileDetails,
      [profile.login]: profile
    }),
  setApiLoading: (state, apiLoading) => (state.apiLoading = apiLoading)
};

const actions = {
  getProfile({ commit }, loginId) {
    commit("setApiLoading", true);
    axios
      .get(`https://api.github.com/users/${loginId}`)
      .then(response => {
        commit("setProfileDetails", response.data);
        commit("setApiLoading", false);
      })
      .catch(err => {
        commit("setApiLoading", false);
        console.log(err);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
