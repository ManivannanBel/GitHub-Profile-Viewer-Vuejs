<template>
  <main>
    <b-container class="cntnr">
      <router-link class="back" to="/">
        <h4>Back</h4>
      </router-link>
      <div v-if="userDetails.login">
        <ProfileBasicDetail v-bind:userDetails="userDetails" />
      </div>
      <div v-if="userPinnedRepos">
        <h4>Pinned Repositories</h4>
        <div v-bind:key="repo.repo" v-for="repo in userPinnedRepos">
          <PinnedRepoListItem v-bind:repo="repo" />
        </div>
      </div>
      <div v-else-if="!profileApiLoading">
        <h5 class="warn">No user found with username! : {{ currentRoute }}</h5>
      </div>
    </b-container>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PinnedRepoListItem from "../components/PinnedRepoListItem";
import ProfileBasicDetail from "../components/ProfileBasicDetail";

export default {
  name: "Profile",
  components: { PinnedRepoListItem, ProfileBasicDetail },
  data() {
    return {
      currentRoute: window.location.hash.substring(2),
      userDetails: {},
      userPinnedRepos: {}
      //apiLoading: true
    };
  },
  methods: {
    ...mapActions(["getProfile", "getPinnedRepositories"])
  },
  computed: mapGetters([
    "profileDetails",
    "profileApiLoading",
    "pinnedRepositories"
  ]),
  created() {
    //If profile detail is not present in the store, then request for data
    if (!this.profileDetails[this.currentRoute]) {
      //this.apiLoading = true;
      this.getProfile(this.currentRoute);
    } else {
      this.userDetails = this.profileDetails[this.currentRoute];
    }

    if (!this.pinnedRepositories[this.currentRoute]) {
      this.getPinnedRepositories(this.currentRoute);
    } else {
      this.userPinnedRepos = this.pinnedRepositories[this.currentRoute];
    }
  },
  watch: {
    //update the profile details
    profileDetails() {
      this.userDetails = this.profileDetails[this.currentRoute];
    },
    pinnedRepositories() {
      this.userPinnedRepos = this.pinnedRepositories[this.currentRoute];
    }
  }
};
</script>

<style scoped>
.back {
  text-decoration: none;
  color: #7e7e7e;
}
.warn {
  color: #e73737;
}
.cntnr {
  margin-top: 15px;
}
@media screen and (max-width: 750px) {
  .cntnr {
    max-width: unset;
  }
}
</style>
