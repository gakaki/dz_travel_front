// pages/rank/rank.js
import { RankInfo } from '../../api.js';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    famous:true,
    foot:false,
    score:false,
    isCountry:true,
    toView:'rank0',
    //全国排行榜前三名
    topThree: [{ rank: 1, avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ODicJCxia34ErfQyhZ7ZHH7iaGSmylmqpgo5goTggk4xnvia07tvicwUNkicQo7xia0JFbtpW74NzQoQ562smbk1Z8k0g/0', nickName: '昵称几个字七个字', foot: 9999, gold: 9999 },
      { rank: 2, avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ODicJCxia34ErfQyhZ7ZHH7iaGSmylmqpgo5goTggk4xnvia07tvicwUNkicQo7xia0JFbtpW74NzQoQ562smbk1Z8k0g/0', nickName: '昵称几个字五个字', foot: 9999, gold: 9999 },
      { rank: 3, avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ODicJCxia34ErfQyhZ7ZHH7iaGSmylmqpgo5goTggk4xnvia07tvicwUNkicQo7xia0JFbtpW74NzQoQ562smbk1Z8k0g/0', nickName: '昵称几个字四个字', foot: 9999, gold: 9999 },],
    //全国排行榜除去前三的排名
    rankingCountry: [{ rank: 4, avatar: '', nickName: '昵称几个字', foot: 9999, gold: 9999 }, 
    { rank: 5, avatar: '', nickName: '昵称几个字', foot: 9998, gold: 999 }, 
    { rank: 6, avatar: '', nickName: '昵称几个字', foot: 9997, gold: 99 }, 
    { rank: 7, avatar: '', nickName: '昵称几个字', foot: 995, gold: 929 }, 
    { rank: 8, avatar: '', nickName: '昵称几个字', foot: 990, gold: 909 }, 
    { rank: 9, avatar: '', nickName: '昵称几个字', foot: 910, gold: 569 }, 
    { rank: 10, avatar: '', nickName: '昵称几个字', foot: 900, gold: 109 }, 
    { rank: 11, avatar: '', nickName: '昵称几个字', foot: 520, gold: 9 }, 
    { rank: 12, avatar: '', nickName: '昵称几个字', foot: 120, gold: 3009 }, 
    { rank: 13, avatar: '', nickName: '昵称几个字', foot: 100, gold: 929 }, 
    { rank: 14, avatar: '', nickName: '昵称几个字', foot: 20, gold: 609 }],
    //好友排行榜
    rankingFriend: [{ rank: 1, avatar: '', nickName: '昵称几个字', foot: 9999, gold: 9999 },
    { rank: 2, avatar: '', nickName: '昵称几个字', foot: 9998, gold: 999 },
    { rank: 3, avatar: '', nickName: '昵称几个字', foot: 9997, gold: 99 },
    { rank: 4, avatar: '', nickName: '昵称几个字', foot: 995, gold: 929 },
    { rank: 5, avatar: '', nickName: '昵称几个字', foot: 990, gold: 909 },
    { rank: 6, avatar: '', nickName: '昵称几个字', foot: 910, gold: 569 },
    { rank: 7, avatar: '', nickName: '昵称几个字', foot: 900, gold: 109 },
    { rank: 8, avatar: '', nickName: '昵称几个字', foot: 520, gold: 9 },
    { rank: 9, avatar: '', nickName: '昵称几个字', foot: 120, gold: 3009 },
    { rank: 10, avatar: '', nickName: '昵称几个字', foot: 100, gold: 929 },
    { rank: 11, avatar: '', nickName: '昵称几个字', foot: 20, gold: 609 }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  rankCountry() {
    this.setData({
      isCountry:true,
      toView: 'rank0',
    })
  },

  rankFriend() {
    this.setData({
      isCountry: false,
      toView: 'rank0',
    })
  },

  lookFamous() {
    this.setData({
      famous: true,
      foot: false,
      score: false,
      isCountry:true,
      toView: 'rank0',
    })
  },

  lookFoot() {
    this.setData({
      famous: false,
      foot: true,
      score: false,
      isCountry: true,
      toView: 'rank0',
    })
  },

  lookScore() {
    this.setData({
      famous: false,
      foot: false,
      score: true,
      isCountry: true,
      toView: 'rank0',
    })
  },

  toOther() {
    //此处需要传个sid或者uid，后期跟后台沟通
    wx.navigateTo({
      url: '../other/other',
    })
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