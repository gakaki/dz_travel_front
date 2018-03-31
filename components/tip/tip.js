// components/tip/tip.js
let timer = null
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    str: {
      type: String,
      value: '发送成功'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached() {
    timer = setTimeout(() => {
      this.hide()
    }, 2000)
  },
  detached() {
    clearTimeout(timer)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hide() {
      this.triggerEvent("hidetip")
    }
  }
})
