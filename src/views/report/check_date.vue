<template>
  <div>
    <div class="payList">
      <div class="border-bottom navbar_sticky ">
        <div class="d-flex justify-content-between">
          <router-link to="#">
            <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
                {{$t('report_date')}}</h5>
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
              <p style="font-size:12.5px;" class="p-0 m-0">{{$t('skidka')}}</p>
              <p style="font-size:12px;" class="p-0 m-0">{{all_summ.online.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</p>
            </div> -->
            <div class="mr-5 text-center">
              <p style="font-size:12.5px;" class="p-0 m-0 text-danger">{{$t('rasxod')}}</p>
              <p style="font-size:12px;" class="p-0 m-0 text-danger font-weight-bold">{{all_summ.rasxod.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</p>
            </div>
            <div class="mr-5 text-center">
              <p style="font-size:12.5px;" class="p-0 m-0 text-indigo">{{$t('summ')}}</p>
              <p style="font-size:12px;" class="p-0 m-0 text-indigo font-weight-bold">{{all_summ.summ.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-3 py-2 pt-3 bg_date">
        <div class="d-flex justify-content-start align-items-center">
          <div class="row w-100">
            <!-- <div class="col-sm-4 col-md-3 col-lg-2">
              <div class="d-flex justify-content-start align-items-center">
                <month  height="30" class="mt-2" @select="selectMonth"/>
              </div>
            </div> -->
            <div class="col-sm-4 col-md-3 col-lg-3  " >
              <div class="w-100">
                <mdb-input class="m-0 p-0" size="sm" v-model="b_date" type="date"></mdb-input>
              </div>
            </div>
            <div class="col-sm-4 col-md-3 col-lg-3" >
              <div >
                <mdb-input class="m-0 p-0 mb-2" size="sm"  v-model="e_date" type="date"></mdb-input>
              </div>
            </div>
            <div class="col-sm-4 col-md-1 col-lg-1" >
              <div class="mt-1 text-right">
                <mdb-btn class="mr-1 ml-0  py-1 px-3"  style="font-size: 9px; height:27.5px; width:80px" color="info"  @click="clickDate()" 
                  size="sm">{{$t('ok')}}
                </mdb-btn>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div class="">
        <loader v-if="loading"/>
        <table class="myTableCkeckList ">
          <thead>
            <tr class="header stiky_position">
              <th  width="40" class="text-left">№</th>
              <th >{{$t('client_name')}}
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
              <!-- <th>{{$t('skidka')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('online')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('online')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th> -->
              <th>{{$t('rasxod')}}
                <span style="position:relative;">
                  <span @click="sortedArrayAsc('rasxod')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                  <span @click="sortedArray('rasxod')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
                </span>
              </th>
              <th >{{$t('summ')}}
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
          <tbody>
            <tr v-for="(row,rowIndex) in checkList" :key="rowIndex" @click="show_infoDebit(row)" class="hoverTr">
              <td> <span >{{rowIndex+1}}</span> </td>
              <td> <span >{{row.user_name}}</span> </td>
              <td> <span >{{row.reserverd_number_id_1}}</span> </td>
              <td> <span >{{row.reserverd_number_id_2}}</span> </td>
              <td> <span >{{row.product_name_list_pp_1}}</span> </td>
              <td> <span class="text-success ">{{row.cash.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</span> </td>
              <td> <span class="text-primary">{{row.card.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</span> </td>
              <!-- <td> <span class="text-indigo">{{row.online.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</span> </td> -->
              <td> <span class="text-danger">{{row.rasxod.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</span>  </td>
              <td> <span class="text-indigo">{{row.summ.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')}}</span> </td>
              <td> <span >{{row.created_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.created_date_time.slice(11,16)}}</span></td>
              <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->
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
// import lineSelect from "../../components/lineSelect.vue";
import {mdbBtn, mdbIcon, mdbInput, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,mdbBadge,mdbBtnGroup, mdbDropdown, mdbDropdownMenu, mdbDropdownItem,} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
import month from '../../components/month.vue'
export default {
  components:{
    mdbBtn, 
    mdbIcon,mdbInput,
    month,
    mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,mdbBadge,mdbBtnGroup, mdbDropdown, mdbDropdownMenu, mdbDropdownItem,
  },
  data() {
    return {
      id: 0,
      loading:false,
      checkList: [],
      b_date:'',
      e_date:'',

      search: '',

      payClient: false,
      today_date: '',
      check_client_list: [],
      group_data: {},

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
 
  async mounted() {
    let date = new Date();
    this.today_date = date.toISOString().slice(0,10);
    this.b_date = this.today_date;
    this.e_date = this.today_date;
    await this.clickDate();
  },
  computed: mapGetters(['allGroups', 'group_client_list']),

  methods: {
    ...mapActions(['fetchGroups', 'fetchClient', 'fetchGroupsClientList']),

    show_infoDebit(i){
      console.log(i)
    },


    // ===> send client check to base<===
    payDebit(data){
      this.payClient = true;
      this.group_data = data
    },
    async promise(id, name){
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
          await this.clickDate();
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
    async clickDate(){
      if(this.b_date == '' || this.e_date == '') return;
      let date = {
        begin_date: this.b_date  + 'T00:00:01.504Z',
        end_date: this.e_date + 'T23:59:01.504Z',
      }
      await this.selectMonth(date);
    },

    async selectMonth(date){
      console.log(date)
      this.loading = true;
      try{
        const res = await fetch(this.$store.state.hostname + '/WaterChecks/getPaginationByDateTime?page=0&size=1000&begin_date=' + date.begin_date + '&end_date=' + date.end_date);
        const data = await res.json();
        console.log(data)
        if(res.status == 200 || res.status == 201){
          console.log('das')
          this.checkList = data.items_list;
          this.all_summ = {
            cash: 0,
            card: 0,
            online:0,
            rasxod: 0,
            summ: 0,
          }
          for(let i=0; i<this.checkList.length; i++){
            this.all_summ.cash += parseFloat(this.checkList[i].cash)
            this.all_summ.card += parseFloat(this.checkList[i].card)
            this.all_summ.online += parseFloat(this.checkList[i].online)
            this.all_summ.rasxod += parseFloat(this.checkList[i].rasxod)
            this.all_summ.summ += parseFloat(this.checkList[i].summ)
          }

        }
        else{
          this.$refs.message.error('not_found')
          this.loading = false;
        }
        this.loading = false;
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
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
        this.checkList.sort(compare);
    },
    sortedArray(key){
        function compare(a, b) {
          if (a[key] > b[key])
            return -1;
          if (a[key] < b[key])
            return 1;
          return 0;
        }

        this.checkList.sort(compare);
    }
    // ===> sort table <===

   
  },
}
</script>

<style lang="scss">


.myTableCkeckList {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
  
}
.myTableCkeckList th{
  font-weight: 600;
  font-size:11px;
}
.myTableCkeckList td{
  font-size:11.5px;
  
}
.myTableCkeckList td {
  text-align: left;
  padding: 8px 10px;
}
.myTableCkeckList th{
  text-align: left;
  padding: 8px 10px;
}

.myTableCkeckList tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
}
.hoverTr:hover{
  background-image: radial-gradient( circle farthest-corner at 1.3% 2.8%,   rgb(211, 224, 245) 100.2%, rgba(239,249,249,1) 100% );
}
tr:nth-child(even){background-color: #ebf5fc;}
.myTableCkeckList tr.header, .myTableCkeckList tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
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