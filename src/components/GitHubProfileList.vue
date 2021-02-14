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
    </h5>-->
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
    //Register the scroll event
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll);
    });
  },
  beforeDestroy() {
    //Destroy the scroll event
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      // console.log(document.documentElement.scrollTop);
      // console.log(window.innerHeight);
      // console.log(document.documentElement.offsetHeight);
      let loadData =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      //Make api request only if all the below conditions are statisfied
      //->we reach the list end
      //->no pending response from api
      //->number of users loaded is less than the total users list availble for that query
      if (
        loadData &&
        !this.apiLoading &&
        this.pageNo - 1 > 0 &&
        (this.pageNo - 1) * this.perPage <= this.resultCount
      ) {
        this.$emit("load-more");
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
@media screen and (max-width: 990px) {
  .gridWrapper {
    grid-template-columns: 1fr;
  }
}
@media screen and (max-width: 460px) {
  .gridWrapper {
    display: block;
  }
}
</style>
