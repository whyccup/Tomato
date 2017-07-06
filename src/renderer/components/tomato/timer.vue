<template>
  <div id="timer">
    <div class="content">
      {{showTime}}
    </div>
    <div class="bottomBtn">
      <button class="btn btn-large btn-primary" @click.stop="downTime();hide()" v-if="hideThis === false"><span @click="unbreakFuck()" class="icon icon-play"></span></button>
      <button class="btn btn-large btn-positive" @click.stop="pause()" v-if="hideThis === true"><span class="icon icon-pause"></span></button>
      <button class="btn btn-large btn-negative" @click="reload()"><span class="icon icon-ccw"></span></button>
      <!-- 与主进程通讯-->
      <span @click="ipcRenderer.send('changeSize', 50)" style="color: #000;">长</span>
      <span @click="ipcRenderer.send('reSize', 230)" style="color: #000;">还原</span>
    </div>
  </div>
</template>

<script src="./js/timer.js"></script>

<style scoped src="./css/timer.css"></style>
