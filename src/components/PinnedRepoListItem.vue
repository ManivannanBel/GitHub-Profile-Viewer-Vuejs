<template>
  <div class="card">
    <a v-bind:href="repo.link" target="blank">
      <h5>{{repo.owner}}/{{repo.repo}}</h5>
    </a>
    <p>{{repo.description}}</p>
  </div>
</template>

<script>
export default {
  name: "PinnedRepoListItem",
  props: ["repo"]
};
</script>

<style scoped>
.card {
  padding: 5px;
  border: 1px solid #bbbbbb;
  box-shadow: 0px 0px 2px 1px rgb(59 59 59 / 59%);
  -webkit-box-shadow: 0px 0px 2px 1px rgb(59 59 59 / 59%);
  -moz-box-shadow: 0px 0px 2px 1px rgba(59, 59, 59, 0.59);
  margin-bottom: 10px;
}
</style>