<template>
  <div class="month_component w-100 d-flex">
    <div class="month_select" :style="{'height': height + 'px'}" @click="openList">
      <span style="font-size: 14px;">{{name}}</span>
      <mdb-icon icon="chevron-down" style="position:absolute; top:50%; right:8px; font-size: 10px; transform:translateY(-50%)"/>
      <div v-show="show_list" class="month_list shadow down_list">
        <p v-for="(item, i) in listMonth" :key="i" style="color:black;" @click="selectItem(item)">{{item.name}}</p>
      </div>
    </div>
    <div class="year_select" :style="{'height': height + 'px'}" @click="openYear">
      <span style="font-size: 14px;">{{year}}</span>
      <!-- <mdb-icon icon="chevron-down" style="position:absolute; top:11.5px; right:8px; font-size: 11px;"/> -->
      <div v-show="show_year" class="year_list shadow down_year">
        <p v-for="(item, i) in yearList" :key="i" style="color:black;" @click="selectItemYear(item)">{{item}}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import {mdbIcon} from 'mdbvue'
export default {
  components: {
    mdbIcon
  },
  data(){
    return{
      name: '',
      show_list: false,
      num: 0,
      num1:0,
      listMonth: [
        {
          name: 'Январь',
          id:'01',
          begin: '01',
          end: '31'
        },
        {
          name: 'Февраль',
          id:'02',
          begin: '01',
          end: '28'
        },
        {
          name: 'Март',
          id:'03',
          begin: '01',
          end: '31'
        },
        {
          name: 'Апрель',
          id:'04',
          begin: '01',
          end: '30'
        },
        {
          name: 'Май',
          id:'05',
          begin: '01',
          end: '31'
        },
        {
          name: 'Июнь',
          id:'06',
          begin: '01',
          end: '30'
        },
        {
          name: 'Июль',
          id:'07',
          begin: '01',
          end: '31'
        },
        {
          name: 'Август',
          id:'08',
          begin: '01',
          end: '31'
        },
        {
          name: 'Сентябрь',
          id:'09',
          begin: '01',
          end: '30'
        },
        {
          name: 'Октябрь',
          id:'10',
          begin: '01',
          end: '31'
        },
        {
          name: 'Ноябрь',
          id:'11',
          begin: '01',
          end: '30'
        },
        {
          name: 'Декабрь',
          id:'12',
          begin: '01',
          end: '31'
        },
      ],
      yearList:['2022','2023','2024','2025', '2026', '2027', '2028', '2029', '2030','2031'],
      oy: new Date().toISOString().slice(5,7),
      year: new Date().toISOString().slice(0,4),
      show_year: false,
      select_oy: '',
      select_begin:'',
      select_end: '',
      today: {},
    }
  },
  props:{
    height: String
  },
  mounted(){
    this.yearList = [];
    for(let i=2022; i<2101; i++){
      this.yearList.push(i.toString())
    }

    for(let j=0; j<this.listMonth.length; j++){
      if(this.oy == this.listMonth[j].id){
        console.log(this.listMonth[j])
        this.today = this.listMonth[j];
        break;
      }
    }
    this.select_oy = this.today.id;
    this.select_begin = this.today.begin;
    this.select_end = this.today.end;
    this.name = this.today.name
    let current_month = {
      begin_date: this.year + '-' + this.select_oy + '-' + this.select_begin + 'T00:00:01.504Z',
      end_date: this.year + '-' + this.select_oy + '-' + this.select_end + 'T23:59:59.504Z',
    }
    this.$emit('select', current_month)
  },
  methods:{
    
    selectItem(data){
      this.select_oy = data.id;
      this.select_begin = data.begin;
      this.select_end = data.end;
      let current_month = {
        begin_date: this.year + '-' + this.select_oy + '-' + this.select_begin + 'T00:00:01.504Z',
        end_date: this.year + '-' + this.select_oy + '-' + this.select_end + 'T23:59:59.504Z',
      }
      console.log(this.year)
      this.name = data.name;
      this.$emit('select', current_month)
    },
    selectItemYear(year){
      this.year = year;
      let current_month = {
        begin_date: this.year + '-' + this.select_oy + '-' + this.select_begin + 'T00:00:01.504Z',
        end_date: this.year + '-' + this.select_oy + '-' + this.select_end + 'T23:59:59.504Z',
      }
      console.log(this.year)
      this.$emit('select', current_month)
    },

    openYear(){
      this.num1 = 0;
      this.show_year = !this.show_year;
      document.addEventListener("click", this.add_fun1);
    },


    openList(){
      this.num = 0
      this.show_list = !this.show_list;
      document.addEventListener("click", this.add_fun);
    },

    add_fun (e){
      if(this.num!=0){
        if(e.target.closest(".down_list")) return
          this.show_list = false;
        
        document.removeEventListener("click", this.add_fun)
      }
      this.num++
    },
    add_fun1 (e){
      if(this.num1!=0){
        if(e.target.closest(".down_year")) return
          this.show_year = false;
        
        document.removeEventListener("click", this.add_fun1)
      }
      this.num1++
    },
  }
}
</script>

<style lang="scss">
.month_component{
  position: relative;
  width:100%;
}
.month_select{
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:2.5px;
  border: 1px solid rgb(206, 206, 206);
  color:white;
  background-image: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgb(67, 201, 250) 100.2% );
}
.year_select{
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:2.5px;
  border: 1px solid rgb(206, 206, 206);
  color:white;
  background-image: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgb(67, 201, 250) 100.2% );
}

.month_list{
  width: 100%;
  height: 300px;
  overflow: hidden;
  overflow-y: scroll;
  position:absolute;
  top:32px;
  background: #fff;

  p{
    margin: 0;
    padding: 6px 15px;
    font-size: 14px;

    &:hover{
      background-image: linear-gradient( 109.6deg,  rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% );
    }
  }
}
.year_list{
  width: 100%;
   height: 300px;
  overflow: hidden;
  overflow-y: scroll;
  position:absolute;
  top:32px;
  background: #fff;

  p{
    margin: 0;
    padding: 6px 10px;
    font-size: 14px;

    &:hover{
      background-image: linear-gradient( 109.6deg,  rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% );
    }
  }
}
</style>