// pages/exchangeDetail/exchangeDetail.js
import { IntegralShop, GetUserLocation, GetRealInfo, ExchangeShop } from '../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cfmStr: '确定',
    exchange:false,
    confirmAdress:false,
    shop:null,
    introduce: [`兑换详情
    这是一个可爱的照相机各种简介，
    等等等等`,
    `注意事项
    这是一个可爱的照相机各种简介，等等等等`]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let m = new IntegralShop();
    m.fetch().then(res => {
      let arr = res.shops[options.index].introduce.map(v=>{
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
        shop: res.shops[options.index],
        intro:arr
      })
      
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
      } else {
        wx.navigateTo({
          url: '../settings/settings?settings=true'
        })
        this.setData({
          exchange: false,
          cfmStr: '确定'
        })
      }
    } else {
      this.confirmExc()
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
      console.log(res)
      wx.showToast({
        title: '兑换成功',
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})