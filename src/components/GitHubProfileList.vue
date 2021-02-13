<template>
  <main class="list gridWrapper">
    <div v-bind:key="profile.id" v-for="profile in usersList">
      <GitHubProfileListItem v-bind:profile="profile" />
    </div>
    <h5
      v-show="pageNo - 1 > 0 && (pageNo - 1) * perPage <= resultCount"
      v-on:click="$emit('load-more')"
    >
      Load more...
    </h5>
  </main>
</template>

<script>
import GitHubProfileListItem from "./GitHubProfileListItem";

export default {
  name: "GitHubProfileList",
  props: ["usersList", "resultCount", "pageNo", "perPage"],
  components: { GitHubProfileListItem }
};
</script>

<style scoped>
h5 {
  cursor: pointer;
  color: #003ee7;
}

.list {
  margin-top: 20px;
}
.gridWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
}
@media screen and (max-width: 650px) {
  .gridWrapper {
    grid-template-columns: 1fr;
  }
}
</style>
