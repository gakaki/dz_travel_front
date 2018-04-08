// pages/rank/rank.js
import { shareToIndex } from '../../utils/util.js';
import { RankInfo, RankType, RankSubtype, Code } from '../../api.js';
const sheet = require('../../sheets.js');
let rankType = RankType.THUMBS, rankSubtype = RankSubtype.COUNTRY;
let page = 1, ranks = [], topThree = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankType: RankType.THUMBS,
    rankSubtype: RankSubtype.COUNTRY,
    toView:'rank0',
    //全国排行榜前三名
    topThree: [],
    //全国排行榜除去前三的排名
    rankingCountry: [],
    //好友排行榜
    rankingFriend: [],
    //自己的排名
    selfRank:{rank:'未上榜',achievement:9999},
    showHelp:false,
    title: '达人排行榜规则',
    id:5,
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
    // console.log(topThree, rankingCountry)
    // this.setData({
    //   topThree,
    //   rankingCountry,
    //   rankingFriend,
    // })
    //--------------------------------------------------------------------

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
    this.getRankInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.resetInfo();
    rankType = RankType.THUMBS; 
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.resetInfo();
    rankType = RankType.THUMBS; 
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
    })
  },

  //重置调api的信息
  resetInfo() {
    console.log('reset')
    page = 1;
    ranks = [];
    topThree = [];
  },

  getRankInfo() {
    console.log(page,'page')
    let req = new RankInfo();
    req.rankType = rankType;
    req.rankSubtype = rankSubtype;
    req.page = page;
    req.fetch().then(() => { 
      ranks = ranks.concat(req.ranks);
      console.log(ranks,page,'排行榜数据',req.selfRank)
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

      page++;
    }).catch((req) => {
      switch (req) { 
        case Code.NOT_FOUND:
          this.tip('榜单类型错误，请检查参数');
        default:
          this.tip('未知错误');
      }
    })
  },

  tip(tip) {
    wx.showToast({
      title: tip,
      icon: 'none'
    })
  },

  rankCountry() {
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankSubtype,
      toView: 'rank0',
    })
    this.resetInfo()
    this.getRankInfo();
  },

  rankFriend() {
    rankSubtype = RankSubtype.FRIEND;
    this.setData({
      rankSubtype,
      toView: 'rank0',
    })
    this.resetInfo()
    this.getRankInfo();
  },

  lookFamous() {
    rankType = RankType.THUMBS;
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
      id: '5',
      title: '达人排行榜规则'
    })
    this.resetInfo()
    this.getRankInfo();
  },

  lookFoot() {
    rankType = RankType.FOOT;
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
      id: '4',
      title: '足迹排行榜规则'
    })
    this.resetInfo()
    this.getRankInfo();
  },

  lookScore() {
    rankType = RankType.SCORE;
    rankSubtype = RankSubtype.COUNTRY;
    this.setData({
      rankType,
      rankSubtype,
      toView: 'rank0',
      id: '3',
      title: '积分排行榜规则'
    })
    this.resetInfo()
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
    return shareToIndex(this, 5,'rank')
  }
})