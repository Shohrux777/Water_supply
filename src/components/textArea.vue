<template>
  <div  @click="activeInput" >
    <textarea  @blur="notActiveInput" :rows="rows"  class="TextAreaContent px-3 py-2" 
    :class="{'activeInputContent': active}"   @focus="activeInput"  style="font-size: 14px;"
    :value="value" @input="updateValue($event.target.value)"> </textarea>
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
    rows:{
      type : String,
      default : '3'
    }
  },
  data() {
    return {
      active: false,
      data:10,
    }
  },
  methods: {
    updateValue(value){
      // console.log(value)
      this.$emit('input', value)
    },
    activeInput(){
      this.active = true;
    },
    notActiveInput(){
      this.active = false;
    }
  },
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
.TextAreaContent{
  
  width: 100%;
  border-radius: 3px;
  border: 0.2px solid rgb(170, 170, 170);
  outline: none;

  .IconDiv{
    // width:45px;
    border-right: 0.2px solid rgb(216, 216, 216);
  }

 
}
.activeInputContent{
  border: 0.5px solid #4285F4;
  box-shadow: 0.1px 0.2px 2px #4285F4;
}

</style>