<template>
  <div>
    <div  class="payList">
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
          <div class="col-sm-12 col-md-6 col-lg-3">
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
          <div class="col-sm-12 col-md-6 col-lg-3">
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
          <div class="col-sm-12 col-md-6 col-lg-3">
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
          <div class="col-sm-12 col-md-6 col-lg-3">
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
        <div class="d-flex justify-content-start align-items-center border-bottom">
          <div class="row w-100">
            <div class="col-sm-6 col-md-4 col-lg-3 mt-3" >
              <input-icon type="date" valid v-model="today_date" style="height:32px;" disabled icon=""/>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mt-3">
              <ErpSelect
                :options="allTest.rows"  
                @select="selectOption"
                :selected="test_name"
                :label="$t('test')"
              />
              <small style="position:absolute; top:-17px; left:20px; color:#747474;">{{$t('test')}}</small>
              <small v-if="$v.test_name.$dirty && test_id == null" class="invalid-text mt-0 ml-2" >
                {{$t('select_item')}}
              </small>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mt-3" style="position:relative;">
              <input-icon type="number" valid v-model="test_qty" style="height:32px;"  icon=""/>
              <small style="position:absolute; top:-17px; left:20px; color:#747474;">{{$t('test_qty')}}</small>
              <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.test_qty.$dirty && !$v.test_qty.required" >
                {{$t('name_invalid_text')}}
              </small>
            </div>
          </div>
        </div>
      </div>

    <div class="px-3">
      <loader v-if="loading"/>
      <table class="myTablePayedInfoTestResult ">
        <thead>
          <tr class="header py-3" style="background: #a9c6fd;">
            <th  width="40" class="text-left">№</th>
            <th>{{$t('client_name')}}</th>
            <th>{{$t('phone')}}</th>
            <th>{{$t('born_date')}}</th>
            <!-- <th >{{$t('lessons_cout')}}</th> -->
            <th width="90" class="text-center">{{$t('result')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in check_client_list" :key="rowIndex" >
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.client_name}}</span> </td>
            <td> <span >{{row.phone}}</span> </td>
            <td> <span >{{row.born_date}}</span> </td>

            
            <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->
            <td class="w-100">
              <div class="d-flex d-flex justify-content-center align-items-center">
                <input-icon   style="height:28px;" v-model="row.result"  error="wrong" success="right"  />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-end px-3 pt-2 mt-4 border-top">
      <mdb-btn class="mr-1 py-1 px-3"  style="font-size: 10px;" color="primary"  @click="submittestResult()" 
        size="sm">{{$t('add')}}</mdb-btn>
    </div>
   
    </div>
      <Toast ref="message"></Toast>
 </div>
</template>

<script>
// import lineSelect from "../../components/lineSelect.vue";
import {mdbBtn, mdbIcon} from 'mdbvue'
import { required } from 'vuelidate/lib/validators'
import ErpSelect from '../../components/erpSelect.vue'
import {mapActions, mapGetters} from 'vuex'
import InputIcon from '../../components/inputIcon.vue';

export default {
  components:{
    mdbBtn, 
    mdbIcon,
    InputIcon,
    ErpSelect
  },
  validations: {
    test_name: {required},
    test_qty: {required},
  },
  data() {
    return {
      id: this.$route.params.id,
      loading:false,

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


      today_date: '',
      test_qty: null,
      check_client_list: [],
      test_name: '',
      test_id: null,
    }
  },
  async created()
  {
    
    if(this.id > 0)
    {
      this.loading = true;
      this.check_client_list = [];
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroups/' + this.id);
        const data = await res.json();
        console.log(data)
        if(data){
          this.group_name = data.name;
          this.group_id = data.id;
          this.group_data = data;
        }

        await this.fetchGroupsClientList(this.id)
          console.log('5454545')
          console.log(this.group_client_list)
          for(let i=0; i<this.group_client_list.length; i++){
            let client = {
              client_name: this.group_client_list[i].oquvchi.fio,
              client_id: this.group_client_list[i].oquvchi.id,
              phone: this.group_client_list[i].oquvchi.phone_number,
              born_date: this.group_client_list[i].oquvchi.born_date,
              result: null,
              test_id: null,
              test_qty: null,
            }
            this.check_client_list.push(client)
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
    await this.fetchTest();
    let date = new Date();
    this.today_date = date.toISOString().slice(0,10);
  },
  computed: mapGetters(['allGroups', 'group_client_list', 'allTest']),

  methods: {
    ...mapActions(['fetchGroups', 'fetchClient', 'fetchGroupsClientList', 'fetchTest']),
     selectOption(option){
      console.log(option)
      this.test_name = option.name;
      this.test_id = option.id;
    },


    // ===> send client check to base<===
    submittestResult(){
      if(this.$v.$invalid)
      {
        this.$v.$touch();
        this.$refs.message.warning('please_fill')
        return false;
      }
      console.log(this.check_client_list)
    },
    // ===> send client <===

   
  },
}
</script>

<style lang="scss">


.myTablePayedInfoTestResult {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablePayedInfoTestResult th{
  font-weight: 600;
  font-size:11px;
}
.myTablePayedInfoTestResult td{
  font-size:12px;
  
}
.myTablePayedInfoTestResult th, .myTablePayedInfoTestResult td {
  text-align: left;
  padding: 8px 10px;
}

.myTablePayedInfoTestResult tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #a9c6fd;
  }
}

.myTablePayedInfoTestResult tr.header, .myTablePayedInfoTestResult tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}


.item_circle{
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: rgb(255, 94, 94);
}
.into_circle{
  width: 12.5px;
  height: 12.5px;
  border-radius: 50%;
  background: rgb(255, 255, 255);
}
.into_circle_active{
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #0fe22b ;
}


</style>