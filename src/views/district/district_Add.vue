<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom navbar_sticky">
      <router-link to="/district">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('add_district')}}</h5>
      </router-link>
    </div>
    <div class="user_add p-5">
      <form @submit.prevent="submit">
        <div class="row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('name')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon  v-model="name" ref="name"  validate error="wrong" success="right" icon="clipboard-list"/>
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
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('province')}}</p>
          </div>
          <div class="col_5 px-2" style="position: relative;">
              <erpSelect
                :options="allCompany.rows"
                @select="selectOption"
                :selected="comp_name"
                :label="$t('province')"
              />
              <small v-if="$v.comp_name.$dirty && comp_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </div>
        </div> 
         
        <div class="blue-gradient">
          <hr class="mt-5 "/>
        </div>
        <div class="mt-4 row_w">
          <div class="col_8">
            <div class="mt-2 text-right">
              <mdb-btn  @click="submit_continue" color="primary" m="r3" style="font-size: 10.5px"
                p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
              </mdb-btn>
              <mdb-btn color="success"  type="submit" style="font-size: 10.5px"
                p="r4 l4 t2 b2">
                <mdb-icon  />{{$t('add')}}</mdb-btn>
            </div>
          </div>
        </div>
        
      </form>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
    </div>
  </div>
</template>

<script>
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import erpSelect from "../../components/erpSelect.vue";
import { required } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'
export default {
  naem: "companyAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,

      name: '',
      comp_name: '',
      comp_id: null,
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, erpSelect
  },
  validations: {
      name: {
        required
      },comp_name: {
        required
      }
    },
    async created()
    {
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/WaterTumen/' + this.id);
        const data = await res.json();
        console.log(data);
        this.name = data.name
      }

    },
    async mounted(){
      this.$refs.name.focus();
      await this.fetchCompany();
    },
    computed:mapGetters(['allCompany']),
  methods:{
    ...mapActions(['fetchCompany']),
    selectOption(option){
      this.comp_name = option.name
      this.comp_id = option.id
    },
    cls_wnd()
      {
        this.name = '';
        this.comp_id = null;
        this.comp_name = '';
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
              "name" : this.name,
              "waterViloyatid": this.comp_id,
              "id": this.id
            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/WaterTumen", requestOptions);
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
    },
    async submit()
      {
        if(await this.save_data())
        {
          this.$store.state.alert = true;
          this.$router.push("/district");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/district_add/0')
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

<style>

</style>