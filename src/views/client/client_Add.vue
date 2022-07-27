<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom navbar_sticky">
      <router-link to="/client">
         <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('Add_client')}}</h5>
      </router-link>
     
    </div>
    <div class="row mx-1">
      <div class="col-9">
        <div class="client_add px-5 pt-4">
          <form @submit.prevent="submit">
            <div class="row_w">
              <div class="col_5">
                <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('fio')}}</p>
              </div>
              <div class="col_7 px-2">
                <input-icon valid  v-model="name" @input="searchClient" validate error="wrong" success="right" icon="user"/>
                <small class="invalid-text mt-0" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
                  {{$t('name_invalid_text')}}
                </small>
                <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
                  {{$t('write_district_name_full')}}
                </small> -->
              </div>
            </div> 
            
            <div class="mt-4 row_w" v-for="(item,i) in phoneList" :key="i+50">
              <div class="col_5">
                <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phoneNumber') + (i+1)}}</p>
              </div>
              <div class="col_7 px-2" style="position:relative;">
                <input-phone  v-model="item.phone_number"  valid error="wrong" success="right" icon="phone-alt"/>
                <small class="invalid-text mt-0" style="margin-left:5px; "  
                v-if="($v.phoneList.$each[i].phone_number.$dirty &&
                        !$v.phoneList.$each[i].phone_number.required)" >
                  {{$t('name_invalid_text')}}
                </small>
                <div class="added bg-success rounded" v-show="i==0" style="position:absolute; right:-30px; top:5px;" @click="add_phone">
                  <mdb-icon icon="plus p-2 text-white" style="font-size:12px; cursor:pointer;"/>
                </div>
                <div class="added bg-danger rounded" v-show="i!=0" style="position:absolute; right:-30px; top:5px;" @click="delPhone(i)">
                  <mdb-icon icon="trash p-2 text-white" style="font-size:12px; cursor:pointer;"/>
                </div>
              </div>
            </div>
            
            <div class="mt-4 row_w" v-show="false">
              <div class="col_5">
                <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phoneNumberFather')}}</p>
              </div>
              <div class="col_7 px-2">
                <input-phone  v-model="phoneNumber2" error="wrong" success="right" icon="phone-volume"/>
                
  
                <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
                  {{$t('write_company_name_to_chek')}}
                </small> -->
              </div>
            </div>
            <div class="mt-4" style="position:relative;" v-for="(list,index) in addressList" :key="index">
              <div class="added bg-success rounded" style="position:absolute; left:-25px; top:5px; height:100%; width:4px;" >
              </div>
              <div class="row_w mt-4">
                <div class="col_5">
                  <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('address')}}</p>
                </div>
                <div class="col_7 px-2" style="position:relative;">
                  <input-icon  v-model="list.address"  validate error="wrong" success="right" />
                  <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.adreess.$dirty && !$v.adreess.required" >
                    {{$t('name_invalid_text')}}
                  </small> -->
                  <div class="added bg-success rounded" v-show="index==0" style="position:absolute; right:-30px; top:67px;" @click="add_address">
                    <mdb-icon icon="plus p-2 text-white" style="font-size:12px; cursor:pointer;"/>
                  </div>
                  <div class="added bg-danger rounded" v-show="index!=0" style="position:absolute; right:-30px; top:67px;" @click="addressList.splice(index,1)">
                    <mdb-icon icon="trash p-2 text-white" style="font-size:12px; cursor:pointer;"/>
                  </div>
                </div>
              </div>
              <div class="row_w mt-4">
                <div class="col_5">
                  <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('location')}}</p>
                </div>
                <div class="col_7 px-2">
                  <div class="w-100 d-flex">
                    <input-icon  v-model="list.latidu" placeholder="" validate error="wrong" success="right" icon="map-marker-alt"/>
                    <small class="invalid-text " style="margin-left:5px; margin-top:37px;"  
                      v-if="($v.addressList.$each[index].latidu.$dirty &&
                              !$v.addressList.$each[index].latidu.required) || ($v.addressList.$each[index].latidu.$dirty &&
                              !$v.addressList.$each[index].latidu.minLength)" >
                        {{$t('minValue')}}
                    </small>
                    <!-- <input-icon  v-model="list.longitu" class="ml-2" placeholder="48.11" validate error="wrong" success="right"/> -->
                  </div>
                </div>
              </div>
              <div class="row_w mt-4">
                <div class="col_5">
                  <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('district')}}</p>
                </div>
                <div class="col_7 px-2">
                  <div class="w-100 d-flex">
                    <ErpSelectIndex
                      :options="allDepartment.rows"
                      @select="selectOptionDistrictItem"
                      :selected="list.district_name"
                      :label="$t('level')"
                      :index="index"
                    />
                    <small class="invalid-text" style="margin-left:5px; margin-top:37px;"  
                      v-if="($v.addressList.$each[index].district_name.$dirty &&
                              !$v.addressList.$each[index].district_name.required)" >
                        {{$t('select_item')}}
                    </small>
                    <!-- <input-icon  v-model="list.longitu" class="ml-2" placeholder="48.11" validate error="wrong" success="right"/> -->
                  </div>
                </div>
              </div>
            </div>
            
            
            <div class="mt-4 row_w" v-show="false">
              <div class="col_5">
                <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('home_number')}}</p>
              </div>
              <div class="col_7 px-2">
                <input-icon valid  v-model="home_number"  validate error="wrong" success="right"/>
                <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.home_number.$dirty && !$v.home_number.required" >
                  {{$t('name_invalid_text')}}
                </small> -->
                <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
                  {{$t('write_district_name_full')}}
                </small> -->
              </div>
            </div>
            <div class="row_w mt-4">
              <div class="col_5">
                <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('note')}}</p>
              </div>
              <div class="col_7 px-2">
                <text-area rows="1"  v-model="note"  validate error="wrong" success="right"/>
              </div>
            </div>
            <div class="row_w mt-4">
              <div class="col_5">
                <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('picture')}}</p>
              </div>
              <div class="col_7 px-2">
                <div class="d-flex justify-content-start align-items-center">
                  <!-- v-show="!PicShow" -->
                  <div  v-show="!PicShow" style="position: relative;">
                    <img  :src="image"  id="prewImage" style="height: 150px;" class="img-fluid img-thumbnail img-responsive shadow" alt="">
                    
                  </div>
                    <img  :src="hostname + image_url" v-if="image_url" style="height: 150px;" class="img-fluid img-thumbnail img-responsive shadow" alt="">
                </div>
                <input hidden  id="inputFileToLoad" @change="previewFile()" accept="image/png, image/gif, image/jpeg" type="file" ref="file_Img" class="shadow text-right ml-2"  />
                <div class="d-flex">
                  <label for="inputFileToLoad" class="download">
                    <span>Изображение</span>
                  </label>
                </div>
              </div>
            </div>

          
            <div class="mt-4 row_w" v-show="false">
              <div class="col_5">
                <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('contragent')}}</p>
              </div>
              <div class="col_7 px-2">
                <ErpSelectIcon
                  :options="allLevel.rows"  
                  @select="selectOptionLevel"
                  :selected="level_name"
                  :label="$t('level')"
                />
                <!-- <small v-if="$v.level_name.$dirty && level_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small> -->
              </div>
            </div>

            <div class="footer_sticky">
              <div class="blue-gradient">
                <hr class="mt-5 "/>
              </div>
              <mdb-row class="mt-0" >
                <mdb-col col="12">
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
          
        </div>
      </div>
      <div class="col-3 pl-0">
        <div class="user_illSendWater py-1 border-bottom  pr-2" >
            <div  v-for="(item,i) in get_client_list" :key="i" class="item px-2" 
               :class="{ 'activeUser' : active_client == i }" @click="updateMounted(item.id)">
              <div>
                <div class="d-flex">
                  <div class=" user_photo">
                    <img src="../../assets/mill.jpg" style="height: 45px; overflow: none; " class="img-fluid" alt="">
                  </div>
                  <div class="px-3">
                    <p class="m-0 p-0" >{{item.fio}}</p>
                    <p class="m-0 rang" style="font-size:10px;"> 
                     Тел: <span class="px-2">{{item.first_phone_number_name}}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
  </div>
</template>
  
<script>
// import md5 from 'js-md5'
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn,  } from "mdbvue"
import { required, minLength } from 'vuelidate/lib/validators'
import {mapActions,mapGetters} from 'vuex'
import InputIcon from '../../components/inputIcon.vue';
import TextArea from '../../components/textArea.vue';
import ErpSelectIcon from '../../components/erpSelectIcon.vue'
import ErpSelectIndex from '../../components/erpSelectIndex'


export default {
  naem: "companyAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,

      active_client: -1,
      get_client_list: [],


      name: '',
      phoneNumber: '',
      phoneNumber1: '',
      phoneNumber2: '',
      adreess: '',
      born_date:'',
      home_code:'',
      padez: '',
      district_name: '',
      district_id: null,
      
   
      note: '',
      home_number: '',
     
     
      level_name: '',
      level_id:null,

      phoneList: [
        {
          phone_number: ''
        }
      ],
      addressList: [
        {
          address: '', 
          latidu: '',
          longitu: '',
          district_name: '',
          district_id: null,
          id: 0,
        }
      ],
      base64: '',
      image_url: '',
      PicShow: true,
      image: '',
      hostname: this.$store.state.server_ip,
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, 
    InputIcon,
    TextArea, ErpSelectIcon,ErpSelectIndex
  },
    validations: {
      name: {required},
      phoneList: {
        $each: {
          phone_number: { required },
        },
      },
      addressList: {
        $each: {
          latidu: {required, minLength: minLength(19)},
          district_name: { required },
        },
      }
    },
    props :
    {
      props_name : {
        type : String,
        default : ''
      },
      client_id : {
        type : Number,
        default : 0
      }
      
    },
    async created()
    {
      if(this.props_name.length > 0)
      {
          this.name = this.props_name; 
          this.id = 0;
          this.PicShow = true;
         return 
      }
      if(this.id > 0)
      {
        await this.clearUpdate();
        await this.updateClient(this.id);
      }
    },
    async mounted(){
      await this.fetchDepartment(),
      await this.fetchLevel();
    },
    computed: mapGetters(['all_district_t', 'all_contragent_t','allDepartment', 'allLevel']),

  methods:{
    ...mapActions(['fetch_district_t', 'fetchClient', 'fetch_contragent_t','fetchDepartment', 'fetchLevel']),
    async searchClient(){
      if(this.name == ''){
        this.get_client_list = [];
      }
      else{
        try{
          if(this.name != ''){
            const res = await fetch(this.$store.state.hostname + '/WaterClients/getPaginationByName?page=0&size=100&fio=' + this.name);
            const data = await res.json();
            // console.log(data)
            this.get_client_list = data.items_list;
          }
          else{
            this.get_client_list = [];
          }
        }
        catch{
          // console.log('network ne working catch')
        }
      }
    },
    async updateClient(id){
      const res = await fetch(this.$store.state.hostname + '/WaterClients/' + id);
      const data = await res.json();
      // console.log('this is by id')
      // console.log(data)
      this.name = data.fio;
      this.image_url = data.note4;
      this.note = data.note;
      let y = data.phone_numbers_list[0].phone_number.slice(4,13).replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      this.phoneList[0].phone_number = !y[2] ? y[1] : '(' + y[1] + ') ' + y[2] + (y[3] ? '-' + y[3] : '');
      this.phoneList[0].id = data.phone_numbers_list[0].id;

      for(let i=1; i<data.phone_numbers_list.length; i++){
        this.add_phone();
        let w = data.phone_numbers_list[i].phone_number.slice(4,13).replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.phoneList[i].phone_number = !w[2] ? w[1] : '(' + w[1] + ') ' + w[2] + (w[3] ? '-' + w[3] : '');
        this.phoneList[i].id = data.phone_numbers_list[i].id;
      }
      this.addressList[0].address = data.addresses[0].address;
      this.addressList[0].latidu = data.addresses[0].latidu + ', ' + data.addresses[0].longitu;
      this.addressList[0].district_name = data.addresses[0].tuman.name;
      this.addressList[0].district_id = data.addresses[0].tuman.id;
      this.addressList[0].id = data.addresses[0].id;

      for(let j = 1; j<data.addresses.length; j++){
        this.add_address();
        this.addressList[j].address = data.addresses[j].address;
        this.addressList[j].latidu = data.addresses[j].latidu + ', ' + data.addresses[j].longitu;
        this.addressList[j].district_name = data.addresses[j].tuman.name;
        this.addressList[j].district_id = data.addresses[j].tuman.id;
        this.addressList[j].id = data.addresses[j].id;
      }
      
    },
    async delPhone(i){
      if(this.phoneList[i].id>0){
        const requestOptions = {
            method : "delete",
          };
        const response = await fetch(this.$store.state.hostname + "/WaterClients/deletePhoneNumber?phone_id=" + this.phoneList[i].id, requestOptions);
        const data = await response.json();
        // console.log(data)
      }
      this.phoneList.splice(i,1);
    },
    async clearUpdate(){
      // let preview = document.getElementById('prewImage');
      // preview.src = '';
      
      this.image_url = '';
      this.base64 = '';
      this.image = '';
      this.PicShow = true;
      this.note = ''
      this.phoneList = [
        {
          phone_number: '',
        }
      ];
      this.addressList = [
        {
          address: '',
          latidu: '',
          longitu: '',
          district_name: '',
          district_id: null,
          id: 0,
        }
      ];
      this.get_client_list = [];
      this.name = '';
      this.district_name = '';
      this.district_id = null;
    },
    async updateMounted(client_id){
      if(this.id != client_id){
        this.$router.push('/client_add/' + client_id)
      } 
      // let preview = document.getElementById('prewImage');
      // preview.src = '';
      this.image_url = '';
      this.base64 = '';
      this.image = '';
      this.PicShow = true;
      this.note = ''
      this.phoneList = [
        {
          phone_number: '',
        }
      ];
      this.addressList = [
        {
          address: '',
          latidu: '',
          longitu: '',
          district_name: '',
          district_id: null,
          id: 0,
        }
      ];
      this.get_client_list = [];
      this.name = '';
      this.district_name = '';
      this.district_id = null;
      if(client_id > 0){
        this.id = client_id;
        await this.updateClient(client_id);
        // console.log('men ishladim')
      }
    },

    delImage(){
      this.base64 = ''
      this.PicShow = true
      this.image = ''
    },
    CtrlV_click(i){
      // console.log('asdad')
      // console.log(i)
    },
    add_phone(){
      let item = {
        phone_number: '',
        id:0,
      }
      this.phoneList.push(item);
    },
    add_address(){
      let items = {
        address: '', 
        latidu: '',
        longitu: '',
        district_name:'',
        district_id: null,
        id:0,
      }
      this.addressList.push(items);
    },
    selectOptionDistrict(option){
      // console.log(option)
      this.district_name = option.name;
      this.district_id = option.id;
    },
    selectOptionDistrictItem(option){
      // console.log(option)
      this.addressList[option.index].district_name = option.data.name;
      this.addressList[option.index].district_id = option.data.id;
      // console.log(this.addressList)
      // this.addressList.unshift({name: ''});
      // this.addressList.splice(0,1);
    },
    selectOption(option){
      // console.log(option)
      this.contragent_name = option.name;
      this.contragent_id = option.id;
    },
    selectOptionLevel(option){
      this.level_name = option.name;
      this.level_id = option.id;
    },
    choose_freeDay(i){
      this.free_day[i].type = !this.free_day[i].type;
      this.free_day.push({name:'test', id: 7, type: false})
      this.free_day.splice(this.free_day.length-1,1)
      
    },
     delImage(){
      this.base64 = ''
      this.PicShow = true
      this.image = '';
      this.image_url = '';
    },

    async previewFile(){
      const preview = document.getElementById('prewImage');
        const file = document.querySelector('input[type=file]').files[0];
        this.PicShow = true;
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        this.image =  reader.result;
        preview.src = reader.result;
      }, true);
      if (file) {
          this.PicShow = false
        reader.readAsDataURL(file);
      }
    },
    cls_wnd()
      {
        this.name = '';
        this.note = '';
        this.phoneList = [
        {
          phone_number: ''
        }
        ];
        this.addressList = [
          {
            address: '', 
            latidu: '',
            longitu: '',
            district_name: '',
            district_id: null,
            id: 0,
          }
        ];
        this.level_name =  '';
        this.level_id = null;
        let preview = document.getElementById('prewImage');
        preview.src = '';
        this.image_url = '';
        this.base64 = '';
        this.image = '';
        this.PicShow = true;
        
      },
      save_data :  async function(){
        var img = document.getElementById('prewImage');
          if(img.src.slice(0,4) != 'http'){
            this.base64 = img.src;
          }
        if(this.$v.$invalid)
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        await this.syncBase64ToUrl(this.base64)
        let addressL = [];
        for(let i = 0; i<this.addressList.length; i++){
            let lat = '';
            let lon = '';
            let indexVergul = -1;
          if(this.addressList[i].latidu.length > 25){
            lat = this.addressList[i].latidu.slice(31,40)
            lon = this.addressList[i].latidu.slice(41,50)
            // console.log(lat, lon)
          }
          else{
            for(let j=0; j<this.addressList[i].latidu.length; j++){
              if(this.addressList[i].latidu[j] == ','){
                indexVergul = j
              }
            }
            lat = this.addressList[i].latidu.slice(0,indexVergul)
            lon = this.addressList[i].latidu.slice(indexVergul+1, this.addressList[i].latidu.length)
          }

          let addres = {
            address: this.addressList[i].address,
            latidu: lat,
            longitu: lon,
            waterTumanid: this.addressList[i].district_id,
            id:this.addressList[i].id
          }
          addressL.push(addres)
        }
        // console.log(addressL)
      // -----------> Adress update for base <----------



      // -----------> Phone update for classic <---------- 
      let phoneFunList = [];
      for(let k = 0; k<this.phoneList.length; k++){
        let phoneClassic = '';
        for(let t = 0; t<this.phoneList[k].phone_number.length; t++){
          if(this.phoneList[k].phone_number[t] == '(' || this.phoneList[k].phone_number[t] == ')' || this.phoneList[k].phone_number[t] == ' ' || this.phoneList[k].phone_number[t] == '-'){
          }
          else{
            phoneClassic += this.phoneList[k].phone_number[t];
          }
        }
        let item = {
          id: this.phoneList[k].id,
          phone_number: '+998' + phoneClassic,
        }
        phoneFunList.push(item)
        // this.phoneList[k].phone_number = '+998' + phoneClassic;
      }
      // -----------> Phone update for classic <----------

        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "fio" : this.name,
              "phone_numbers_list": phoneFunList,
              "addresses": addressL,
              "waterTumanid": this.district_id,
              "note4": this.image_url,
              "note": this.note,
              "id" : this.id,
            })
          };
          try{
            this.loading = true;
            // console.log('requestOptions.body')
            const response = await fetch(this.$store.state.hostname + "/WaterClients", requestOptions);
            this.loading = false;
            if(response.status == 201 || response.status == 200)
            {
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
    async submit()
      {
        // console.log('eshmatoldirma')
        if(await this.save_data())
        {
          // this.cls_wnd();
          this.$router.push('/client')
          // this.$store.state.alert = true;
          // this.cls_wnd();
        }

      },
    async submit_continue()
    {
      if(await this.save_data())
      {
        if(this.id != 0){
          this.$router.push('/client_add/0')
          this.cls_wnd();
        }
        else{
          this.$router.push('/client_add/0')
          this.cls_wnd();
        }
      }
    },

    async syncBase64ToUrl(img){
      try{
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "image_base_64" : img,
          })
        };

        const response = await fetch(this.$store.state.hostname + "/TegirmonClient/getSaveBase64ImageToFolderAndGetImageUrl", requestOptions);
        // console.log(response)
        const data = await response.json();
        // console.log(data)
        if(response.status == 201 || response.status == 200)
        { 
          this.image_url = data.image_url_str
          // console.log('this.image_url')
          // console.log(this.image_url)
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          this.loading = false;
          this.modal_info = this.$i18n.t('network_ne_connect'); 
          this.modal_status = true;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
      }
    }
    
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

.free_day{

}
.week_day_item{
  cursor: pointer;
}

.item_circle{
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #eee;
}
.into_circle{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgb(255, 255, 255);
}
.into_circle_active{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0fe22b ;
  /* box-shadow: 1px 1px 5px #4285F4, -1px -1px 5px #4285F4, -1px 1px 5px #4285F4, 1px -1px 5px #4285F4 ; */
}


.user_illSendWater{
  overflow: hidden;
  overflow-y: scroll;
  max-height: 70vh;
  width: 100%;
  // background-color: rgba(32, 32, 32,0.75);
  .item{
      .user_photo{
        background-color: #fff;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          overflow: hidden;
          

        // img{
        //   border-radius: 50%;
        //   overflow: hidden;          
        // }
      }
      width:100%;
      box-shadow: 2px 2px 8px rgb(224, 224, 224), -1px -1px 2px rgb(224, 224, 224);
      height: 62px;
      margin: 5px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // background-color: #fff;
      transition: all 0.5s ease-in-out;
      .rang{
        color: rgb(66, 167, 255);
        font-weight: bold;
      }
      &:hover{
        cursor: pointer;
        box-shadow: 2px 2px 5px rgb(224, 224, 224);
        background-color: rgb(215, 242, 255);
        transform: translate(6px, 0px);
        transition: all 0.1s ease-in-out;
      }
    }
  
}


</style>