<template>
  <main class="list gridWrapper">
    <div v-bind:key="profile.id" v-for="profile in usersList">
      <GitHubProfileListItem v-bind:profile="profile" />
    </div>
    <!-- <h5
      v-show="pageNo - 1 > 0 && (pageNo - 1) * perPage <= resultCount"
      v-on:click="$emit('load-more')"
    >
      Load more...
    </h5> -->
  </main>
</template>

<script>
import GitHubProfileListItem from "./GitHubProfileListItem";
import { mapGetters } from "vuex";

export default {
  name: "GitHubProfileList",
  props: ["usersList", "resultCount", "pageNo", "perPage"],
  components: { GitHubProfileListItem },
  computed: mapGetters(["apiLoading"]),
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll);
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      //   console.log(document.documentElement.scrollTop);
      //   console.log(window.innerHeight);
      //   console.log(document.documentElement.offsetHeight);
      let loadData =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      //   console.log(loadData);

      if (loadData && !this.apiLoading) {
        this.$emit("load-more");
        console.log("lazy load");
      }
    }
  }
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
@media screen and (max-width: 765px) {
  .gridWrapper {
    grid-template-columns: 1fr;
  }
}
</style>
