<template>
  <div class="all_info_order d-flex">
    <div class="pos_order_list">
      <div class="border-bottom navbar_sticky ">
        <div class="d-flex justify-content-between">
          <router-link to="#">
            <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
                {{$t('postavchik_report')}}</h5>
          </router-link>
          <div class="summa d-flex align-items-center">
            <div class="mr-5 text-center">
              <p style="font-size:12.5px;" class="p-0 m-0 text-success">{{$t('cash')}}</p>
              <p style="font-size:12px;" class="p-0 m-0 text-success font-weight-bold">{{all_summ.cash.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</p>
            </div>
            <div class="mr-5 text-center">
              <p style="font-size:12.5px;" class="p-0 m-0 text-primary">{{$t('card')}}</p>
              <p style="font-size:12px;" class="p-0 m-0 text-primary font-weight-bold">{{all_summ.card.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</p>
            </div>
            <!-- <div class="mr-5 text-center">
              <p style="font-size:14px;" class="p-0 m-0">{{$t('skidka')}}</p>
              <p style="font-size:14px;" class="p-0 m-0">{{all_summ.online.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</p>
            </div>
            <div class="mr-5 text-center">
              <p style="font-size:14px;" class="p-0 m-0">{{$t('rasxod')}}</p>
              <p style="font-size:14px;" class="p-0 m-0">{{all_summ.rasxod.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</p>
            </div> -->
            <div class="mr-5 text-center">
              <p style="font-size:12.5px;" class="p-0 m-0 text-indigo">{{$t('summ')}}</p>
              <p style="font-size:12px;" class="p-0 m-0 text-indigo font-weight-bold">{{all_summ.summ.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="header_menu px-3 mt-3">
        <div class="row">
          <div class="col-4 mt-1">
            <div class="d-flex">
              <erpSelect
                size="sm"
                :options="allUser.rows" 
                @select="selectOption"
                :selected="user_name"
                :label="$t('province')"
              />
              <small v-if="$v.user_name.$dirty && user_id == null" class="invalid-text ml-2" style="margin-top: 35px;">
                {{$t('select_item')}}
              </small>
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

            <mdb-btn :disabled="get_postavchik_order_list.length<=0" class="mr-1 ml-0 mt-0  py-1 px-3 mt-1"  style="font-size: 9px; height:28px; width:80px" color="orange"  @click="$router.push('/map_order_postavchik')" 
              size="sm">{{$t('map')}}
            </mdb-btn>
          </div>
        </div>
      </div>
      <div class="table w-100 ">
        <loader-table v-if="loading" />
        <table v-else class="w-100 tabled ">
          <thead class="header_table ">
            <tr class="header stiky_position">
              <th  width="40" class="text-left">№</th>
              <th>{{$t('client_name')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('user_name')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('user_name')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th>{{$t('getten_bootle')}}
                <span style="position:relative;">
                  <span ><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span ><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th>{{$t('water_count')}}
                <span style="position:relative;">
                  <span ><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span ><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th>{{$t('product')}}
              <span style="position:relative;">
                <span ><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                <span ><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
              </span>
            </th>
              <th>{{$t('cash')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('cash')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('cash')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th>{{$t('card')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('card')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('card')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th>{{$t('summ')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('summ')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('summ')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th>{{$t('date')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('created_date_time')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('created_date_time')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th width="70">{{$t('Action')}}</th>

              <!-- <th >{{$t('lessons_cout')}}</th> -->

            </tr>
          </thead>
          <tbody class="body_table">
            <tr v-for="(row, rowIndex) in pos_money_report_list" :key="rowIndex" class="hoverTr">
              <td> <span >{{rowIndex+1}}</span> </td>
              <td> <span >{{row.user_name}}</span> </td>
              <td> <span >{{row.reserverd_number_id_1}}</span> </td>
              <td> <span >{{row.reserverd_number_id_2}}</span> </td>
              <td> <span >{{row.product_name_list_pp}}</span> </td>
              <td> <span class="text-success ">{{row.cash.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</span> </td>
              <td> <span class="text-primary">{{row.card.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</span> </td>
              <!-- <td> <span >{{row.online}}</span> </td>
              <td> <span >{{row.rasxod}}</span>  </td> -->
              <td> <span class="text-indigo font-weight-bold">{{row.summ.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</span> </td>
              <td width="170"> <span >{{row.created_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.created_date_time.slice(11,16)}}</span></td>
              <td class="m-0 p-0">
                <div class="d-flex align-items-center justify-content-center">
                  <div @click="promise(row.reserverd_number_id_3, row.user_name)" style="cursor:pointer">
                    <mdb-icon icon="trash" style="font-size:13.5px;" class=" text-danger" ></mdb-icon>
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
    <mdb-modal :show="delete_show" @close="delete_show = false" size="md" class="text-center" danger>
      <mdb-modal-header center :close="false">
        <p class="heading">{{$t('Are_you_sure')}}</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <span>Olib borilgan <span class="text-primary font-weight-bold px-2">{{client_name}}</span> zakazni bekor qilmoqchimisz?
          Olib borilmagan zakazlar listiga qaytadi.
        </span>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn outline="danger" @click="deleteOrder">{{$t('Yes')}}</mdb-btn>
        <mdb-btn color="danger" @click="delete_show = false">{{$t('No')}}</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbBtn, mdbInput, mdbIcon, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,mdbBadge,mdbBtnGroup, mdbDropdown, mdbDropdownMenu, mdbDropdownItem,} from 'mdbvue'
import loaderTable from '../../components/loaderTable.vue';
import erpSelect from "../../components/erpSelectFio.vue";
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex';


export default {
  components: { loaderTable, mdbBtn, mdbInput,mdbIcon, erpSelect,
    mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,mdbBadge,
    mdbBtnGroup, mdbDropdown, mdbDropdownMenu, mdbDropdownItem,
  },
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

      user_name: localStorage.postavchikName,
      user_id: localStorage.postavchikId,
      auth_id: localStorage.postavchikAuthId,

      all_cash: 0,
      all_card: 0,
      all_summ: 0,
      all_summ: {
        cash: 0,
        card: 0,
        online:0,
        rasxod: 0,
        summ: 0,
      },

      delete_show: false,
      order_id: null,
      client_name: '',
    }
  },
  validations: {
    user_name: {required},
  },
  computed: {
    ...mapGetters([ 'allUser', 'get_postavchik_order_list', 'postavchik_all_qty']),
  },
  async mounted() {
    let date = new Date();
    this.today_date = date.toISOString().slice(0,10);
    this.b_date = this.today_date;
    this.e_date = this.today_date;

    await this.fetchUser();
    console.log(localStorage.postavchikAuthId)
    if(this.auth_id){
      await this.acceptBtn();
    }
  },
  methods: {
  ...mapActions(['fetchUser', 'fetchPostavchikOrder']),
    async selectOption(option){
      console.log(option)
      this.user_name = option.fio;
      this.user_id = option.id;
      this.auth_id = option.auth.id;
      localStorage.postavchikAuthId = this.auth_id;
      localStorage.postavchikId = this.user_id;
      localStorage.postavchikName = this.user_name;
      // await this.fetchPostavchikList(this.auth_id);
    },
    async acceptBtn(){
       if(this.$v.$invalid)
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
      let date_and_item = {
        b_date: this.b_date  + 'T00:00:01.504Z',
        e_date: this.e_date + 'T23:59:01.504Z',
        auth_id: this.auth_id
      }
      await this.fetchPosMoneyReport(date_and_item);
    },

    async fetchPosMoneyReport(date_auth_id){
      console.log(date_auth_id)
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/WaterChecks/getPaginationByAuthIdByDateTime?page=0&size=1000&auth_id='+ date_auth_id.auth_id + '&begin_date=' + date_auth_id.b_date + '&end_date=' + date_auth_id.e_date);
        const data = await res.json();
        this.loading = false;
        if(res.status == 200 || res.status == 201){
          console.log('data.items_list')
          console.log(data)
          this.pos_money_report_list = data.items_list;
          // this.all_water_count = 0;
          this.all_summ = {
            cash: 0,
            card: 0,
            online:0,
            rasxod: 0,
            summ: 0,
          }
          for(let i=0; i<this.pos_money_report_list.length; i++){
            this.all_summ.cash += parseFloat(this.pos_money_report_list[i].cash)
            this.all_summ.card += parseFloat(this.pos_money_report_list[i].card)
            this.all_summ.online += parseFloat(this.pos_money_report_list[i].online)
            this.all_summ.rasxod += parseFloat(this.pos_money_report_list[i].rasxod)
            this.all_summ.summ += parseFloat(this.pos_money_report_list[i].summ)
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

    async promise(id, name){
      console.log(id)
      console.log(name)
      this.order_id = id;
      this.client_name = name;
      this.delete_show = true;
    },
    async deleteOrder(){
      console.log(this.order_id)
      try{
        const res = await fetch(this.$store.state.hostname + '/WaterOrders/deAgainAcceptAlredyPlannedOrderFullReturningInfo?order_id=' + this.order_id);
        const data = await res.json();
        console.log(data)
        if(res.status == 200 || res.status == 201){
          console.log('das')
          await this.acceptBtn();
          this.delete_show = false;
        }
        else{
          this.$refs.message.error('not_found')
          this.delete_show = false;
          this.loading = false;
        }
        this.loading = false;
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
        this.delete_show = false;
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
        this.pos_money_report_list.sort(compare);
    },
    sortedArray(key){
        function compare(a, b) {
          if (a[key] > b[key])
            return -1;
          if (a[key] < b[key])
            return 1;
          return 0;
        }

        this.pos_money_report_list.sort(compare);
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
      font-size:12px;
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