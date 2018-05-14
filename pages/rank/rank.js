// pages/rank/rank.js
import { shareToIndex } from '../../utils/util.js';
import { RankInfo, RankType, RankSubtype, Code } from '../../api.js';
const sheet = require('../../sheets.js');
let app = getApp();
let rankType = RankType.SCORE, rankSubtype = RankSubtype.COUNTRY;
let page = 1, ranks = [], topThree = [];
let preventCrazyClick = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    rankType: RankType.SCORE,
    rankSubtype: RankSubtype.COUNTRY,
    toView:'rank0',
    //全国排行榜前三名
    topThree: [],
    //全国排行榜除去前三的排名
    rankingCountry: [],
    //好友排行榜
    rankingFriend: [],
    //自己的排名
    selfRank:{},
    showHelp:false,
    title: '达人排行榜规则',
    id:5,
    noRank:false,
    noReward: true,
    isFriend:false,
    isFirst: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //test(假数据,仅为了看页面显示效果,接入真数据时直接把这块代码删除即可)----------
    // let topThree = [], rankingCountry = [], rankingFriend = [];
    // for(let i = 0 ;i < 20; i++ ){
    //   let obj = {};
    //   obj.rank = i+1;
    //   obj.userInfo = { avatar: 'https://wx.qlogo.cn/mmopen/vi_32/ODicJCxia34ErfQyhZ7ZHH7iaGSmylmqpgo5goTggk4xnvia07tvicwUNkicQo7xia0JFbtpW74NzQoQ562smbk1Z8k0g/0', nickName: '昵称几个字', gold: Math.floor(Math.random() * 10000 + 1), uid:'aaaa'};
    //   obj.achievement = Math.floor(Math.random()*10000+1);
    //   if(i<3){
    //     topThree[i] = obj;
    //   }
    //   else{
    //     rankingCountry[i-3] = obj;
    //   }
    //   rankingFriend[i] = obj;
    // }
    // this.setData({
    //   topThree,
    //   rankingCountry,
    //   rankingFriend,
    // })
    //--------------------------------------------------------------------

    // this.getRankInfo();
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
    let hasUserInfo = app.globalData.userInfo != null;
    this.setData({ hasUserInfo })
    if (!this.data.hasUserInfo) return
    this.setData({
      isFirst: app.globalData.isFirst
    })
    this.getRankInfo() 
  },
  hideAuth() {
    let hasUserInfo = app.globalData.userInfo != null;
    this.setData({ hasUserInfo })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.resetInfo();
    preventCrazyClick = false;
    rankType = RankType.SCORE; 
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
      noReward: true,
      isFriend: false,
      isFirst: false,
      noRank: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.resetInfo();
    preventCrazyClick = false;
    rankType = RankType.SCORE; 
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
      noReward: true,
      isFriend: false,
      isFirst: false,
      noRank: false
    })
  },

  //重置调api的信息
  resetInfo() {
    page = 1;
    ranks = [];
    topThree = [];
    this.setData({
      topThree: [],
      rankingCountry: [],
      rankingFriend: [],
    })
  },

  getRankInfo() {
    console.log(page, 'page', this.data.rankingFriend, this.data.rankingCountry)
    let req = new RankInfo();
    req.rankType = rankType;
    req.rankSubtype = rankSubtype;
    req.page = page;
    req.fetch().then(() => { 
      console.log(req)
      if (page == 1 && !req.ranks.length) {
        this.setData({
          noRank: true
        })
      }
      
      
      ranks = ranks.concat(req.ranks).map(o=>{
        let nickName;
        if(o.userInfo.nickName.length>8){
          nickName = o.userInfo.nickName.substr(0, 8)
        }
        else{
          nickName = o.userInfo.nickName
        }
        if (!o.userInfo.avatarUrl){
          o.userInfo.avatarUrl = app.globalData.defaultAvatar
        }
        o.userInfo.nickName = nickName;
        return o;
      });
      //全国榜单需要把前三名分开
      if (rankSubtype == RankSubtype.COUNTRY){
        if(page == 1){
          topThree = ranks.splice(0, 3);
          this.setData({
            topThree,
            rankingCountry: ranks,
            selfRank: req.selfRank
          })
        }
        else{
          this.setData({
            rankingCountry: ranks,
          })
        }
      }
      else{
        if(page == 1){
          this.setData({
            rankingFriend: ranks,
            selfRank: req.selfRank
          })
        }
        else{
          this.setData({
            rankingFriend: ranks,
          })
        }
      }

      if (!req.ranks.length) {
        preventCrazyClick = false;
        return;
      }

      page++;
      preventCrazyClick = false;
    }).catch((req) => {
      switch (req) { 
        case Code.NOT_FOUND:
          this.tip('榜单类型错误，请检查参数');
          break;
        default:
          if (!app.globalData.noNetwork) {
            this.tip('未知错误rank');
          }
      }
    })
  },

  toFly(e) {
    if (app.preventMoreTap(e)) return;
    wx.navigateTo({
      url: '../city/city?location=' + '',
    })
  },

  tip(tip) {
    wx.showToast({
      title: tip
    })
  },

  rankCountry(e) {
    if (preventCrazyClick) return;
    preventCrazyClick = true;
    rankSubtype = RankSubtype.COUNTRY;
    if (rankType == RankType.SCORE){
      this.setData({
        rankSubtype,
        toView: 'rank0',
        noReward: true,
        isFriend: false,
      })
    }
    else{
      this.setData({
        rankSubtype,
        toView: 'rank0',
        noReward: false,
        isFriend: false,
      })
    }
    this.resetInfo()
    this.getRankInfo();
  },

  getNextPage() {
    if (preventCrazyClick) return;
    preventCrazyClick = true;
    this.getRankInfo();
  },

  rankFriend(e) {
    if (preventCrazyClick) return;
    preventCrazyClick = true;
    rankSubtype = RankSubtype.FRIEND;
    this.setData({
      rankSubtype,
      toView: 'rank0',
      noReward: true,
      isFriend: true,
    })
    this.resetInfo()
    this.getRankInfo();
  },

  lookFamous(e) {
    if (preventCrazyClick) return;
    preventCrazyClick = true;
    rankType = RankType.THUMBS;
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
      id: '5',
      noReward: false,
      isFriend: false,
      title: '达人排行榜规则',
      noRank: false
    })
    this.resetInfo()
    this.getRankInfo();
  },

  lookFoot(e) {
    if (preventCrazyClick) return;
    preventCrazyClick = true;
    rankType = RankType.FOOT;
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
      id: '4',
      noReward: false,
      isFriend: false,
      title: '足迹排行榜规则',
      noRank: false
    })
    this.resetInfo()
    this.getRankInfo();
  },

  lookScore(e) {
    if (preventCrazyClick) return;
    preventCrazyClick = true;
    rankType = RankType.SCORE;
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
      id: '3',
      noReward: true,
      isFriend: false,
      title: '积分排行榜规则',
      noRank: false
    })
    this.resetInfo()
    this.getRankInfo();
  },

  toOther(e) {
    if (app.preventMoreTap(e)) return;
    //此处需要传uid，
    let uid = e.currentTarget.dataset.uid
    if (uid == wx.getStorageSync('uid')){
      wx.switchTab({
        url: '../self/self',
      })
    }
    else{
      wx.navigateTo({
        url: '../other/other?uid=' + uid,
      })
    }
    
  },

  showHelp() {
    this.setData({
      showHelp: true
    })
  },

  _hide() {
    this.setData({
      showHelp:false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this, {type:5},{'rank':true})
  }
})