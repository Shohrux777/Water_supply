<template>
  <div class="kassa_page ">
    <div class="navbarMenu d-flex justify-content-between  ">
      <div class="logo">
        <h5 class="logo_padding m-0 ml-2 text-white">Касса</h5>
      </div>
      <div class="menu d-flex pr-3">
        <a href="/mainPage" class="m-0 text-white fza logo_padding ml-3 ">Регистрация</a>
        <a class="m-0 text-white fza logo_padding " @click="addRasxod">{{$t('rasxod')}}</a>
        <!-- <a href="/waiter" class="m-0 text-white fza logo_padding ">{{$t('waiting_client')}}</a>
        <a href="/kassa" class="m-0 text-white fza logo_padding ">Касса</a> -->
        <!-- <a href="/jadval" class="m-0 text-white fza logo_padding ">Расписание</a> -->
        <a   class="m-0 text-white fza logo_padding ">Закрытие кассы</a>
      </div>
    </div>
    <loader v-if="loading"/>
    <div v-else class="p-4">
      <div class="row ">
        <div class="col-3 ">
          <div class="pay_item border shadow p-2" @click="updateCash">
            <div class="d-flex ">
              <mdb-icon icon="money-bill-alt" class="ml-2" style="font-size:40px; color:green;"/>
              <span class="ml-3" style="font-size: 20px; color:#747474;">{{$t('cash')}}</span>
            </div>
            <div class="text-right pr-3 mt-2">
              <span style="font-size: 23px; color:#747474;">{{kassa.cash}}</span>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="pay_item border shadow p-2" @click="updateCard">
            <div class="d-flex ">
              <mdb-icon icon="credit-card" class="ml-2" style="font-size:40px; color:blue;"/>
              <span class="ml-3" style="font-size: 20px; color:#747474;">{{$t('card')}}</span>
            </div>
            <div class="text-right pr-3 mt-2">
              <span style="font-size: 23px; color:#747474;">{{kassa.card}}</span>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="pay_item border shadow p-2" @click="updateDebit">
            <div class="d-flex ">
              <mdb-icon icon="frown" class="ml-2" style="font-size:40px; color:orange;"/>
              <span class="ml-3" style="font-size: 20px; color:#747474;">{{$t('dolg')}}</span>
            </div>
            <div class="text-right pr-3 mt-2">
              <span style="font-size: 23px; color:#747474;">{{kassa.debit}}</span>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="pay_item border shadow p-2" @click="updateSkidka">
            <div class="d-flex ">
              <mdb-icon icon="podcast" class="ml-2" style="font-size:40px; color:green;"/>
              <span class="ml-3" style="font-size: 20px; color:#747474;">{{$t('skidka')}}</span>
            </div>
            <div class="text-right pr-3 mt-2">
              <span style="font-size: 23px; color:#747474;">{{kassa.skidka}}</span>
            </div>
          </div>
        </div>
        <div class="col-3 mt-4">
          <div class="pay_item border shadow p-2" @click="updateRasxod">
            <div class="d-flex ">
              <mdb-icon icon="user-shield" class="ml-2" style="font-size:40px; color:green;"/>
              <span class="ml-3" style="font-size: 20px; color:#747474;">{{$t('rasxod')}}</span>
            </div>
            <div class="text-right pr-3 mt-2">
              <span style="font-size: 23px; color:#747474;">{{kassa.rasxod}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4" v-if="cash_show">
      <h5 class="ml-2 border-bottom pb-1 pl-1 pt-0 text-success"> {{$t('cash')}}</h5>
      <table class="myTablePayedKassaList ">
        <thead>
          <tr class="header " style="background: #b3ffc3;">
            <th  width="40" class="text-left">№</th>
            <th width="200">{{$t('client_name')}}</th>
            <!-- <th>{{$t('phone')}}</th> -->
            <th>{{$t('phone')}}</th>
            <th>{{$t('cash')}}</th>
            <th >{{$t('card')}}</th>
            <th >{{$t('dolg')}}</th>
            <th >{{$t('skidka')}}</th>
            <th width="90" class="text-right mr-2">{{$t('date')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in cashList" :key="rowIndex" >
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.client.fio}}</span> </td>
            <td> <span >{{row.client.phone_number}}</span> </td>
            <td> <span >{{row.cash}}</span> </td>
            <td> <span >{{row.card}}</span> </td>
            <td> <span >{{row.debit}}</span> </td>
            <td> <p class="m-0">{{row.online}}</p> </td>
            <td> <span >{{row.updated_date_time.slice(0,10)}}</span> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-4" v-if="card_show">
      <h5 class="ml-2 border-bottom pb-1 pl-1 pt-0 text-primary"> {{$t('card')}}</h5>
      <table class="myTablePayedKassaList ">
        <thead>
          <tr class="header " style="background: #b3ffc3;">
            <th  width="40" class="text-left">№</th>
            <th width="200">{{$t('client_name')}}</th>
            <!-- <th>{{$t('phone')}}</th> -->
            <th>{{$t('phone')}}</th>
            <th>{{$t('cash')}}</th>
            <th >{{$t('card')}}</th>
            <th >{{$t('dolg')}}</th>
            <th >{{$t('skidka')}}</th>
            <th width="90" class="text-right mr-2">{{$t('date')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in cardList" :key="rowIndex" >
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.client.fio}}</span> </td>
            <td> <span >{{row.client.phone_number}}</span> </td>
            <td> <span >{{row.cash}}</span> </td>
            <td> <span >{{row.card}}</span> </td>
            <td> <span >{{row.debit}}</span> </td>
            <td> <p class="m-0">{{row.online}}</p> </td>
            <td> <span >{{row.updated_date_time.slice(0,10)}}</span> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-4" v-if="debit_show">
      <h5 class="ml-2 border-bottom pb-1 pl-1 pt-0 text-success"> {{$t('dolg')}}</h5>
      <table class="myTablePayedKassaList ">
        <thead>
          <tr class="header " style="background: #b3ffc3;">
            <th  width="40" class="text-left">№</th>
            <th width="200">{{$t('client_name')}}</th>
            <!-- <th>{{$t('phone')}}</th> -->
            <th>{{$t('phone')}}</th>
            <th>{{$t('cash')}}</th>
            <th >{{$t('card')}}</th>
            <th >{{$t('dolg')}}</th>
            <th >{{$t('skidka')}}</th>
            <th width="90" class="text-right mr-2">{{$t('date')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in debitList" :key="rowIndex" >
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.client.fio}}</span> </td>
            <td> <span >{{row.client.phone_number}}</span> </td>
            <td> <span >{{row.cash}}</span> </td>
            <td> <span >{{row.card}}</span> </td>
            <td> <span >{{row.debit}}</span> </td>
            <td> <p class="m-0">{{row.online}}</p> </td>
            <td> <span >{{row.updated_date_time.slice(0,10)}}</span> </td>
          </tr>
        </tbody>
      </table>
    </div>
     <div class="p-4" v-if="skidka_show">
      <h5 class="ml-2 border-bottom pb-1 pl-1 pt-0 text-secondary"> {{$t('skidka')}}</h5>
      <table class="myTablePayedKassaList ">
        <thead>
          <tr class="header " style="background: #b3ffc3;">
            <th  width="40" class="text-left">№</th>
            <th width="200">{{$t('client_name')}}</th>
            <!-- <th>{{$t('phone')}}</th> -->
            <th>{{$t('phone')}}</th>
            <th>{{$t('cash')}}</th>
            <th >{{$t('card')}}</th>
            <th >{{$t('dolg')}}</th>
            <th >{{$t('skidka')}}</th>
            <th width="90" class="text-right mr-2">{{$t('date')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in skidkaList" :key="rowIndex" >
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.client.fio}}</span> </td>
            <td> <span >{{row.client.phone_number}}</span> </td>
            <td> <span >{{row.cash}}</span> </td>
            <td> <span >{{row.card}}</span> </td>
            <td> <span >{{row.debit}}</span> </td>
            <td> <p class="m-0">{{row.online}}</p> </td>
            <td> <span >{{row.updated_date_time.slice(0,10)}}</span> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-4" v-if="rasxod_show">
      <h5 class="ml-2 border-bottom pb-1 pl-1 pt-0 text-secondary"> {{$t('rasxod')}}</h5>
      <table class="myTablePayedKassaList ">
        <thead>
          <tr class="header " style="background: #ffbeb3;">
            <th  width="40" class="text-left">№</th>
            <th width="200">{{$t('admin')}}</th>
            <!-- <th>{{$t('phone')}}</th> -->
            <th>{{$t('user')}}</th>
            <th>{{$t('rasxod_type')}}</th>
            <th>{{$t('reason')}}</th>
            <th >{{$t('price')}}</th>
            <th width="150" class="text-center mr-4">{{$t('date')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in rasxodList" :key="rowIndex" >
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.auth.user.fio}}</span> </td>
            <td> <span >{{row.user.fio}}</span> </td>
            <td> <span >{{row.cashback_card}}</span> </td>
            <td> <span >{{row.note}}</span> </td>
            <td> <span >{{row.rasxod}}</span> </td>

            <td> <span >{{row.updated_date_time.slice(0,10)}}</span><span class="ml-3">{{row.updated_date_time.slice(11,16)}}</span> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal-train  :show="add_rasxod" headerbackColor="white"  titlecolor="black" :title="$t('rasxod')" 
      @close="add_rasxod = false" width="500px">
        <template v-slot:body>
          <rasxodAdd v-if="add_rasxod" @update="updateFromRasxod" @close="add_rasxod = false" />
        </template>
    </modal-train>
    <Toast ref="message"></Toast> 
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
  </div>
</template>

<script>
import {mdbIcon} from 'mdbvue'
import rasxodAdd from '../rasxod/addrasxod.vue'
export default {
  components:{
    mdbIcon, rasxodAdd
  },
  data() {
    return {
      modal_info: '',
      modal_status: false,
      loading: false,

      add_rasxod: false,
      kassa: {
        cash:0,
        card: 0,
        skidka: 0,
        debit: 0,
        rasxod: 0
      },

      cashList: [],
      cardList: [],
      skidkaList: [],
      debitList: [],
      rasxodList: [],

      cash_show: true,
      card_show: false,
      skidka_show: false,
      debit_show: false,
      rasxod_show: false,

    }
  },
  async mounted(){
    await this.updateDate();
    await this.updateCash();
  },
  methods:{
    addRasxod(){
      this.add_rasxod = true;
    },
    async updateFromRasxod(){
      await this.updateDate();
      await this.updateCash();
    },

    async updateDate(){
      let today = new Date().toISOString().slice(0,10)
      console.log(today)
      let a= today + 'T00:00:01.504Z'
      let b = today + 'T23:59:01.504Z'

      try{
        const res = await fetch(this.$store.state.hostname + "/OquvMarkazCheck/getKassaCurrentRealOquvMarkazPosition?begin_date=" + a + "&end_date=" + b);
        const data1 = await res.json();
        console.log('data1')
        console.log(data1)
        if(res.status == 201 || res.status == 200)
        { 
          this.kassa.cash = data1[0].cash
          this.kassa.card = data1[0].card
          this.kassa.debit = data1[0].debit
          this.kassa.skidka = data1[0].online
          this.kassa.rasxod = data1[0].rasxod
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }


    },
    async updateCash(){
      this.cash_show = true;
      this.card_show = false;
      this.skidka_show = false;
      this.debit_show = false;
      this.rasxod_show = false;
      let today = new Date().toISOString().slice(0,10)
      console.log(today)
      let a= today + 'T00:00:01.504Z'
      let b = today + 'T23:59:01.504Z'

      try{
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazCheck/getPaginationCheckBeetweenDateTimeCash?page=0&size=1000&b_date=" + a + "&e_date=" + b);
        const data = await response.json();
        
        if(response.status == 201 || response.status == 200)
        { 
          console.log('data')
          console.log(data)
          this.cashList = data.items_list
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    },
    async updateCard(){
      this.cash_show = false;
      this.card_show = true;
      this.skidka_show = false;
      this.debit_show = false;
      this.rasxod_show = false;
      let today = new Date().toISOString().slice(0,10)
      console.log(today)
      let a= today + 'T00:00:01.504Z'
      let b = today + 'T23:59:01.504Z'

      try{
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazCheck/getPaginationCheckBeetweenDateTimeCard?page=0&size=100&b_date=" + a + "&e_date=" + b);
        const data = await response.json();
        
        if(response.status == 201 || response.status == 200)
        { 
          console.log('data')
          console.log(data)
          this.cardList = data.items_list
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    },
    async updateSkidka(){
      this.cash_show = false;
      this.card_show = false;
      this.skidka_show = true;
      this.debit_show = false;
      this.rasxod_show = false;
      let today = new Date().toISOString().slice(0,10)
      console.log(today)
      let a= today + 'T00:00:01.504Z'
      let b = today + 'T23:59:01.504Z'

      try{
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazCheck/getPaginationCheckBeetweenDateTimeOnline?page=0&size=1000&b_date=" + a + "&e_date=" + b);
        const data = await response.json();
        
        if(response.status == 201 || response.status == 200)
        { 
          console.log('data')
          console.log(data)
          this.skidkaList = data.items_list
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    },
    async updateDebit(){
      this.cash_show = false;
      this.card_show = false;
      this.skidka_show = false;
      this.debit_show = true;
      this.rasxod_show = false;
      let today = new Date().toISOString().slice(0,10)
      console.log(today)
      let a= today + 'T00:00:01.504Z'
      let b = today + 'T23:59:01.504Z'
      try{
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazCheck/getPaginationCheckBeetweenDateTimeDebit?page=0&size=1000&b_date=" + a + "&e_date=" + b);
        const data = await response.json();
        
        if(response.status == 201 || response.status == 200)
        {
          console.log('data')
          console.log(data)
          this.debitList = data.items_list
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    },
    async updateRasxod(){
      this.cash_show = false;
      this.card_show = false;
      this.skidka_show = false;
      this.debit_show = false;
      this.rasxod_show = true;
      let today = new Date().toISOString().slice(0,10)
      console.log(today)
      let a= today + 'T00:00:01.504Z'
      let b = today + 'T23:59:01.504Z'
      try{
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazCheck/getPaginationCheckBeetweenDateTimeRasxod?page=0&size=1000&b_date=" + a + "&e_date=" + b);
        const data = await response.json();
        
        if(response.status == 201 || response.status == 200)
        {
          console.log('data')
          console.log(data)
          this.rasxodList = data.items_list
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    }

  }
}
</script>

<style lang="scss">
.logo_padding{
  padding: 14.7px 10px;
  &:hover{
    background: orange;
  }
}
.navbarMenu{
  position: sticky;
  top:0;
  z-index: 12;
  background: #132735;
  /* border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px; */
  /* box-shadow: 5px 2px 5px #ddd; */
}
.pay_item{
  cursor: pointer;
  box-sizing: border-box !important;
  border-bottom: 2px solid rgb(133, 255, 143) !important;
  &:hover{
    border-bottom: 2px solid orange !important;
  }
}
.activeItem{
  color: #fff;
  border-bottom: 3px solid rgb(250, 133, 0)
}
.fza{
  font-size: 13px;
}
.myTablePayedKassaList {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablePayedKassaList th{
  font-weight: 600;
  font-size:11px;
}
.myTablePayedKassaList td{
  font-size:11.5px;
}
.myTablePayedKassaList td {
  text-align: left;
  padding: 8px 10px;
}
.myTablePayedKassaList th{
  text-align: left;
  padding: 7px 10px;
}
.myTablePayedKassaList tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #b3ffc3;
  }
}

.myTablePayedKassaList tr.header, .myTablePayedKassaList tr:hover {
  // background-color: #f1f1f1;
}

.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
</style>