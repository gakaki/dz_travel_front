const sheet = require('../../sheets.js')
import { shareToIndex } from '../../utils/util.js';
import { Minapppay } from '../../api.js';
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
    let _that = this;

    let m = new Minapppay();
    m.goodsId = this.data.obj.id
    m.payCount = this.data.obj.pay
    m.fetch().then(res => {
      console.log(res)
      wx.requestPayment({
        timeStamp: res.payload.timeStamp,
        nonceStr: res.payload.nonceStr,
        package: res.payload.package,
        signType: res.payload.signType,
        paySign: res.payload.paySign,
        success(res) {
          let title = '获得'
          title += '金币×' + _that.data.obj.gold;
          wx.showToast({
            title: title,
            icon: 'success',
            duration: 2000,
            mask: true
          })
        },
        fail(res) {
          wx.showToast({
            title: '支付失败',
            icon: 'none'
          })
        }
      })
    })
  },
  isBuy(e) {
    let obj = this.data.goldInfo[e.currentTarget.dataset.idx]
    this.setData({
      obj:obj,
      gCount: obj.gold,
      mCount: obj.pay,
      pop: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})