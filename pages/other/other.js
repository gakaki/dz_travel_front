// pages/self/self.js
import { getUserInfo } from '../../utils/util.js';
import { PlayerInfo } from '../../api.js';
import { Item, items } from '../../sheets.js';
const app = getApp();
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
    let userInfo = app.globalData.userInfo;
    this.setData({ userInfo })
    if (options.uid) {
      let m = new PlayerInfo();
      m.uid = options.uid
      m.fetch().then(res => {
        console.log(res.info)
        this.setData({
          init: res.info,
          gold: res.info.items[Item.GOLD],
          integral: res.info.items[Item.POINT]
        })
      })
    }
  },
  toOtherPage(e){
    let v = e.currentTarget.dataset.id;
    if(v == 1) {
      wx.navigateTo({
        url: '../footprint/footprint?' + this.data.userInfo.uid,
      })
    }
    else if (v == 2) {
      wx.navigateTo({
        url: '../postcard/postcard?' + this.data.userInfo.uid,
      })
    }
    else {
      wx.navigateTo({
        url: '../travelLog/travelLog?' + this.data.userInfo.uid,
      })
    }
   },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,1,'other')
  }
})