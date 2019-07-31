<template>
  <div class="home">
    <FindMe/>
  </div>
</template>

<script>
import FindMe from './FindMe.vue'

export default {
  name: 'home',
  components: {
    FindMe
  }
}
</script>

<style>
  .home{
    margin-top: 60px;
  }
</style>