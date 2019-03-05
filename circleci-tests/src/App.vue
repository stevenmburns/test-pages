<template>
  <div id="app">
    <Artifacts/>
  </div>
</template>

<script>
import Artifacts from "./components/Artifacts.vue";
export default {
  name: "app",
  components: {
    Artifacts
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
