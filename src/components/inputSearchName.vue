<template>
  <div class="d-flex  inputContentIcon " :class="{'activeInputContentSearch': active, 'activeInputError': error, 'inputBorderContent': !error}">
    <div class="d-flex w-100"  @click="activeInput">
      <input :type="type" @blur="notActiveInput" ref="inputIcon" class="input_style"   @focus="activeInput" v-model="name" >
      <div v-if="icon" class="d-flex justify-content-center align-items-center" 
        :class="{'activeIconSearch': active, 'IconDivSearch': !active && !error, 'activeIconSearchError': error}">
        <mdb-icon fab v-if="fab" :icon="icon" style="font-size:15px;"/>
        <mdb-icon v-else :icon="icon" style="font-size:15px;"/>
      </div>
    </div>
    <div class="droplistSearch card w-100 down_list" v-if="dropshow">
      <p  class="m-0  px-3 bg_light" v-for="(item,i) in option" :key="i"   @click="selectitem(item)">{{item.name}}</p>
    </div>
    
  </div>
</template>

<script>
import {mdbIcon} from 'mdbvue'
export default {
  components:{
    mdbIcon
  },
  props:{
    value: [Number, String],
    icon:{
      type : String,
      default : ''
    },
    option: {
      type : Array,
      default(){
        return []
      }
    },
    
    type:{
      type : String,
      default : 'text'
    },
    valid:Boolean,
    fab:Boolean,

  },
  data() {
    return {
      active: false,
      data: '',
      error: false,
      dropshow: false,
      name: '',
      num: -1,
      
    }
  },
  methods: {
    selectitem(data){
      this.$emit('select', data)
      this.name = data.name;
      this.dropshow = false;

    },
    
    activeInput(){
      this.num = 0
      this.active = true;
      this.error = false;
      this.dropshow = true;
      console.log('hiy')
      // console.log(this.valid)
      document.addEventListener("click", this.add_fun);

    },


    add_fun (e){
        if(this.num!=0){
          if(e.target.closest(".down_list")) return
            this.dropshow = false;
          
          document.removeEventListener("click", this.add_fun)
        }
        this.num++
    },




    notActiveInput(){
      
      this.active = false;
      if(this.valid== true && this.data == ''){
        this.error = true
        this.active = false
      }
      // this.dropshow = false;
    },
    focus(){
      this.$refs.inputIcon.focus();
    }
  },
}
</script>

<style lang="scss">
.inputContentIcon{
  width: 100%;
  height: 38px;
  border-radius: 3px;
  position: relative;

  .IconDivSearch{
    width:45px;
    color:rgb(133, 133, 133);
    font-size: 10px;
    border-right: 0.2px solid rgb(255, 255, 255);
  }

  input{
    width: 100%;
    padding: 0 12px;
    appearance: none;
    outline: none;
    border:none;
    font-size: 16px;
    color:rgb(80, 80, 80);
  }
}
.inputBorderContent{
  border:none;
  border-bottom: 1.5px solid rgb(197, 197, 197);
  
}
.activeInputContentSearch{
  border-bottom: 1.5px solid #4285F4;

  // ::-webkit-calendar-picker-indicator{
  //   background-color: #c0d8ff;
  //   border-radius: 3px;
  // }
}
.activeInputError{
  border: 1.6px solid #ff4242;
  // box-shadow: 0.1px 0.2px 2px #ff4545;

  ::-webkit-calendar-picker-indicator{
    background-color: #ffc0c0;
    border-radius: 3px;
  }
}
.activeIconSearch{
    width:45px;
    cursor: pointer;
  // border-right: 0.2px solid #4285F4;
  color:#0571ff;
}
.activeIconSearchError{
  width:45px;
  border-right: 0.2px solid #ff5050;
  color:#ff4949;
}
.droplistSearch{
  position: absolute;
  top: 40px;
  left: 0;
  max-height: 250px;
  overflow: hidden;
  overflow-y: scroll;
}
.down_list{
  z-index: 55555555 !important;
}
.bg_light:hover{
  background: #d4e5ff;
}
.bg_light{
  padding: 5px 0;
  font-size: 14.2px;
  border-bottom: 1px dashed rgb(240, 239, 239);

}
.input_style{
  font-size: 14px !important;
  // margin-top: 5px;
  color: rgb(0, 0, 85) !important;
  // border: 1px solid #0571ff !important;
}
</style>