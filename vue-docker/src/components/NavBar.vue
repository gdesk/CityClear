<template>
  <div class="header" style="resize: horizontal; overflow: hidden">
    <mdb-navbar color="white" light>
      <mdb-navbar-brand>
        <img class="img-responsive" src="../assets/images/logo.png">
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
          <mdb-navbar-nav right>
              <mdb-nav-item class="item-nav">Accedi</mdb-nav-item>
              <mdb-nav-item class="item-nav" link="/about">About</mdb-nav-item>
          </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
  import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';
  export default {
    name: 'nav-bar',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem
    }
  }
</script>

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