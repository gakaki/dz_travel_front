// pages/integral/integral.js
import { IntegralShop, ExchangeShop, GetUserLocation, GetRealInfo} from '../../api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getRewardInfo: [{ avatar: "", name: "胖迪", goods: "冰淇凌" }, 
    { avatar: "", name: "胖迪1", goods: "冰淇凌1" },
    { avatar: "", name: "胖迪2", goods: "冰淇凌2" },
    { avatar: "", name: "胖迪3", goods: "冰淇凌3" },
    { avatar: "", name: "胖迪4", goods: "冰淇凌4" }],
    goodsInfo: [{ img: "", goodsName: "冰淇凌1", integral:"3000"},
      { img: "", goodsName: "冰淇凌2", integral: "4000" },
      { img: "", goodsName: "冰淇凌3", integral: "5000" }],
    underline:0,
    exchange:false,
    exchangeCon:'',
    confirmAdress:false,
    cfmStr:'确定'
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
    console.log('确定')
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let m = new IntegralShop();
    m.fetch().then(res=>{
      this.setData({
        integral: res.integral,
        rank: res.rank,
        shops: res.shops
      })
      console.log(this.data.shops)
    })
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