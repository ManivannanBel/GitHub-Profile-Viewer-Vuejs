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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: { Header, SearchBar, GitHubProfileList },
  methods: {
    ...mapActions(["searchUsers", "searchMoreUsers"])
  },
  computed: mapGetters([
    "searchResults",
    "resultCount",
    "pageNo",
    "currentSearchQuery",
    "perPage"
  ])
};
</script>
