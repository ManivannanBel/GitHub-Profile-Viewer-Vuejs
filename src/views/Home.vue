<template>
  <div class="home">
    <Header />
    <b-container>
      <SearchBar v-on:on-search="searchUsers" />
      <GitHubProfileList
        v-bind:usersList="searchResults"
        v-bind:resultCount="resultCount"
        v-bind:pageNo="pageNo"
        v-bind:perPage="perPage"
        v-on:load-more="searchMoreUsers"
      />
    </b-container>
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import SearchBar from "../components/SearchBar";
import GitHubProfileList from "../components/GitHubProfileList";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      searchResults: [],
      resultCount: 0,
      pageNo: 1,
      currentSearchQuery: "",
      perPage: 10
    };
  },
  components: { Header, SearchBar, GitHubProfileList },
  methods: {
    searchUsers(searchQuery) {
      axios
        .get("https://api.github.com/search/users", {
          params: { q: searchQuery, per_page: this.perPage, page: 1 }
        })
        .then(response => {
          this.pageNo = 2;
          this.currentSearchQuery = searchQuery;
          this.resultCount = response.data.total_count;
          this.searchResults = [...response.data.items];
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchMoreUsers() {
      axios
        .get("https://api.github.com/search/users", {
          params: {
            q: this.currentSearchQuery,
            per_page: this.perPage,
            page: this.pageNo
          }
        })
        .then(response => {
          this.pageNo += 1;
          this.resultCount = response.data.total_count;
          this.searchResults = [...this.searchResults, ...response.data.items];
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
