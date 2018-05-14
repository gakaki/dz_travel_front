// components/auth/auth.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotInfo(res) {
      if (res.detail && res.detail.userInfo) {
      let app = getApp();
      let info = res.detail.userInfo;
      info.iv = res.detail.iv;
      info.encryptedData = res.detail.encryptedData;
      app.globalData.userInfo = info;
      app.globalData.showAuth = false;
      if(info) {
        this.triggerEvent("hideAuth")
      }
      }
    }
  }
})
