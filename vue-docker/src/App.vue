<template>
  <div id="app" style="resize: horizontal; overflow: hidden">
      <nav-bar ></nav-bar>
      <find-me></find-me>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FindMe from './components/FindMe.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    FindMe
  }
}
</script>

<style>


:root {
  background-image: url('~@/assets/images/init_background.jpg');
  background-position: bottom, bottom;
  background-repeat: no-repeat, no-repeat;
  background-attachment: fixed, fixed;
  background-size: cover, cover;
  background-color: #008000;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; 
}
</style>
