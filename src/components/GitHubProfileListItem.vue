<template>
  <div>
    <router-link class="link" v-bind:to="`/${profile.login}`">
      <b-card
        v-bind:img-src="profile.avatar_url"
        v-bind:img-alt="profile.login"
        img-left
        img-height="129"
        img-width="130"
        class="card"
      >
        <div>
          <h4>{{ profile.login }}</h4>
        </div>
        <div v-if="profileDetails[profile.login]" class="desc">
          <span>@{{profileDetails[profile.login].login}}</span>

          <span
            v-if="profileDetails[profile.login].company"
          >,{{profileDetails[profile.login].company}}</span>

          <p>{{profileDetails[profile.login].bio}}</p>
        </div>
      </b-card>
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GitHubProfileListItem",
  props: ["profile"],
  methods: {
    ...mapActions(["getProfile"])
  },
  computed: mapGetters(["profileDetails"]),
  created() {
    //Fetch profile data from api only if it is not present in the store
    if (!this.profileDetails[this.profile.login]) {
      this.getProfile(this.profile.login);
    }
  }
};
</script>

<style scoped>
.card {
  cursor: pointer;
  height: 130px;
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
.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
