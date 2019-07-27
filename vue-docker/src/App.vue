<template>
  <div id="app" style="resize: horizontal; overflow: hidden">
      <Responsive></Responsive>
      <div><FindMe></FindMe></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FindMe from './components/FindMe.vue'
import Responsive from './components/Responsive.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    FindMe,
    Responsive
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
