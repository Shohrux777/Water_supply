<template>
  <div class="group_add_client px-3 py-3">
    <loaderTable v-if="loading"></loaderTable>
    <div v-else>
      
      <div class="d-flex mt-3">
        <ErpSelect
          :options="allGroupsPagn.rows.items_list"  
          size="sm"
          class="mt-0"
          @select="selectOption"
          :selected="group_name"
        />
          <!-- <mdb-btn   @click="add_pupil =!add_pupil" class="btn-grad"
              style="font-size: 9px; height: 32px; width:100px; margin:1px 4px 0 4px;
              "
              p="r2 l2 t2 b2">
            {{$t('add')}}
          </mdb-btn> -->
      </div>

      
      
      <div class="dashed_info mt-4 " >
        <small class="font-weight-bold">{{$t('fio')}}:</small>
        <span class="ml-2">{{client_info.fio}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('phone')}}:</small>
        <span class="ml-2">{{client_info.phone_number}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('phoneNumberTeleg')}}:</small>
        <span class="ml-2">{{client_info.phone_number}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('born_date')}}:</small>
        <span class="ml-2">{{client_info.born_date}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('passport_number')}}:</small>
        <span class="ml-2">{{client_info.passport_number_str}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('address')}}:</small>
        <span class="ml-2">{{client_info.address}}</span>
      </div>

      <div class="dashed_info mt-5 " >
        <small class="font-weight-bold">{{$t('groups')}}:</small>
        <span class="ml-2">{{group_info.name}}</span>
      </div>
      <div class="mt-2 dashed_info">
        <small class="font-weight-bold">{{$t('begin_time')}}:</small>
        <span class="ml-2">{{group_info.begin_time.slice(0,5)}} --- {{group_info.end_time.slice(0,5)}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('teacher')}}:</small>
        <span class="ml-2">{{group_info.user.fio}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('group_open_date')}}:</small>
        <span class="ml-2">{{group_info.gruppa_opened_date.slice(0,10)}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">Статус:</small>
        <span v-if="group_info.opened_group_status" class="ml-2 text-success"> Активный</span>
        <span v-else class="ml-2 text-danger">Начало неизвестно</span>
      </div>
      









      <div class="mt-4 pt-2 pb-2 d-flex justify-content-center border-top">
        <mdb-btn outline="success"  style="font-size: 10px; height: 35px; min-width:150px; margin:1px 4px 0 4px;" 
            p="r4 l4 t2 b2"  @click="submit">{{$t('save')}}
          </mdb-btn>
      </div>
      
    </div>

    <modal-train  :show="add_pupil" headerbackColor="white"  titlecolor="black" :title="$t('Add_client')" 
      @close="add_pupil = false" width="1050px">
        <template v-slot:body>
          <addpupil @close="add_pupil = false"></addpupil>
        </template>
    </modal-train>

    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbBtn} from 'mdbvue'
import addpupil from '../client/client_ad.vue'
import {mapGetters, mapActions} from 'vuex'
import ErpSelect from '../../components/erpSelect.vue'


export default {
  components: {  mdbBtn, addpupil,ErpSelect },
  data() {
    return {
      modal_info: '',
      modal_status: false,
      loading: false,
      group_info : {
        begin_time: '2022-03-20T',
        end_time: '2022-03-20T',
        gruppa_opened_date: '-------------',
        user: {
          fio:''
        }
      },
      group_name : '',
      group_id : '',
      add_pupil: false,
    }
  },
  props:{
    client_info:{
      type : Object,
      default(){
        return {}
      }
    },
  },
  async mounted() {
    await this.fetchGroupsPagn();

    console.log('this.group')
    console.log(this.allGroupsPagn)
  },
  computed: mapGetters(['allGroupsPagn',]),
  methods: {
    ...mapActions(['fetchGroupsPagn', 'fetchGroupsClientList']),
    selectOption(data){
      console.log('group_info')
      console.log(data)
      this.group_info = data;
      this.group_name = data.name ;
      this.group_id = data.id;
    },

    async submit(){
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "oquvMarkazClientid" : this.client_info.id,
          'oquvMarkazPupilGroupsid': this.group_id,
          "id" : 0,
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazPupilGroupDetailInfo", requestOptions);
        const data = await response.text();
        console.log(data)
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Added_successfully')
          this.group_info = {
            begin_time: '2022-03-20T',
            end_time: '2022-03-20T',
            gruppa_opened_date: '-------------',
            user: {
              fio:''
            }
          }
          await this.cickOutWaiter();
          return true;
        }
        else{
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
      }
    },
    async cickOutWaiter(){
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazClient/disableOrEnableWaitingStatusoquvmarkazClient?clinet_id=' + this.client_info.id +'&status=false');
        const data = await res.json();
        console.log(data)
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }
    }
  },
}
</script>

<style lang="scss">
.dashed_info{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #ddd;
  color:rgb(117, 117, 117);
  font-style: italic;
  font-size: 13.5px;
  small{
    font-size: 13px;
  }
  span{
    // font-weight: bold;
    font-size: 13.8px;
    color:rgb(44, 33, 83)
  }
}


  .btn-grad {background-image: linear-gradient(to right, #485563 0%, #29323c  51%, #485563  100%)}
  .btn-grad {
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 0 0 20px #eee;
    display: block;
  }

  .btn-grad:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
         
         
</style>