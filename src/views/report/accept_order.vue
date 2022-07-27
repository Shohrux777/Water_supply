<template>
  <div class="all_info_order d-flex">
    <backRouter />
    <div class="order_accept_list">
      <div class="header_menu px-3 mt-3">
        <div class="row">
          <div class="col-4 mt-1">
            <div class="d-flex">
              <input-icon style="width: 100%; height:30px;" v-model="search" @input="searchClick" :placeholder="$t('search_here')"></input-icon>
              <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-3"  
              style="font-size: 9px; height:28px; width:80px; margin-top: 1px !important;" 
              color="info"  
              @click="searchClick()" 
                size="sm">{{$t('search')}}
              </mdb-btn>
            </div>
          </div>
          <div class="col-3 px-1">
            <mdb-input class="m-0 p-0 " size="sm" v-model="b_date" type="date"></mdb-input>
          </div>
          <div class="col-3 px-1">
            <mdb-input class="m-0 p-0 " size="sm" v-model="e_date" type="date"></mdb-input>
          </div>
          <div class="col-2 d-flex">
           
            <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-3 mt-1"  style="font-size: 9px; height:28px; width:80px" color="info"  @click="acceptBtn()" 
              size="sm">{{$t('apply')}}
            </mdb-btn>
            
          </div>
        </div>
      </div>
      <div class="table w-100 ">
        <loader-table v-if="loading" />
        <table v-else class="w-100 tabled">
          <thead class="header_table ">
            <tr class="stiky_position">
              <th width="40">№</th>
              <th >{{$t('fio')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('client_name_str')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('client_name_str')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th width="100" class="text-center">{{$t('qty')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('water_count')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('water_count')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th>{{$t('address')}}</th>
              <th>{{$t('note')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('note')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('note')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th width="130">{{$t('date')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('order_date')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('order_date')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span></th>
              <!-- <th width="60">{{$t('Action')}}</th> -->
            </tr>
          </thead>
          <tbody class="body_table">
            <tr v-for="(item, index) in order_list" :key="index" class="hoverTr">
              <td>{{index+1}}</td>
              <td class=" font-weight-bold" style="font-size: 12px;">{{item.client_name_str}}</td>
              <td class="text-center text-primary font-weight-bold" style="font-size: 12px;">{{item.water_count}}</td>
              <td>{{item.address.address}}</td>
              <td>{{item.note}}</td>
              <td>{{item.order_date.slice(0,10)}}</td>
              <!-- <td class="m-0 p-0">
                <mdb-btn class="mr-1 ml-0 mt-0 mt-1 btn-acp"  style="font-size: 8px; width:80px; padding: 5px;"  @click="showOrder(item)" 
                  size="sm">{{$t('accept')}}
                </mdb-btn>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbBtn, mdbInput, mdbIcon} from 'mdbvue'
import loaderTable from '../../components/loaderTable.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { loaderTable, mdbBtn, mdbInput, mdbIcon },
  data() {
    return {
      id: 0,
      loading:false,
      pay_show: false,

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
    async fetchDateOrderList(date){
      this.show_order_list = false;
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/WaterOrders/getPaginationAllAcceptedByDateTme?page=0&size=1000&begin_date='+ date.b_date+'&end_date=' + date.e_date);
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
     // ===> sort table <===
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
.order_accept_list{
  width:100%;
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
  background: $green;
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
  padding: 10px 0px;
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

.btn-acp{
  background-image: radial-gradient( circle 835px at 12.1% 24%,  rgba(93,133,178,1) 25.7%, rgba(50,73,101,1) 100.2% );
}
.bg_dark_tr{
  background: #646465 !important;
}
.bg_red_tr{
  background: #ff5b58 !important;
}
.up_down_icon:hover{
  background: #acbbff;
}
</style>