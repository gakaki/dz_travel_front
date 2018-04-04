// pages/footprint/footprint.js
const app = getApp();
import { shareSuc, shareTitle } from '../../utils/util.js';

import { Item, items } from '../../sheets.js';
import { TravelFootprint } from '../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mySelf: true,
    mapConWd: 750,
    mapConHt: 800,
    content:'炫耀足迹'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo;
    this.setData({ userInfo })
    console.log(userInfo)
    let m = new TravelFootprint();
    if (options.uid) {  //个人主页进入不会传uid,只有从分享页进来的才会传uid
      m.playerUid = options.uid
      this.setData({
        mySelf: false,
        content:'开启的我旅行'
      })
    } else {
      m.playerUid = userInfo.uid
    }
    m.fetch().then(res=>{
      console.log(res)
      this.setData({
        user:res.userInfo,
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
  
  }
})