<template>
  <div class="client_full_info card-body">
    <div class="row" >
      <div class="col-6  mt-4 client_anketa">
        <div class="card px-1 py-3 client_test_info">
          <h5 class="ml-2 border-bottom pb-1 pl-1 pt-0 text-secondary "> {{$t('test')}}</h5>
          <loader-table v-if="loading"/>
            <table v-else class="myTableClientTestInfo ">
              <thead>
                <tr class="header ">
                  <th  width="40" class="text-left">№</th>
                  <th width="200">{{$t('test')}}</th>
                  <th>{{$t('qty_question')}}</th>
                  <th>{{$t('qty_answer')}}</th>
                  <th>{{$t('date')}}</th>
                  <!-- <th >{{$t('lessons_cout')}}</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row,rowIndex) in client_test_results" :key="rowIndex" >
                  <td> <span >{{rowIndex+1}}</span> </td>
                  <td> <span >{{row.test.name}}</span> </td>
                  <td> <span >{{row.current_value_in_persantage}}</span> </td>
                  <td> <span class="text-success">{{row.current_value}}</span> </td>
                  <td> <span >{{row.current_reg_date_time.slice(0,10)}}</span></td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div class="col-6 mt-4 ">
        <div class="card  px-3 py-2">
          <h5 class="ml-4 border-bottom py-2 text-secondary "> <mdb-icon far icon="address-card" class="mr-1" /> АНКЕТА КЛИЕНТА</h5>
          <div class=" client_anketa">
            <div class="patient_img">
              <!-- <img  v-if="patientInfo.polType==1" src="../../../assets/avatar4.jpg" class="img-fluid" alt="">
              <img v-else src="../../../assets/woman1.png" class="img-fluid" alt=""> -->
            </div>
            <div class="client_info " >
              <p class="text_content_border">{{$t('fio')}} <span>{{option.fio}}</span></p>
              <p class="text_content_border">{{$t('phoneNumber')}} <span>{{option.phone_number}}</span></p>
              <p class="text_content_border">{{$t('phoneNumberTeleg')}} <span>{{option.phone_number_1}}</span></p>
              <!-- <p class="text_content_border" v-if="patientInfo.polType==1">{{$t('pol')}} <span>Мужчина</span></p>
              <p class="text_content_border" v-else>{{$t('pol')}} <span>Женщина</span></p> -->
              <p class="text_content_border">{{$t('phoneNumberFather')}} <span>{{option.phone_number_2}}</span></p>
              <p class="text_content_border">{{$t('born_date')}} <span>{{option.born_date}}</span></p>
              <p class="text_content_border">{{$t('passport_number')}} <span>{{option.passport_number_str}}</span></p>
              <p class="text_content_border">{{$t('address')}} <span>{{option.address}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbIcon} from 'mdbvue'
import LoaderTable from '../../components/loaderTable.vue'
export default {
  components: {
    mdbIcon,
    LoaderTable
  },
  data() {
    return {
      loading: false,
      client_test_results: [],
    }
  },
  props:{
    option: {
      type : Object,
      default(){
        return {}
      }
    },
    type:{
      type : String,
      default : 'text'
    },
  },
  watch:{
    async option(){
      console.log(this.option)
      await this.test_result_by_ClientId(this.option.id)
    }
  },
  methods: {
    async test_result_by_ClientId(id){
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazClient/getTestResultsByClientIdPagination?page=0&size=100&client_id=' + id);
        const data = await res.json();
        console.log(data)
        if(data){
          this.client_test_results = data.items_list;
        }
        this.loading = false;
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
.client_full_info{
  background: rgb(245, 247, 248);
}
.client_info{
  width: 100%;
  padding: 10px 15px 10px 25px;

  .text_content_border{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #ddd;
    color:rgb(117, 117, 117);
    font-style: italic;
    font-size: 13px;
    span{
      font-weight: bold;
      color:rgb(44, 33, 83)
    }
  }
}
.border_dashed{
  border-bottom: 1px dashed #ddd;
}
.client_test_info{
  height:340px;
  overflow: hidden;
  overflow-y: scroll;
}
.myTableClientTestInfo {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTableClientTestInfo th{
  font-weight: 600;
  font-size:11px;
}
.myTableClientTestInfo td{
  font-size:11.5px;
}
.myTableClientTestInfo td {
  text-align: left;
  padding: 7.5px 10px;
}
.myTableClientTestInfo th{
  text-align: left;
  padding: 7px 10px;
  
}
.myTableClientTestInfo .header{
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}
.myTableClientTestInfo tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  }
}

.myTableClientTestInfo tr.header, .myTableClientTestInfo tr:hover {
  // background-color: #f1f1f1;
}

.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
</style>