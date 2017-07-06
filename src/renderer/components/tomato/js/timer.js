import moment from 'moment'
const {ipcRenderer} = require('electron')

export default {
  name: 'timer',
  data () {
    return {
      startTime: 1500,
      showTime: '',
      breakFunction: false,
      hideThis: false,
      ipcRenderer: ipcRenderer
    }
  },
  methods: {
    formatTime () {
      this.showTime = moment.unix(this.startTime).format('mm:ss')
    },
    downTime (cb) {
      let that = this
      if (that.startTime > 0) {
        setTimeout(function () {
          if (that.breakFunction === false) {
            that.startTime = that.startTime - 1
            that.downTime(that.formatTime())
          }
        }, 1000)
      }
    },
    pause () {
      this.breakFuck()
      this.unhide()
    },
    reload () {
      this.unhide()
      this.breakFuck()
      this.startTime = 1500
      this.formatTime()
    },
    breakFuck () {
      this.breakFunction = true
    },
    unbreakFuck () {
      this.breakFunction = false
    },
    hide () {
      this.hideThis = true
    },
    unhide () {
      this.hideThis = false
    }
  },
  mounted () {
    this.formatTime()
  }
}
