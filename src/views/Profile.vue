<template>
  <main>
    <b-container>
      <router-link class="back" to="/"><h4>Back</h4></router-link>
      <div v-if="userDetails.login">
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
      <div v-else-if="!apiLoading">
        <h5 class="warn">No user found with username! : {{ currentRoute }}</h5>
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
      userDetails: {},
      apiLoading: true
    };
  },
  created() {
    //Do request call for user data once the component is created
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
        this.apiLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.apiLoading = false;
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
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 1px rgba(59, 59, 59, 0.59);
  -webkit-box-shadow: 0px 0px 2px 1px rgba(59, 59, 59, 0.59);
  -moz-box-shadow: 0px 0px 2px 1px rgba(59, 59, 59, 0.59);
}
.detailsWrappers {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
@media screen {
  .mainDetailWrapper {
    grid-template-columns: 1fr 7fr;
  }
}
.details {
  padding-left: 10px;
  padding-top: 5px;
}
.back {
  text-decoration: none;
  color: #7e7e7e;
  margin-top: 10px;
}
.warn {
  color: #e73737;
}
</style>
