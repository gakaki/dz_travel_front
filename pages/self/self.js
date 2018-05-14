// pages/self/self.js
import { getUserInfo, shareToIndex, shareTo } from '../../utils/util.js';
import { PlayerInfo } from '../../api.js';
import { Item, items } from '../../sheets.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mianTitle:[{
      title:'旅行足迹',
      icon:'https://gengxin.odao.com/update/h5/travel/self/footprint.png',
      url:'../footprint/footprint'
    }, 
    {
      title: '我的明信片',
      icon: 'https://gengxin.odao.com/update/h5/travel/self/postcard.png',
      url: '../postcard/postcard'
    }, 
    {
      title: '旅行日志',
      icon: 'https://gengxin.odao.com/update/h5/travel/self/log.png',
      url: '../travelLog/travelLog'
    }],
    init:null,
    isFirst:false,
    hasUserInfo: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
  },
  onShow:function(){
    let userInfo = app.globalData.userInfo;
    let hasUserInfo = userInfo != null;
    this.setData({ userInfo, hasUserInfo })
    if (!this.data.hasUserInfo) return
    this.updateInfo()
    this.setData({
      isFirst: app.globalData.isFirst
    })
  },
  hideAuth() {
    let hasUserInfo = app.globalData.userInfo != null;
    this.setData({ hasUserInfo })
  },
  onHide() {
    this.setData({
      isFirst: false
    })
  },
  onUnload() {
    this.setData({
      isFirst: false
    })
  },
  toFly(e) {
    if (app.preventMoreTap(e)) return;
    wx.navigateTo({
      url: '../city/city?location=' + '',
    })
  },
  updateInfo(){
    let m = new PlayerInfo();
    m.fetch().then(res => {
      this.setData({
        init: res.info,
        gold: res.info.items[Item.GOLD],
        integral: res.info.items[Item.POINT]
      })
    })
  },
  toOtherPage(e) {
    let v = e.currentTarget.dataset.id;
    if (v == 1) {
      wx.navigateTo({
        url: '../footprint/footprint'
      })
    }
    else if (v == 2) {
      wx.navigateTo({
        url: '../postcard/postcard?'
      })
    }
    else {
      wx.navigateTo({
        url: '../travelLog/travelLog'
      })
    }
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let toShareLink = {
      other:true
    }
    return shareToIndex(this, {}, toShareLink)
  }
})