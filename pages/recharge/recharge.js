const sheet = require('../../sheets.js')
import { shareToIndex, addGold } from '../../utils/util.js';
import { Minapppay } from '../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipPop: false,
    tipStr: '',
    goldInfo: sheet.pays,
    gCount: 0,
    mCount: 0,
    pop: false,
    platform: '',
    income: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var res = wx.getSystemInfoSync()
      console.log(res.platform)
        this.setData({
          platform: res.platform
        })
    } catch (e) {
    }
    this.setData({
      income: sheet.Parameter.Get(sheet.Parameter.NEWUSERGOLD).value
    })
    wx.setNavigationBarTitle({
      title: '金币商城'
    })
  },
  hideTipPop() {
    this.setData({
      tipPop: false
    })
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
      wx.requestPayment({
        timeStamp: res.payload.timeStamp,
        nonceStr: res.payload.nonceStr,
        package: res.payload.package,
        signType: res.payload.signType,
        paySign: res.payload.paySign,
        success(res) {
          let title = '获得'
          title += '金币×' + _that.data.obj.gold;
          // wx.showToast({
          //   title: title,
          //   icon: 'success',
          //   duration: 2000,
          //   mask: true
          // })

          this.setData({
            tipPop: true,
            tipStr: title
          })

          addGold(_that.data.obj.gold)
        },
        fail(res) {
          // wx.showToast({
          //   title: '支付失败',
          //   icon: 'none'
          // })
          this.setData({
            tipPop: true,
            tipStr: 支付失败
          })
        }
      })
    })
  },
  isBuy(e) {
    let obj = this.data.goldInfo[e.currentTarget.dataset.idx]
    this.setData({
      obj: obj,
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