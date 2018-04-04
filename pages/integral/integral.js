// pages/integral/integral.js
import { IntegralShop, ExchangeShop, GetUserLocation, GetRealInfo, ExchangeDetail} from '../../api.js';
const app = getApp();
import { shareSuc, shareTitle } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    underline:0,
    exchange:false,
    exchangeCon:'',
    confirmAdress:false,
    cfmStr:'确定',
    page:1,
    exchangeDetail:[]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  getUserInfo(){
    let m = new IntegralShop();
    m.fetch().then(res => {
      this.setData({
        integral: res.integral,
        rank: res.rank,
        shops: res.shops
      })
      console.log(res)
    })
    this.getExchangeDetail(true)
  },
  getExchangeDetail(refresh){
    let m = new ExchangeDetail();
    m.page = refresh ? 1 : this.data.page;
    m.fetch().then(res => {
      let detail=[]
      if (refresh) {
        detail = res.exchangeDetail;
      } else {
        detail = this.data.exchangeDetail;
        detail = detail.concat(res.exchangeDetail);
      }
      this.setData({
        exchangeDetail: detail,
        page:this.data.page+1
      })
    })
  }, 

  buttonItems: function(e){
    this.setData({
      underline: e.currentTarget.dataset.items
    })
  },

  exchange(e) {
    let data = e.currentTarget.dataset;
    this.setData({
      exchange:true,
      exchangeCon:'确定消耗'+data.int+'积分兑换'+data.name,
      id: data.id
    })
  },

  confirmExc() {
    this.setData({
      confirmAdress:false
    })
    let m = new ExchangeShop();
    m.id = this.data.id;
    m.tel = this.data.userInfo.phoneNumber;
    m.addr = this.data.userInfo.address;
    console.log(this.data.userInfo.phoneNumber)
    m.fetch().then(res=>{
      console.log(res)
      wx.showToast({
        title: '兑换成功',
      })
      setTimeout(()=>{
        this.getUserInfo(true)
      },100)
    })
  },

  toSetting() {
    wx.navigateTo({
      url: '../settings/settings?settings=true',
    })
    this.setData({
      confirmAdress: false
    })
  },

  _cancel() {
    this.setData({
      exchange:false
    })
  },
  _confirm() {
    if (this.data.cfmStr == '确定') {
      let m = new GetUserLocation();
      m.fetch().then(res => {
        console.log(res)
        let m = new GetRealInfo();
        m.fetch().then(res=>{
          console.log(res)
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
        url:'../settings/settings?settings=true'
      })
    }
    
    
  },
  lower(){
    this.getExchangeDetail()
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