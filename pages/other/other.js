// pages/self/self.js
import { PlayerInfo } from '../../api.js';
import { Item, items } from '../../sheets.js';
const app = getApp();
import { shareToIndex } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromWhere: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo;
    this.setData({ userInfo })
      let m = new PlayerInfo();
      this.data.fromWhere = options.fromWhere
      if (options.fromWhere) m.fromWhere = options.fromWhere
      if (options.uid) { m.playerUid = options.uid}
      m.fetch().then(res => {
        this.setData({
          init: res.info,
          gold: res.info.items[Item.GOLD],
          integral: res.info.items[Item.POINT]
        })
      })
  },
  toOtherPage(e){
    let v = e.currentTarget.dataset.id;
    if(v == 1) {
      if(this.data.fromWhere) {
        wx.navigateTo({
          url: '../footprint/footprint?uid=' + this.data.init.uid + '&fromWhere=' + this.data.fromWhere,
        })
      }else {
        wx.navigateTo({
          url: '../footprint/footprint?uid=' + this.data.init.uid,
        })
      }
      
    }
    else if (v == 2) {
      if (this.data.fromWhere) {
        wx.navigateTo({
          url: '../postcard/postcard?uid=' + this.data.init.uid + '&fromWhere=' + this.data.fromWhere,
        })
      } else {
        wx.navigateTo({
          url: '../postcard/postcard?uid=' + this.data.init.uid,
        })
      }
    }
    else {
      if (this.data.fromWhere) {
        wx.navigateTo({
          url: '../travelLog/travelLog?uid=' + this.data.init.uid + '&fromWhere=' + this.data.fromWhere,
        })
      } else {
        wx.navigateTo({
          url: '../travelLog/travelLog?uid=' + this.data.init.uid,
        })
      }
    }
   },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,{type:1},{'other':true})
  }
})