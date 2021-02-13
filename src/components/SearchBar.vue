<template>
  <section class="wrapper">
    <b-icon icon="search" class="searchIcon"></b-icon
    ><input
      class="bar"
      type="text"
      v-model="searchQuery"
      v-on:keyup.enter="searchUser"
      placeholder="search user..."
    />
  </section>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    searchUser(event) {
      event.preventDefault();
      if (this.searchQuery.trim === "") return;
      this.$emit("on-search", this.searchQuery);
    }
  }
};
</script>

<style scoped>
.bar {
  border: 0px;
  background: inherit;
  color: #e9e9e9;
}
.bar:focus {
  outline: none;
}
.searchIcon {
  color: #e9e9e9;
  margin: 0 3px 0 3px;
}
.bar::-webkit-input-placeholder {
  color: #eeeeee;
}
.bar::-moz-placeholder {
  color: #eeeeee;
}
.bar:-ms-input-placeholder {
  color: #eeeeee;
}
.bar:-moz-placeholder {
  color: #eeeeee;
}
.wrapper {
  background-color: #6d90f1;
  width: max-content;
  box-shadow: 0px 0px 1px 1px rgba(59, 59, 59, 0.59);
  -webkit-box-shadow: 0px 0px 1px 1px rgba(59, 59, 59, 0.59);
  -moz-box-shadow: 0px 0px 1px 1px rgba(59, 59, 59, 0.59);
}
</style>
