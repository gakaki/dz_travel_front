// pages/self/self.js
import { getUserInfo, shareToIndex } from '../../utils/util.js';
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
    init:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo;
    this.setData({userInfo})
    let m = new PlayerInfo();
    m.fetch().then(res=>{
      console.log(res.info)
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