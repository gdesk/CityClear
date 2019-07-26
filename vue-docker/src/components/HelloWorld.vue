<template>
  <mdb-navbar  expand="large" color="transparent" light>
    <!-- Navbar brand -->
    <mdb-navbar-brand href="#">
      <img class="img-responsive" src="../assets/logo.png" >
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
        <mdb-navbar-nav right>
            <mdb-nav-item class="item-nav" href="#">Accedi</mdb-nav-item>
            <mdb-nav-item class="item-nav" href="#">About</mdb-nav-item>
        </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
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
  .img-responsive{
    width: 35%;
    height: 35%;
  }

  .item-nav{
    font-size: 130%;
  }

</style>