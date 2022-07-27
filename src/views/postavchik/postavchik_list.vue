<template>
  <div class="all_info_order">
    <mdb-navbar expand="large" dark color="indigo">
      <mdb-navbar-brand href="#">
        {{user_name}}
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <mdb-nav-item  active>{{$t('order')}}: {{all_water_count}}</mdb-nav-item>
          <mdb-nav-item href="/">{{$t('logout')}}</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <div class="order_new_list">
      <div class="header_menu px-1 mt-2">
        <div class="row">
          <div class="col-12 mt-1">
            <div class="d-flex">
              <input-icon style="width: 100%; height:30px;" v-model="search" @input="searchClick" :placeholder="$t('search_here')"></input-icon>
              <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-3"  
              style="font-size: 9px; height:28px; width:80px; margin-top: 1px !important;" 
              color="orange"  
              @click="$router.push('/postavchik_map')"
                size="sm">{{$t('map')}}
              </mdb-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="table w-100 ">
        <loader-table v-if="loading" />
        <table v-else class="w-100 tabled">
          <thead class="header_table ">
            <tr class="stiky_position">
              <th>№</th>
              <th>{{$t('fio')}}</th>
              <th width="80" class="text-center">{{$t('qty')}}</th>
              <!-- <th>{{$t('address')}}</th> -->
              <!-- <th>{{$t('note')}}</th> -->
              <th width="130">{{$t('date')}}</th>
              <th width="60">{{$t('Action')}}</th>
            </tr>
          </thead>
          <tbody class="body_table">
            <tr v-for="(item, index) in order_list" :key="index" class="hoverTr" :style="{background: item.reserverd_note_3}" 
            :class="{'bg_dark_tr text-white': item.color_value == 'black', 'bg_red_tr text-white': item.color_value == 'green'}">
              <td>{{index+1}}</td>
              <td class=" font-weight-bold" style="font-size: 12px;">
                {{item.client_name_str}}
                <mdb-icon v-show="item.note != null || item.note != ''" icon="star" color="orange" class="ml-1" />
              </td>
              <td class="text-center text-primary font-weight-bold" style="font-size: 12px;">{{item.water_count}}</td>
              <!-- <td>{{item.address.address}}</td> -->
              <!-- <td>{{item.note}}</td> -->
              <td><a>{{item.order_date.slice(0,10)}}</a></td>
              <td class="m-0 p-0">
                <mdb-btn class="mr-1 ml-0 mt-0 mt-1 btn-acp"  style="font-size: 8px; width:80px; padding: 5px;"  @click="showOrder(item)" 
                  size="sm">{{$t('accept')}}
                </mdb-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <modal-train  :show="pay_show" headerbackColor="white"  titlecolor="black" :title="$t('pay')" 
        @close="pay_show = false" width="100%">
          <template v-slot:body>
            <payNewOrder ref="payNew" @close="closeAcceptOrder" @closeUpdate="closeUpdate"  :orderId="order_id" :shown="pay_show"></payNewOrder>
          </template>
      </modal-train>
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbBtn, mdbInput, mdbIcon, 
    mdbContainer,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem
} from 'mdbvue'

import loaderTable from '../../components/loaderTable.vue';
import payNewOrder from './payNew.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { loaderTable, mdbBtn, mdbInput, payNewOrder, mdbIcon,
    mdbContainer,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem 
  },
  data() {
    return {
      id: 0,
      loading:false,
      pay_show: false,

      order_list:  [],
      cach_order_list: [],
      order_id: null,

      all_water_count: 0,
      all_water_sum: 0,
      water_price: 0,

      search: '',
      user_name: localStorage.UserName,
    }
  },
  async mounted() {
    await this.updateList();
  },
  computed: {
    ...mapGetters(['allOrder_list', 'get_postavchik_order_list']),
  },
  methods: {
  ...mapActions(['fetchOrder_list', 'fetchPostavchikOrder']),
    searchClick(){
      this.order_list = this.cach_order_list;
      this.loading = true;
      if(this.search != ''){
        let userSearchList = [];
        for(let i=0; i<this.order_list.length;i++){
          if(this.order_list[i].client_name_str.toLowerCase().includes(this.search.toLowerCase()) || this.order_list[i].address.address.toLowerCase().includes(this.search.toLowerCase())){
            userSearchList.push(this.order_list[i])
          }
        }
        this.order_list = userSearchList;
      }
      else{
        this.order_list = this.cach_order_list;
      }
      this.loading = false;
    },
    
    showOrder(data){
      this.pay_show = true;
      this.order_id = data.id;
      this.$refs.payNew.fetchMounted(data.id);
    },

    async updateList(){
      let auth_id = {
        auth_id: localStorage.AuthId
      }
      await this.fetchPostavchikOrder(auth_id);
      this.order_list = this.get_postavchik_order_list;
      this.cach_order_list = this.get_postavchik_order_list;
      for(let i=0; i<this.order_list.length; i++){
        this.all_water_count += this.order_list[i].water_count;
      }
    },

    async closeAcceptOrder(){
      this.pay_show = false;
      await this.updateList();
    },
    async closeUpdate(){
      this.pay_show = false;
      await this.updateList();
    }

  },
}
</script>

<style lang="scss">

@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);

$blue:rgb(79, 173, 210);
$green:rgb(124, 237, 188);
$yellow:rgba(231,196,104,0.7);
$orange:rgba(235,118,85,1);
$dark-bg:rgba(0,0,0,0.9);
$light-bg:rgba(255,255,255,0.1);
$text:rgba(255,255,255,0.9);
body {
  background:$light-bg;
  font-family: 'Open Sans', sans-serif;
}
.order_new_list{
  width:100%;
  border-right: 1px solid $dark-bg;
}
.header_table{
  th{
    padding:6px 7px;
    font-weight: 600;
    font-size: 11.5px;
    @media only screen and (max-width:767px) and (min-width:480px) {
      font-size:12px;
    }
  }
}
.body_table{
  tr:nth-child(even){background-color: #ebf5fc;}
  td{
    padding:6px 7px;
    font-size: 13px;
     @media only screen and (max-width:767px) and (min-width:480px) {
      font-size:12px;
    }
  }
}
.table{
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  padding: 10px 10px;
  @media only screen and (max-width:767px) and (min-width:480px) {
    font-size:12px;
    padding: 10px 5px;
  }
  @media only screen and (max-width:470px) {
    font-size:12px;
    padding: 5px 0;
  }
}
.tabled{
  border-collapse: separate;
  border-spacing: 0;
  tr:first-child td:first-child { border-top-left-radius: 10px; }
  tr:first-child td:last-child { border-top-right-radius: 10px; }

//   td {
//   border: solid 1px #000;
//   border-style: none solid solid none;
//   padding: 10px;
// }
}
.btn-acp{
  background-image: radial-gradient( circle 835px at 12.1% 24%,  rgba(93,133,178,1) 25.7%, rgba(50,73,101,1) 100.2% );
}
.bg_dark_tr{
  background: #646465 !important;
}
.bg_red_tr{
  background: #ff5b58 !important;
}
.hoverTr:hover{
  background-image: radial-gradient( circle farthest-corner at 1.3% 2.8%,   rgb(211, 224, 245) 100.2%, rgba(239,249,249,1) 100% );
}
.stiky_position{
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background: #3f6a8b;
  color:white;
}
</style>