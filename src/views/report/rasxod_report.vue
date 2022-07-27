<template>
  <div>
    <div class="payList">
      <div class="border-bottom navbar_sticky">
        <router-link to="#">
          <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
              {{$t('report_date')}}</h5>
        </router-link>
      </div>

      <div class="px-3 py-2 pt-3">
        <div class="row">
          <div class="col-4">
          <!-- <div class="d-flex">
              <lineSelect
              :options="allGroups.rows"
              @select="selectgroup"
              :selected="group_name"
              :label="$t('groups')"
            />
          
          </div> -->
          </div>
        </div>
        <div class="d-flex justify-content-start align-items-center">
          <div class="row w-100">
            <div class="col-sm-4 col-md-3 col-lg-2">
              <div class="d-flex justify-content-start align-items-center">
                <month  height="30" class="mt-2" @select="selectMonth"/>

                <!-- <input-icon style="width: 100%; height:30px;" v-model="search" :placeholder="$t('search_here')"></input-icon>
                <mdb-btn class="mr-1 ml-0  py-1 px-3"  style="font-size: 9px; height:28px; width:80px" color="info"  @click="searchClick()" 
                  size="sm">{{$t('search')}}
                </mdb-btn> -->
              </div>
            </div>
            <div class="col-sm-4 col-md-3 col-lg-2  " >
              <div class="w-100">
                <mdb-input class="m-0 p-0" v-model="b_date" type="date"></mdb-input>
              </div>
            </div>
            <div class="col-sm-4 col-md-3 col-lg-2" >
              <div >
                <mdb-input class="m-0 p-0 mb-2"  v-model="e_date" type="date"></mdb-input>
              </div>
            </div>
            <div class="col-sm-4 col-md-1 col-lg-1" >
              <div class="mt-1 text-right">
                <mdb-btn class="mr-1 ml-0  py-1 px-3"  style="font-size: 9px; height:27.5px; width:80px" color="info"  @click="clickDate()" 
                  size="sm">{{$t('ok')}}
                </mdb-btn>
              </div>
            </div>

            <div class="col-sm-4 col-md-3 col-lg-3">
              <div class="d-flex justify-content-start align-items-center pt-2">
                <erpSelectReg
                  :options="rasxodType"  
                  @select="selectOptionReg"
                  :selected="rasxod_type"
                  :label="$t('company')"
                />
                <small style="position:absolute; top:-9px; left:18px; color:#747474; font-size:11.5px;">{{$t('rasxod_type')}}</small>
              </div>
            </div>
            
          </div>
        </div>
      </div>

    <div class="px-3">
      <loader v-if="loading"/>
      <table class="myTableCkeckList ">
        <thead>
          <tr class="header py-3" style="background: #b0dcff;">
            <th  width="40" class="text-left">№</th>
            <th width="200">{{$t('admin')}}</th>
            <!-- <th>{{$t('phone')}}</th> -->
            <th>{{$t('user')}}</th>
            <th>{{$t('rasxod_type')}}</th>
            <th>{{$t('reason')}}</th>
            <th >{{$t('price')}}</th>
            <th width="150" class="text-center mr-4">{{$t('date')}}</th>

            <!-- <th >{{$t('lessons_cout')}}</th> -->

          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in checkList" :key="rowIndex" @click="show_infoDebit(row)">
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.auth.user.fio}}</span> </td>
            <td> <span >{{row.user.fio}}</span> </td>
            <td> <span >{{row.cashback_card}}</span> </td>
            <td> <span >{{row.note}}</span> </td>
            <td> <span >{{row.rasxod}}</span> </td>

            <td> <span >{{row.updated_date_time.slice(0,10)}}</span><span class="ml-3">{{row.updated_date_time.slice(11,16)}}</span> </td>

            
            <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->
      
          </tr>
        </tbody>
      </table>
    </div>
   
    </div>
      <Toast ref="message"></Toast>
 </div>
</template>

<script>
// import lineSelect from "../../components/lineSelect.vue";
import {mdbBtn, mdbIcon, mdbInput} from 'mdbvue'
import erpSelectReg from "../../components/erpSelect.vue";

import {mapActions, mapGetters} from 'vuex'
import month from '../../components/month.vue'
export default {
  components:{
    mdbBtn, 
    mdbIcon,mdbInput,
    month,erpSelectReg
  },
  data() {
    return {
      id: 0,
      loading:false,
      checkList: [],
      defaultList: [],
      b_date:'',
      e_date:'',

      search: '',

      payClient: false,
      today_date: '',
      check_client_list: [],
      group_data: {},

      rasxod_type: '',
      rasxod_type_id: null,
      rasxodType: [
      {
        name: 'Все',
        id: 0,
      },
      {
        name: 'Канцтовары',
        id: 1,
      },
      {
        name: 'Аренда',
        id: 2,
      },
      {
        name: 'Реклама',
        id: 3,
      },
      {
        name: 'Налог',
        id: 4,
      },
      {
        name: 'Другие',
        id: 5,
      },
      ]
    }
  },
 
  async mounted() {
    let date = new Date();
    this.today_date = date.toISOString().slice(0,10);
  },
  computed: mapGetters(['allGroups', 'group_client_list']),

  methods: {
    ...mapActions(['fetchGroups', 'fetchClient', 'fetchGroupsClientList']),

    show_infoDebit(i){
      console.log(i)
    },
    selectOptionReg(option){
      this.rasxod_type = option.name
      this.rasxod_type_id = option.id
      if(option.id == 0){
        this.checkList = this.defaultList;
      }
      else{
        this.checkList = [];
        for(let i=0; i<this.defaultList.length; i++){
          if(this.rasxod_type_id == this.defaultList[i].cashback_summ){
            this.checkList.push(this.defaultList[i])
          }
        }
      }

    },


    // ===> send client check to base<===
    payDebit(data){
      this.payClient = true;
      this.group_data = data
    },
    async clickDate(){
      if(this.b_date == '' || this.e_date == '') return;
      let date = {
        begin_date: this.b_date + 'T00:00:01.504Z',
        end_date: this.e_date + 'T23:59:01.504Z',
      }
      await this.selectMonth(date);
    },

    async selectMonth(date){
      console.log('date')
      console.log(date)
      this.loading = true;
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazCheck/getPaginationCheckBeetweenDateTimeRasxod?page=0&size=1000&b_date='+ date.begin_date+'&e_date=' + date.end_date);
        const data = await res.json();
        console.log(data)
        if(res.status == 200 || res.status == 201){
          console.log('das')
          console.log(data.items_list)
          this.checkList = data.items_list;
          this.defaultList = data.items_list;
        }
        else{
          this.$refs.message.error('network_ne_connect')
          this.loading = false;
        }
        this.loading = false;
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }

    }
    // ===> send client <===

   
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
  padding: 9px 10px;
}
.myTableCkeckList th{
  text-align: left;
  padding: 8px 10px;
}

.myTableCkeckList tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #b0dcff;
  }
}

.myTableCkeckList tr.header, .myTableCkeckList tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}





</style>