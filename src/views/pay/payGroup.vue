<template>
  <div>
    <check v-if="check_show" @update="groupUpdate" @close="check_show = !check_show " />
    <div v-else class="payList">
      <div class="border-bottom navbar_sticky">
        <router-link :to="/groupList/+id">
          <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
              </svg>
              Вернуться к группе</h5>
        </router-link>
      </div>
      <div class="group_info p-3">
        <div class="row">
          <div class="col-3">
            <div class="shadow card p-3 ">
              <div class="d-flex align-items-center">
                <span class="font-weight-bold" style="font-size: 14px;">Группа:</span>
                <span class="ml-2 text-primary">{{group_data.name}}</span>
              </div>
              <div class="mt-1">
                <span class="font-weight-bold" style="font-size: 12px; color:#6E6E6E;">Cтатус</span>
                <span v-if="group_data.opened_group_status" class="ml-2 text-success" style="font-size: 12.5px;">Активный</span>
                <span v-else class="ml-2 text-danger" style="font-size: 12.5px; ">Начало неизвестно</span>
              </div>
              
            </div>
          </div>
          <div class="col-3">
            <div class="shadow card p-3">
              <div class="d-flex align-items-center">
                <span class="font-weight-bold" style="font-size: 14px;">Ментор:</span>
                <span class="ml-2 text-primary">{{group_data.user_fio}}</span>
              </div>
              <div class="mt-1">
                <span class="font-weight-bold" style="font-size: 12px; color:#6E6E6E;">{{$t('phone1')}}:</span>
                <span class="ml-2" style="font-size: 12.5px; color:#6E6E6E">{{group_data.user.phone_number}}</span>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="shadow card p-3">
              <div class="d-flex align-items-center">
                <span class="font-weight-bold" style="font-size: 14px;">Оплата:</span>
                <span class="ml-2 text-primary">{{group_data.fan.price}}</span>
              </div>
              <div class="mt-1">
                <span class="font-weight-bold" style="font-size: 12px; color:#6E6E6E;">Период:</span>
                <span class="ml-2" style="font-size: 12.5px; color:#6E6E6E">1 месяца</span>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="shadow card p-3">
              <div class="d-flex align-items-center">
                <span class="font-weight-bold" style="font-size: 14px;">Урок:</span>
                <span class="ml-2 text-primary">{{group_data.fan.name}}</span>
              </div>
              <div class="mt-1 d-flex">
                <span class="font-weight-bold" style="font-size: 12px; color:#6E6E6E;">Неделю</span>
                <span class="ml-2" style="font-size: 12.5px; color:#6E6E6E">
                  <div class="day_item d-flex" >
                    <div class="day_week_item_string" v-for="(link,k) in group_data.week_days" :key="k">
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 0">Пт </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 1">Вт </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 2">Ср </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 3">Чт </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 4">Пт </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 5">Сб </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 6">Вс </span>
                    </div>
                  </div>
                </span>
                <span class="ml-2" style="font-size: 12.5px; color:#6E6E6E">{{group_data.begin_time.slice(0,5)}} -- {{group_data.end_time.slice(0,5)}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>




      <div class="p-4">
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
          <input-icon style="width: 280px; height:30px;" v-model="search" :placeholder="$t('search_here')"></input-icon>
          <mdb-btn class="mr-1 ml-0  py-1 px-3"  style="font-size: 9px; height:27.5px;" color="info"  @click="searchClick()" 
            size="sm">{{$t('search')}}
          </mdb-btn>
        </div>
      </div>

    <div class="px-3">
      <loader v-if="loading"/>
      <table class="myTablePayedInfoPayed ">
        <thead>
          <tr class="header " style="background: #a9c6fd;">
            <th  width="40" class="text-left">№</th>
            <th width="200">{{$t('client_name')}}</th>
            <th>{{$t('phone')}}</th>
            <th>{{$t('groups')}}</th>
            <th>{{$t('price')}}</th>
            <th >{{$t('begin_time')}}</th>
            <th >{{$t('end_time')}}</th>
            <th >{{$t('lessons_cout')}}</th>
            <th width="90" class="text-right mr-2">{{$t('Action')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in group_client_list" :key="rowIndex" :class="{'bg_dark text-white' : row.lessons_cout < 0,'bg_danger text-white' : row.lessons_cout == 0, 'bg_warning text-white' : row.lessons_cout >=1 && row.lessons_cout <3}">
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.oquvchi.fio}}</span> </td>
            <td> <span >{{row.oquvchi.phone_number}}</span> </td>
            <td> <span >{{row.group.name}}</span> </td>
            <td> <span >{{row.group.fan.price}}</span> </td>
            <td> <span >{{row.group.begin_time.slice(0,5)}}</span> </td>
            <td> <p class="m-0">{{row.group.end_time.slice(0,5)}}</p> </td>
            <td> <span >{{row.lessons_cout}}</span> </td>
            <td class="text-right mr-2">
              <mdb-btn class="mr-1 py-1 px-2" v-if="test_show" style="font-size: 8px;" color="primary"  @click="activ(row)" :data-row="rowIndex"
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

export default {
  components:{
    mdbBtn, 
    mdbIcon,
    payed, check,
    InputIcon,
  
  },
  data() {
    return {
      id: this.$route.params.id,
      
      check_show: false,
      summaString: '0',
      selectSumma: 0,
      payShow: false,
      loading:false,
      clientList: [],
      group_data: {
        begin_time: '00:000',
        end_time: '00:000',
        gruppa_opened_date: '2022-03-18T',
        user: {
          phone_number: '',
        },
        fan: {
          price: '',
        }
      },
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
  async created()
  {
    
    if(this.id > 0)
    {
      this.loading = true;
      await this.fetchGroupsClientList(this.id)
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroups/' + this.id);
        const data = await res.json();
        console.log(data)
        if(data){
          this.group_name = data.name;
          this.group_id = data.id;
          this.group_data = data;
        }
        this.loading = false;
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }
      
      this.loading = false;
    }
  },
  async mounted() {
    await this.fetchGroups();
    await this.fetchClient();

    let time1 = new Date();
    this.day_time = time1.toISOString().slice(0,10); 
    let a = this.day_time + 'T00:00:00.000Z' ;
    await this.fetch_today_groups(a);
    await this.fetch_today_groups_get_list();
    // await this.submit();
  },
  computed: mapGetters(['allGroups', 'group_client_list', 'all_today_groups']),

  methods: {
    ...mapActions(['fetchGroups', 'fetchClient', 'fetchGroupsClientList', 'fetch_today_groups_get_list', 'fetch_today_groups']),

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
      console.log(this.group_data)
      let week = [];
      for(let i=0; i<option.group.week_days.length; i++){
        if(option.group.week_days[i] == 6){
          week.push(0);
        }
        else{
          week.push(option.group.week_days[i]+1);
        }
      }

      this.selectSumma = option.group.fan.price
      this.summaString = option.group.fan.price.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      this.$refs.payed.changingEnter(1, option.group.fan.price, {name: option.oquvchi.fio, user_id:option.oquvchi.id, uqtuvchi_id:this.group_data.user.id,
      week:week, fan:option.group.fan,  count:option.lessons_cout, group_id: option.group.id, teacher_price: option.group.fan.summ_for_teacher});  
      this.payShow = true;
    },
    async searchClick(){
      console.log(this.search)
    },

    // ===> Navber click buttons <===

   
  },
}
</script>

<style lang="scss">


.myTablePayedInfoPayed {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablePayedInfoPayed th{
  font-weight: 600;
  font-size:11px;
}
.myTablePayedInfoPayed td{
  font-size:11.5px;
}
.myTablePayedInfoPayed td {
  text-align: left;
  padding: 2px 10px;
}
.myTablePayedInfoPayed th{
  text-align: left;
  padding: 7px 10px;
}
.myTablePayedInfoPayed tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #b3cdff;
  }
}

.myTablePayedInfoPayed tr.header, .myTablePayedInfoPayed tr:hover {
  // background-color: #f1f1f1;
}

.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
.bg_danger{
  background: rgb(255, 125, 125);
}
.bg_warning{
  background: rgb(255, 253, 125);
  color:black !important; 
}
.bg_dark{
  background: rgb(95, 94, 94);
}

</style>