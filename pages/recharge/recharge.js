const sheet = require('../../sheets.js')
import { shareToIndex } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goldInfo: sheet.pays,
    gCount: 0,
    mCount: 0,
    pop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '充值商城'
    })
    console.log(this.data.goldInfo)
  },
  hide() {
    this.setData({
      pop: false
    })
  },
  toBuy() {
    this.hide()
  },
  isBuy(e) {
    let obj = this.data.goldInfo[e.currentTarget.dataset.idx]
    this.setData({
      gCount: obj.gold,
      mCount: obj.pay,
      pop: true
    })
    console.log(e)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,1)
  }
})