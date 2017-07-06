<template>
  <div id="wrapper">
    <div class="tab-group">
      <div class="tab-item">
       短休息时间
      </div>
      <div class="tab-item active">
        工作时间
      </div>
      <div class="tab-item">
        长休息时间
      </div>
    </div>
    <timer></timer>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'
  import timer from './tomato/timer.vue'

  export default {
    name: 'landing-page',
    // components: { SystemInformation },
    components: {timer},
    methods: {
      // open (link) {
      //   this.$electron.shell.openExternal(link)
      // }
    }
  }
</script>

<style>
  /*#app{
    width: 100%;
    height: 100%;
  }*/

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #wrapper{
    /*width: 100%;
    height: 100%;*/
    position: relative;
  }
  footer{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>
