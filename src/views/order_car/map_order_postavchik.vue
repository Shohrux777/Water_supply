<template>
  <div class="map_order">
    <backRouter />
    <div style="position:fixed; top:50px; left:75px; transform: translate(-50%, 0%); z-index:1111111; cursor:pointer;" 
    class="bg_gradiunt p-1 px-2 rounded" @click="$router.push('/pos_order_list')">
      <mdb-icon icon="angle-double-left" />
    </div>
    <div id="map">
      <loaderTable v-if="loading"/>
      <yandex-map v-if="map_show"
        :coords="[41.311516, 69.283250]"
        zoom="13"
        style="width: 100%; height: 100vh;"
      >
          <!-- :balloon="{header: 'Z-'+mark.address.id, body: mark.address.address, footer: mark.client_name_str + '. ' + ' Телефон: ' + mark.phone_number_list_arr }" -->
      <div v-for="(mark,i) in get_postavchik_order_list" :key="i" >
        <ymap-marker  
          :markerId="mark.id"
          marker-type="placemark"
          :coords="[mark.address.latidu, mark.address.longitu]"
          :hint-content="mark.client.fio"
          @balloonopen="bindListener"
          @balloonclose="unbindListener"
          :icon="{
            imageSize: [43, 55],
            imageOffset: [-22, -55],
            content: mark.client.fio,
            color: mark.color_value,
            contentOffset: [-22, -55],
          }"
          :cluster-name="mark.id"
          @click="sendFunc(mark.id)"
      >
        <my-component slot="balloon" :mark="mark"></my-component>
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
      </yandex-map>
    </div>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
    <Toast ref="message"></Toast>

    <modal-train  :show="pay_show" headerbackColor="white"  titlecolor="black" :title="$t('pay')" 
      @close="pay_show = false" width="50%">
        <template v-slot:body>
          <payNewOrder ref="payNew" @close="closeAcceptOrder"  @closeUpdate="closeUpdate" :orderId="selectMark_id" :shown="pay_show"></payNewOrder>
        </template>
    </modal-train>
  </div>
</template>


<script>
import {mdbIcon} from 'mdbvue'
import { loadYmap } from 'vue-yandex-maps';
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import { mapActions, mapGetters } from 'vuex';
import myComponent from './ballon.vue'
import payNewOrder from '../order/payNew.vue'
export default {
  components:{
    mdbIcon,
    yandexMap, ymapMarker,
    myComponent,
    payNewOrder
  },
data() {
  return {
    modal_info: '',
    modal_status: false,
    loading: false,
    map_show: false,
    pay_show: false,

    order_id: null,

    order_list: [{
      id:1,
      client_name_str: 'test1',
      address: {
        latidu: 41.349307,
        longitu: 69.335900,
        address: 'Toshkent',
        id: 2
      },
    }],
    selectMark_id: null,
  }
},
computed: {
  ...mapGetters(['get_postavchik_order_list']),
},
async mounted() {
  this.loading = true;
  const settings = { lang: 'en_US' };
    await loadYmap(settings);
    console.log(ymaps);
  console.log(this.get_postavchik_order_list);
  this.loading = false;
  let date_and_item = {
    auth_id: localStorage.postavchikAuthId
  }
  await this.fetchPostavchikOrder(date_and_item);
  this.map_show = true;
},
methods: {
  ...mapActions(['fetchOrder_list', 'fetchPostavchikOrder']),

    bindListener() {
      document.getElementById('btnclose').addEventListener('click', this.closeOrder);
      document.getElementById('btn').addEventListener('click', this.handleropen);
    },
    unbindListener() {
      document.getElementById('btn').removeEventListener('click', this.handlerclose);
    },
    handleropen() {
      console.log('MarshaOlloh ishladi open')
      // this.$router.replace('https://t.me/extreme_water_bot')
      // this.$router.push('https://t.me/extreme_water_bot')
      window.history.pushState('https://t.me/extreme_water_bot')
    },
    handlerclose() {
      console.log('MarshaOlloh ishladi close')
    },
    closeOrder(){
      this.pay_show = true;
      this.$refs.payNew.fetchMounted(this.selectMark_id);
    },
  sendFunc(id){
    this.selectMark_id = id;
  },
  direct(){
    console.log('directed')
  },

  async closeUpdate(){
    this.map_show = false;
    this.pay_show = false;
    let date_and_item = {
      auth_id: localStorage.postavchikAuthId
    }
    await this.fetchPostavchikOrder(date_and_item);
    this.map_show = true;
  },
  
 

  async fetchOrder(){
     try{
      this.loading = true;
      const response = await fetch(this.$store.state.hostname + "/WaterOrders/getPaginationOpenOrdersList?page=0&size=100");
      this.loading = false;
      if(response.status == 201 || response.status == 200)
      {
        const data = await response.json();
        this.order_list = data.items_list
        console.log(data)
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
  async closeAcceptOrder(){
    this.map_show = false;
    this.pay_show = false;
    let date_and_item = {
      auth_id: localStorage.postavchikAuthId
    }
    await this.fetchPostavchikOrder(date_and_item);
    this.map_show = true;
  }
},
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(78, 160, 255);
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(23, 65, 253);
}
.bg_gradiunt{
  background-image: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );
}
</style>