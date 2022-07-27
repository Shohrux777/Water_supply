<template>
  <div class="rasxod p-4">
    <form @submit.prevent="save_data">
      <div class="row">
        <div class="col-12">
          <erpSelect
            :options="allUser.rows"  
            @select="selectOption"
            :selected="user_name"
            :label="$t('company')"
          />
          <small style="position:absolute; top:-18px; left:18px; color:#747474;">{{$t('user')}}</small>

          <small v-if="$v.user_name.$dirty && user_id == null" class="invalid-text ml-2" style="margin-top: -10px;" >
              {{$t('select_item')}}
            </small>
        </div>
        <div class="col-12 mt-4">
          <erpSelectReg
            :options="rasxodType"  
            @select="selectOptionReg"
            :selected="rasxod_type"
            :label="$t('company')"
          />
          <small style="position:absolute; top:-18px; left:18px; color:#747474;">{{$t('rasxod_type')}}</small>

          <small v-if="$v.rasxod_type.$dirty && rasxod_type_id == null" class="invalid-text ml-2" style="margin-top: -10px;" >
              {{$t('select_item')}}
            </small>
        </div>
        <div class="col-12 mt-4">
          <input-icon  v-model="reason" ref="name"  validate error="wrong" success="right" icon="clipboard-list"/>
          <small style="position:absolute; top:-18px; left:18px; color:#747474;">{{$t('reason')}}</small>
          <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.reason.$dirty && !$v.reason.required" >
              {{$t('name_invalid_text')}}
            </small>
        </div>
        <div class="col-12 mt-4">
          <input-icon  v-model="price" class=""  type="number"  validate error="wrong" success="right" icon="clipboard-list"/>
          <small style="position:absolute; top:-18px; left:18px; color:#747474;">{{$t('price')}}</small>
          <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.price.$dirty && !$v.price.required" >
              {{$t('name_invalid_text')}}
            </small>
        </div>
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
import erpSelect from "../../components/erpSelectFio.vue";
import erpSelectReg from "../../components/erpSelect.vue";
import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    erpSelect, mdbBtn, erpSelectReg
  },
  data() {
    return {
      price:null,
      reason: '',
      user_name: '',
      user_id: null,

      rasxod_type: '',
      rasxod_type_id: null,
      rasxodType: [
      {
        name: 'Канцтовары',
        id: 1,
      },
      {
        name: 'Аренда',
        id: 2,
      },
      {
        name: 'Реклама',
        id: 3,
      },
      {
        name: 'Налог',
        id: 4,
      },
      {
        name: 'Другие',
        id: 5,
      },
      

      ]
    }
  },
   validations: {
    price: {
      required
    },
    reason: {
      required
    },
    user_name: {
      required
    },
     rasxod_type: {
      required
    }
  },
  async mounted(){
    this.$refs.name.focus();
    await this.fetchUser();
  },
  computed:mapGetters(['allUser']),

  methods: {
    ...mapActions(['fetchUser']),
    clw(){
      this.price = null;
      this.reason =  '';
      this.user_name =  '';
      this.user_id =  null;
       this.rasxod_type = '';
      this.rasxod_type_id = null;
    },
    selectOptionReg(option){
      this.rasxod_type = option.name
      this.rasxod_type_id = option.id
    },
    
    selectOption(option){
      console.log(option)
      this.user_name = option.fio
      this.user_id = option.id
    },

    save_data :  async function(){
      if(this.$v.$invalid )
      {
        this.$v.$touch();
        this.$refs.message.warning('please_fill')
        return false;
      }
      const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "rasxod" : this.price,
            "note": this.reason,
            "oquvMarkazUserid": this.user_id,
            "oquvMarkazAuthid": localStorage.AuthId,
            "cashback_card": this.rasxod_type,
            "cashback_summ": this.rasxod_type_id,
            "id": 0
          })
        };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazCheck", requestOptions);
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