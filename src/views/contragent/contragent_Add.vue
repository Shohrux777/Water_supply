<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom navbar_sticky">
      <router-link to="/contragent">
         <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('Add_contragent')}}</h5>
      </router-link>
     
    </div>
    <div class="contragent_add px-5 pt-4">
      <form @submit.prevent="submit">
        <div class="row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('name')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon  v-model="name"  validate error="wrong" success="right" icon="user"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
        </div> 
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phoneNumber')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-phone  v-model="phone_number"  validate error="wrong" success="right" icon="phone-alt"/>
            <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required" >
              {{$t('name_invalid_text')}}
            </small>
            <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </div>
        </div>
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phoneNumberTeleg')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-phone  v-model="phone_number_1"  validate error="wrong" success="right" icon="phone-alt"/>
            <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required" >
              {{$t('name_invalid_text')}}
            </small>
            <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </div>
        </div>
        <div class="row_w mt-4">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('address')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon  v-model="address"  validate error="wrong" success="right"/>
            <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.address.$dirty && !$v.address.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
        </div>
        <div class="row_w mt-4">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('dokon_number')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon  v-model="dokon_number"  validate error="wrong" success="right" />
            <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.dokon_number.$dirty && !$v.dokon_number.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
        </div>
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('contragent_type')}}</p>
          </div>
          <div class="col_5 px-2" style="position: relative;">
              <erpSelect
                :options="allLevel.rows"  
                @select="selectOption"
                :selected="type_name"
                :label="$t('province')"

              />
              <small v-if="$v.type_name.$dirty && type_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </div>
        </div>
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('note')}}</p>
          </div>
          <div class="col_5 px-2">
            <text-area v-model="note" rows="3" type="text" icon="comment"/>
          </div>
        </div>
        
        
        

                           
        <div class="footer_sticky">
          <div class="blue-gradient">
            <hr class="mt-5 "/>
          </div>
          <mdb-row class="mt-0" >
            <mdb-col col="8">
              <div class="mt-0 mb-2 text-right">
                <mdb-btn  @click="submit_continue" color="primary" m="r3" style="font-size: 10.5px"
                  p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
                </mdb-btn>
                <mdb-btn color="success"  type="submit" style="font-size: 10.5px"
                  p="r4 l4 t2 b2">
                  <mdb-icon  />{{$t('add')}}</mdb-btn>
              </div>
            </mdb-col>
          </mdb-row>
        </div>
        
        
      </form>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
    </div>
  </div>
</template>

<script>
// import md5 from 'js-md5'
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import { required } from 'vuelidate/lib/validators'
import {mapActions,mapGetters} from 'vuex'
import InputIcon from '../../components/inputIcon.vue';
import erpSelect from "../../components/erpSelect.vue";


export default {
  naem: "companyAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,
      name: '',
      icon_base_64_str: '',
      note: '',
      phone_number_1: '',
      phone_number: '',
      dokon_number: '',
      address: '',
      type_name: '',
      type_id: null,

    
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, 
    InputIcon,erpSelect
  },
  validations: {
      name: {required},
      type_name: {required}
    },
    //  props :
    // {
    //   props_name : {
    //     type : String,
    //     default : ''
    //   },
      
    // },
    async created()
    {
     
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/WaterContragents/' + this.id);
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        this.name = data.name,
        this.note = data.note,
        this.phone_number = data.phone_number;
        this.phone_number_1 = data.phone_number_1;
        this.address = data.address;
        this.dokon_number = data.dokon_number;
      }

    },
    mounted(){
      this.fetchLevel();
    },
    computed: mapGetters(['allLevel']),

  methods:{
    ...mapActions(['fetchLevel']),
    selectOption(option){
      this.type_name = option.name
      this.type_id = option.id
    },
    cls_wnd()
    {
      this.name = '';
      this.note = '';
    },
    GetIcon(icon){
      this.icon_base_64_str = icon.name
      this.note = icon.color
      console.log(this.icon_base_64_str)
    },
    async save_data(){
        // console.log(this.born_date)
        if(this.$v.$invalid)
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
        else{ 
          this.alert_danger = false;
          const requestOptions = {
              method : "POST",
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify({
                "name" : this.name,
                "note": this.note,
                "phone_number": this.phone_number,
                "phone_number_1": this.phone_number_1,
                "address": this.address,
                "dokon_number": this.dokon_number,
                "waterContragentTypeid": this.type_id,
                "id" : this.id,
              })
            };
            try{
              this.loading = true;
              const response = await fetch(this.$store.state.hostname + "/WaterContragents", requestOptions);
              const data = await response.text();
              this.loading = false;
              if(response.status == 201 || response.status == 200)
              {
                this.$refs.message.success('Added_successfully')
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
        }
    },
    async submit()
      {
        if(await this.save_data())
        {
          this.$store.state.alert = true;
          this.$router.push("/contragent");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/contragent_add/0')
            this.cls_wnd();
          }
          else{
            this.cls_wnd();
          }
        }
      },
  }
}
</script>

<style lang="scss">
.download{
  width: 35%;
  height: 33px;
  border: 0.5px solid #4285F4;
  border-radius: 4px;
  margin-top: 7px;
  display: flex;
  align-items: center;
  color: gray; 
  font-size: 13px;
  cursor:pointer;
}
.download span{
    margin-left: 10px;
}



</style>