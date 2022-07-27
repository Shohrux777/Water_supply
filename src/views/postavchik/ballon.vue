<template>
  <div class="mark_ballon ">
    <div class=" d-flex justify-content-center">
      <h6 class="font-weight-bold p-0 m-0 mb-0">{{mark.client.fio}}</h6>
    </div>
    <div class=" d-flex justify-content-center">
      <p style="font-size: 12px;" class="m-0 ">{{mark.order_date.slice(0,10)}}</p>
    </div>
    <div class="d-flex justify-content-between mb-1">
      <p class="font-weight-bold m-0 mb-0 mr-3">{{$t('fio')}}:</p>
      <p class="m-0 text-right mr-2">{{mark.client_name_str}}</p>
    </div>
    <div class="d-flex justify-content-between mb-1">
      <p class="font-weight-bold m-0 mb-0 mr-3">{{$t('address')}}:</p>
      <p class="m-0 text-right mr-2">{{mark.address.address}}</p>
    </div>
    <div class="d-flex justify-content-between mb-1">
      <p class="font-weight-bold m-0 mb-0 mr-3">{{$t('note')}}:</p>
      <p class="m-0 text-right mr-2">{{mark.note}}</p>
    </div>
    <!-- <div class="d-flex justify-content-between mb-1">
      <p class="font-weight-bold m-0 mb-0 mr-3">{{$t('phoneNumber')}}:</p>
      <p class="m-0 text-right mr-2">{{mark.phone_number_list_arr}}</p>
    </div> -->
    <div class="d-flex w-100 justify-content-between align-items-center mb-1">
      <div class="d-flex align-items-center">
        <img src="../../assets/bootle.jpg" alt="noi" width="35" height="30">
        <p class="m-0 text-right ml-2 text-primary font-weight-bold">{{mark.water_count}}</p>
      </div>
      <div class="text-right">
        <mdb-btn color="danger"  id="btn" style="font-size: 9px"
          p="r4 l4 t2 b2">
        {{$t('cancel')}}</mdb-btn>
        <mdb-btn color="success"  id="btnclose" style="font-size: 9px"
          p="r4 l4 t2 b2">
        {{$t('close_order')}}</mdb-btn>
      </div>
    </div>
    <!-- <p>{{mark}}</p> -->

  </div>
</template>
<!-- <button id="btn">Click</button> -->
<script>
import {mdbBtn, } from "mdbvue"

export default {
  components:{
    mdbBtn
  },
 props: {
    mark:
    {
      type: Object,
      default(){
        return {}
      }
    },
  },
}
</script>

<style>

</style>