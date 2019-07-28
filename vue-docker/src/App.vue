<template>
  <div id="app">
    <div class="header" style="resize: horizontal; overflow: hidden">
    <mdb-navbar color="white" light>
      <mdb-navbar-brand>
        <img class="img-responsive" src="./assets/images/logo.png">
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
          <mdb-navbar-nav right>
              <mdb-nav-item class="item-nav" to="/">Accedi</mdb-nav-item>
              <mdb-nav-item class="item-nav" to="/about">About</mdb-nav-item>
          </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
      
  <div class="container">
  <transition name="moveInUp">
    <router-view/>
  </transition>
    
  </div>
    
  </div>
</template>

<script>
import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';
  export default {
    name: 'app',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .header{
    position: absolute;
    top: 0;
    width: 100%;
  }

  .img-responsive{
    width: 35%;
    height: 10%;
    display: flex;
  }

  .item-nav{
    font-size: 130%;
  }

  @media only screen and (max-width: 450px){
      :root {
        background-image: url('~@/assets/images/init_background.jpg');
        background-position: right;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: cover;
        background-color: #008000;
        height: 100%;
      }
  }

  @media only screen and (min-width: 451px){
     :root {
        background-image: url('~@/assets/images/init_background.jpg');
        background-position: bottom;
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
  }

</style>