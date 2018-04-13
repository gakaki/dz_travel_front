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
    if(options.uid) {
      m.palyerUid = options.uid;
      this.data.uid = options.uid;
    }
    m.fetch().then(res=>{
      console.log(res)
       this.setData({
         init: res.postcardInfo
      })
    })   
  },
  toShop(){
    wx.navigateTo({
      url: '../props/props',
    })
  },
  toMyXc() {
    let path = '';
    if(this.data.uid) {
      path = '../xiangce/xiangce?uid='+this.data.uid
    } else {
      path = '../xiangce/xiangce'
    }
    wx.navigateTo({
      url: path,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})