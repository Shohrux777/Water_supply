<template>
  <div>
    <div class="payList">
      <div class="border-bottom navbar_sticky">
        <router-link to="#">
          <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
              {{$t('debit_list')}}</h5>
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
            <div class="col-4">
              <div class="d-flex justify-content-start align-items-center">
                <input-icon style="width: 100%; height:30px;" v-model="search" :placeholder="$t('search_here')"></input-icon>
                <mdb-btn class="mr-1 ml-0  py-1 px-3"  style="font-size: 9px; height:28px; width:80px" color="info"  @click="searchClick()" 
                  size="sm">{{$t('search')}}
                </mdb-btn>
              </div>
            </div>
            
          </div>
        </div>
      </div>

    <div class="px-3">
      <loader v-if="loading"/>
      <table class="myTablePayDebitList ">
        <thead>
          <tr class="header py-3" style="background: #ffbda9;">
            <th  width="40" class="text-left">№</th>
            <th>{{$t('client_name')}}</th>
            <th>{{$t('phone')}}</th>
            <th>{{$t('phone_number_1')}}</th>
            <th>{{$t('phone_number_2')}}</th>
            <th>{{$t('passport_number_str')}}</th>
            <th>{{$t('cash')}}</th>
            <th>{{$t('card')}}</th>
            <th>{{$t('date')}}</th>
            <!-- <th >{{$t('lessons_cout')}}</th> -->

          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in debitList" :key="rowIndex" @click="show_infoDebit(row)">
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.check.client.fio}}</span> </td>
            <td> <span >{{row.check.client.phone_number}}</span> </td>
            <td> <span >{{row.check.client.phone_number_1}}</span> </td>
            <td> <span >{{row.check.client.phone_number_2}}</span> </td>
            <td> <span >{{row.check.client.passport_number_str}}</span> </td>

            <td> <span >{{row.check.cash}}</span> </td>
            <td> <span >{{row.check.card}}</span> </td>
            <td> <span >{{row.updated_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.updated_date_time.slice(11,16)}}</span> </td>

          </tr>
            <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->
        </tbody>
      </table>
    </div>
   
    </div>
     <modal-train  :show="payClient" headerbackColor="white"  titlecolor="black" :title="$t('pay_debit_client')" 
      @close="payClient = false" width="550px">
        <template v-slot:body>
          <payedDebit v-if="payClient"  @close="payClient = false" :group="group_data"/>
        </template>
    </modal-train>
      <Toast ref="message"></Toast>
 </div>
</template>

<script>
// import lineSelect from "../../components/lineSelect.vue";
import {mdbBtn, mdbIcon} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
import payedDebit from './pay_debit.vue'
import month from '../../components/month.vue'
export default {
  components:{
    mdbBtn, 
    mdbIcon,
    month,
    payedDebit
  },
  data() {
    return {
      id: 0,
      loading:false,
      debitList: [],

      search: '',

      payClient: false,
      today_date: '',
      check_client_list: [],
      group_data: {},
    }
  },
 
  async mounted() {
    await this.updateDebit()
    let date = new Date();
    this.today_date = date.toISOString().slice(0,10);
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

    async updateDebit(){
        this.loading = true;
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazDebitItem/getPaginationDebitItemInfoList?page=0&size=1000');
        const data = await res.json();
        console.log(data)
        if(res.status == 200 || res.status == 201){
          console.log('das')
          this.debitList = data.items_list;
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


.myTablePayDebitList {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablePayDebitList th{
  font-weight: 600;
  font-size:11px;
}
.myTablePayDebitList td{
  font-size:11.5px;
  
}
.myTablePayDebitList td {
  text-align: left;
  padding: 8px 10px;
}
.myTablePayDebitList th{
  text-align: left;
  padding: 8px 10px;
}

.myTablePayDebitList tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #ffbda9;
  }
}

.myTablePayDebitList tr.header, .myTablePayDebitList tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}





</style>