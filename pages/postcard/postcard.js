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
      wx.setNavigationBarTitle({
        title: "明信片"
      })

      m.playerUid = options.uid;
      this.setData({
        uid: options.uid
      })
    }
    m.fetch().then(res=>{
      console.log(res)
       this.setData({
         init: res.postcardInfo
      })
    })   
  },
  toShop(){
    wx.redirectTo({
      url: '../props/props',
    })
  },
  toMyXc(e) {
    if(!this.data.uid) {
      wx.navigateTo({
        url: '../xiangce/xiangce?province=' + e.currentTarget.dataset.province,
      })
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})