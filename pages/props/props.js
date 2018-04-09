const sheet = require('../../sheets.js')
import { shareToIndex } from '../../utils/util.js';
import { CitySpes, MySpes, Spe, BuySpe, SellSpe } from '../../api.js'
let type
let propId
let cid = ''
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
    mySpe: [],
    maimai: '购买',
    maxNum: 0
  },
  rentCar(e) {
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
    let dSet = e.currentTarget.dataset
    propId = dSet.propId
    this.setData({
      popCar: true,
      cfmStr: '购买',
      maxNum: -1,
      propName: this.data.speArr[dSet.idx].name,
      propDesc: this.data.speArr[dSet.idx].desc,
      goldNum: this.data.speArr[dSet.idx].price
    })
  },
  toBuy() {
    this.hideCar()
    this.toBuyNUm()
    if (type == 0) {
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
    cid = options.cid
    wx.setNavigationBarTitle({
      title: '旅行道具'
    })
    // let arr = sheet.shops.map(o => {
    //   return o
    // })
    let arr = sheet.shops
    this.setData({
      rentProp: arr
    })
    console.log(this.data.rentProp)
  },
  sell(e) {
    let dSet = e.currentTarget.dataset
    propId = this.data.mySpe[dSet.idx].propId
    this.setData({
      popBuyNum: true,
      singal: true,
      maxNum: this.data.mySpe[dSet.idx].num,
      propName: this.data.mySpe[dSet.idx].name,
      goldNum: this.data.mySpe[dSet.idx].sellPrice,
      propDesc: '花费' + this.data.mySpe[dSet.idx].price
      + '金币单价买入，卖出单价为' + this.data.mySpe[dSet.idx].sellPrice + '金币'
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
    console.log(e)
    this.hideBuyNum()
    switch (type) {
      case 1:
        //购买特产
        let req = new BuySpe()
        req.propId = propId
        req.count = e.detail.num
        req.fetch().then(() => {

        })
        break;
      case 2:
        let reqs = new SellSpe()
        reqs.propId = propId
        reqs.count = e.detail.num
        reqs.fetch().then(() => {

        })
        break;
      default:
        return
    }
  },
  clkOne() {
    type = 0
    this.setData({
      tabOne: true,
      tabTwo: false,
      tabThree: false
    })
  },
  clkTwo() {
    type = 1
    this.setData({
      tabOne: false,
      tabTwo: true,
      tabThree: false,
      maimai: '购买'
    })

    let req = new CitySpes();
    //req.cityId = cid;
    req.cityId = '1'
    req.fetch().then((res) => {
      console.log(req)
      this.setData({
        speArr: req.specialtys
      })
    })

  },
  clkThree() {
    type = 2
    this.setData({
      tabOne: false,
      tabTwo: false,
      tabThree: true,
      maimai: '售卖'
    })
    let req = new MySpes();
    req.fetch().then((res) => {
      console.log(req)
      this.setData({
        mySpe: req.specialtys,
        
      })
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this, 1)
  }
})