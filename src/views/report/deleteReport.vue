<template>
  <div>
    <div class="payList">
      <div class="border-bottom navbar_sticky">
        <router-link to="#">
          <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
              {{$t('deleteList')}}</h5>
        </router-link>
      </div>
      <div class="px-3 py-2 pt-3">
        <div class="row">
          <div class="col-4">
          <!-- <div class="d-flex">
              <lineSelect
              :options="allGroups.rows"
              @select="selectgroup"
              :selected="group_name"
              :label="$t('groups')"
            />
          
          </div> -->
          </div>
        </div>
        <div class="d-flex justify-content-start align-items-center">
          <div class="row w-100">
            <!-- <div class="col-sm-4 col-md-3 col-lg-2">
              <div class="d-flex justify-content-start align-items-center">
                <month  height="30" class="mt-2" @select="selectMonth"/>
              </div>
            </div> -->
            <div class="col-sm-4 col-md-3 col-lg-3  " >
              <div class="w-100">
                <mdb-input class="m-0 p-0" size="sm" v-model="b_date" type="date"></mdb-input>
              </div>
            </div>
            <div class="col-sm-4 col-md-3 col-lg-3" >
              <div >
                <mdb-input class="m-0 p-0 mb-2" size="sm" v-model="e_date" type="date"></mdb-input>
              </div>
            </div>
            <div class="col-sm-4 col-md-1 col-lg-1" >
              <div class="mt-1 text-right">
                <mdb-btn class="mr-1 ml-0  py-1 px-3"  style="font-size: 9px; height:27.5px; width:80px" color="info"  @click="clickDate()" 
                  size="sm">{{$t('ok')}}
                </mdb-btn>
              </div>
            </div>
            
          </div>
        </div>
      </div>

    <div >
      <loader v-if="loading"/>
      <table class="myTableCkeckList ">
        <thead>
          <tr class="header py-3 stiky_position">
            <th  width="40" class="text-left">№</th>
            <th>{{$t('client_name')}}
              <span style="position:relative;">
                <span @click="sortedArrayAsc('fio')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                <span @click="sortedArray('fio')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
              </span>
            </th>
            <th>{{$t('note')}}
              <span style="position:relative;">
                <span @click="sortedArrayAsc('reserverd_note_3')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                <span @click="sortedArray('reserverd_note_3')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
              </span>
            </th>
            <th width="150">{{$t('date')}}
              <span style="position:relative;">
                <span @click="sortedArrayAsc('created_date_time')"><mdb-icon icon="angle-up"  class="px-1 up_down_icon"  style="position:absolute; top:-2px; cursor:pointer;"/></span>
                <span @click="sortedArray('created_date_time')"><mdb-icon icon="angle-down"  class="px-1 up_down_icon" style="position:absolute; bottom:-4px; cursor:pointer;"/></span>
              </span>
            </th>

            <!-- <th >{{$t('lessons_cout')}}</th> -->

          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in checkList" :key="rowIndex" class="hoverTr">
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.fio}}</span> </td>
            <td> <span >{{row.reserverd_note_3}}</span> </td>
            <td> <span >{{row.created_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.created_date_time.slice(11,16)}}</span></td>

            
            <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->
      
          </tr>
        </tbody>
      </table>
    </div>
   
    </div>
      <Toast ref="message"></Toast>
 </div>
</template>

<script>
// import lineSelect from "../../components/lineSelect.vue";
import {mdbBtn, mdbIcon, mdbInput} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
import month from '../../components/month.vue'
export default {
  components:{
    mdbBtn, 
    mdbIcon,mdbInput,
    month,
  },
  data() {
    return {
      id: 0,
      loading:false,
      checkList: [],
      b_date:'',
      e_date:'',

      search: '',

      payClient: false,
      today_date: '',
      check_client_list: [],
      group_data: {},
    }
  },
 
  async mounted() {
    let date = new Date();
    this.today_date = date.toISOString().slice(0,10);
    this.b_date = this.today_date;
    this.e_date = this.today_date;
    await this.clickDate();
  },
  computed: mapGetters(['allGroups', 'group_client_list']),

  methods: {
    ...mapActions(['fetchGroups', 'fetchClient', 'fetchGroupsClientList']),

    show_infoDebit(i){
      console.log(i)
    },


    // ===> send client check to base<===
    payDebit(data){
      this.payClient = true;
      this.group_data = data
    },

    async clickDate(){
      this.loading = true;
      try{
        const res = await fetch(this.$store.state.hostname + '/WaterClients/getPaginationDeletedClients?page=0&size=1000');
        const data = await res.json();
        console.log(data)
        if(res.status == 200 || res.status == 201){
          console.log('das')
          this.checkList = data.items_list;
        }
        else{
          this.$refs.message.error('not_found')
          this.loading = false;
        }
        this.loading = false;
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }

    },
    // ===> send client <===

    // ===> sort table <===
    sortedArrayAsc(key){
        function compare(a, b) {
          if (a[key] < b[key])
            return -1;
          if (a[key] > b[key])
            return 1;
          return 0;
        }
        this.checkList.sort(compare);
    },
    sortedArray(key){
        function compare(a, b) {
          if (a[key] > b[key])
            return -1;
          if (a[key] < b[key])
            return 1;
          return 0;
        }

        this.checkList.sort(compare);
    }
    // ===> sort table <===

   
  },
}
</script>

<style lang="scss">
.myTableCkeckList {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTableCkeckList th{
  font-weight: 600;
  font-size:11px;
}
.myTableCkeckList td{
  font-size:11.5px;
  
}
.myTableCkeckList td {
  text-align: left;
  padding: 9px 10px;
}
.myTableCkeckList th{
  text-align: left;
  padding: 8px 10px;
}

.myTableCkeckList tr {
  border-bottom: 1px dashed rgb(240, 240, 240);

  &:nth-child(even){background-color: #ebf5fc;}
}
.hoverTr:hover{
  background-image: radial-gradient( circle farthest-corner at 1.3% 2.8%,   rgb(211, 224, 245) 100.2%, rgba(239,249,249,1) 100% );
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
.up_down_icon:hover{
  background: #acbbff;
}
.stiky_position{
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 52px;
  background: #3f6a8b;
  color:white;
}


</style>