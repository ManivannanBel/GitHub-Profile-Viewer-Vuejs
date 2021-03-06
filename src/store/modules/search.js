import axios from "axios";

const state = {
  searchResults: [],
  resultCount: 0,
  pageNo: 1,
  currentSearchQuery: "",
  perPage: 10,
  apiLoading: false
};

const getters = {
  searchResults: state => state.searchResults,
  resultCount: state => state.resultCount,
  pageNo: state => state.pageNo,
  currentSearchQuery: state => state.currentSearchQuery,
  perPage: state => state.perPage,
  apiLoading: state => state.apiLoading
};

const actions = {
  searchUsers({ commit }, searchQuery) {
    //Set apiLoading to true, to block multiple request calls onscroll
    commit("setApiLoading", true);
    //Make api request
    axios
      .get("https://api.github.com/search/users", {
        params: { q: searchQuery, per_page: state.perPage, page: 1 }
      })
      .then(response => {
        //Update result list
        commit("setSearchResults", response.data.items);
        //Store the item count
        commit("setResultCount", response.data.total_count);
        //Update page number
        commit("setPageNo", ++state.pageNo);
        //Set the search query and use it for lazyloading searchquery
        commit("setCurrentSearchQuery", searchQuery);
        //Release the api call lock
        commit("setApiLoading", false);
      })
      .catch(err => {
        console.log(err);
        //Release the api call lock
        commit("setApiLoading", false);
      });
  },
  searchMoreUsers({ commit }) {
    //Set apiLoading to true, to block multiple request calls onscroll
    commit("setApiLoading", true);
    //Make api request
    axios
      .get("https://api.github.com/search/users", {
        params: {
          q: state.currentSearchQuery,
          per_page: state.perPage,
          page: state.pageNo
        }
      })
      .then(response => {
        //Release the api call lock
        commit("setApiLoading", false);
        //Append result list
        commit("updateSearchResults", response.data.items);
        //Update page number
        commit("setPageNo", ++state.pageNo);

        // commit("setResultCount", response.data.total_count);
      })
      .catch(err => {
        console.log(err);
        //Release the api call lock
        commit("setApiLoading", false);
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
    (state.currentSearchQuery = currentSearchQuery),
  setApiLoading: (state, apiLoading) => (state.apiLoading = apiLoading)
};

export default {
  state,
  getters,
  actions,
  mutations
};
