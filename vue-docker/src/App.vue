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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.moveInUp-enter-active{
  animation: fadeIn 2s ease-in;
}
@keyframes fadeIn{
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0.5;
  }
  100%{
    opacity: 1;
  }
}
.moveInUp-leave-active{
  animation: moveInUp .3s ease-in;
}
@keyframes moveInUp{
 0%{
  transform: translateY(0);
 }
  100%{
  transform: translateY(-400px);
 }
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