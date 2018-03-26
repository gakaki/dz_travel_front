const sheet = require('../../sheets.js')
import { RentProp, SpeList, BuySpe, SellSpe } from '../../api.js'
let type
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabOne: true,
    tabTwo: false,
    tabThree: false,
    myGold: 77,
    popCar: false,
    popBuyNum: false,
    singal: false,
    rentProp: [],
    cfmStr: '',
    goldNum: 0,
    propDesc: '',
    picUrl: '',
    propName: '购买',
    propId: 0,
    speArr: [],
  },
  rentCar(e) {
    this.type = e.currentTarget.dataset.type
    let str
    let obj = sheet.Shop.Get(e.currentTarget.dataset.id)
    if (obj.type == 1) {
      str = '租用'
    } else if (obj.type == 0) {
      str = '购买'
    }
    this.setData({
      propId: e.currentTarget.dataset.id,
      popCar: true,
      cfmStr: str,
      goldNum: obj.price,
      propDesc: obj.rechargedescription,
      // picUrl: obj.image,
      propName: obj.propsname
    })
  },
  buySpe(e) {
    this.type = e.currentTarget.dataset.type
    this.setData({
      popCar: true,
      cfmStr: '购买'

    })
  },
  toBuy() {
    console.log(this.type)
    this.hideCar()
    this.toBuyNUm()
    if (this.type == 0) {
      // let req = new RentProp();
      // req.rentId = this.data.propId;
      // req.fetch().then(() => {

      // })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arr = sheet.shops.map(o => {
      return o
    })
    this.setData({
      rentProp: arr
    })
    console.log(this.data.rentProp)
  },
  sell(e) {
    this.type = e.currentTarget.dataset.type
    this.setData({
      popBuyNum: true,
      singal: true
    })
  },


  hideCar() {
    this.setData({
      popCar: false
    })
  },
  hideBuyNum() {
    this.setData({
      popBuyNum: false
    })
  },
  buyNum() {
    this.setData({
      popBuyNum: true
    })
  },
  toBuyNUm() {
    this.hideCar()
    this.buyNum()
  },
  buyCount(e) {
    this.hideBuyNum()
    switch (this.type) {
      case 1:
        //购买特产
        // let req = new BuySpe()
        // req.propId = 0
        // req.count = 1
        // req.fetch().then(() => {

        // })
        brek;
      case 2:
        let req = new SellSpe()
        req.propId = 0
        req.count = 1
        req.fetch().then(() => {
        })
        break;
      default:
        return
    }
  },
  clkOne() {
    this.setData({
      tabOne: true,
      tabTwo: false,
      tabThree: false
    })
  },
  clkTwo() {
    this.setData({
      tabOne: false,
      tabTwo: true,
      tabThree: false
    })

    let req = new SpeList();
    req.cityId = 0;
    req.fetch().then(() => {
      this.setData({
        speArr: req.specialtys
      })
    })

  },
  clkThree() {
    this.setData({
      tabOne: false,
      tabTwo: false,
      tabThree: true
    })
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