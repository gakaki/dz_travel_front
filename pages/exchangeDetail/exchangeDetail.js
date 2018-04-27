// pages/exchangeDetail/exchangeDetail.js
import { ShopDetail, GetUserLocation, GetRealInfo, ExchangeShop } from '../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cfmStr: '确定',
    exchange:false,
    confirmAdress:false,
    shop:null,
    exchangeCode:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let m = new ShopDetail();
    m.id = options.id
    m.fetch().then(res => {
      let arr = res.shop.introduce.map(v=>{
        return v.split("\\n")
      })
      arr = arr.map(v=>{
        v = v.filter(item=>{
          return item.trim().length!=0
        })
        return v
      })
      this.setData({
        integral: options.integral,
        shop: res.shop,
        exchangeCode: res.shop.exchangeCode ? res.shop.exchangeCode:"",
        intro:arr
      })
      
    })
  },
  toCopy(){
    wx.setClipboardData({
      data: this.data.exchangeCode,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },
  _cancel() {
    this.setData({
      exchange: false
    })
  },
  _confirm() {
    if (this.data.shop.type == 1) {
      if (this.data.cfmStr == '确定') {
        let m = new GetUserLocation();
        m.fetch().then(res => {
          let m = new GetRealInfo();
          m.fetch().then(res => {
            this.setData({
              exchange: false,
              confirmAdress: true,
              userInfo: res.realInfo
            })
          })

        }).catch(res => {
          if (res == -174) {
            this.setData({
              exchangeCon: '您尚未设置个人信息',
              cfmStr: '前往设置'
            })
          }
        })
      }
      else if (this.data.cfmStr == '兑换'){

      }
       else {
        wx.navigateTo({
          url: '../settings/settings?settings=true'
        })
        this.setData({
          exchange: false,
          cfmStr: '确定'
        })
      }
    } else {
      if (this.data.cfmStr== '复制兑换码') {
        this.toCopy()
        this.setData({
          exchange:false
        })
      } else {
        this.confirmExc()
      }
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
      confirmAdress: false,
      exchange: false
    })
    let m = new ExchangeShop();
    m.id = this.data.id;
    if(this.data.shop.type == 1) {
      m.tel = this.data.userInfo.phoneNumber;
      m.addr = this.data.userInfo.address;
    }
    m.fetch().then(res => {
      if (res.exchangeCode ) {
        if (res.exchangeCode == 1) {
          this.setData({
            exchangeCode: res.exchangeCode ? res.exchangeCode : "",
          })
        } else {
          this.setData({
            exchange: true,
            exchangeCon: res.exchangeCode,
            exchangeCode: res.exchangeCode ? res.exchangeCode : "",
            cfmStr: '复制兑换码'
          })
        }
      } else {
        wx.showToast({
          title: '兑换成功',
        })
      }
     
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})