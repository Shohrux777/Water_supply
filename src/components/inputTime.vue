<template>
  <div class="border InputTimeContent">
    <input type="number" class="InputTime" maxlength="2" name="" id="">
    <span>:</span>
    <input type="number" class="InputTime" maxlength="2" name="" id="">
  </div>
</template>

<script>
export default {
data() {
  return {
    input1: '',
    input2: '',
  }
},
}
</script>

<style lang="scss">
.InputTimeContent{
  height: 40px;
}
.InputTime{
  border: none;
  appearance: none;
  outline: none;
}
</style>