<template>
  <main>
    <b-container>
      <div class="mainDetailWrapper">
        <img class="avatar" v-bind:src="userDetails.avatar_url" />
        <div>
          <div>{{ userDetails.name }}</div>
          <div>@{{ userDetails.login }}</div>
        </div>
      </div>
      <section>
        <h5>Bio</h5>
        <p>{{ userDetails.bio }}</p>
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
    </b-container>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      currentRoute: window.location.hash.substring(2),
      userDetails: {}
    };
  },
  created() {
    axios
      .get(`https://api.github.com/users/${this.currentRoute}`, {
        params: {
          q: this.currentSearchQuery,
          per_page: this.perPage,
          page: this.pageNo
        }
      })
      .then(response => {
        this.userDetails = { ...response.data };
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.avatar {
  height: 100px;
  width: 100px;
}
.mainDetailWrapper {
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-bottom: 10px;
}
.detailsWrappers {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
