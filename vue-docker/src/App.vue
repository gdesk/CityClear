<template>
  <div>
    <HelloWorld></HelloWorld>
    <div><FindMe></FindMe></div>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FindMe from './components/FindMe.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    FindMe
  }
}
</script>

<style>
:root{
background-color: #008000
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  
}
</style>
