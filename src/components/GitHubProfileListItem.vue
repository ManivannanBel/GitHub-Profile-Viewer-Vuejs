<template>
  <div>
    <router-link class="link" v-bind:to="`/${profile.login}`">
      <b-card
        v-bind:img-src="profile.avatar_url"
        v-bind:img-alt="profile.login"
        img-left
        img-height="69"
        img-width="70"
        class="card"
      >
        <div>
          <h4>{{ profile.login }}</h4>
        </div>
      </b-card>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GitHubProfileListItem",
  props: ["profile"]
};
</script>

<style scoped>
.card {
  cursor: pointer;
  height: 70px;
}
.card:hover {
  box-shadow: 0px 0px 1px 1px rgba(59, 59, 59, 0.59);
  -webkit-box-shadow: 0px 0px 1px 1px rgba(59, 59, 59, 0.59);
  -moz-box-shadow: 0px 0px 1px 1px rgba(59, 59, 59, 0.59);
}
.link {
  text-decoration: none;
  color: #5f5f5f;
}
</style>
