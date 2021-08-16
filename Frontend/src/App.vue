<template>
  <div id="app">
 <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0e2c4b;
}

#nav {
  padding: 30px;
}
</style>
