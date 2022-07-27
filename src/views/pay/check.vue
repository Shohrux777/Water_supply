<template>
  <div class="check" style="z-index: 1000;">
    <div  class="ckeck_main  border">
      <!-- <div  style="text-align:center; margin: 10px 0;">
        <img src="../../assets/flour.png" id="image" style="width:60px;" class="img-fluid" alt="">
      </div> -->
      <div  style="text-align:center; margin: 10px 0 25px 0; padding: 0 40px;">
        <h5>OOO ENGZONE STUDY Chilonzor - 3, 45/2</h5>
      </div>
      <div class="infoHeader">
        <div style="display:flex; justify-content: space-between">
          <p style="font-weight: bold;">Chek raqami</p>
          <p>{{checkList.checkId}}</p>
        </div>
        <div style="display:flex; justify-content: space-between">
          <p style="font-weight: bold;">Shartnoma raqami</p>
          <p>{{checkList.checkId}}</p>
        </div>
        <div style="display:flex; justify-content: space-between">
          <p style="font-weight: bold;">Kassir</p>
          <p>{{kassir}}</p>
        </div>
        <div style="display:flex; justify-content: space-between">
          <p style="font-weight: bold;">O'quvchi</p>
          <p>{{checkList.user.name}}</p>
        </div>
        <div style="display:flex; justify-content: space-between">
          <p style="font-weight: bold;">To'lov maqsadi</p>
          <p>{{checkList.user.fan.name}}</p>
        </div>
        <div style="display:flex; justify-content: space-between">
          <p style="font-weight: bold;">To'lov summasi</p>
          <p>{{checkList.user.fan.price}}</p>
        </div>
        <div style="display:flex; justify-content: space-between">
          <p style="font-weight: bold;">To'lov muddati</p>
          <p><span>{{checkList.check_date.begin_date}}</span><span class="ml-2">{{checkList.check_date.end_date}}</span></p>
        </div>
        
      </div>
      

      <div class="totalInfo">
        <h6 style="margin:0; padding:0 5px; font-weight:bold">Hammasi</h6>
        <div style="border: 1px dashed black; width:30%;"></div>
        <h5 style="margin:0; padding:0 5px; font-weight:bold">
          {{checkList.check.cash + checkList.check.card + checkList.check.credit + checkList.check.debit + checkList.check.online }} 
          <span style="font-size:15px;">Сум</span></h5>
      </div>

      <div class="totalInfo" v-if="checkList.check.cash>0">
        <h6 style="margin:0; padding:0 10px 0 5px; font-weight:bold" >Naqd</h6>
        <div style="border: 1px dashed black; width:20%;"></div>
        <h4 style="margin:0; padding:0 5px 0 10px; font-weight:bold; " > {{checkList.check.cash}}<span style="font-size:16.5px;">Сум</span></h4>
      </div>
      <div class="totalInfo"  v-if="checkList.check.card>0">
        <h6 style="margin:0; padding:0 10px 0 5px; font-weight:bold">Plastik</h6>
        <div style="border: 1px dashed black; width:20%;"></div>
        <h4 style="margin:0; padding:0 5px 0 10px; font-weight:bold; " > {{checkList.check.card}}<span style="font-size:16.5px;">Сум</span></h4>
      </div>
      <div class="totalInfo"  v-if="checkList.check.credit>0">
        <h6 style="margin:0; padding:0 10px 0 5px; font-weight:bold">Credit</h6>
        <div style="border: 1px dashed black; width:20%;"></div>
        <h4 style="margin:0; padding:0 5px 0 10px; font-weight:bold; " > {{checkList.check.credit}}<span style="font-size:16.5px;">Сум</span></h4>
      </div>
      <div class="totalInfo"  v-if="checkList.check.debit>0">
        <h6 style="margin:0; padding:0 10px 0 5px; font-weight:bold">Debit</h6>
        <div style="border: 1px dashed black; width:20%;"></div>
        <h4 style="margin:0; padding:0 5px 0 10px; font-weight:bold; " > {{checkList.check.debit}}<span style="font-size:16.5px;">Сум</span></h4>
      </div>
      <div class="totalInfo"  v-if="checkList.check.online>0">
        <h6 style="margin:0; padding:0 10px 0 5px; font-weight:bold">Online</h6>
        <div style="border: 1px dashed black; width:20%;"></div>
        <h4 style="margin:0; padding:0 5px 0 10px; font-weight:bold; " > {{checkList.check.online}}<span style="font-size:16.5px;">Сум</span></h4>
      </div>
     
    </div>
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  data(){
    return{
      comp_name: localStorage.CompName,
      fan_name: localStorage.check_fan_name,
      client_name: localStorage.check_client_name,

      kassir : localStorage.fio,
      dateTime: new Date().toLocaleDateString(),
      time: new Date().toDateString,
      check_list: {},
      id: this.$route.params.id,

    }
  },
  async mounted(){
      window.print();
      await this.submitPayment();



    this.$emit('close')
    // this.clear_order();
    //  this.$router.back();

  },
  async created() {
    this.$root.$refs.checked = this;
    // if(this.id > 0)
    //   {
    //     const res = await fetch(this.$store.state.hostname + '/OquvMarkazCheck/' + this.id);
    //     const data = await res.json();
    //     console.log('this is by id')
    //     console.log(data)
    //     this.check_list = data;
    //     // 
    //     // this.name = data.name;
        
    //   }
  },
  computed: mapGetters(['get_zakaz_product_all_list','get_page_savat', 'get_all_summa','get_page_savat', 'CheckId','checkList']),
  methods: {
   ...mapMutations(['clear_order']),

   async submitPayment(){
     console.log(this.checkList.user.group_id)
     console.log(this.checkList.user.user_id)
     const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "oquvMarkazClientid" : this.checkList.user.user_id,
          "oquvMarkazPupilGroupsid": this.checkList.user.group_id,
          // "payed_or_not": false,
          "id" : 0,
        })
      };
      console.log(requestOptions.body)
      try{
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazFanAndGroupPayment", requestOptions);
        const data = await response.text();
        console.log(data)
        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Added_successfully')
          this.$emit('update')
          return true;
        }
        else{
          this.$refs.message.error('network_ne_connect')
          return false;
        }
      }
      catch{
          this.$refs.message.error('network_ne_connect')
      }
      
   }

  }
}
</script>

<style lang="scss">
.check {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999 !important;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;

  .ckeck_main{
    width: 400px;
    

    .infoHeader{
      border-bottom: 1px dashed black;
      padding: 0 10px 10px 10px; 
    }
    .infoList{
      padding: 10px 10px 15px 10px; 
    }
    .totalInfo{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 20px 10px; 

    }
  }
}
</style>