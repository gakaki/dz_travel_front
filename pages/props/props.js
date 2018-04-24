const sheet = require('../../sheets.js')
import { shareToIndex, redGold, addGold } from '../../utils/util.js';
import { CitySpes, MySpes, Spe, BuySpe, SellSpe, RentProp, RentedProp, BuyPostcard, BuyPostcardList } from '../../api.js'
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
    tabFour: false,
    myGold: 0,
    popCar: false,
    popBuyNum: false,
    singal: false,
    rentProp: [],
    cfmStr: '租用',
    goldNum: 0,
    propDesc: '',
    picUrl: '',
    propName: '购买',
    propId: 0,
    speArr: [],
    mySpe: [],
    maimai: '购买',
    maxNum: 0,
    xg: -1,
    overxg:false,
    forceBuy:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options',options)
    if (!options.cid) {
      cid = app.globalData.cid
      this.setData({
        city: app.globalData.cityName
      })
    } else {
      cid = options.cid
      this.setData({
        city: options.city
      })
    }
    
    this.checkRentStatus()
    wx.setNavigationBarTitle({
      title: '旅行道具'
    })
    let arr = sheet.shops
    this.setData({
      rentProp: arr,
      myGold: app.globalData.gold
    })
  },
  onShow(){
    this.hidePop()
    this.setData({
      myGold: app.globalData.gold
    })
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
    console.log('obj==========>',obj)
    if(obj.type == 3) {
      str = '购买'
    } else {
      str = '租用'
    }
    let picUrl = `https://gengxin.odao.com/update/h5/travel/props/${obj.image}`
    this.setData({
      propId: e.currentTarget.dataset.id,
      popCar: true,
      cfmStr: str,
      goldNum: obj.price,
      propDesc: obj.rechargedescription,
      picUrl: picUrl,
      propName: obj.propsname
    })
  },
  buyPostcard(e){
    let dSet = e.currentTarget.dataset;
    let picUrl = `https://gengxin.odao.com/update/h5/travel/${dSet.picture}`
    this.setData({
      propId: dSet.ptid,
      popCar:true,
      cfmStr: '购买',
      goldNum: dSet.price,
      propDesc: null,
      picUrl: picUrl,
      propName: this.data.city
    })
   
  },
  buySpe(e) {
    let dSet = e.currentTarget.dataset
    propId = dSet.propId
    let maxNum = -1;
    if(dSet.xg == -1) {
      maxNum = this.data.restNum ? this.data.restNum:1
      this.setData({
        overxg: false
      })
    } else {
      if (this.data.restNum > dSet.xg) {
        maxNum = dSet.xg
        this.setData({
          overxg:true
        })
      } else {
        maxNum = this.data.restNum ? this.data.restNum : 1
        this.setData({
          overxg: false
        })
      }
    }
    let item = this.data.speArr[dSet.idx];
    let picUrl = `https://gengxin.odao.com/update/h5/travel/${item.img}`
    this.setData({
      type: 'buy',
      popBuyNum: true,
      maxNum: maxNum,
      propName: item.name,
      propDesc: item.desc,
      goldNum: item.price,
      picUrl: picUrl,
      xg: dSet.xg
    })
  },
  sell(e) {
    let dSet = e.currentTarget.dataset;
    let spec = this.data.mySpe[dSet.idx]
    propId = spec.propId
    let picUrl = `https://gengxin.odao.com/update/h5/travel/${spec.img}`
    this.setData({
      type:'sell',
      popBuyNum: true,
      maxNum: spec.num,
      propName: spec.name,
      goldNum: spec.sellPrice,
      propDesc: '花费' + spec.price
      + '金币单价买入，卖出单价为' + spec.sellPrice + '金币',
      picUrl: picUrl
    })
  },
  toBuy(e,forceBuy) {
    console.log('forceBuy', forceBuy)
    this.hideCar()
    if (!this.checkGold()) { return }
    if(type == 0) {
      let m = new RentProp();
      console.log('propIdddddd', this.data.propId)
      m.rentId = this.data.propId;
      if (forceBuy) {
        m.forceBuy = forceBuy
      }
      m.fetch().then(() => {
        console.log('m=========>',m)
        this.checkRentStatus();
        let v = this.data.rentProp[this.data.propId - 1].price;
        redGold(v)
        this.setData({
          myGold: app.globalData.gold
        })
        app.globalData.hasCar = true
      }).catch(()=>{
        this.setData({
          forceBuy:true
        })
      })
    } else if(type == 3) {
       let m = new BuyPostcard();
       m.ptid = this.data.propId;
        m.fetch().then(res=>{
          app.globalData.gold = res.goldNum
          this.setData({
            myGold: res.goldNum
          })
          wx.showToast({
            title: '购买成功',
            icon:'none',
            duration:1000
          })
        })
    }
    
    
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
      popCar: false,
      forceBuy: false
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
          let num = this.data.goldNum * e.detail.num
          redGold(num)
          this.setData({
            myGold: app.globalData.gold
          })
          this.clkTwo()
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
    }
  },
  clkOne() {
    type = 0
    this.setData({
      tabOne: true,
      tabTwo: false,
      tabThree: false,
      tabFour: false,
    })
  },
  clkTwo() {
    type = 1
    this.setData({
      tabOne: false,
      tabTwo: true,
      tabThree: false,
      tabFour: false,
      // maimai: '购买'
    })

    let req = new CitySpes();
    req.cityId = cid;
    req.fetch().then((res) => {
      this.setData({
        speArr: req.specialtys,
        restNum: req.restNum
      })
    })

  },
  clkThree() {
    type = 2
    this.setData({
      tabOne: false,
      tabTwo: false,
      tabThree: true,
      tabFour: false,
      maimai: '售卖'
    })
    let req = new MySpes();
    req.fetch().then((res) => {
      this.setData({
        mySpe: req.specialtys,
      })
    })

  },
  clkFour() {
    type = 3
    this.setData({
      tabOne: false,
      tabTwo: false,
      tabThree: false,
      tabFour: true,
      maimai: '售卖'
    })

    let req = new BuyPostcardList();
    req.cid = cid
    req.fetch().then((res) => {
      this.setData({
        speArr: req.ptList
      })
    })
  },
  forceBuy(e){
    this.toBuy(e,1);
    this.setData({
      forceBuy:false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})