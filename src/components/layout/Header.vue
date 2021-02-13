<template>
  <header>
    <h1 class="title"><b-icon icon="github"></b-icon> GitHub Profile Viewer</h1>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
header {
  padding: 10px;
}
.title {
}

@media screen and (max-width: 500px) {
  .title {
    font-size: 30px;
  }
}
@media screen and (max-width: 350px) {
  .title {
    font-size: 25px;
  }
}
</style>
