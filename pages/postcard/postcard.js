// pages/postcard/postcard.js
import { MyPostcards } from '../../api.js';
import { shareToIndex } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let m = new MyPostcards();
    m.fetch().then(res=>{
      console.log(res)
       this.setData({
         init: res.postcardInfo
      })
    })
   
  },
  toMyXc() {
    wx.navigateTo({
      url: '../xiangce/xiangce',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,1)
  }
})