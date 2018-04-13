const sheet = require('../../sheets.js')
import { shareToIndex, redGold, addGold } from '../../utils/util.js';
import { CitySpes, MySpes, Spe, BuySpe, SellSpe, RentProp, RentedProp } from '../../api.js'
let type = 0;
let propId
let cid = ''
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goldBuzu: false,
    tabOne: true,
    tabTwo: false,
    tabThree: false,
    myGold: 0,
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
    maxNum: 0,
    xg: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkRentStatus()
    cid = options.cid
    wx.setNavigationBarTitle({
      title: '旅行道具'
    })
    // let arr = sheet.shops.map(o => {
    //   return o
    // })
    let arr = sheet.shops
    this.setData({
      rentProp: arr,
      myGold: app.globalData.gold
    })
    console.log(this.data.rentProp)
  },
  hidePop() {
    this.setData({
      goldBuzu: false
    })
  },
  toShop() {
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  },
  rentCar(e) {
    let str
    let obj = sheet.Shop.Get(e.currentTarget.dataset.id);
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
    console.log(this.data.propId)
  },
  buySpe(e) {
    let dSet = e.currentTarget.dataset
    console.log(dSet)
    propId = dSet.propId
    this.setData({
      type: 'buy',
      popBuyNum: true,
      // maxNum: dSet.xg,
      maxNum: 2,
      propName: this.data.speArr[dSet.idx].name,
      propDesc: this.data.speArr[dSet.idx].desc,
      goldNum: this.data.speArr[dSet.idx].price,
    })
  },
  sell(e) {
    let dSet = e.currentTarget.dataset
    propId = this.data.mySpe[dSet.idx].propId
    this.setData({
      type:'sell',
      popBuyNum: true,
      maxNum: this.data.mySpe[dSet.idx].num,
      propName: this.data.mySpe[dSet.idx].name,
      goldNum: this.data.mySpe[dSet.idx].sellPrice,
      propDesc: '花费' + this.data.mySpe[dSet.idx].price
      + '金币单价买入，卖出单价为' + this.data.mySpe[dSet.idx].sellPrice + '金币'
    })
  },
  toBuy() {
    this.hideCar()
    if (!this.checkGold()) { return }
    let m = new RentProp();
    m.rentId = this.data.propId;
    m.fetch().then(() => {
      this.checkRentStatus();
      let v = this.data.rentProp[this.data.propId - 1].price;
      redGold(v)
      this.setData({
        myGold: app.globalData.gold
      })
    })
    
  },
  checkRentStatus(){
    let m = new RentedProp();
    m.fetch().then(m=>{
      this.setData({
        daoju:m.rentItems
      })
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
  checkGold(num){
    let v = num ? this.data.goldNum * num > app.globalData.gold : this.data.goldNum > app.globalData.gold
    if (v) {
      this.setData({
        goldBuzu: true
      })
      return false
    }
    return true
  },
  buyCount(e) {
    this.hideBuyNum()
    switch (type) {
      case 1:
        if (!this.checkGold(e.detail.num)) { return }
        //购买特产
        let req = new BuySpe()
        req.propId = propId
        req.count = e.detail.num
        req.fetch().then(() => {
          console.log(req)
          let num = this.data.goldNum * e.detail.num
          redGold(num)
          this.setData({
            myGold: app.globalData.gold
          })
        })
        break;
      case 2:
        let reqs = new SellSpe()
        reqs.propId = propId
        reqs.count = e.detail.num
        reqs.fetch().then(() => {
          let num = this.data.goldNum * e.detail.num
          addGold(num)
          this.setData({
            myGold: app.globalData.gold
          })
          this.clkThree()
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
      // maimai: '购买'
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