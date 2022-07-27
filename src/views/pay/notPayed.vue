<template>
  <div>
    <check v-if="check_show" @update="groupUpdate" @close="check_show = !check_show " />
    <div v-else class="payList">
      <div class="navbarMenu d-flex justify-content-between  ">
        <div class="logo">
          <h5 class="logo_padding m-0 ml-2 text-white">Extre Center</h5>
        </div>
        <div class="menu d-flex pr-3">
          <a href="/mainPage"  class="m-0 text-white fza logo_padding ml-3 ">Регистрация</a>
          <a href="/waiter" class="m-0 text-white fza logo_padding ml-3">{{$t('waiting_client')}}</a>
          <a href="/kassa" class="m-0 text-white fza logo_padding ml-3">Касса</a>
          <a href="/notPayed" class="m-0 text-white fza logo_padding ml-3 activeItem">Не оплаченный список</a>
          <!-- <a href="/jadval" class="m-0 text-white fza logo_padding ml-3">Расписание</a> -->
          <!-- <a href="/salaryPay"  class="m-0 text-white fza logo_padding ml-3">Бонус к зарплате</a> -->
        </div>
      </div>

      <div class="px-4 pt-4 pb-1 mb-3 border-bottom">
        
        <div class="row">
          <div class="col-3">
            <div class="d-flex justify-content-start align-items-center w-100">
              <input-icon style=" height:30px;" v-model="search" @input="searchClick" :placeholder="$t('search_here')"></input-icon>
              <mdb-btn class="mr-1 ml-0  py-1 px-3"  style="font-size: 9px; height:27.5px; width:80px;" color="info"  @click="searchClick()" 
                size="sm">{{$t('search')}}
              </mdb-btn>
            </div>
          </div>
          <div class="col-3">
            <ErpSelect
              :options="allGroupsPagn.rows.items_list"  
              size="sm"
              class="mt-0"
              all_show
              @select="selectOption"
              :selected="group_name"
            />
          </div>
        </div>
      </div>

    <div class="px-3">
      <loader v-if="loading"/>
      <table class="myTablePayedInfoUnPayed ">
        <thead>
          <tr class="header " style="background: #ffb0a9;">
            <th  width="40" class="text-left">№</th>
            <th width="200">{{$t('client_name')}}</th>
            <th>{{$t('born_date')}}</th>
            <th>{{$t('phone')}}</th>
            <th>{{$t('groups')}}</th>
            <th >{{$t('begin_time')}}</th>
            <th >{{$t('end_time')}}</th>
            <!-- <th >{{$t('lessons_cout')}}</th> -->
            <th width="90" class="text-right mr-2">{{$t('Action')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in clientList" :key="rowIndex" >
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.client.fio}}</span> </td>
            <td> <span >{{row.client.born_date}}</span> </td>
            <td> <span >{{row.client.phone_number}}</span> </td>
            <td> <span >{{row.group.name}}</span> </td>
            <td> <span >{{row.group.begin_time.slice(0,5)}}</span> </td>
            <td> <p class="m-0">{{row.group.end_time.slice(0,5)}}</p> </td>
            <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->
            <td class="text-right mr-2">
              <mdb-btn class="mr-1 py-1 px-2" v-if="test_show" style="font-size: 8px;" color="primary"  @click="$router.push('/payGroup/'+ row.group.id)" :data-row="rowIndex"
                size="sm">{{$t('pay')}}</mdb-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal-train  :show="add_client_to_group" headerbackColor="white"  titlecolor="black" :title="$t('add_client_to_gp')" 
      @close="add_client_to_group = false" width="550px">
        <template v-slot:body>
        </template>
    </modal-train>
      <payed v-show="payShow" ref="payed" @close="payShow = !payShow" @print="checkprint" :summa="selectSumma" :summaString="summaString" @submitSuccess="submitSuccess"/>
      <Toast ref="message"></Toast>
    </div>
 </div>
</template>

<script>
// import lineSelect from "../../components/lineSelect.vue";
import {mdbBtn, mdbIcon} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
import payed from './payed.vue';
import check from './check.vue';
import InputIcon from '../../components/inputIcon.vue';
import ErpSelect from '../../components/erpSelect.vue'

export default {
  components:{
    mdbBtn, 
    mdbIcon,
    payed, check,
    InputIcon,
    ErpSelect
  },
  data() {
    return {
      // id: this.$route.params.id,
      id:1,
      check_show: false,
      summaString: '0',
      selectSumma: 0,
      payShow: false,
      loading:false,
      clientList: [],
      ceshList: [],
      chooseClient: {
        oquvchi: {
          fio: ''
        },
        group:{
          name: ''
        }
      },
      group_name: '',
      group_id: null,

      search: '',
      test_show: true,
      delete_show: false,

      add_client_to_group: false,
    }
  },
 
  async mounted() {
    try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazFanAndGroupPaymentLeftLessons/getPaginationTolovQilishiKerakList?page=0&size=1000');
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        if(data){
          this.clientList = data.items_list
          this.ceshList = data.items_list
          
          // this.$refs.message.success('Added_successfully')
          this.loading = false;
          console.log(this.clientList)
        }
        
      }
      catch{
        this.loading = false;
        this.$refs.message.error('network_ne_connect')
      }
    
    // await this.submit();
  },
  computed: mapGetters(['allGroups', 'group_client_list','allGroupsPagn']),

  methods: {
    ...mapActions(['fetchGroups', 'fetchClient', 'fetchGroupsClientList','fetchGroupsPagn' ]),
    selectOption(data){
      console.log('group_info')
      console.log(data)
      this.group_name = data.name ;
      this.group_id = data.id;
    },


    async groupUpdate(){
      try{
        this.loading = true;
        await this.fetchGroupsClientList(this.group_id)
        this.loading = false;

      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }
    },


    submitSuccess(){
       this.$refs.message.success('Added_successfully');
      this.payShow = false;
    },

    checkprint(){
      this.check_show = true;
    },


    // ===> Navber click buttons <===
    async activ(option){
      console.log('option')
      console.log(option)
      this.selectSumma = option.group.fan.price
      this.summaString = option.group.fan.price.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      this.$refs.payed.changingEnter(1, option.group.fan.price, {name: option.oquvchi.fio, user_id:option.oquvchi.id, fan:option.group.fan,  count:option.lessons_cout, group_id: option.group.id});  
      this.payShow = true;
    },
    searchClick(){
      this.clientList = this.ceshList;
      this.loading = true;
      console.log('ds')
      if(this.search != ''){
        let userSearchList = [];
        for(let i=0; i<this.clientList.length;i++){
          if(this.clientList[i].client.fio.toLowerCase().includes(this.search.toLowerCase())){
            userSearchList.push(this.clientList[i])
          }
        }
        this.clientList = userSearchList;
      }
      else{
        this.clientList = this.ceshList;
      }
      this.loading = false;
      
    },


    // ===> Navber click buttons <===

   
  },
}
</script>

<style lang="scss">


.myTablePayedInfoUnPayed {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablePayedInfoUnPayed th{
  font-weight: 600;
  font-size:11px;
}
.myTablePayedInfoUnPayed td{
  font-size:11.5px;
}
.myTablePayedInfoUnPayed td {
  text-align: left;
  padding: 2px 10px;
}
.myTablePayedInfoUnPayed th{
  text-align: left;
  padding: 7px 10px;
}
.myTablePayedInfoUnPayed tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #ffb9b3;
  }
}

.myTablePayedInfoUnPayed tr.header, .myTablePayedInfoUnPayed tr:hover {
  // background-color: #f1f1f1;
}

.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
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