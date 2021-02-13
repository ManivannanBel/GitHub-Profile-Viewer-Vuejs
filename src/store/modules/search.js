import axios from "axios";

const state = {
  searchResults: [],
  resultCount: 0,
  pageNo: 1,
  currentSearchQuery: "",
  perPage: 10
};

const getters = {
  searchResults: state => state.searchResults,
  resultCount: state => state.resultCount,
  pageNo: state => state.pageNo,
  currentSearchQuery: state => state.currentSearchQuery,
  perPage: state => state.perPage
};

const actions = {
  searchUsers({ commit }, searchQuery) {
    axios
      .get("https://api.github.com/search/users", {
        params: { q: searchQuery, per_page: state.perPage, page: 1 }
      })
      .then(response => {
        commit("setSearchResults", response.data.items);
        commit("setResultCount", response.data.total_count);
        commit("setPageNo", state.pageNo + 1);
        commit("setCurrentSearchQuery", searchQuery);
      })
      .catch(err => {
        console.log(err);
      });
  },
  searchMoreUsers({ commit }) {
    axios
      .get("https://api.github.com/search/users", {
        params: {
          q: state.currentSearchQuery,
          per_page: state.perPage,
          page: state.pageNo
        }
      })
      .then(response => {
        commit("updateSearchResults", response.data.items);
        commit("setPageNo", state.pageNo + 1);
        commit("setResultCount", response.data.total_count);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const mutations = {
  setSearchResults: (state, searchResults) =>
    (state.searchResults = searchResults),
  updateSearchResults: (state, searchResults) =>
    (state.searchResults = [...state.searchResults, ...searchResults]),
  setPageNo: (state, pageNo) => (state.pageNo = pageNo),
  setResultCount: (state, resultCount) => (state.resultCount = resultCount),
  setCurrentSearchQuery: (state, currentSearchQuery) =>
    (state.currentSearchQuery = currentSearchQuery)
};

export default {
  state,
  getters,
  actions,
  mutations
};
