<template>
<div id="nav" class="header" style="resize: horizontal; overflow: hidden">
   <mdb-navbar color="white" light>
    <!-- Navbar brand -->
    <mdb-navbar-brand href="#">
      <img class="img-responsive" src="../assets/images/logo.png">
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
        <mdb-navbar-nav right>
            <mdb-nav-item class="item-nav" href="#">Accedi</mdb-nav-item>
            <mdb-nav-item class="item-nav" href="#">About</mdb-nav-item>
        </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</div>
</template>

<script>
  import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';
  export default {
    name: 'NavbarPage',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
  position: absolute;
  top: 0%;
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