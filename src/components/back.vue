<template>
  <div class="back_router">
      <div class="into_back_ico rounded">
        <div class="into" @click="$router.back()">
          <mdb-icon icon="angle-double-left" class="text-white" style="font-size: 18px;"/>
        </div>
      </div>
    </div>
</template>

<script>
import {mdbIcon} from 'mdbvue'

export default {
  components: { mdbIcon },

}
</script>

<style lang="scss">
.back_router{
  z-index: 9999999;
  position:fixed; top:0px; left:0;
  width: 0.1px;
  height: 100px;
  background: rgb(255, 255, 255);
  &:hover{
    .into_back_ico {
    //   display: block;
      .into{
        position: absolute;
        left: 5px;
        transition: 0.3s;
      }
    }
  }
  .into_back_ico{
    // display: none;
    position: relative;
    cursor: pointer;
    width: 5px;
    background: transparent;
    height: 100px;
    .into{
      border-radius: 50%;  
      transition: 1s;
      position: absolute;
      left: -50px;
      width: 40px;
      height: 40px;
      margin-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );
    }
  }
}
</style>