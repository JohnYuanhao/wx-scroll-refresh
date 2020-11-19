Component({
  properties: {
    scrollX: {
      type: Boolean,
      value: false
    },
    scrollY: {
      type: Boolean,
      value: true
    },
    upperThreshold: {
      type: Number,
      optionalTypes: [String],
      value: 50
    },
    lowerThreshold: {
      type: Number,
      optionalTypes: [String],
      value: 50
    },
    scrollTop: {
      type: Number,
      optionalTypes: [String],
      value: ''
    },
    scrollLeft: {
      type: Number,
      optionalTypes: [String],
      value: ''
    },
    scrollIntoView: {
      type: String,
      value: ''
    },
    scrollWithAnimation: {
      type: Boolean,
      value: false
    },
    enableBackToTop: {
      type: Boolean,
      value: false
    },
    enableFlex: {
      type: Boolean,
      value: false
    },
    scrollAnchoring: {
      type: Boolean,
      value: false
    },
    refresherEnabled: {
      type: Boolean,
      value: false
    },
    refresherThreshold: {
      type: Number,
      value: 70
    },
    refresherBackground: {
      type: String,
      value: '#FFF'
    },
    isEnd: {
      type: Boolean,
      value: false
    },
    refresherTriggered: Boolean
  },
  computed: {
    refresherDefaultStyle () {
      return this.data.refresherEnabled ? 'none' : 'black'
    }
  },
  data: {
    text: '下拉刷新',
    time: ''
  },
  ready () {
    this.setData({
      time: this.getTime()
    })
  },
  methods: {
    getTime () {
      const date = new Date()
      return `${date.getFullYear()}-${this.getFriendlyTime(date.getMonth() + 1)}-${this.getFriendlyTime(date.getDate())} ${this.getFriendlyTime(date.getHours())}:${this.getFriendlyTime(date.getMinutes())}:${this.getFriendlyTime(date.getSeconds())}`
    },
    getFriendlyTime (time) {
      return time < 10 ? '0' + time : time
    },
    refreshObserver (value) {
      console.log(value)
    },
    scrolltoupper (e) {
      this.triggerEvent('scrolltoupper', e)
    },
    scrolltolower (e) {
      this.triggerEvent('scrolltolower', e)
    },
    scroll (e) {
      this.triggerEvent('scroll', e)
    },
    refresherpulling (evt) {
      var p = Math.min(evt.detail.dy / this.data.refresherThreshold, 1)
      if (p === 1) {
        this.setData({
          className: 'refresh-pull-up',
          text: '松开刷新'
        })
      } else {
        this.setData({
          className: 'refresh-pull-down',
          text: '下拉刷新'
        })
      }
      this.triggerEvent('refresherpulling', evt)
    },
    refresherrefresh (e) {
      this.setData({
        className: 'refreshing',
        text: '正在刷新...',
        time: this.getTime()
      })
      this.triggerEvent('refresherrefresh', e)
    },
    refresherrestore (e) {
      this.triggerEvent('refresherrestore', e)
    },
    refresherabort (e) {
      this.triggerEvent('refresherabort', e)
    }
  }
})
