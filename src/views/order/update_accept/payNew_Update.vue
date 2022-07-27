<template>
  <div>
    <LoaderTable v-if="loading"/>
    <div v-else class="pay_page">
      <div class=" px-4 d-flex justify-content-between mt-2 mb-3">
        <h5 class="m-0 mb-2 text-primary border-bottom">{{client_name}}</h5>
        <!-- <h6 class="m-0 mb-1 font-weight-bold">Z - {{order.address.id}}</h6> -->
        <h5 class="m-0 mb-2 text-success border-bottom" >{{summInString}} сум</h5>
      </div>
      <div class="mx-3 mb-1">
        <div style="position:relative;">
          <text-area rows="1" class="w-100"  v-model="note"  validate error="wrong" success="right"/>
          <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
            {{$t('note')}}
          </small>
        </div> 
        <div style="position:relative;" class="mt-3">
          <input type="date" v-model="order_date"
          
          class="form-control  border mt-2 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:30px;" >
          <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
            {{$t('date')}}
          </small>
        </div> 
        <div style="position:relative;" class="mt-3">
          <input type="text" v-model="cashInString"  v-on:keyup.13 = "payed" @keyup="funcCash($event.target.value)"  
          ref="cashIn"  v-on:click.capture="cashNol"
          class="form-control  border mt-2 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:30px;" >
          <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
            {{$t('cash')}}
          </small>
        </div> 
        <div style="position:relative;" class="mt-3">
          <input type="text" v-model="cardInString"  v-on:keyup.13 = "payed" @keyup="funcCard($event.target.value)"
          ref="cashIn" v-on:click.capture="cardNol" 
          class="form-control  border mt-2 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:30px;" >
          <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
            {{$t('card')}}
          </small> 
        </div> 
        <div style="position:relative;" class="mt-3">
          <input type="number" v-model="main_product_qty" @blur="funcGiveNol" @keyup="funcGiveBootle($event.target.value)"
          class="form-control  border mt-2 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:30px;" >
          <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
            {{$t('give_bootle')}}
          </small>
        </div>

        <div style="position:relative;" class="mt-3">
          <input type="number" v-model="get_bootle" @keyup="funcBootle($event.target.value)" @keyup.enter="payed"
          ref="get_Bootle" v-on:click.capture="funcBootle" @blur="funcGetNol"
          class="form-control  border mt-2 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:30px;" >
          <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
            {{$t('getten_bootle')}}
          </small>
        </div>

        <div class="row mt-3" v-for="(item,index) in order_item" :key="index">
          <div class="col-4">
            <input type="text" v-model="item.product_name" disabled
            class="form-control  border mt-2 text-left pr-2" style="border:none; font-size: 13px; outline:none; font-weight:bold; height:30px;" >
          </div>
          <div class="col-4" >
            <div style="position:relative;">
              <input type="text" v-model="item.qty" @input="funcItemProduct(index)"
                class="form-control  border mt-2 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:30px;" >
              <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
                {{$t('qty')}}
              </small>
            </div>
          </div>
          <div class="col-4" >
            <div style="position:relative;">
              <input type="text" disabled :value="item.price*item.qty" 
                class="form-control  border mt-2 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:30px;" >
              <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
                {{$t('price')}}
              </small>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 mb-5" v-show="productList.length>0">
            <div class="product">
              <div class="row " v-for="(item,i) in productList" :key="i" :class="{'mt-1': i==0, 'mt-3': i>0}">
                <div class="col-9">
                  <erpSelect
                    size="sm"
                    :options="all_product_t.rows"
                    @select="selectOption"
                    :selected="item.product_name"
                    :label="$t('province')"
                    :index="i"
                  />
                  <small class="p-0" style="margin-left:5px; font-size: 12px; top:-17px; color: gray; position:absolute;"  >
                    {{$t('select_product')}}
                  </small>
                  <!-- <small v-if="$v.comp_name.$dirty && comp_id == null" class="invalid-text mt-0 ml-2" >
                    {{$t('select_item')}}
                  </small> -->
                </div>
                <div class="col-3">
                  <input-img valid  v-model="item.qty" style="height:32px;" error="wrong" success="right" icon="" type="number"/>
                  <small class="p-0" style="margin-left:5px; font-size: 12px; top:-17px; color: gray; position:absolute;"  >
                    {{$t('qty')}}
                  </small>
                  <div class="added bg-danger rounded"  style="position:absolute; right:-30px; top:1px;" @click="productList.splice(i,1)">
                    <mdb-icon icon="trash p-2 text-white" style="font-size:12px; cursor:pointer;"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        <div class="d-flex justify-content-between mt-2" style="font-size:13.5px;">
          <span v-if="parseFloat(defaultSum.toFixed(2)) > summa" class="text-success"> Больше денег </span>
          <span v-if="parseFloat(defaultSum.toFixed(2)) > summa" class="text-success">{{(parseFloat(defaultSum.toFixed(2))-summa).toFixed(2)}}</span>
        </div>
        <div class="d-flex justify-content-between mt-2" style="font-size:13.5px;">
          <span v-if="parseFloat(defaultSum.toFixed(2)) < summa" class="text-danger"> Не хватить </span>
          <span v-if="parseFloat(defaultSum.toFixed(2)) < summa" class="text-danger">{{(parseFloat(defaultSum.toFixed(2))-summa).toFixed(2)}}</span>
        </div>
      </div>
      <div class="d-flex justify-content-end mx-3 mt-0">
        <mdb-btn color="success" @click="addProduct"  style="font-size: 9px" class="mr-3"
            p="r4 l4 t2 b2">
          {{$t('Add_product')}}</mdb-btn>
        <mdb-btn color="primary" @click="closeUpdateOrder" style="font-size: 9px"
            p="r4 l4 t2 b2">
          {{$t('update')}}</mdb-btn>
      </div>

    
    </div>
      <massage_box :hide="modal_status" :detail_info="modal_info"
        :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
  </div>
  
</template>

<script>
import {mdbBtn,mdbIcon } from "mdbvue"
import LoaderTable from "../../../components/loaderTable.vue";
import InputImg from '@/components/inputImg.vue';
import {mapActions,mapGetters} from 'vuex'
import erpSelect from "@/components/erpSelectIndex";

export default {
  components:{
    mdbBtn,
    LoaderTable,
    erpSelect,
    InputImg,
    mdbIcon
},
  data() {
    return {
      modal_info: '',
      modal_status: false,
      loading: false,

      cashInString: '0',
      cashIn: 0,
      cardInString: '0',
      cardIn: 0,

      summa: 0,
      discount: 0,
      discountSum: 0,
      defaultSum: 0,

      get_bootle: 0,

      main_product_qty: 0,
      default_product_qty: 0,

      main_order_id: null,
      main_product_id: null,
      order_summa: 0,
      summInString: '',
      client_name: '',
      client_id: null,
      address_id: null,
      main_product_price: 0,
      deleivered_user_auth_id:null,

      order_item: [],
      invoice_id: null,
      order_date: '',
      note: '',

      productList: [],
    }
  },
  props: {
    order:
    {
      type: Object,
      default(){
        return {}
      }
    },
    product_id : {
      type : Number,
      default : 0
    },
    bootle_qty : {
      type : Number,
      default : 0
    },
    shown: {
      type: Boolean,
      default: false,
    },
    orderId : {
      type : Number,
      default : 0
    },
  },
  async mounted() {
    await this.fetch_product_t();
  },
  computed: mapGetters([ 'all_product_t']),

  methods: {
    ...mapActions(['fetch_product_t']),
    selectOption(option){
      console.log(option)
      this.productList[option.index].product_name = option.data.name;
      this.productList[option.index].product_id = option.data.id;
    },
    addProduct(){
      let item = {
        product_name: '',
        product_id: null,
        qty:0,
      }
      this.productList.push(item);
    },
    async fetchMounted(id){
      this.productList = [];
      try{
        const res = await fetch(this.$store.state.hostname + '/WaterOrders/getOrderFullInfoByid?order_id=' + id);
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        this.invoice_id = id;
        this.main_product_qty = 0;
        this.default_product_qty = 0;
        this.main_product_price = 0;
        this.main_product_id = null,
        this.main_order_id = null,
        this.order_summa= 0;
        this.order_item = [];
        this.client_name = data.client_name_str;
        this.client_id = data.client.id;
        this.address_id = data.address.id;
        this.note = data.note;
        this.order_date = data.order_date.slice(0,10);
        this.deleivered_user_auth_id = data.deleivered_user_auth_id;
        for(let i=0; i<data.items.length; i++){
          this.order_summa += parseFloat(data.items[i].qty* parseFloat(data.items[i].product.info));
          if(data.items[i].product.main_product == true){
            this.main_product_id = data.items[i].product.id;
            this.main_order_id = data.items[i].id;
            this.main_product_qty = data.items[i].qty;
            this.default_product_qty = data.items[i].qty;
            this.main_product_price = parseFloat(data.items[i].product.info);
          }
          else{
            let item_cash = {
              product_name: data.items[i].product.name,
              waterProductid: data.items[i].product.id,
              qty: data.items[i].qty,
              real_qty: data.items[i].qty,
              note: '',
              id: data.items[i].id,
              price: parseFloat(data.items[i].product.info)
            }
             this.order_item.push(item_cash)
          }
        }
        this.summInString = new Intl.NumberFormat().format(this.order_summa)
        console.log(this.order_summa)
        this.summa = this.order_summa;
        this.cashIn = this.order_summa;
        this.defaultSum = this.order_summa;
        this.cashInString = this.summInString;
      }
      catch{
        console.log('error')
      }
      this.$refs.get_Bootle.focus();
      this.get_bootle = null;
      await this.fetchOstatka();
    },
    async fetchOstatka(){
      try{
        this.loadingSimple = true;
        const response = await fetch(this.$store.state.hostname + "/WaterClientBottleInfoes/getPaginationClientIdAndAddressId?page=0&size=1&client_id=" + this.client_id + '&address_id=' + this.address_id);
        const data = await response.json();
        this.loadingSimple = false;
        console.log(data)
        if(data.items_list.length>0){
          this.get_bootle = data.items_list[0].bottle_count
        }
        else{
          this.get_bootle = null
        }
      }
      catch{
        this.get_bootle = null
      }
    },
    funcItemProduct(index){
      this.order_item[index].real_qty = this.order_item[index].qty;
      let easy_sum = 0;
      easy_sum = this.main_product_qty * this.main_product_price;
      for(let i=0; i<this.order_item.length; i++){
        easy_sum += (this.order_item[i].qty * this.order_item[i].price)
      }
      this.summa = easy_sum;
      this.summInString = new Intl.NumberFormat().format(this.summa);
      this.cashIn = this.summa;
      this.defaultSum = this.summa;
      this.cashInString = this.summInString;
      this.cardInString = '0';
      this.cardIn = 0;
    },
    getSumma(summ, summString){
      this.cashIn = summ;
      this.summa = summ;
      this.defaultSum = summ;
      this.cashInString = summString;
    },
    funcCash(n){
      this.discount = parseFloat(this.cashIn) + parseFloat(this.cardIn);
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      this.discountSum = parseFloat(this.discountSum.toFixed(2))

      if(this.discountSum == 0){
      console.log('this.discountSum')
        this.cashIn = 0;
        this.cashInString = ''; 
        n = n[n.length-1];
      }

      console.log(n)
      var tols = ''
      for(let i=0; i<n.length; i++){
        if(n[i] != ' '){
          tols += n[i];
        }
       }

       this.cashInString = tols.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
       var temp = ''
       for(let i=0; i<this.cashInString.length; i++){
        if(this.cashInString[i] != ' '){
          temp += this.cashInString[i];
        }
       }
      this.cashIn = parseFloat(temp);
      this.defaultSum = parseFloat(this.cashIn) + parseFloat(this.cardIn);
    },
    funcCard(n){
      this.discount = parseFloat(this.cashIn) + parseFloat(this.cardIn);
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      this.discountSum = parseFloat(this.discountSum.toFixed(2))

      if(this.discountSum == 0){
        console.log('this.discountSum')
        this.cardIn = 0;
        this.cardInString = ''; 
        n = n[n.length-1];
      }
      console.log(n)
      var tols = ''
      for(let i=0; i<n.length; i++){
        if(n[i] != ' '){
          tols += n[i];
        }
       }
       this.cardInString = tols.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
       var temp = ''
       for(let i=0; i<this.cardInString.length; i++){
        if(this.cardInString[i] != ' '){
          temp += this.cardInString[i];
        }
       }
      this.cardIn = parseFloat(temp);
      this.defaultSum = parseFloat(this.cashIn) + parseFloat(this.cardIn);
    },
    funcGiveBootle(n){
      var tols = ''
      for(let i=0; i<n.length; i++){
        if(n[i] != ' '){
          tols += n[i];
        }
      }
      if(tols == '' || tols == null){
        tols = 0;
      }
      console.log(tols)
      let easy_sum = 0;
      easy_sum = this.main_product_price * parseFloat(tols);
      for(let i=0; i<this.order_item.length; i++){
        easy_sum += (this.order_item[i].qty * this.order_item[i].price)
      }
      this.summa = easy_sum;
      this.summInString =  new Intl.NumberFormat().format(this.summa);
      this.cashIn = this.summa;
      this.defaultSum = this.summa;
      this.cashInString = this.summInString;
      this.cardInString = '0';
      this.cardIn = 0;
    },
    funcBootle(){
      if(this.get_bootle == 0){
        this.get_bootle = null;
      }
    },
    funcGetNol(){
      if(this.get_bootle == null){
        this.get_bootle = 0;
      }
    },
    funcGiveNol(){
      if(this.main_product_qty == null || this.main_product_qty == ''){
        this.main_product_qty = 0;
      }
    },
   
    cashNol(){
      this.discount = parseFloat(this.cardIn);
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);

      if(this.cashIn == this.summa || this.cardIn == this.summa ){
        this.cashIn = this.summa;
        this.cashInString = this.cashIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        this.cardIn = 0;
        this.cardInString = '0';
        console.log('this.cashIn')
        console.log(this.cashIn)
      }
      else if(this.discountSum > 0){
        this.cashIn = parseFloat(this.discountSum.toFixed(2));
        console.log(this.cashIn)
        this.cashInString = this.cashIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      }

      this.defaultSum = this.cashIn + this.cardIn;
    },
    cardNol(){
      this.discount = parseFloat(this.cashIn);
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);

      if(this.cashIn == this.summa || this.cardIn == this.summa ){
        this.cashIn = 0;
        this.cashInString = '0';
        this.cardIn = this.summa;
        this.cardInString = this.cardIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        console.log('this.cardIn')
        console.log(this.cardIn)
      }
       else if(this.discountSum > 0){
        this.cardIn = parseFloat(this.discountSum.toFixed(2));
        console.log(this.cardIn)
        this.cardInString = this.cardIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      }
      this.defaultSum = this.cashIn + this.cardIn;
    },
    async fetchBootle(){
      if(this.get_bootle == null || this.get_bootle == ''){
        this.get_bootle = 0;
      }
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/WaterOrders/addBotlfInfoToClientForAccept?olingan_bakalshka_soni=" + ((-1) * parseInt(this.get_bootle)) + '&berilgan_bakalshka_soni=' + this.main_product_qty + '&product_id=' + this.main_product_id + '&client_id=' + this.client_id + '&address_id=' + this.address_id);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          const data = await response.json();
          console.log(data)
          // this.$refs.message.success('Added_successfully')
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
        return false;
      }
    },
    async fetchCheck(){
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "cash" : this.cashIn,
          "card" : this.cardIn,
          "summ" : this.summa,
          "user_name": this.client_name,
          "waterAuthid": localStorage.AuthId,
          "id" : 0,
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/WaterChecks", requestOptions);
      
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    },

    async closeUpdateOrder(){
      if(await this.fetchUpdateOrder())
        this.$emit('closeUpdate')
    },

    async fetchUpdateOrder(){
      let itemsList = [];
      for(let i=0; i<this.order_item.length; i++){
        itemsList.push(this.order_item[i]);
      }
      if(this.productList.length>0){
        for(let i=0; i<this.productList.length; i++){
          let tempInv = {
            waterProductid : this.productList[i].product_id,
            qty: this.productList[i].qty,
            real_qty: this.productList[i].qty,
            note: '',
            id: 0,
          }
          itemsList.push(tempInv);
        }
      }

      let item_main = {
        waterProductid: this.main_product_id,
        qty: this.main_product_qty,
        real_qty: this.main_product_qty,
        note: '',
        id: this.main_order_id,
      }
      itemsList.unshift(item_main)
      

      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "order_date" : this.order_date + 'T12:00:00.000Z',
          "waterClientid": this.client_id,
          "water_count": this.main_product_qty,
          "waterClientAddressid": this.address_id,
          "deleivered_user_auth_id": this.deleivered_user_auth_id,
          "note": this.note,
          "items": itemsList,
          "id" : this.invoice_id,
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/WaterOrders", requestOptions);
        const data = await response.text();
        console.log(response)
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
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
        return false;
      }


      
    },
    async AcceptOrder(id){
      try{
        const res = await fetch(this.$store.state.hostname + '/WaterOrders/closeAcceptOrder?id=' + id);
        const data = await res.json();
        console.log(data)
        if(res.status == 200 || res.status == 201){
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');
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

    async payed(){
      if(this.default_product_qty != this.main_product_qty || this.order_item.length>0){
        console.log('update qil orderni ishladi')
        await this.fetchUpdateOrder();
      }
      // await this.fetchBootle();
      // await this.fetchCheck();

      if(await this.AcceptOrder(this.invoice_id) && await this.fetchBootle() && await this.fetchCheck()){
        this.$emit('close')
      }
    }
  },
}
</script>

<style>

</style>