import Vue from 'vue'

const bus = new Vue({
  data: {
    // 是否有定时器
    timer: null,

    // 是否在执行节流函数
    flow: false,

    // 默认等待时间
    delay: 500
  },

  methods: {
    // 防抖函数
    debounce (func, that, delay = this.delay) {
      let context = that
      console.log(context, this, func)
      return () => {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            func.apply(context)
          }, delay)
        }
      }
    },

    // 节流函数
    throttle (func, that, delay = this.delay) {
      return () => {
        if (this.flow) return false
        this.flow = true
        setTimeout(() => {
          func.apply(that)
          this.flow = false
        }, delay)
      }
    },

    // 代理事件
    emit (event, ...args) {
      this.$emit(event, ...args)
    },

    on (event, callback) {
      this.$on(event, callback)
    },

    off (event, callback) {
      this.$on(event, callback)
    }
  }
})

export default bus
