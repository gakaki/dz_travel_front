// components/navigation/navigation.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    navigationIcon: ''
  },

  /**
   * 组件的方法列表
   */
  attached() {
this.setData({
  navigationIcon: app.globalData.navigationIcon
})
  },
  methods: {
    chgPage(e) {
      console.log(e)
      if (e.currentTarget.dataset.page == 'index') {
        if (app.globalData.navigationIcon == 'index') return
        app.globalData.navigationIcon = 'index'
        wx.reLaunch({
          url: "../index/index"
        })
      }
      else if (e.currentTarget.dataset.page == 'rank') {
        if (app.globalData.navigationIcon == 'rank') return
        app.globalData.navigationIcon = 'rank'
        wx.reLaunch({
          url: "../rank/rank"
        })
      }else {
        if (app.globalData.navigationIcon == 'self') return
        app.globalData.navigationIcon = 'self'
        wx.reLaunch({
          url: "../self/self"
        })
      }
    }
  }
})
