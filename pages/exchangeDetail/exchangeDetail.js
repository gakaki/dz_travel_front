// pages/exchangeDetail/exchangeDetail.js
import { IntegralShop, GetUserLocation, GetRealInfo, ExchangeShop } from '../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cfmStr: '确定',
    exchange:false,
    confirmAdress:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let m = new IntegralShop();
    m.fetch().then(res => {
      this.setData({
        integral: options.integral,
        shop: res.shops[options.id]
      })
      console.log(res)
    })
  },
  _cancel() {
    this.setData({
      exchange: false
    })
  },
  _confirm() {
    if (this.data.cfmStr == '确定') {
      let m = new GetUserLocation();
      m.fetch().then(res => {
        console.log(res)
        let m = new GetRealInfo();
        m.fetch().then(res => {
          this.setData({
            exchange: false,
            confirmAdress: true,
            userInfo: res.realInfo
          })
        })
        console.log(this.data.userInfo)

      }).catch(res => {
        if (res == -174) {
          this.setData({
            exchangeCon: '您尚未设置个人信息',
            cfmStr: '前往设置'
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '../settings/settings?settings=true'
      })
      this.setData({
        exchange: false,
        cfmStr: '确定'
      })
    }
  },
  toSetting() {
    wx.navigateTo({
      url: '../settings/settings?settings=true',
    })
    this.setData({
      confirmAdress: false
    })
  },
  exchange(e){
    if (this.data.integral < this.data.shop.integral) {return}
    this.setData({
      exchange: true,
      exchangeCon: '确定消耗' + this.data.shop.integral + '积分兑换' + this.data.shop.name,
      id: this.data.shop.id
    })
  },
  confirmExc() {
    this.setData({
      confirmAdress: false
    })
    let m = new ExchangeShop();
    m.id = this.data.id;
    m.tel = this.data.userInfo.phoneNumber;
    m.addr = this.data.userInfo.address;
    m.fetch().then(res => {
      console.log(res)
      wx.showToast({
        title: '兑换成功',
      })
      setTimeout(() => {
        // this.getUserInfo(true)
      }, 100)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})