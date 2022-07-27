<template>
  <div class="addProductQtyPayed" >
    <loader-table v-if="info_loading" />
    <div v-else class="p-4 mainPayedSection">
      <div class="clientPayedInfo">
        <h4 class="d-flex justify-content-between border-bottom">{{user.name}} <h5>{{user.count}}</h5></h4>

        <div class="boxforTable">
          <table class="myTablePayedcheckList ">
            <thead>
              <tr class="header py-3" style="background: #a9c6fd;">
                <th  width="40" class="text-left">№</th>
                <th>{{$t('client_name')}}</th>
                <th>{{$t('begin_date')}}</th>
                <th>{{$t('end_date')}}</th>
                <th>{{$t('summ')}}</th>
                <th>{{$t('skidka')}}</th>
                <th>{{$t('dolg')}}</th>
                <!-- <th >{{$t('lessons_cout')}}</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in clientPaymentListArr" :key="rowIndex" >
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.oquvchi.fio}}</span> </td>
                <td class="hover_date"> <span >{{row.begin_date}}</span> 
                  <small class="date_show">{{row.begin.slice(0,10)}}</small>
                </td>
                <td class="hover_date"> <span >{{row.end_date}}</span> 
                  <small class="date_show">{{row.end.slice(0,10)}}</small>
                </td>
                <td> <span ><span class="text-success font-weight-bold mr-1">+</span>{{row.summ}}</span> </td>
                <td> <span >{{row.discount_summ}}</span> </td>
                <td> <span class="text-danger">{{row.qarz_summ}}</span> </td>


                <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      




      <div class="acceptBoxPayed px-3 py-2 text-center">
        <h2 class="font-weight-bold">
          {{summaRealString}}
        </h2>
        <div class="d-flex">
          <div style="width:70%;">
            <input type="text" v-model="summaRealString" v-on:keyup.13 = "payed" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" @keyup="funcCurrency($event.target.value)" ref="enterSum"  class="form-control form-control-md border mt-2" style="border:none; outline:none;font-weight:bold;" >
          </div>
          <div  style="width:30%;">
            <input type="text" v-model="teacherSumma" v-on:keyup.13 = "payed" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" @keyup="funcTeacher($event.target.value)" ref="enterSum"  class="form-control form-control-md border mt-2" style="border:none; outline:none;font-weight:bold;" >
          </div>
        </div>
        <!-- <div class="text-right pt-2">
          <p class="m-0 p-0 zdachi text-danger">{{zdachiString}}</p>
        </div> -->
        <div class="d-flex mt-4 mb-4">
          <div class="w-50 pr-2" style="position:relative;">
            <input-icon type="date" valid v-model="begin_date" style="height:32px;"  icon=""/>
            <small style="position:absolute; top:-17px; left:2px; color:#747474;">{{$t('begin_date')}}</small>
          </div>
          <div class="w-50 pl-2" style="position:relative;">
            <input-icon type="date" valid v-model="end_date" style="height:32px;"  icon=""/>
            <small style="position:absolute; top:-17px; left:10px; color:#747474;">{{$t('end_date')}}</small>
          </div>
        </div>
        <div class="d-flex ">
          <div class="w-50 pr-2" style="position:relative;">
            <input-icon type="number" disabled valid v-model="dars_soni" style="height:32px;"  icon=""/>
            <small style="position:absolute; top:-17px; left:2px; color:#747474;">{{$t('count_lesson')}}</small>
          </div>
          <div class="w-50 pl-2" style="position:relative;">
            <input-icon type="number" disabled valid v-model="left_lesson" style="height:32px;"  icon=""/>
            <small style="position:absolute; top:-17px; left:10px; color:#747474;">{{$t('left_lesson')}}</small>
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="price"  style="width:100%; position:relative;">
            <div style="position:relative;">
              <input type="text" v-model="cashInString"  v-on:keyup.13 = "payed" @keyup="funcCash($event.target.value)" v-on:click.capture="getNol" ref="cashIn"  
              class="form-control  border mt-2 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:33px;" >
              <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
                {{$t('cash')}}
              </small> 
            </div> 
            <div style="position:relative;">
              <input type="text" v-model="uzcardInString" v-on:keyup.13 = "payed" @keyup="funcUzcard($event.target.value)" v-on:click.capture="uzcardNol"  ref="uzcardIn" 
              class="form-control  border mt-3 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:33px;">
              <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
                {{'Пластик'}}
              </small> 
            </div>
            
            <div style="position:relative;">
              <input type="text" v-model="clickInString" v-on:keyup.13 = "payed" @keyup="funcClick($event.target.value)" v-on:click.capture="clickNol"  ref="clickIn" 
              class="form-control  border mt-3 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:33px;" >
              <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold;" class="testing">
                {{$t('credit')}}
              </small> 
            </div>
            <div style="position:relative;">
              <input type="text" v-model="onlineInString" v-on:keyup.13 = "payed" @keyup="funcOnline($event.target.value)" v-on:click.capture="onlineNol"  ref="onlineIn"  
              class="form-control  border mt-3 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:33px;" >
              <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold;" class="testing">
                {{$t('skidka')}}
              </small> 
            </div>
            <div style="position:relative;">
              <input type="text" v-model="debitInString" v-on:keyup.13 = "payed" @keyup="funcDebit($event.target.value)" v-on:click.capture="debitNol"  ref="debitIn" 
              class="form-control  border mt-3 text-right pr-2" style="border:none; outline:none;font-weight:bold; height:33px;" >
              <small style="position:absolute; top:-16px; left:3px; font-size:11.5px; font-weight:bold; " class="testing">
                {{'Долг'}}
              </small> 
            </div>
            <div class="d-flex justify-content-between mt-2" style="font-size:13.5px;">
              <span v-if="parseFloat(defaultSum.toFixed(2)) > summa" class="text-success"> Больше денег </span>
              <span v-if="parseFloat(defaultSum.toFixed(2)) > summa" class="text-success">{{(parseFloat(defaultSum.toFixed(2))-summa).toFixed(2)}}</span>
            </div>
            <div class="d-flex justify-content-between mt-1" style="font-size:13.5px;">
              <span v-if="parseFloat(defaultSum.toFixed(2)) < summa" class="text-danger"> Не хватить </span>
              <span v-if="parseFloat(defaultSum.toFixed(2)) < summa" class="text-danger">{{(parseFloat(defaultSum.toFixed(2))-summa).toFixed(2)}}</span>
            </div>
          </div>

          
        </div>
        <div style="margin-top:15px;" class="d-flex justify-content-end">
          <mdb-btn color="danger" style="font-size:11px; padding: 6px 0; width:120px;"  @click="close" class="m-0  mt-1 mr-2" > {{$t('cancel')}}</mdb-btn>
          <mdb-btn color="success" style="font-size:11px; padding: 6px 0; width:120px;" :disabled="parseFloat(defaultSum.toFixed(2)) != summa"  @click="payed" class="m-0  mt-1 " > {{'ok'}}</mdb-btn>
        </div>
      </div>
    </div>
    
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>

    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {
  mdbIcon,
  mdbBtn,mdbInput
} from "mdbvue";
import LoaderTable from '../../components/loaderTable.vue';
export default {
  components: {
    mdbIcon,
    mdbBtn,mdbInput,
    LoaderTable,
  },
  data() {
    return {
      modal_status: false,
      modal_info: '',

      persantage_discount: 0,
      enterSumma: null,
      zdachi:0,
      zdachiString:'0',
      currency: '',
      cashIn: 0,
      uzcardIn: 0,
      debitIn: 0,
      clickIn: 0,
      onlineIn: 0,
      totalIn: 0,
      payshow:false,

      defaultSum: 0,
      discountSum: 0,
      discount: 0,

      dars_soni: 0,
      left_lesson: 0,


      cashInString: '0',
      uzcardInString: '0',
      debitInString: '0',
      clickInString: '0',
      onlineInString: '0',
      week: [],

      user: {},

      begin_date: '',
      end_date: '',
      summa: null,
      summaRealString: '',
      teacherSumma: '',
      teachSumma: 0,
      info_loading: false,

      clientPaymentList: [],
      clientPaymentListArr: [],
    }
  },
  props:{
    summaString:{
      type: String,
      default: '0'
    },
  },
  watch:{
    begin_date(){
      let nowday = new Date(this.begin_date);
        if (nowday.getMonth() == 11) {
            var current_day = new Date(nowday.getFullYear() + 1, 0, nowday.getDate()+1);
        } else {
            var current_day = new Date(nowday.getFullYear(), nowday.getMonth() + 1, nowday.getDate()+1);
        }
        this.end_date = current_day.toISOString().slice(0,10);
      this.dataUpdate()
      this.dataTodayUpdate()
      console.log('begin_date')
    },
    end_date(){
      this.dataUpdate()
      this.dataTodayUpdate()
      console.log('end_date')
    }
  },
  // created() {
  //   this.$root.$refs.payed = this;
  // },
  mounted() {
    console.log(this.summa)
  },
  computed:{
    ...mapGetters(['all_today_groups']),
  }, 
  methods: {
    ...mapActions([  'fetchCategoryIdProduct', 'fetchProductSearchByName']),
    ...mapMutations([  'updateCheckId']),
    dataUpdate(){
      this.dars_soni = 0;
      var start_week_date = new Date(this.begin_date); // no queries exist before this
      var todays_date = new Date(this.end_date);

      // array to hold week commencing dates
      var week_commencing_dates = new Array();
      var first_monday_date = new Date(this.begin_date); // no queries exist before this
      // week_commencing_dates.push(first_monday_date);
      var array = this.user.week
      console.log('array')
      console.log(array)
      for(let i=0; i<array.length;i++){
        if(array[i] == first_monday_date.getDay()){
            // week_commencing_dates.push(first_monday_date);
            this.dars_soni++;
        }
      }
      console.log('first_monday_date.getDate()')
      console.log(first_monday_date)

      while(start_week_date < todays_date){
        var next_date = start_week_date.setDate(start_week_date.getDate() + 1);

        var next_days_date = new Date(next_date);
        var day_index = next_days_date.getDay();
        
        for(let i=0; i<array.length;i++){
          if(array[i] == day_index){
              // week_commencing_dates.push(next_days_date);
            this.dars_soni++;
          }
        }
        start_week_date = new Date(next_date);        
      }
      console.log(week_commencing_dates);
      // this.dars_soni = week_commencing_dates.length
      console.log(this.dars_soni)

    },
    dataTodayUpdate(){
      this.left_lesson = 0;
      var start_week_date = new Date(this.begin_date); // no queries exist before this
      var todays_date = new Date();
      console.log('todays_date')
      console.log(todays_date)

      // array to hold week commencing dates
      var week_commencing_dates = new Array();
      var first_monday_date = new Date(this.begin_date); // no queries exist before this
      week_commencing_dates.push(first_monday_date);
      var array = this.user.week
      console.log('array')
      console.log(todays_date)
      console.log(todays_date.getFullYear())
      if(todays_date.getMonth()==start_week_date.getMonth() && todays_date.getDate()==start_week_date.getDate()
         && todays_date.getFullYear()==start_week_date.getFullYear()){
      console.log('kiryabmanku mana nima qilay yana')
        
      }
      else if(todays_date<start_week_date){
        console.log('bu katta ekanligi uchun')
      }
      else{
      console.log('bunisi ishladi')
        for(let i=0; i<array.length;i++){
          if(array[i] == start_week_date.getDay()){
              // week_commencing_dates.push(first_monday_date);
              this.left_lesson++;
          }
        }
      }
      
      // console.log('first_monday_date.getDate()')
      // console.log(start_week_date.getDate())
      // console.log(todays_date.getDate())
      let last_date = todays_date.setDate(todays_date.getDate() - 2);
      let last_date_str = new Date(last_date);
      console.log(last_date_str)
      console.log(start_week_date)
      while(start_week_date < last_date_str){
        console.log("nega kirayabsan bunga")
        console.log(start_week_date)
        
        var next_date = start_week_date.setDate(start_week_date.getDate() + 1);
        var next_days_date = new Date(next_date);
        var day_index = next_days_date.getDay();
        let LastDay = new Date(this.end_date)
        let last_date_minus = LastDay.setDate(LastDay.getDate() + 1);
        let last_date_str = new Date(last_date_minus);

        if(next_days_date<last_date_str){
          for(let i=0; i<array.length;i++){
            if(array[i] == day_index){
              console.log(array[i])
              console.log(day_index)
                // week_commencing_dates.push(next_days_date);
              console.log(this.left_lesson)

              this.left_lesson++;
              console.log(this.left_lesson)
            }
          }
          start_week_date = new Date(next_date);
        }
         
      }

      // while(start_week_date.getDate() < todays_date.getDate()){
               
      // }
      console.log(week_commencing_dates);
      // this.left_lesson = week_commencing_dates.length
      console.log(this.left_lesson)

    },


    async changingEnter(paytype,summ, user){
      console.log('paytype')
      console.log(user.teacher_price)
      this.user = user;
      console.log(this.all_today_groups)

    //   this.$nextTick(function () {
    //   this.$refs.enterSum.focus();
    // this.enterSum = '';
    // })
      this.zdachi = '0';


      console.log(this.summa)
      this.cashIn = 0;
      this.uzcardIn = 0;
      this.debitIn = 0;
      this.clickIn = 0;
      this.onlineIn = 0;
      this.cashInString = '0';
      this.uzcardInString = '0';
      this.debitInString = '0';
      this.clickInString = '0';
      this.onlineInString = '0';
      this.defaultSum = summ;
      this.zdachiString = '0';
      this.zdachi = 0;
      this.summa = summ;
      this.teachSumma = user.teacher_price;
      console.log('this.teachSumma');
      console.log(this.teachSumma);
      this.teacherSumma = new Intl.NumberFormat().format(user.teacher_price)
      this.summaRealString = new Intl.NumberFormat().format(summ)
      if(paytype==1){
        this.cashIn = parseFloat(summ)
        this.cashInString = new Intl.NumberFormat().format(summ)
      }
      else if(paytype==2){
        this.uzcardIn = parseFloat(summ)
        this.uzcardInString = new Intl.NumberFormat().format(summ)
      }
      else if(paytype==3){
        this.debitIn = parseFloat(summ)
        this.debitInString = new Intl.NumberFormat().format(summ)

      }
      else if(paytype==4){
        this.clickIn = parseFloat(summ)
        this.clickInString = new Intl.NumberFormat().format(summ)
      }
      else if(paytype==5){
        this.onlineIn = parseFloat(summ)
        this.onlineInString = new Intl.NumberFormat().format(summ)
      }

      await this.getClientIDAndGroupId();

      this.clientPaymentListArr= [];
      if(this.clientPaymentList.length>0){
        this.begin_date = this.clientPaymentList[0].end_date.slice(0,10);
        var now = new Date(this.begin_date);
          if (now.getMonth() == 11) {
              var current = new Date(now.getFullYear() + 1, 0, now.getDate());
          } else {
              var current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()+1);
          }
          this.end_date = current.toISOString().slice(0,10);
          // console.log(current.toISOString())



        // this.end_date = '2022-09-31';
        var months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
              "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
        for(let i=0;i<this.clientPaymentList.length; i++){
          var begin = this.clientPaymentList[i].begin_date.split("-");
          var end = this.clientPaymentList[i].end_date.split("-");
          
          var begin_index =  parseInt(begin[1],10) - 1;
          var end_index =  parseInt(end[1],10) - 1;
          let testObject = {
            oquvchi:{
              fio: this.clientPaymentList[i].oquvchi.fio,
            },
            begin_date: this.clientPaymentList[i].begin_date.slice(8,10) + '-' + months[begin_index],
            end_date: this.clientPaymentList[i].end_date.slice(8,10) + '-' + months[end_index],
            begin: this.clientPaymentList[i].begin_date,
            end: this.clientPaymentList[i].end_date,
            summ: this.clientPaymentList[i].summ,
            discount_summ: this.clientPaymentList[i].discount_summ,
            qarz_summ: this.clientPaymentList[i].qarz_summ,
          }
          this.clientPaymentListArr.push(testObject)

          // console.log("The current month is "+ this.clientPaymentList[i].begin_date.slice(8,10) + '-' + months[begin_index]);
          // console.log("The current month is "+ this.clientPaymentList[i].end_date.slice(8,10) + '-' + months[end_index]);
        }
      }
      else{
        let todayTimeSet = new Date();
        this.begin_date = todayTimeSet.toISOString().slice(0,10)

          if (todayTimeSet.getMonth() == 11) {
              var current2 = new Date(todayTimeSet.getFullYear() + 1, 0, todayTimeSet.getDate());
          } else {
              var current2 = new Date(todayTimeSet.getFullYear(), todayTimeSet.getMonth() + 1, todayTimeSet.getDate()+1);
          }
          this.end_date = current2.toISOString().slice(0,10);
        
      }
    },

    
    funcCurrency(n){
      console.log(n)
       this.summaRealString = n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
       this.cashInString =  this.summaRealString;
       
       var temp = ''
       for(let i=0; i<this.summaRealString.length; i++){
        if(this.summaRealString[i] != ' '){
          temp += this.summaRealString[i];
        }
       }

        this.summa = parseInt(temp);
        this.cashIn = this.summa;
        this.uzcardIn = 0;
        this.debitIn = 0;
        this.clickIn = 0;
        this.onlineIn = 0;
        this.uzcardInString = '0';
        this.debitInString = '0';
        this.clickInString = '0';
        this.onlineInString = '0';
        // this.zdachi = parseFloat(this.summa)-this.currency;
        // this.zdachiString = this.zdachi.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    },
    funcTeacher(n){
      this.teacherSumma
      this.teachSumma
      this.teacherSumma = n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      
       var teachS = ''
       for(let i=0; i<this.teacherSumma.length; i++){
        if(this.teacherSumma[i] != ' '){
          teachS += this.teacherSumma[i];
        }
       }
        this.teachSumma = parseInt(teachS);
        console.log('this.teacherSumma')
        console.log(this.teachSumma)
    },
    funcCash(n){
      this.discount = parseFloat(this.clickIn) + parseFloat(this.cashIn) + parseFloat(this.uzcardIn) + parseFloat(this.debitIn) + parseFloat(this.onlineIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      this.discountSum = parseFloat(this.discountSum.toFixed(2))
      console.log('this.discountSum')
      console.log(this.discountSum)
      if(this.discountSum == 0){
      console.log('this.discountSum')
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
      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },
    funcUzcard(n){
       this.discount = parseFloat(this.clickIn) + parseFloat(this.cashIn) + parseFloat(this.uzcardIn) + parseFloat(this.debitIn) + parseFloat(this.onlineIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      this.discountSum = parseFloat(this.discountSum.toFixed(2))
      console.log('this.discountSum')
      console.log(this.discountSum)
      if(this.discountSum == 0){
      console.log('this.discountSum')
      console.log('this.discountSum')

        this.uzcardIn = 0;
        this.uzcardInString = ''; 
        n = n[n.length-1];

      }

      console.log(n)
      var tols = ''
      for(let i=0; i<n.length; i++){
        if(n[i] != ' '){
          tols += n[i];
        }
       }

       this.uzcardInString = tols.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
       var temp = ''
       for(let i=0; i<this.uzcardInString.length; i++){
        if(this.uzcardInString[i] != ' '){
          temp += this.uzcardInString[i];
        }
       }
      this.uzcardIn = parseFloat(temp);
      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },
    async funcDebit(n){
       this.discount = parseFloat(this.clickIn) + parseFloat(this.cashIn) + parseFloat(this.uzcardIn) + parseFloat(this.debitIn) + parseFloat(this.onlineIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      this.discountSum = parseFloat(this.discountSum.toFixed(2))

      console.log('this.discountSum')
      console.log(this.discountSum)
      this.discountSum = parseInt(this.discountSum)
      if(this.discountSum == 0){
      console.log('this.discountSum')
      console.log('this.discountSum')

        this.debitIn = 0;
        this.debitInString = ''; 
        n = n[n.length-1];

      }

      console.log(n)
      var tols = ''
      for(let i=0; i<n.length; i++){
        if(n[i] != ' '){
          tols += n[i];
        }
       }

       this.debitInString = tols.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
       var temp = ''
       for(let i=0; i<this.debitInString.length; i++){
        if(this.debitInString[i] != ' '){
          temp += this.debitInString[i];
        }
       }
      this.debitIn = parseFloat(temp);
      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },
    funcClick(n){
      this.discount = parseFloat(this.clickIn) + parseFloat(this.cashIn) + parseFloat(this.uzcardIn) + parseFloat(this.debitIn) + parseFloat(this.onlineIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      this.discountSum = parseFloat(this.discountSum.toFixed(2))

      console.log('this.discountSum')
      console.log(this.discountSum)
      if(this.discountSum == 0){
      console.log('this.discountSum')
      console.log('this.discountSum')

        this.clickIn = 0;
        this.clickInString = ''; 
        n = n[n.length-1];

      }

      console.log(n)
      var tols = ''
      for(let i=0; i<n.length; i++){
        if(n[i] != ' '){
          tols += n[i];
        }
       }

       this.clickInString = tols.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
       var temp = ''
       for(let i=0; i<this.clickInString.length; i++){
        if(this.clickInString[i] != ' '){
          temp += this.clickInString[i];
        }
       }
      this.clickIn = parseFloat(temp);
      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },
    funcOnline(n){

      this.discount = parseFloat(this.clickIn) + parseFloat(this.cashIn) + parseFloat(this.uzcardIn) + parseFloat(this.debitIn) + parseFloat(this.onlineIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      this.discountSum = parseFloat(this.discountSum.toFixed(2))

      console.log('this.discountSum')
      console.log(this.discount)
      console.log(this.discountSum)
      if(this.discountSum == 0){
      console.log('this.discountSum')
      console.log('this.discountSum')

        this.onlineIn = 0;
        this.onlineInString = ''; 
        n = n[n.length-1];

      }

      console.log(n)
      var tols = ''
      for(let i=0; i<n.length; i++){
        if(n[i] != ' '){
          tols += n[i];
        }
       }

       this.onlineInString = tols.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
       var temp = ''
       for(let i=0; i<this.onlineInString.length; i++){
        if(this.onlineInString[i] != ' '){
          temp += this.onlineInString[i];
        }
       }
      this.onlineIn = parseFloat(temp);
      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },

    //<==== get payed list from base ====>
    async getClientIDAndGroupId(){
      try{
        this.info_loading = true; 
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazClient/getTolovPaginationByOquvchiEndGroupId?page=0&size=500&oquvchi_id=" + this.user.user_id + "&group_id=" + this.user.group_id);
        const data = await response.json();
        console.log(data)
        if(data){
          this.clientPaymentList = data.items_list;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
          this.modal_status = true;
        }
        this.info_loading = false; 
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect');;
          this.modal_status = true;
        this.info_loading = false; 

      }
    },
    //<==== get payed list from base ====>

     //<==== 1 oylik darslar soni ====>
    async addDarsSoni(){
      // let qty_extra = 0;
      // let ques_qty = 0;
      // for(let j=0; j<this.all_today_groups.length; j++){
      //   if(this.all_today_groups[j].OquvMarkazPupilGroupsid == this.user.group_id){
      //     let todayDate = new Date();
      //     let listDate = new Date(this.all_today_groups[j].date_only)
      //     if(todayDate.getMonth()==listDate.getMonth() && todayDate.getDate()==listDate.getDate()
      //       && todayDate.getFullYear()==listDate.getFullYear()){
      //         ques_qty++;
      //       }
      //   }
      // }
      // if(ques_qty == 0){
      //   qty_extra = 1;
      // }

      const requestOptions1 = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "oquvMarkazPupilGroupsid": this.user.group_id,
          "oquvMarkazClientid": this.user.user_id,
          // "payed_or_not": true,
          "dars_soni": this.dars_soni,
          "otilgan_dars_soni": this.left_lesson,
          "all_summ": this.teachSumma,
          "user_id": this.user.uqtuvchi_id,
          "id": 0,
        })
      };
      console.log(requestOptions1.body)
      console.log('requestOptions1.bodychaaaa')
      console.log(this.teachSumma)
      try{
        console.log('data1')

        const res = await fetch(this.$store.state.hostname + "/OquvMarkazFanAndGroupPayment", requestOptions1);
        const data1 = await res.json();
        console.log(data1)
        if(res.status == 201 || res.status == 200)
        {
          console.log('data1.id')
          console.log(data1)
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
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
    //<==== 1 oylik darslar soni ====>


    //<==== Addpaymentga qushib yuborish ====>
    async addTulov(){
      const requestOptions1 = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "begin_date": this.begin_date + 'T09:01:59.213Z',
          "end_date" : this.end_date + 'T09:01:59.213Z',
          "oquvMarkazPupilGroupsid": this.user.group_id,
          "oquvMarkazClientid": this.user.user_id,
          "summ": parseFloat(this.cashIn + this.uzcardIn + this.clickIn),
          "discount_summ": parseFloat(this.onlineIn),
          "qarz_summ": parseFloat(this.debitIn),
          "real_summ": parseFloat(this.summa),
          // "payme_sum": 0,
          // "mobil_sum": 0,
          "inv_accepted_status": true,
          "id": 0,
        })
      };
      console.log(requestOptions1.body)
      console.log('requestOptions1.body')
      try{
        console.log('data1')

        const res = await fetch(this.$store.state.hostname + "/OquvMarkazClient/addOquvMarkazTolov", requestOptions1);
        const data1 = await res.json();
        console.log(data1)
        if(res.status == 201 || res.status == 200)
        {
          console.log('data1.id')
          console.log(data1.id)
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
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
    //<==== Addpaymentga qushib yuborish ====>

    
    //<==== checkga yuborish qushib yuborish ====>

    async payed(){
      console.log('this.user')
       var payment_list = [{
         oquvMarkazClientid: this.user.user_id,
         oquvMarkazFanlarid: this.user.fan.id,
         summ: this.summa
       }]
       console.log(payment_list)
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "oquvMarkazClientid": this.user.user_id,
          "summ" : this.summa,
          "card": parseFloat(this.uzcardIn),
          "cash": parseFloat(this.cashIn),
          "online": parseFloat(this.onlineIn),
          "debit": parseFloat(this.debitIn),
          "credit": parseFloat(this.clickIn),
          "oquvMarkazAuthid": localStorage.AuthId,
          // "payme_sum": 0,
          // "mobil_sum": 0,
          "payment_list": payment_list,
          "id": 0,  
          // "posClientid": 0
        })
      };
      
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazCheck", requestOptions);
        const data = await response.json();
        console.log('check')
        console.log(data)
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          console.log(data.id)
          localStorage.check_client_name = this.user.name;
          localStorage.check_fan_name = this.user.fan.name;
          await this.addDarsSoni();
          await this.addTulov();
          this.updateCheckId({checkId:data.id, user:this.user, check:data, check_date:{begin_date:this.begin_date, end_date:this.end_date}})
          this.$emit('print')
          this.$emit('close')
          this.$emit('submitSuccess')
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');;
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
    //<==== checkga yuborish qushib yuborish ====>


    getNol(){
      this.discount = parseFloat(this.clickIn) + parseFloat(this.uzcardIn) + parseFloat(this.debitIn) + parseFloat(this.onlineIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);

      console.log('this.discountSum')
      console.log(this.discount)
      console.log(this.cashIn)
      if(this.cashIn == this.summa || this.uzcardIn == this.summa || this.debitIn == this.summa || this.clickIn == this.summa || this.onlineIn == this.summa){
        this.cashIn = this.summa;
        this.cashInString = this.cashIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        this.uzcardIn = 0;
        this.uzcardInString = '0';
        this.debitIn = 0;
        this.debitInString = '0';
        this.clickIn = 0;
        this.clickInString = '0';
        this.onlineIn = 0;
        this.onlineInString = '0';
      console.log('this.cashIn')
      console.log(this.cashIn)

      }
      else if(this.discountSum > 0){
        this.cashIn = parseFloat(this.discountSum.toFixed(2));
        console.log(this.cashIn)
        this.cashInString = this.cashIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      }

      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },
    uzcardNol(){
      this.discount = parseFloat(this.clickIn) + parseFloat(this.cashIn) + parseFloat(this.debitIn) + parseFloat(this.onlineIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      console.log('this.discountSum')
      console.log(this.discountSum)
      console.log(this.uzcardIn)
      if(this.cashIn == this.summa || this.uzcardIn == this.summa || this.debitIn == this.summa || this.clickIn == this.summa || this.onlineIn == this.summa){
        this.uzcardIn = this.summa;
        this.uzcardInString = this.uzcardIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        this.cashIn = 0;
        this.cashInString = '0';
        this.debitIn = 0;
        this.debitInString = '0';
        this.clickIn = 0;
        this.clickInString = '0';
        this.onlineIn = 0;
        this.onlineInString = '0';
      console.log('this.uzcardIn')
      console.log(this.uzcardIn)

      }
      else if(this.discountSum > 0){
        this.uzcardIn = parseFloat(this.discountSum.toFixed(2));
        console.log(this.uzcardIn)
        this.uzcardInString = this.uzcardIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      }

      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },
    debitNol(){
      // this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
      this.discount = parseFloat(this.clickIn) + parseFloat(this.cashIn) + parseFloat(this.uzcardIn) + parseFloat(this.onlineIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      console.log('this.discountSum')
      console.log(this.discountSum)
      console.log(this.debitIn)
      if(this.cashIn == this.summa || this.uzcardIn == this.summa || this.debitIn == this.summa || this.clickIn == this.summa || this.onlineIn == this.summa){
        this.debitIn = this.summa;
        this.debitInString = this.debitIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        this.cashIn = 0;
        this.cashInString = '0';
        this.uzcardIn = 0;
        this.uzcardInString = '0';
        this.clickIn = 0;
        this.clickInString = '0';
        this.onlineIn = 0;
        this.onlineInString = '0';
      console.log('this.debitIn')
      console.log(this.debitIn)

      }
      else if(this.discountSum > 0){
        this.debitIn = parseFloat(this.discountSum.toFixed(2));
        console.log(this.debitIn)
        this.debitInString = this.debitIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      }
      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },
    clickNol(){
      // this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
      this.discount = parseFloat(this.onlineIn) + parseFloat(this.cashIn) + parseFloat(this.uzcardIn) + parseFloat(this.debitIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      console.log('this.discountSum')
      console.log(this.discountSum)
      console.log(this.debitIn)
      if(this.cashIn == this.summa || this.uzcardIn == this.summa || this.debitIn == this.summa || this.clickIn == this.summa || this.onlineIn == this.summa){
        this.clickIn = this.summa;
        this.clickInString = this.clickIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        this.cashIn = 0;
        this.cashInString = '0';
        this.uzcardIn = 0;
        this.uzcardInString = '0';
       this.debitIn = 0;
       this.debitInString = '0';
        this.onlineIn = 0;
        this.onlineInString = '0';
      console.log('this.clickIn')
      console.log(this.clickIn)

      }
      else if(this.discountSum > 0){
        this.clickIn = parseFloat(this.discountSum.toFixed(2));
        console.log(this.clickIn)
        this.clickInString = this.clickIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      }
      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },
    onlineNol(){
      // this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
      this.discount = parseFloat(this.clickIn) + parseFloat(this.cashIn) + parseFloat(this.uzcardIn) + parseFloat(this.debitIn)
      this.discountSum = parseFloat(this.summa) - parseFloat(this.discount);
      console.log('this.discountSum')
      console.log(this.discount)
      console.log(this.debitIn)
      if(this.cashIn == this.summa || this.uzcardIn == this.summa || this.debitIn == this.summa || this.clickIn == this.summa || this.onlineIn == this.summa){
        this.onlineIn = this.summa;
        this.onlineInString = this.onlineIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        this.cashIn = 0;
        this.cashInString = '0';
        this.uzcardIn = 0;
        this.uzcardInString = '0';
       this.debitIn = 0;
       this.debitInString = '0';
        this.clickIn = 0;
        this.clickInString = '0';
      console.log('this.onlineIn')
      console.log(this.onlineIn)

      }
      else if(this.discountSum > 0){
        this.onlineIn = parseFloat(this.discountSum.toFixed(2));
        console.log(this.onlineIn)
        this.onlineInString = this.onlineIn.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      }
      this.defaultSum = this.cashIn + this.uzcardIn + this.debitIn + this.clickIn + this.onlineIn;
    },






    close(){
      this.$emit('close')
    }
  },
}
</script>

<style lang="scss">
.testing{
  color: rgb(82, 82, 82);
}
 .addProductQtyPayed{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
    width: 100%;
    height: 100vh;
    background: rgba(20, 20, 20, 0.6);
    z-index: 1111;
  }
  .mainPayedSection{
    display: flex;
    width: 80%;
    background: snow;
    height: 560px;
  }
  .clientPayedInfo{
    width:60%;
    // box-shadow: 3px 2px 5px rgb(129, 129, 129);
    border-radius: 5px;
  }
  .acceptBoxPayed{
    width:40%;
    // box-shadow: 3px 2px 5px rgb(129, 129, 129);
    border-radius: 5px;
  }
  .bg_dark{
    background: #202020;
  }
  .bg_danger{
    background: #fb6b6b;
  }
.boxforTable{
  height: 460px;
  overflow: hidden;
  overflow-y: scroll;

}
.myTablePayedcheckList {
  // border-collapse: collapse; 
  // table-layout:fixed;
  width: 100%;
  // border: 1px solid #ddd;
  font-size: 18px;
  overflow: hidden;
  overflow-x:auto
}
.myTablePayedcheckList th{
  font-weight: 600;
  font-size:11px;
}
.myTablePayedcheckList td{
  font-size:12px;
  
}
.myTablePayedcheckList td {
  text-align: left;
  padding: 10px 10px;
}
.myTablePayedcheckList th {
  text-align: left;
  padding: 7px 10px;
}

.myTablePayedcheckList tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #aeffbf;
  }
}

.myTablePayedcheckList tr.header, .myTablePayedcheckList tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
.hover_date{
  position: relative;
  &:hover{
    .date_show{
      display: block;
    }
  }
}
.date_show{
  display: none;
  position: absolute;
  bottom:-10px;
  width:70px;
  padding: 2px 5px;
  left: 15px;
  text-align: center;
  color:#fff;
  background: #ff5c5c;
}

</style>