<template>
  <div class="all_info_order d-flex">
    <backRouter />
    <div class="order_new_list">
      <div class="header_menu px-3 mt-3">
        <div class="row">
          <div class="col-3 mt-1">
            <div class="d-flex">
              <input-icon style="width: 100%; height:30px;" v-model="search" @input="searchClick" :placeholder="$t('search_here')"></input-icon>
              <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-3"  
              style="font-size: 9px; height:28px; width:90px; margin-top: 1px !important;" 
              color="info"  
              @click="searchClick()" 
                size="sm">{{$t('search')}}
              </mdb-btn>
            </div>
          </div>
          <div class="col-2 px-1">
            <mdb-input class="m-0 p-0 " size="sm" v-model="b_date" type="date"></mdb-input>
          </div>
          <div class="col-2 px-1">
            <mdb-input class="m-0 p-0 " size="sm" v-model="e_date" type="date"></mdb-input>
          </div>
          <div class="col-5 d-flex">
            <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-4 mt-1"  style="font-size: 9px; height:28px; " color="info"  @click="acceptBtn()" 
              size="sm">{{$t('apply')}}
            </mdb-btn>
            
            <router-link to="/map_order">
              <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-3 mt-1"  style="font-size: 9px; height:28px; " color="orange" 
                size="sm">{{$t('map')}}
              </mdb-btn>
            </router-link>

            <mdb-btn class="mr-1 ml-3 mt-0  py-1 px-3 mt-1"  style="font-size: 9px; height:28px; " color="primary"  @click="fetchTodayOrderList" 
              size="sm">{{$t('today')}}
            </mdb-btn>
            <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-3 mt-1"  style="font-size: 9px; height:28px; " color="secondary"  @click="fetchTomorrowOrderList" 
              size="sm">{{$t('tomorrow')}}
            </mdb-btn>
            <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-3 mt-1"  style="font-size: 9px; height:28px; " color="indigo"  @click="fetchAllOrderList" 
              size="sm">{{$t('all')}}
            </mdb-btn>
            
          </div>
        </div>
      </div>
      <div class="table w-100 ">
        <loader-table v-if="loading" />
        <table v-else class="w-100 tabled">
          <thead class="header_table ">
            <tr class="stiky_position">
              <th>№</th>
              <th>{{$t('fio')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('client_name_str')"><mdb-icon icon="angle-up"  class="px-1 "  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('client_name_str')"><mdb-icon icon="angle-down"  class="px-1 " style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th width="80" class="text-center">{{$t('qty')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('water_count')"><mdb-icon icon="angle-up"  class="px-1 "  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('water_count')"><mdb-icon icon="angle-down"  class="px-1 " style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th width="100">{{$t('product')}}
                <span style="position:relative;">
                  <span ><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span ><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th>{{$t('address')}}</th>
              <th style="min-width:140px;">{{$t('note')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('note')"><mdb-icon icon="angle-up"  class="px-1 "  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('note')"><mdb-icon icon="angle-down"  class="px-1 " style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th width="130">{{$t('date')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('order_date')"><mdb-icon icon="angle-up"  class="px-1 "  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('order_date')"><mdb-icon icon="angle-down"  class="px-1 " style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th width="60">{{$t('Action')}}</th>
            </tr>
          </thead>
          <tbody class="body_table">
            <tr v-for="(item, index) in order_list" :key="index" class="hoverTr" :style="{background: item.reserverd_note_3 + '!important',}" :class="{'bg_dark_tr text-white': item.color_value == 'black', 'bg_red_tr text-white': item.color_value == 'green', 'bg_reded_tr text-white': item.color_value == 'red'}">
              <td>{{index+1}}</td>
              <td class=" font-weight-bold" style="font-size: 12px;">{{item.client_name_str}}</td>
              <td class="text-center text-primary font-weight-bold" style="font-size: 12px;">{{item.water_count}}</td>
              <td>{{item.name_pp1}}</td>
              <td>{{item.address.address}}</td>
              <td>{{item.note}}</td>
              <td>{{item.order_date.slice(0,10)}}</td>
              <td class="m-0 p-0 bg-white">
                <div class="d-flex align-items-center">
                  <div @click="UpdateOrder(item)" style="cursor:pointer" class="">
                    <mdb-icon icon="edit" style="font-size:16px;" class="p-1 text-warning " far></mdb-icon>
                  </div>
                  <div @click="showOrder(item)" style="cursor:pointer">
                    <mdb-icon icon="check-circle" style="font-size:16px;" class="p-1 text-success" far></mdb-icon>
                  </div>
                  <div @click="deleteOrder(item)" style="cursor:pointer">
                    <mdb-icon icon="trash" style="font-size:16px;" class="p-1 text-danger" ></mdb-icon>
                  </div>
                </div>
                <!-- <mdb-btn class="mr-1 ml-0 mt-0 mt-1 btn-acp"  style="font-size: 8px; width:80px; padding: 5px;"   
                  size="sm">{{$t('accept')}}
                </mdb-btn> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order_info">
      <div class="qty borderSolder py-2">
        <span class="ml-3">{{$t('all')}}</span>
        <div class="text-right px-3 mt-1">
          <p>{{all_water_count}}</p>
        </div>
      </div>
    </div>

    <modal-train  :show="pay_show" headerbackColor="white"  titlecolor="black" :title="$t('pay')" 
      @close="pay_show = false" width="50%">
        <template v-slot:body>
          <payNewOrder ref="payNew" @close="closeAcceptOrder" @closeUpdate="closeUpdate"  :orderId="order_id" :shown="pay_show"></payNewOrder>
        </template>
    </modal-train>
    <modal-train  :show="update_show" headerbackColor="white"  titlecolor="black" :title="$t('pay')" 
      @close="update_show = false" width="50%">
        <template v-slot:body>
          <payNewUpdate ref="updateOrder" @close="closeUpdateOrder" @closeUpdate="closeUpdateOrder"  :orderId="order_id" :shown="update_show"></payNewUpdate>
        </template>
    </modal-train>
    <mdb-modal :show="delete_show" @close="delete_show = false" size="sm" class="text-center" danger>
      <mdb-modal-header center :close="false">
        <p class="heading">{{$t('Are_you_sure')}}</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <span>Zakazni bekor qilmoqchimisz?</span>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn outline="danger" @click="promise">{{$t('Yes')}}</mdb-btn>
        <mdb-btn color="danger" @click="delete_show = false">{{$t('No')}}</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbBtn, mdbInput, mdbIcon, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,mdbBadge,mdbBtnGroup, mdbDropdown, mdbDropdownMenu, mdbDropdownItem,} from 'mdbvue'

import loaderTable from '../../components/loaderTable.vue';
import payNewOrder from './update_accept/payNew_Accept.vue'
import payNewUpdate from './update_accept/payNew_Update.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { loaderTable, mdbBtn, mdbInput, payNewOrder, mdbIcon, payNewUpdate,
  mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,mdbBadge,mdbBtnGroup, mdbDropdown, 
  mdbDropdownMenu, mdbDropdownItem, },
  data() {
    return {
      id: 0,
      loading:false,
      pay_show: false,
      update_show:false,
      delete_show: false,

      order_list:  [],
      cach_order_list: [],
      order_id: null,
      b_date: '',
      e_date: '',
      today_date: '',
      all_water_count: 0,
      all_water_sum: 0,
      water_price: 0,

      search: '',
      show_order_list: false,
    }
  },
  async mounted() {
    let date = new Date();
    this.today_date = date.toISOString().slice(0,10);
    this.b_date = this.today_date;
    this.e_date = this.today_date;

    let d_time = {
      b_date: this.b_date  + 'T00:00:01.504Z',
      e_date: this.e_date + 'T23:59:01.504Z',
    }

    await this.fetchDateOrderList(d_time);
  },
  computed: {
    ...mapGetters(['allOrder_list']),
  },
  methods: {
  ...mapActions(['fetchOrder_list']),
    async fetchTodayOrderList(){
      let date = new Date();
      this.today_date = date.toISOString().slice(0,10);
      this.b_date = this.today_date;
      this.e_date = this.today_date;

      let d_time = {
        b_date: this.b_date  + 'T00:00:01.504Z',
        e_date: this.e_date + 'T23:59:01.504Z',
      }

      await this.fetchDateOrderList(d_time);
    },
    async fetchTomorrowOrderList(){
      let nowDate = new Date();
      let next_day = nowDate.setDate(nowDate.getDate() + 1);
      var next_days_date = new Date(next_day).toISOString();
      this.today_date = next_days_date.slice(0,10);
      this.b_date = this.today_date;
      this.e_date = this.today_date;

      let d_time = {
        b_date: this.b_date  + 'T00:00:01.504Z',
        e_date: this.e_date + 'T23:59:01.504Z',
      }

      await this.fetchDateOrderList(d_time);
    },
    async fetchAllOrderList(){
      this.show_order_list = true;
      await this.fetchOrder_list();
      this.order_list = this.allOrder_list;
      this.cach_order_list = this.allOrder_list;
      this.all_water_count = 0;
      console.log(this.allOrder_list);
      for(let i=0; i<this.allOrder_list.length; i++){
        this.all_water_count += this.allOrder_list[i].water_count;
      }
    },
    async fetchDateOrderList(date){
      this.show_order_list = false;
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/WaterOrders/getPaginationBeatweanDateWithoutTimeOpenOrdersList?page=0&size=1000&begin_date='+ date.b_date+'&end_date=' + date.e_date);
        const data = await res.json();
        this.loading = false;
        if(res.status == 200 || res.status == 201){
          console.log('data.items_list')
          console.log(data.items_list)
          this.order_list = data.items_list;
          this.cach_order_list = data.items_list;
          this.all_water_count = 0;
          for(let i=0; i<data.items_list.length; i++){
            this.all_water_count += data.items_list[i].water_count;
          }
        }
        else{
          this.$refs.message.error('network_ne_connect')
        }
      }
      catch{
        this.$refs.message.error('network_ne_connect')
      }
    },
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
    async acceptBtn(){
      let d_time = {
        b_date: this.b_date  + 'T00:00:01.504Z',
        e_date: this.e_date + 'T23:59:01.504Z',
      }
      await this.fetchDateOrderList(d_time);
    },
    showOrder(data){
      console.log(data)
      this.pay_show = true;
      this.order_id = data.id;
      this.$refs.payNew.fetchMounted(data.id);
    },
    UpdateOrder(data){
      this.update_show = true;
      this.order_id = data.id;
      this.$refs.updateOrder.fetchMounted(data.id);
    },
    async closeAcceptOrder(){
      this.pay_show = false;
      if(this.show_order_list){
        await this.fetchAllOrderList();
      }
      else{
        await this.acceptBtn();
      }
    },
     async closeUpdateOrder(){
      this.update_show = false;
      if(this.show_order_list){
        await this.fetchAllOrderList();
      }
      else{
        await this.acceptBtn();
      }
    },
    async closeUpdate(){
      this.pay_show = false;
      if(this.show_order_list){
        await this.fetchAllOrderList();
      }
      else{
        await this.acceptBtn();
      }
    },
     // ===> sort table <===

    deleteOrder(data){
      this.delete_show = true;
      this.order_id = data.id;
    },  
    async promise(){
      const requestOptions = {
        method : "delete",
      };
      try{
        const response = await fetch(this.$store.state.hostname + "/WaterOrders/" + this.order_id, requestOptions);
        const data = await response.text();
        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Successfully_removed')
          if(this.show_order_list){
            await this.fetchAllOrderList();
          }
          else{
            await this.acceptBtn();
          }
          this.delete_show = false;
        }
        else{
          this.modal_info = data;
          this.modal_status = true;
          this.delete_show = false;
        }
      }
      catch{
        this.$refs.message.error('network_ne_connect')
      }
      
    },
    sortedArrayAsc(key){
        function compare(a, b) {
          if (a[key] < b[key])
            return -1;
          if (a[key] > b[key])
            return 1;
          return 0;
        }
        this.order_list.sort(compare);
    },
    sortedArray(key){
        function compare(a, b) {
          if (a[key] > b[key])
            return -1;
          if (a[key] < b[key])
            return 1;
          return 0;
        }

        this.order_list.sort(compare);
    }
    // ===> sort table <===

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
  width:80%;
  border-right: 1px solid $dark-bg;
}
.order_info{
  width: 20%;
  height: 100%;
  .borderSolder{
    border: 0.5px dashed #D0D3D8;

    span{
      color:#67676C;
      font-size: 22px;
    }
    p{
      color:#525255;
      font-weight:bold;
      font-size: 25px;
      margin:0;
      padding:0;
    }
  }
}
.header_table{
  // background: $green;
  th{
    padding:6px 7px;
    font-weight: 600;
    font-size: 11.5px;
    @media only screen and (max-width:767px) and (min-width:480px) {
      font-size:12px;
    }
  }
}
.stiky_position{
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background: #3f6a8b;
  color:white;
}
.hoverTr:hover{
  background-image: radial-gradient( circle farthest-corner at 1.3% 2.8%,   rgb(211, 224, 245) 100.2%, rgba(239,249,249,1) 100% );
}
.body_table{
  tr:nth-child(even){background-color: #ebf5fc;}
  tr:hover{
    transform: translate(2px, 0px);
    // transform: scale(1.01);
  }
  td{
    padding:6px 7px;
    font-size: 13px;
     @media only screen and (max-width:767px) and (min-width:480px) {
      font-size:12px;
    }
  }
}
.table{
  padding: 10px 5px;
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
}
.btn-acp{
  background-image: radial-gradient( circle 835px at 12.1% 24%,  rgba(93,133,178,1) 25.7%, rgba(50,73,101,1) 100.2% );
}
.bg_dark_tr{
  background: #646465 !important;
}
.bg_red_tr{
  background: #4e9d49 !important;
}
.bg_reded_tr{
  background: #f45c5c !important;
}

</style>