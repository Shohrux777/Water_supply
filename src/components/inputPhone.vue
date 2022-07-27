<template>
  <div class="d-flex  inputContentIcon " @click="activeInput" :class="{'activeInputContentPhone': active, 'activeInputErrorPhone': error, 'inputBorderContentPhone': !error}">
    <div v-if="icon" class="d-flex justify-content-center align-items-center " :class="{'activeIcon': active, 'IconDiv': !active && !error, 'activeIconError': error}">
      <mdb-icon fab v-if="fab" :icon="icon" style="font-size:17px;"/>
      <mdb-icon v-else :icon="icon" style="font-size:17px;"/>
    </div>
    <input :type="type" @blur="notActiveInput" style="font-size: 15px;" ref="inputIcon" maxlength="13" @focus="activeInput" :value="value" @input="updateValue($event.target.value)">
  </div>
</template>

<script>
import {mdbIcon} from 'mdbvue'
export default {
  components:{
    mdbIcon
  },
  props:{
    value:{
      type : String,
      default : ''
    },
    icon:{
      type : String,
      default : ''
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
    }
  },
  methods: {
    updateValue(value){
      // console.log(value)
      var x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      this.data = value
      this.$emit('input', value)
    },
    activeInput(){
      this.active = true;
      this.error = false;
    },
    notActiveInput(){
      this.active = false;
      if(this.valid== true && this.data == ''){
        this.error = true
        this.active = false
      }
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
  height: 37px;
  border-radius: 3px;

  .IconDiv{
    width:45px;
    color:rgb(112, 112, 112);
    // border-right: 0.2px solid rgb(216, 216, 216);
  }

  input{
    width: 100%;
    padding: 0 7px;
    appearance: none;
    outline: none;
    border:none;
    font-size: 15px;
    color:rgb(80, 80, 80);
  }
}
.inputBorderContentPhone{
  border: 0.2px solid rgb(190, 190, 190);
  
}
.activeInputContentPhone{
  border: 0.2px solid #4285F4;
  box-shadow: 0.1px 0.2px 2px #4285F4;

  ::-webkit-calendar-picker-indicator{
    background-color: #c0d8ff;
    border-radius: 3px;
  }
}
.activeInputErrorPhone{
  border: 1.6px solid #ff4242;
  box-shadow: 0.1px 0.2px 2px #ff4545;

  ::-webkit-calendar-picker-indicator{
    background-color: #ffc0c0;
    border-radius: 3px;
  }
}
.activeIcon{
  width:45px;
  // border-right: 0.2px solid #4285F4;
  color:#183153;

}
.activeIconError{
  width:45px;
  // border-right: 0.2px solid #ff5050;
  color:#ff4949;
}

</style>