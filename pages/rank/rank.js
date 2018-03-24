// pages/rank/rank.js
import { RankInfo, RankType, RankSubtype } from '../../api.js';
const app = getApp();
const sheet = require('../../sheets.js');
let rankType = RankType.THUMBS, rankSubtype = RankSubtype.COUNTRY;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankType: RankType.THUMBS,
    rankSubtype: RankSubtype.COUNTRY,
    toView:'rank0',
    //全国排行榜前三名
    topThree: [{ rank: 1, avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ODicJCxia34ErfQyhZ7ZHH7iaGSmylmqpgo5goTggk4xnvia07tvicwUNkicQo7xia0JFbtpW74NzQoQ562smbk1Z8k0g/0', nickName: '昵称几个字七个字', value: 9999, gold: 9999, uid:'aaa' },
      { rank: 2, avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ODicJCxia34ErfQyhZ7ZHH7iaGSmylmqpgo5goTggk4xnvia07tvicwUNkicQo7xia0JFbtpW74NzQoQ562smbk1Z8k0g/0', nickName: '昵称几个字五个字', value: 9999, gold: 9999, uid:'bbb' },
      { rank: 3, avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ODicJCxia34ErfQyhZ7ZHH7iaGSmylmqpgo5goTggk4xnvia07tvicwUNkicQo7xia0JFbtpW74NzQoQ562smbk1Z8k0g/0', nickName: '昵称几个字四个字', value: 9999, gold: 9999, uid:'ccc' },],
    //全国排行榜除去前三的排名
    rankingCountry: [{ rank: 4, avatar: '', nickName: '昵称几个字', value: 9999, gold: 9999, uid: 'aaa' }, 
      { rank: 5, avatar: '', nickName: '昵称几个字', value: 9998, gold: 999, uid: 'aaa' }, 
      { rank: 6, avatar: '', nickName: '昵称几个字', value: 9997, gold: 99, uid: 'aaa' }, 
      { rank: 7, avatar: '', nickName: '昵称几个字', value: 995, gold: 929, uid: 'aaa' }, 
      { rank: 8, avatar: '', nickName: '昵称几个字', value: 990, gold: 909, uid: 'aaa' }, 
      { rank: 9, avatar: '', nickName: '昵称几个字', value: 910, gold: 569, uid: 'aaa' }, 
      { rank: 10, avatar: '', nickName: '昵称几个字', value: 900, gold: 109, uid: 'aaa' }, 
      { rank: 11, avatar: '', nickName: '昵称几个字', value: 520, gold: 9, uid: 'aaa' }, 
      { rank: 12, avatar: '', nickName: '昵称几个字', value: 120, gold: 3009, uid: 'aaa' }, 
      { rank: 13, avatar: '', nickName: '昵称几个字', value: 100, gold: 929, uid: 'aaa' }, 
      { rank: 14, avatar: '', nickName: '昵称几个字', value: 20, gold: 609, uid: 'aaa' }],
    //好友排行榜
    rankingFriend: [{ rank: 1, avatar: '', nickName: '昵称几个字', value: 9999, gold: 9999, uid: 'aaa' },
      { rank: 2, avatar: '', nickName: '昵称几个字', value: 9998, gold: 999, uid: 'aaa' },
      { rank: 3, avatar: '', nickName: '昵称几个字', value: 9997, gold: 99, uid: 'aaa' },
      { rank: 4, avatar: '', nickName: '昵称几个字', value: 995, gold: 929, uid: 'aaa' },
      { rank: 5, avatar: '', nickName: '昵称几个字', value: 990, gold: 909, uid: 'aaa' },
      { rank: 6, avatar: '', nickName: '昵称几个字', value: 910, gold: 569, uid: 'aaa' },
      { rank: 7, avatar: '', nickName: '昵称几个字', value: 900, gold: 109, uid: 'aaa' },
      { rank: 8, avatar: '', nickName: '昵称几个字', value: 520, gold: 9, uid: 'aaa' },
      { rank: 9, avatar: '', nickName: '昵称几个字', value: 120, gold: 3009, uid: 'aaa' },
      { rank: 10, avatar: '', nickName: '昵称几个字', value: 100, gold: 929, uid: 'aaa' },
      { rank: 11, avatar: '', nickName: '昵称几个字', value: 20, gold: 609, uid: 'aaa' }],
    //自己的排名
    selfRank:{rank:'未上榜',value:9999}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRankInfo();
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

  getRankInfo() {
    let req = new RankInfo();
    req.rankType = rankType;
    req.rankSubtype = rankSubtype;
    req.fetch().then(() => {
      let ranks = [];
      let info = req.ranks.userInfo;
      let selfRank = {};
      let vKye;
      //通过rankType来决定需要渲染数据中的value取items中哪个值
      switch(rankType){
        case RankType.THUMBS:
          vKye = sheet.Item.COMPLETE;
          break;
        case RankType.FOOT:
          vKye = sheet.Item.MAPLIGHT;
          break;
        case RankType.SCORE:
          vKye = sheet.Item.NOWPOINT;
          break;
      }
      //给selfRank赋值
      selfRank.rank = req.selfRank.rank;
      selfRank.value = req.selfRank.userInfo.items.get(vKye);
      //通过循环返回的数据只取出其中需要的数据再setdata以减少数据传输大小。
      for (let i =0;i<req.ranks.length;i++){
        let obj={};
        obj.rank = req.ranks.rank;
        obj.avatar = info.avatarUrl;
        obj.nickName = info.nickName;
        obj.uid = info.uid;
        obj.value = info.items.get(vKye);
        obj.gold = info.items.get(sheet.Item.GOLD);
        ranks[i] = obj;
      }
      //全国榜单需要把前三名分开
      if (rankSubtype == RankSubtype.COUNTRY){
        let topThree = ranks.splice(0,3);
        this.setData({
          topThree,
          rankingCountry:ranks,
        })
      }
      else{
        this.setData({
          rankingFriend:ranks
        })
      }
    })
  },

  rankCountry() {
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankSubtype,
      toView: 'rank0',
    })
    this.getRankInfo();
  },

  rankFriend() {
    rankSubtype = RankSubtype.FRIEND;
    this.setData({
      rankSubtype,
      toView: 'rank0',
    })
    this.getRankInfo();
  },

  lookFamous() {
    rankType = RankType.THUMBS;
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
    })
    this.getRankInfo();
  },

  lookFoot() {
    rankType = RankType.FOOT;
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
    })
    this.getRankInfo();
  },

  lookScore() {
    rankType = RankType.SCORE;
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
    })
    this.getRankInfo();
  },

  toOther(e) {
    //此处需要传uid，
    console.log(e)
    let uid = e.currentTarget.dataset.uid
    wx.navigateTo({
      url: '../other/other?uid='+uid,
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