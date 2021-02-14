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
    <div class="trigger" ref="lazyloadTrigger"></div>
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
  data() {
    return {
      observer: null
    };
  },
  mounted() {
    //Register the observer
    this.observer = new IntersectionObserver(
      entries => {
        this.handleLazyLoadTrigger(entries[0]);
      },
      { threshold: [0.9] }
    );

    this.observer.observe(this.$refs.lazyloadTrigger);
  },
  beforeDestroy() {
    //Destroy the observer
    this.observer.disconnect();
  },
  methods: {
    handleLazyLoadTrigger(entry) {
      if (
        entry.isIntersecting &&
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
.trigger {
  height: 5px;
}
</style>
