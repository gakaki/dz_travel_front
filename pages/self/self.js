// pages/self/self.js
import { getUserInfo } from '../../utils/util.js';
import { PlayerInfo } from '../../api.js';
const app = getApp();
let obj = {
    a: {
      title: '累计获得城市积分',
  num: '555'
},
  b: {
      title: '收集明信片数量',
    num: '555'
  },
  c: {
      title: '发表评论数量',
    num: '555'
  },
  d: {
      title: '获得点赞数量',
    num: '555'
  }
  ,
  e: {
      title: '获得特产数量',
    num: '555'
  },
  f: {
      title: '获得特产数量',
    num: '555'
  } 
}

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
      this.setData({
        list: res.info
      })
      console.log(res.info)

    })
    // console.log(obj)
    // this.setData({
    //   list:Object.values(obj)
    // }) 
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