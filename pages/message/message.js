// pages/message/message.js
const app = getApp();
import { shareSuc, shareTitle } from '../../utils/util.js';
import { GetMessage, ClearMsg, Code } from '../../api.js';
let page = 1 , message = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取消息列表
    this.sendReq()
  },

   /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if(message.length){
      let clear = new ClearMsg()
      clear.mid = message[0].mid
      clear.fetch().then((req) => {
      }).catch((req) => {
        switch (req) {
          case Code.USER_NOT_FOUND:
            this.tip('用户不存在');
            break;
          case Code.NOT_FOUND:
            this.tip('未找到消息');
            break;
          default:
            this.tip('未知错误');
        }
      })
    }
    
    message = []
    page = 1
    this.setData({
      message,
    })
  },

  getMsg() {
    this.sendReq()
  },

  sendReq() {
    let messages = new GetMessage()
    messages.page = page
    messages.fetch().then((req) => {
      if(!req.messages.length) return;
      page++
      message = message.concat(req.messages)
      this.setData({
        message,
      })
    }).catch((req)=>{
      switch (req) {
        case Code.USER_NOT_FOUND:
          this.tip('用户不存在');
          break;
        case Code.PARAMETER_NOT_MATCH:
          this.tip('非法传参，请检查参数');
          break;
        default:
          this.tip('未知错误');
      }
    })
  },

  tip(tip) {
    wx.showToast({
      title: tip
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})