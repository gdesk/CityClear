<template>
 <div id="app" style="resize: horizontal; overflow: hidden">
  <div class="header">
    <mdb-navbar color="white" light>
      <mdb-navbar-brand>
        <img class="img-responsive" src="./assets/images/logo.png">
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
          <mdb-navbar-nav right>
              <mdb-nav-item class="item-nav">Accedi</mdb-nav-item>
              <mdb-nav-item class="item-nav">About</mdb-nav-item>
          </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';

export default {
  name: 'app',
  components: 
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      Home
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

  .header{
    position: absolute;
    top: 0%;
    height: 20%;
    width: 100%;
  }

  .img-responsive{
    width: 35%;
    height: 10%;
  }

  .item-nav{
    font-size: 130%;
  }
</style>
