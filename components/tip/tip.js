// components/tip/tip.js
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

  /**
   * 组件的方法列表
   */
  methods: {
hide() {
  this.triggerEvent("hidetip")
}
  }
})
