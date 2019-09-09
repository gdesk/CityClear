<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="logged === false && districtLogged === false" to="/"><img src="./assets/logo.png"/></router-link>
      <router-link v-if="logged === false && districtLogged === false" to="/login" >Accedi</router-link>
      <router-link v-if="logged === false && districtLogged === false" to="/about">About</router-link>

      <router-link v-if="logged === true" to="/urban-decore-tag"><img src="./assets/logo.png"/></router-link>
      <router-link v-if="logged === true" to="/user-profile">Profilo</router-link>
      <router-link v-if="logged === true" to="/forum">Forum</router-link>
      <router-link v-if="logged === true" to="/add">Segnala</router-link>
      <router-link v-if="logged === true" to="/avatar">Avatar</router-link>

      <router-link v-if="districtLogged === true" to="/urban-decore-tag"><img src="./assets/logo.png"/></router-link>
      <router-link v-if="districtLogged === true" to="/user-profile">Profilo</router-link>
      <router-link v-if="districtLogged === true" to="/forum">Forum</router-link>
      <router-link v-if="districtLogged === true" to="/analysis">Analisi</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { EventBus } from "./main.js";

export default {
  name:"app", 
  
  data() {
      return {
        logged: (sessionStorage.getItem("logged") === null) ? false : JSON.parse(sessionStorage.logged),
        districtLogged: (sessionStorage.getItem("districtLogged") === null) ? false : JSON.parse(sessionStorage.districtLogged),
        location: ""
      }
  },
  created() {
    EventBus.$on("login", () => {
      this.logged = true;
      sessionStorage.logged = JSON.stringify(true);
    });
    EventBus.$on("logout", () => {
      this.logged = false;
      sessionStorage.logged = JSON.stringify(false);
      this.districtLogged = false;
      sessionStorage.districtLogged = JSON.stringify(false);
    });
    EventBus.$on("districtLogin", () => {
      this.districtLogged = true;
      sessionStorage.districtLogged = JSON.stringify(true);
    });
  }
}
</script>

<style lang="scss">
  :root:only-child{
    background-image: url('./assets/init_background.jpg');
    background-position: bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #008000;
    height: 100%;
  }

  @media (max-width: 600px) {
    :root:only-child {
      background-image: url('./assets/init_background.jpg');
      background-position: right;
      background-repeat: no-repeat;
      background-attachment: fixed;
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
