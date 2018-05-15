// pages/footprint/footprint.js
const app = getApp();
import { shareToIndex } from '../../utils/util.js';

import { Item, items } from '../../sheets.js';
import { TravelFootprint } from '../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapConWd: 750,
    mapConHt: 800,
    content:'炫耀足迹',
    mySelf:true,
    fromWhere: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.fromWhere) {
      this.setData({
        fromWhere: options.fromWhere
      })
    }
    let userInfo = app.globalData.userInfo;
    this.setData({ userInfo })
    let uid = ''
    if (options.uid) {  //个人主页进入不会传uid,只有从分享页进来的才会传uid
      uid = options.uid
      this.setData({
        mySelf: false,
        content: '开启我的旅行',
        uid:options.uid
      })
      wx.setNavigationBarTitle({
        title:'炫耀足迹'
      })
    } else {
      uid = userInfo.uid
    }
    let m = new TravelFootprint();
    m.playerUid = uid;
    if (options.fromWhere) m.fromWhere = options.fromWhere
    m.fetch().then(res => {
      this.setData({
        user: res.userInfo,
        reachrovince: res.reachrovince,
        totalArrive: res.totalArrive,
        totalArrivePercent: res.totalArrivePercent,
        travelPercent: res.travelPercent,
        gold: res.items[Item.GOLD],
        integral: res.items[Item.POINT]
      })
    })


  },
  toIndex(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,{type:2},{'footprint':true})
  }
})