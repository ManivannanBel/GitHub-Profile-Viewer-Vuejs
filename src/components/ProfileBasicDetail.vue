<template>
  <div>
    <div class="mainDetailWrapper">
      <img class="avatar" v-bind:src="userDetails.avatar_url" />
      <div class="details">
        <div>{{ userDetails.name }}</div>
        <div>@{{ userDetails.login }}</div>
      </div>
    </div>
    <section v-if="userDetails.bio">
      <h5>Bio</h5>
      <p>{{ userDetails.bio }}</p>
    </section>
    <section v-if="userDetails.company">
      <h5>Works at</h5>
      <p>{{ userDetails.company }}</p>
    </section>
    <div class="detailsWrappers">
      <div>
        <h5>Repositories</h5>
        <div>{{ userDetails.public_repos }}</div>
      </div>
      <div>
        <h5>Followers</h5>
        <div>{{ userDetails.followers }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileBasicDetail",
  props: ["userDetails"]
};
</script>

<style scoped>
.mainDetailWrapper {
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 1px rgba(59, 59, 59, 0.59);
  -webkit-box-shadow: 0px 0px 2px 1px rgba(59, 59, 59, 0.59);
  -moz-box-shadow: 0px 0px 2px 1px rgba(59, 59, 59, 0.59);
}
.avatar {
  height: 100px;
  width: 100px;
}
.details {
  padding-left: 10px;
  padding-top: 5px;
}
.detailsWrappers {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>