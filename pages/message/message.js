// pages/message/message.js
import { GetMessage, ClearMsg } from '../../api.js';
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // message = []
    // this.setData({
    //   message,
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let clear = new ClearMsg()
    clear.mid = message[0].mid
    clear.fetch().then((req)=>{
      console.log(req)
    })
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
      console.log(req, '消息列表')
      page++
      message = message.concat(req.messages)
      console.log(message)
      this.setData({
        message,
      })
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})