<template>
  <div class="loadingPage">
    <img class="imgForLoading" src="./../assets/loading_gif.gif" />
  </div>
</template>
<style scoped>
.loadingPage {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: #00000052;
  z-index: 10000000000000;
  text-align: center;
  min-height: 100vh;
}
.imgForLoading {
  margin-right: 8%;
  margin-top: 36%;
  height: 257px;
}
</style>
