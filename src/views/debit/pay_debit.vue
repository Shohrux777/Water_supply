<template>
  <div class="rasxod p-4">
    <form @submit.prevent="save_data">
      <div class="row">
        <div class="col-12">
          <input-icon  v-model="group.client.fio"   validate error="wrong" disabled success="right" icon="user"/>
          <input-icon  v-model="group.real_summ" class="mt-3"  validate error="wrong" disabled success="right" icon="hand-holding-usd"/>
        </div>
        <div class="col-12 mt-4">
          <input-icon  v-model="price"  ref="name"  type="number"  validate error="wrong" success="right" icon="dollar-sign"/>
          <small style="position:absolute; top:-18px; left:18px; color:#747474;">{{$t('price')}}</small>
          <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.price.$dirty && !$v.price.required" >
              {{$t('name_invalid_text')}}
            </small>
        </div>
        
      </div>
      <div class="custom-control custom-switch pt-4 text-center">
          <input v-model="status" type="checkbox" class="custom-control-input " id="customSwitch1" checked>
          <label class="custom-control-label status-style" for="customSwitch1">{{$t('card')}}</label>
        </div>
      <div class="mt-2 row_w">
          <div class="col_12">
            <div class="mt-2 text-right">
              <mdb-btn color="success"  type="submit" style="font-size: 10.5px"
              p="r4 l4 t2 b2">
              {{$t('add')}}</mdb-btn>
            </div>
          </div>
        </div>
    </form>
    <Toast ref="message"></Toast>

  </div>
</template>

<script>
import {mdbBtn} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  components: {
     mdbBtn
  },
  data() {
    return {
      price:null,
      status: false,
    }
  },
  props:{
    group:{
      type: Object,
      default(){
        return {}
      }
    }

  },

   validations: {
    price: {
      required
    },
  },
  async mounted(){
    this.$refs.name.focus();
  },
  computed:mapGetters(['allUser']),

  methods: {
    ...mapActions(['fetchUser']),
    clw(){
      this.price = null;
    },

    save_data :  async function(){
      if(this.$v.$invalid )
      {
        this.$v.$touch();
        this.$refs.message.warning('please_fill')
        return false;
      }
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazDebit/getPayDebitClientSumm?debit_id=" + this.group.id + "&summ=" + this.price + "&card_or_cash=" + !this.status);
        const data = await response.text();
        console.log(data);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Added_successfully')
          this.clw();
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
  },
}
</script>

<style>

</style>