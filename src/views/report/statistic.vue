<template>
  <div class="all_info_order d-flex">
    <div class="pos_order_list">
        <div class="border-bottom navbar_sticky">
        <router-link to="#">
          <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
              {{$t('statistic')}}</h5>
        </router-link>
      </div>
      <div class="header_menu px-3 mt-3">
        <div class="row">
          <div class="col-4 mt-1">
            <div class="d-flex">
              <erpSelect
                size="sm"
                :options="allDepartment.rows"
                @select="selectOption"
                :selected="district_name"
                :label="$t('province')"
              />
              <small v-if="$v.district_name.$dirty && district_id == null" class="invalid-text ml-2" style="margin-top: 35px;">
                {{$t('select_item')}}
              </small>
            </div>
          </div>
          <div class="col-4 mt-1">
            <div class="d-flex">
              <input-search  @select="selectClient"  
                url="/WaterClients/getPaginationByName?page=0&size=100&fio="
                ref="search_client" :option="allClient.rows" icon="user" style="height:32px;">
                </input-search>
                <small class="p-0" style="margin-left:5px; font-size: 12px; top:-17px; color: gray; position:absolute;"  >
                {{$t('search_client')}}
                </small>
            </div>
          </div>
          <!-- <div class="col-2 px-1">
            <mdb-input class="m-0 p-0 " size="sm" v-model="b_date" type="date"></mdb-input>
          </div>
          <div class="col-2 px-1">
            <mdb-input class="m-0 p-0 " size="sm" v-model="e_date" type="date"></mdb-input>
          </div> -->
          <div class="col-2 d-flex">
            <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-3 mt-1"  style="font-size: 9px; height:28px; width:80px" color="info"  @click="acceptBtn()" 
              size="sm">{{$t('apply')}}
            </mdb-btn>

            <mdb-btn class="mr-1 ml-0 mt-0  py-1 px-3 mt-1"  style="font-size: 9px; height:28px; width:100px" color="primary"  @click="update()" 
              size="sm">{{$t('update')}}
            </mdb-btn>
          </div>
        </div>
      </div>
      <div class="table w-100">
        <loader-table v-if="loading"/>
        <table v-else class="w-100 tabled">
          <thead class="header_table">
            <tr class="header py-3 stiky_position" >
              <th  width="40" class="text-left">№</th>
              <th  width="120">{{$t('client_name')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('fio')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('fio')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th  width="150">{{$t('district')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('tuman_name')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('tuman_name')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th >{{$t('address')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('address')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('address')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th  width="125">{{$t('ostatka')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('bakalashka_soni1')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('bakalashka_soni1')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th  width="125">{{$t('getten')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('olgan_suv_soni')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('olgan_suv_soni')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th width="120">{{$t('date')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('last_order_date')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('last_order_date')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody class="body_table">
            <tr v-for="(row, rowIndex) in order_list" :key="rowIndex" class="hoverTr">
              <td> <span >{{rowIndex+1}}</span> </td>
              <td> <span >{{row.fio}}</span> </td>
              <td> <span >{{row.tuman_name}}</span> </td>
              <td> <span >{{row.address}}</span> </td>
              <td> <span >{{row.bakalashka_soni1}}</span> </td>
              <td> <span >{{row.olgan_suv_soni}}</span>  </td>
              <td> <span >{{row.last_order_date}}</span> </td>
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
import erpSelect from "../../components/erpSelect.vue";
import { required } from 'vuelidate/lib/validators';
import inputSearch from '../../components/inputSearch.vue'
import { mapActions, mapGetters } from 'vuex';


export default {
  components: { loaderTable, mdbBtn, mdbInput, mdbIcon, erpSelect, inputSearch },
  data() {
    return {
      id: 0,
      loading:false,
      pay_show: false,

      order_list:  [],
      order_id: null,
      b_date: '',
      e_date: '',
      today_date: '',
      all_water_count: 0,

      search: '',
      pos_money_report_list: [],

      district_name: '',
      district_id: 0,

      client_id: 0,
      client_name: ''
    }
  },
  validations: {
    district_name: {required},
  },
  computed: {
    ...mapGetters([ 'allUser', 'get_postavchik_order_list', 'postavchik_all_qty','allDepartment', 'allClient']),
  },
  async mounted() {
    await this.fetchDepartment();
    await this.fetchClient();
    await this.acceptBtn();
  },
  methods: {
  ...mapActions(['fetchUser', 'fetchPostavchikOrder', 'fetchDepartment', 'fetchClient']),
    async selectOption(option){
      console.log(option)
      this.district_name = option.name;
      this.district_id = option.id;
      // await this.fetchPostavchikList(this.auth_id);
    },
    async selectClient(option){
      console.log(option)
      this.client_name = option.fio;
      this.client_id = option.id;
    },
    async update(){
      this.district_name ='';
      this.district_id = 0;
      this.client_id = 0;
      this.client_name = ''
        await this.acceptBtn();
    },
    async acceptBtn(){
        try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/WaterClients/getPaginationStatistikReportQuery?page=0&size=1000&tuman_id='+ this.district_id + '&client_id=' + this.client_id);
        const data = await res.json();
        this.loading = false;
        if(res.status == 200 || res.status == 201){
          console.log('data.items_list')
          console.log(data)
            this.order_list = data.items_list;
        }
        else{
          this.$refs.message.error('network_ne_connect')
        }
      }
      catch{
        this.$refs.message.error('network_ne_connect')
      }

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
$green:rgb(102, 229, 174);
$yellow:rgba(231,196,104,0.7);
$orange:rgba(235,118,85,1);
$dark-bg:rgba(0,0,0,0.9);
$light-bg:rgba(255,255,255,0.1);
$text:rgba(255,255,255,0.9);
body {
  background:$light-bg;
  font-family: 'Open Sans', sans-serif;
}
.pos_order_list{
  width:100%;
  border-right: 1px solid $dark-bg;
}
.header_table{
  background: $green;
  th{
    padding:6px 7px;
    font-weight: 600;
    font-size: 11.5px;
    @media only screen and (max-width:767px) and (min-width:480px) {
      font-size:11px;
    }
  }
}
.body_table{
  td{
    padding:6px 7px;
    font-size: 12px;
     @media only screen and (max-width:767px) and (min-width:480px) {
      font-size:11.5px;
    }
  }
  tr:nth-child(even){background-color: #ebf5fc;}
}
.table{
  border-bottom-left-radius: 50% !important;
  border-bottom-right-radius: 50% !important;
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

//   td {
//   border: solid 1px #000;
//   border-style: none solid solid none;
//   padding: 10px;
// }
}
.btn-acp{
  background-image: radial-gradient( circle 835px at 12.1% 24%,  rgba(93,133,178,1) 25.7%, rgba(50,73,101,1) 100.2% );
}
.hoverTr:hover{
  background-image: radial-gradient( circle farthest-corner at 1.3% 2.8%,   rgb(211, 224, 245) 100.2%, rgba(239,249,249,1) 100% );
}
.all_qty_border{
  background-image: radial-gradient( circle farthest-corner at 1.3% 2.8%,   rgb(211, 224, 245) 100.2%, rgba(239,249,249,1) 100% );
}
.up_down_icon:hover{
  background: #acbbff;
}
.stiky_position{
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 52px;
  background: #3f6a8b;
  color:white;
}

</style>