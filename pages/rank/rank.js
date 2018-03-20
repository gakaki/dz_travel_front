// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // famous:'https://gengxin.odao.com/update/h5/travel/rank/famous-rank.png',
    // foot:'https://gengxin.odao.com/update/h5/travel/rank/foot-rank-gray.png',
    // score:'https://gengxin.odao.com/update/h5/travel/rank/score-rank-gray.png',
    famous:true,
    foot:false,
    score:false,
    isCountry:true,
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
      isCountry:true
    })
  },

  rankFriend() {
    this.setData({
      isCountry: false
    })
  },

  lookFamous() {
    this.setData({
      famous: true,
      foot: false,
      score: false,
      isCountry:true
    })
  },

  lookFoot() {
    this.setData({
      famous: false,
      foot: true,
      score: false,
      isCountry: true
    })
  },

  lookScore() {
    this.setData({
      famous: false,
      foot: false,
      score: true,
      isCountry: true
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