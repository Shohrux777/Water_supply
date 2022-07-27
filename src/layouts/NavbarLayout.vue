<template>
  <div>
    <mdb-navbar class="p-1" expand="small" size="sm"  color="light">
      <!-- Navbar brand -->
      <mdb-navbar-brand href="#" >
        <div class="d-flex align-items-center text-primary">
          <div style="width:30px; height:32px;" class="mx-1">
            <!-- <img src="../assets/windmill.png" class="img-fluid" alt=""> -->
          </div>
          <span style="text-align: justify;letter-spacing: 3px; font-weight:bold;">
            Тегирмон
          </span>
        </div>
        
      </mdb-navbar-brand>
      <mdb-navbar-toggler class="ml-5">
          <mdb-navbar-nav>
              <mdb-nav-item href="/getProduct" class="px-2 font-weight-bold" >Получить продукт</mdb-nav-item>
              <mdb-nav-item href="/changeProduct"  class="px-2 font-weight-bold">Обмен продукта</mdb-nav-item>
              <mdb-nav-item  href="/working"  class="px-2 font-weight-bold">Продать продукт</mdb-nav-item>
          </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <div style="" class="mt-4">
      <router-view/>
    </div>
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


