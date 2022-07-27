<template>
  <div class="all_info_order d-flex">
    <div class="pos_order_list">
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
          <thead class="header_table_pos">
            <tr class="stiky_position">
              <th>№</th>
              <th>{{$t('fio')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('client_name_str')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('client_name_str')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th class="text-center">{{$t('water_count')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('water_count')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('water_count')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th>{{$t('address')}}</th>
              <th>{{$t('date')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('order_date')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('order_date')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th width="60">{{$t('Action')}}</th>
            </tr>
          </thead>
          <tbody class="body_table">
            <tr v-for="(item, index) in get_postavchik_order_list" :key="index" class="hoverTr" :style="{background: item.reserverd_note_3}">
              <td>{{index+1}}</td>
              <td class=" font-weight-bold" style="font-size: 12px;">{{item.client_name_str}}</td>
              <td class="text-center text-primary font-weight-bold" style="font-size: 12px;">{{item.water_count}}</td>
              <td>{{item.address.address}}</td>
              <td width="130">{{item.order_date.slice(0,10)}}</td>
              <td class="m-0 p-0">
                <mdb-btn class="mr-1 ml-0 mt-0 mt-1 btn-acp"  style="font-size: 8px; width:80px; padding: 5px;"  @click="showOrder(item)" 
                  size="sm">{{$t('accept')}}
                </mdb-btn>
              </td>
            </tr>
          </tbody>
          <tbody class="body_table all_qty_border">
            <tr class="">
              <td></td>
              <td>Общий</td>
              <td class="text-center">{{postavchik_all_qty}}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <modal-train  :show="pay_show" headerbackColor="white"  titlecolor="black" :title="$t('pay')" 
        @close="pay_show = false" width="50%">
          <template v-slot:body>
            <payNewOrder ref="payNew" @close="closeAcceptOrder"  @closeUpdate="closeUpdate" :orderId="order_id" :shown="pay_show"></payNewOrder>
          </template>
      </modal-train>
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbBtn, mdbInput, mdbIcon} from 'mdbvue'
import loaderTable from '../../components/loaderTable.vue';
import payNewOrder from '../order/payNew.vue'
import erpSelect from "../../components/erpSelectFio.vue";
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex';


export default {
  components: { loaderTable, mdbBtn, mdbIcon, mdbInput, payNewOrder, erpSelect },
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

      user_name: localStorage.postavchikName,
      user_id: localStorage.postavchikId,
      auth_id: localStorage.postavchikAuthId,
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
    // let d_time = {
    //   b_date: this.b_date  + 'T00:00:01.504Z',
    //   e_date: this.e_date + 'T23:59:01.504Z',
    // }

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
      await this.fetchPostavchikOrder(date_and_item);
    },
    showOrder(data){
      console.log(data)
      this.pay_show = true;
      this.order_id = data.id;
      this.$refs.payNew.fetchMounted(data.id);
    },
    async closeAcceptOrder(){
      this.pay_show = false;
      await this.acceptBtn();
    },
    async closeUpdate(){
      this.pay_show = false;
      await this.acceptBtn();
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
        this.get_postavchik_order_list.sort(compare);
    },
    sortedArray(key){
        function compare(a, b) {
          if (a[key] > b[key])
            return -1;
          if (a[key] < b[key])
            return 1;
          return 0;
        }

        this.get_postavchik_order_list.sort(compare);
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
.header_table_pos{
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
  td{
    padding:5px 7px;
    font-size: 13px;
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
  background-image: radial-gradient( circle farthest-corner at 1.3% 2.8%,   rgb(170, 200, 247) 100.2%, rgba(239,249,249,1) 100% );
}
.up_down_icon:hover{
  background: #acbbff;
}
.stiky_position{
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background: #3f6a8b;
  color:white;
}

</style>