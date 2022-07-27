<template>
  <div class="map_order">
    <backRouter />
    <div style="position:fixed; top:0px; left:0; right: 0; z-index:1111111; cursor:pointer;" 
    class="bg-white p-1 px-2 rounded w-100 d-flex flex-wrap">
      <div class="row w-100">
        <div class="col-md-5 col-lg-5 col-sm-12">
          <div class="d-flex flex-wrap" style="width:100%;">
            <erpSelect
              
              size="sm"
              class="bg-white"
              :options="allDepartment.rows"
              @select="selectOption"
              :selected="district_name"
              :label="$t('district')"
            />
          </div>
        </div>
        <div class="col-md-7 col-lg-7 col-sm-12">
          <div class="d-flex  pl-0" style="width:100%;">
            <input-icon style="height:32px;" v-model="langota" ref="name"  validate error="wrong" success="right" />
            <mdb-btn color="success" class="mt-0"  style="font-size: 10px; min-width:100px;" @click="updateNewMark()"
              p="r4 l4 t2 b2">
            <mdb-icon  />{{$t('search')}}</mdb-btn>
            <mdb-btn color="indigo" class="mt-0" style="font-size: 10px; min-width:100px;" @click="allClientMark()"
              p="r4 l4 t2 b2">
            <mdb-icon  />{{$t('all')}}</mdb-btn>
          </div>
        </div>
      </div>
    </div>
    <div id="map">
      <loaderTable v-if="loading" class="mt-5"/>
      <yandex-map v-if="map_show"
        :coords="coords"
        zoom="13"
        style="width: 99.9%; height: 100vh;"
      >
          <!-- :balloon="{header: 'Z-'+mark.address.id, body: mark.address.address, footer: mark.client_name_str + '. ' + ' Телефон: ' + mark.phone_number_list_arr }" -->
      <div v-for="(mark,i) in clientByTuman_list" :key="i">
        <ymap-marker  
          :markerId="mark.id"
          marker-type="placemark"
          :coords="[mark.latidu, mark.longitu]"
          :hint-content="mark.address"
          @balloonopen="bindListener"
          @balloonclose="unbindListener"
          :icon="{
            imageSize: [43, 55],
            imageOffset: [-22, -55],
            content: mark.client_name_str,
            color: 'red',
            contentOffset: [-22, -55],
          }"
          :cluster-name="mark.id"
          @click="sendFunc(mark.id)"
      >
        <!-- <my-component slot="balloon" :mark="mark"></my-component> -->
      </ymap-marker>
      </div>
    <ymap-marker 
      markerId="3"
      marker-type="circle"
      :coords="[41.234687, 69.263790]"
      circle-radius="16"
      hint-content="Hint content 1"
      :marker-fill="{color: '#000000', opacity: 0.4}"
      :marker-stroke="{color: '#ff0000', width: 5}"
      :balloon="{header: 'EXTREME WATER', body: 'MCHJ', footer: '997772247'}"
    ></ymap-marker>
    <ymap-marker 
      markerId="3"
      marker-type="placemark"
      :coords="newClient"
      hint-content="New client"
      :icon="{
        imageSize: [43, 55],
        imageOffset: [-22, -55],
        content: 'N',
        contentOffset: [-22, -55],
      }"
      :marker-fill="{color: '#000000', opacity: 0.4}"
      :marker-stroke="{color: '#ff0000', width: 5}"
      :balloon="{header: 'New client', body: 'MCHJ', footer: '997772247'}"
    ></ymap-marker>
      </yandex-map>
    </div>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
    <Toast ref="message" style="z-index: 9999999 !important;"></Toast>
  </div>
</template>


<script>
import erpSelect from "../../components/erpSelect.vue";
import {mdbIcon, mdbBtn} from 'mdbvue'
import { loadYmap } from 'vue-yandex-maps';
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import { mapActions, mapGetters } from 'vuex';
import myComponent from './ballon.vue'
export default {
  components:{
    mdbIcon,mdbBtn,
    yandexMap, ymapMarker, myComponent, erpSelect
  },
data() {
  return {
    modal_info: '',
    modal_status: false,
    loading: false,
    map_show: false,
    coords: [41.311516, 69.283250],
    newClient: [0,0],

    clientByTuman_list: [],
    selectMark_id: null,
    district_name: '',
    district_id: null,
    langota: '',
  }
},
computed: {
  ...mapGetters(['allOrder_list', 'allDepartment']),
},
async mounted() {
  this.loading = true;
  const settings = { lang: 'en_US' };
    await loadYmap(settings);
    console.log(ymaps);
    await this.fetchDepartment();
    if(this.allDepartment.rows.length > 0){
      this.district_name = this.allDepartment.rows[0].name;
      this.district_id = this.allDepartment.rows[0].id;
      await this.fetchClientByTumanId(this.allDepartment.rows[0].id);
    }
    else{
      await this.fetchClientByTumanId(0);
    }
  this.loading = false;
  this.map_show = true;
},
methods: {
  ...mapActions(['fetchOrder_list', 'fetchDepartment']),
    async allClientMark(){
      this.clientByTuman_list = [];
      await this.fetchClientByTumanId(0);
    },
    updateNewMark() {
      this.map_show = false;
      if(this.langota.length> 26){
        let lat = ''
        let lon = ''
        lat = this.langota.slice(31,40)
        lon = this.langota.slice(41, 50)
        this.newClient = [lat, lon]
        this.coords = [lat, lon]

      }
      this.map_show = true;
    },
    async fetchClientByTumanId(id){
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/WaterClients/getPaginationClientListByTumanId?page=0&size=1000&tuman_id=" + id);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.clientByTuman_list = [];
          const data = await response.json();
          this.clientByTuman_list = data.items_list;
          console.log(data);
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          const data = await response.text();
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
      

    bindListener() {
      document.getElementById('btnclose').addEventListener('click', this.closeOrder);
      document.getElementById('btn').addEventListener('click', this.handleropen);
    },
    unbindListener() {
      document.getElementById('btn').removeEventListener('click', this.handlerclose);
    },
    handleropen() {
      console.log('MarshaOlloh ishladi open')
      window.history.pushState('https://t.me/extreme_water_bot')

    },
    handlerclose() {
      console.log('MarshaOlloh ishladi close')
    },
    closeOrder(){
      this.$router.push('/close_order/' + this.selectMark_id)
    },
    async selectOption(option){
      this.map_show = false;
      console.log(option)
      this.district_name = option.name;
      this.district_id = option.id;
      this.loading = true;
      const settings = { lang: 'en_US' };
      await loadYmap(settings);
      await this.fetchClientByTumanId(option.id);
      this.loading = false;
      this.map_show = true;
    },

  sendFunc(id){
    this.selectMark_id = id;
  },
  direct(){
    console.log('directed')
  },
},
}
</script>

<style>
.bg_Parentwhite{
  background: rgba(10, 10, 10, 0);
}
</style>