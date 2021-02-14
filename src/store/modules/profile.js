import axios from "axios";

const state = {
  profileDetails: {},
  pinnedRepositories: {},
  profileApiLoading: false
};
const getters = {
  profileDetails: state => state.profileDetails,
  profileApiLoading: state => state.profileApiLoading,
  pinnedRepositories: state => state.pinnedRepositories
};
const mutations = {
  setProfileDetails: (state, profile) =>
    (state.profileDetails = {
      ...state.profileDetails,
      [profile.login]: profile
    }),
  setProfileApiLoading: (state, profileApiLoading) =>
    (state.profileApiLoading = profileApiLoading),
  setPinnedRepositories: (state, payload) =>
    (state.pinnedRepositories = {
      ...state.pinnedRepositories,
      [payload.loginId]: payload.pinnedRepositories
    })
};

const actions = {
  getProfile({ commit }, loginId) {
    commit("setProfileApiLoading", true);
    axios
      .get(`https://api.github.com/users/${loginId}`)
      .then(response => {
        commit("setProfileDetails", response.data);
        commit("setProfileApiLoading", false);
      })
      .catch(err => {
        commit("setProfileApiLoading", false);
        console.log(err);
      });
  },
  getPinnedRepositories({ commit }, loginId) {
    axios
      .get(`https://gh-pinned-repos-5l2i19um3.vercel.app/?username=${loginId}`)
      .then(response => {
        commit("setPinnedRepositories", {
          loginId,
          pinnedRepositories: response.data
        });
      })
      .catch(err => {
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
