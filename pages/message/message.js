// pages/message/message.js
import { GetMessage } from '../../api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: [{ title: '系统消息', date: '2018/3/9', content:'内容是从小有座山山里有个啥，啥里面有个老和尚在讲故事，讲什么'},
      { title: '系统消息', date: '2018/3/9', content: '内容是从小有座山山里有个啥，啥里面有个老和尚在讲故事，讲什么' },
      { title: '系统消息', date: '2018/3/9', content: '内容是从小有座山山里有个啥，啥里面有个老和尚在讲故事，讲什么' },
      { title: '系统消息', date: '2018/3/9', content: '内容是从小有座山山里有个啥，啥里面有个老和尚在讲故事，讲什么' },
      { title: '系统消息', date: '2018/3/9', content: '内容是从小有座山山里有个啥，啥里面有个老和尚在讲故事，讲什么' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let messages = new GetMessage()
    messages.fetch().then((req)=>{
      console(req,'消息列表')
      this.setData({
        message:req.messages
      })
    })
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
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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