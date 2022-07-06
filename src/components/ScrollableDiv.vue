<template>
  <div class="scrollable_div">

  </div>
</template>

<style lang="scss" scoped>
.scrollable_div{
  width: 100%;
  height: 400px;
  padding: 0 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  //border: solid rgba(255, 255, 255, 0.4);
  border-width: 2px 1px 1px 2px;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.4);
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
