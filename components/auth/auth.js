// components/auth/auth.js
import {Base} from '../../api.js'
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
      content:''
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
  },
    attached() {
      let content = '欢迎进入 点亮足迹!'
      if (Base.LoginRetryed > 0) {
          content = '亲，我们需要使用您的昵称.'
      }
      this.setData({content})
    }
})
