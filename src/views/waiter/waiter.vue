<template>
  <div class="today_clients">
    <div class="navbarMenu d-flex justify-content-between  ">
      <div class="logo">
        <h5 class="logo_padding m-0 ml-2 text-white">Extre Center</h5>
      </div>
      <div class="menu d-flex pr-3">
        <a href="/mainPage"  class="m-0 text-white fza logo_padding ml-3 ">Регистрация</a>
        <a href="/waiter" class="m-0 text-white fza logo_padding ml-3 activeItem" >{{$t('waiting_client')}}</a>
        <a href="/kassa" class="m-0 text-white fza logo_padding ml-3">Касса</a>
        <a href="/notPayed" class="m-0 text-white fza logo_padding ml-3 ">Не оплаченный список</a>
        <!-- <a href="/jadval" class="m-0 text-white fza logo_padding ml-3">Расписание</a> -->
        <!-- <a href="/salaryPay"  class="m-0 text-white fza logo_padding ml-3">Бонус к зарплате</a> -->
      </div>
    </div>

    <div class="px-3 pb-1 pt-3 border-bottom d-flex">
      <div class="d-flex align-items-center">
        <input-icon style="width: 280px; height:30px; " v-model="search" @input="searchClick" :placeholder="$t('search_here')"></input-icon>
        <mdb-btn class="mr-1 py-1 px-3"  style="font-size: 9px; height:29px; " color="info"  @click="searchClick()" 
          size="sm">{{$t('search')}}
        </mdb-btn>
      </div>
      <div class="selectlevel ml-2" style="width:290px; position:relative;" >
        <small style="position:absolute; top:-6px; left: 5px; font-size: 11px; color:#868686">{{$t('level')}}</small>
        <ErpSelect
          :options="allLevel.rows"  
          size="sm"
          class="mt-2"
          :all_show="all_show"
          @select="selectOptionLevel"
          :selected="level_name"
          :label="$t('level')"
        />
      </div>

      <div class="days d-flex ml-2">
        <div class=" week_day_item d-flex align-items-center py-2 px-1 ml-2 " v-for="(item,i) in free_day" :key="i" @click="choose_freeDay(i)">
          <div class="item_circle d-flex justify-content-center align-items-center">
            <span class="into_circle d-flex justify-content-center align-items-center" :class="{'into_circle_active': item.type}">
              <mdb-icon style="font-size: 10px; " color="white" icon="check"></mdb-icon>
            </span>
          </div>
          <span style="font-size:14px; ">{{item.name}}</span>
        </div>
      </div>

    </div>
    <loader v-if="loading"/>
    <div v-else class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th  width="40" class="text-left">№</th>
                <th width="200">{{$t('client_name')}}</th>
                <th>{{$t('phone')}}</th>
                <th>{{$t('phone_number_1')}}</th>
                <th >{{$t('phone_number_2')}}</th>
                <!-- <th >{{$t('address')}}</th> -->
                <th >{{$t('free_day')}}</th>
                <th >{{$t('free_time')}}</th>
                <th>{{$t('level')}}</th>
                <th>{{$t('contragent')}}</th>
                <th class="text-center" width="100">{{$t('Action')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in Filterdata" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.fio}}</span> </td>
                <td> <span >{{row.phone_number}}</span> </td>
                <td> <span >{{row.phone_number_1}}</span> </td>
                <td> <span >{{row.phone_number_2}}</span> </td>
                <td>
                  <div class="day_item d-flex" >
                    <div class="day_week_item_string" v-for="(link,k) in row.free_days" :key="k">
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 0">Пт </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 1">Вт </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 2">Ср </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 3">Чт </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 4">Пт </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 5">Сб </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 6">Вс </span>
                    </div>
                  </div>
                </td>
                <td> <span >{{row.free_time}}</span> </td>
                <td> <span >{{row.client_type.name}}</span> </td>
                <td> <span ><mdb-icon fab :icon="row.contragent.icon_base_64_str" :style="{'color': row.contragent.note}" class="mr-2"/> {{row.contragent.name}}</span> </td>

                <td class="text-center mr-2">
                  <mdb-btn class="mr-1 py-1 px-3"  style="font-size: 8px;" color="primary"  @click="addGroup(row)" :data-row="rowIndex"
                    size="sm">{{$t('add')}}
                  </mdb-btn>
              </td>
              </tr>
            </tbody>
          </table>
        </div>
      <modal-train  :show="show_to_group" headerbackColor="white"  titlecolor="black" :title="$t('add_client_to_gp')" 
        @close="show_to_group = false" width="550px">
          <template v-slot:body>
            <client_to_group @close="show_to_group = false" :client_info="client_info"></client_to_group>
          </template>
      </modal-train>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import ErpSelect from '../../components/erpSelect.vue'
import client_to_group from './client_to_group.vue'
import {mdbBadge, mdbBtn, mdbIcon} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
export default { 
components:{
  mdbBadge,
  mdbBtn,
  mdbIcon,
  client_to_group,
  ErpSelect
},
data() {
  return {
    loading:false,
    all_show: true,
    clientListToday: [],
    show_to_group : false,
    client_info: {},
    Filterdata: [],
    search: '',
    level_name: '',
    level_id: null,

    free_day:[
      {name: 'Пн', id: 0, type: false},
      {name: 'Вт', id: 1, type: false},
      {name: 'Ср', id: 2, type: false},
      {name: 'Чт', id: 3, type: false},
      {name: 'Пт', id: 4, type: false},
      {name: 'Сб', id: 5, type: false},
      {name: 'Вс', id: 6, type: false},
    ],
    filterDay: [],
  }
},
async mounted() {
  this.loading = true;
  await this.fetchLevel();
  this.update();
},
computed: mapGetters(['client_list_by_date', 'allLevel']),
methods: {
  ...mapActions(['fetchClientListByDate', 'fetchLevel']),
  async update(){
    try{
      const response = await fetch(this.$store.state.hostname + "/OquvMarkazClient/getPaginationWaiting?page=0&size=100");
      const data = await response.json();
      console.log('today client')
      console.log(data)
      this.clientListToday = data.items_list;
      this.Filterdata = data.items_list
      this.loading = false;

    }
    catch{
      this.$refs.message.error('network_ne_connect')
      this.loading = false;
    }
  },

  
  searchClick(){
    this.loading = true;
    if(this.search != ''){
      let userSearchList = [];
      for(let i=0; i<this.Filterdata.length;i++){
        if(this.Filterdata[i].fio.toLowerCase().includes(this.search.toLowerCase())){
          userSearchList.push(this.Filterdata[i])
        }
      }
      this.Filterdata = userSearchList;
    }
    else{
      this.Filterdata = this.clientListToday;
    }
    this.loading = false;
    
  },
  selectOptionLevel(option){
    if(option.name != ''){
      console.log(option)
      this.Filterdata = this.clientListToday;
      this.loading = true;
      this.level_name = option.name
      this.level_id = option.id
      let levelList = [];
      for(let i=0; i<this.Filterdata.length;i++){
        if(this.Filterdata[i].client_type.id == option.id){
          levelList.push(this.Filterdata[i])
        }
      }
      this.Filterdata = levelList;
      this.loading = false;
    }
    else{
      this.level_name = '';
      this.Filterdata = this.clientListToday;
    }
    
  },

  choose_freeDay(i){
    let tes = 0;
    let index = -1;
    this.free_day[i].type = !this.free_day[i].type;
    for(let k=0; k<this.filterDay.length; k++){
      if(this.free_day[i].id == this.filterDay[k]){
        tes ++;
        index = k
      }
    }
    if(tes == 0){
      this.filterDay.push(this.free_day[i].id)
    }
    else{
        this.filterDay.splice(index,1)
    }
    console.log(this.filterDay)


  },

  addGroup(option){
    this.show_to_group = true;
    console.log('fsdfsd')
    console.log(option)
    this.client_info = option;
    // this.
  }
},
}
</script>

<style lang="scss">
.TablePatientDocId{
    // height: 400px;
    // overflow: hidden;
    // overflow-y: auto;
    // border: 1px solid #ddd;
  }
  .myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:11.5px;
}
.myTable td{
  font-size:12px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 7px;
}

.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTable tr.header, .myTable tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}

.week_day_item{
  cursor: pointer;
}

.item_circle{
  margin-right: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #eee; 
}
.into_circle{
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgb(255, 255, 255);
}
.into_circle_active{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0fe22b ;
  /* box-shadow: 1px 1px 5px #4285F4, -1px -1px 5px #4285F4, -1px 1px 5px #4285F4, 1px -1px 5px #4285F4 ; */
}
.logo_padding{
  padding: 14.7px 0;
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
.activeItem{
  color: #fff;
  border-bottom: 3px solid rgb(250, 133, 0)
}
.fza{
  font-size: 13px;
}

</style>