<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><img src="./assets/logo.png"/></router-link>
      <router-link to="/login">Accedi</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// custom.scss

export default {
  name:"app"
}
</script>


<style lang="scss">


  :root{
    background-image: url('./assets/init_background.jpg');
    background-position: bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #008000;
    height: 100%;
  }

  @media (max-width: 600px) {
    :root {
      background-image: url('./assets/init_background.jpg');
      background-position: right;
      background-repeat: no-repeat;
      background-attachment: scroll;
      background-size: cover;
      background-color: #008000;
      height: 100%;
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  #nav {
    top: 0;
    left: 0;
    width: 100%;
    font-weight: bolder; 
    background-color: white;
    position: fixed;
    display: flex;
    flex-wrap: nowrap;
    list-style: none;
    justify-content: right;
    z-index: 1;
    overflow-x: auto;
    a {
      color: black;
      text-align: center;
      flex: 1;
      max-width: 75px;
      padding: 6px 10px;
      text-decoration: none;
      font-size: 15px;
      &:hover:active{ 
        background-color: #9ee000;
      }
    }

    img{
      width: 20px;
      
    }
}
</style>
