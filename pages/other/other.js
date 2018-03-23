// pages/self/self.js
import { getUserInfo } from '../../utils/util.js';
import { PlayerInfo } from '../../api.js';
const app = getApp();
const sheet = require('../../sheets.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mianTitle: [{
      title: '旅行足迹',
      icon: 'https://gengxin.odao.com/update/h5/travel/self/footprint.png',
      url: '../footprint/footprint'
    },
    {
      title: '他的明信片',
      icon: 'https://gengxin.odao.com/update/h5/travel/self/postcard.png',
      url: '../postcard/postcard'
    },
    {
      title: '旅行日志',
      icon: 'https://gengxin.odao.com/update/h5/travel/self/log.png',
      url: '../travelLog/travelLog'
    }],
    list: [
      {
        title: '累计获得城市积分',
        num: '555'
      },
      {
        title: '收集明信片数量',
        num: '555'
      },
      {
        title: '发表评论数量',
        num: '555'
      }, {
        title: '获得点赞数量',
        num: '555'
      }
      , {
        title: '获得特产数量',
        num: '555'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    //   console.log(app.globalData.userInfo)
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }

    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    // console.log(this.data.userInfo)
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