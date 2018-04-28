// pages/integral/integral.js
import { IntegralShop, ExchangeDetail} from '../../api.js';
import { shareToIndex } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    underline:0,
    exchange:false,
    exchangeCon:'',
    confirmAdress:false,
    page:1,
    exchangeDetail:[],
    audioC:null,
    isShowIntro: false,
    replaceC:'',
    pausedA:true,
    pausedB: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  onShow:function(){
    this.data.audioA = wx.createInnerAudioContext();
    this.data.audioB = wx.createInnerAudioContext();
    this.data.audioA.src = 'https://gengxin.odao.com/update/h5/travel/integral/men.mp3'
    this.data.audioB.src = 'https://gengxin.odao.com/update/h5/travel/integral/women.mp3'

    this.getUserInfo()
  },
  onHide() {
    this.data.audioA && this.data.audioA.destroy();
    this.data.audioB && this.data.audioB.destroy();
  },
  onUnload(){
    this.data.audioA && this.data.audioA.destroy();
    this.data.audioB && this.data.audioB.destroy();
  },
  getUserInfo(){
    let m = new IntegralShop();
    m.fetch().then(res => {
      this.setData({
        integral: res.integral,
        rank: res.rank,
        shops: res.shops
      })
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
  lower(){
    if (this.data.exchangeDetail.length>0)  this.getExchangeDetail()
  },
  toPlayA() {
    if (this.data.audioB) {
      this.data.audioB.stop();
      this.data.pausedB = true
    }
    if (this.data.pausedA) {
      this.data.audioA.play()
      this.data.pausedA = false
    } else {
      this.data.audioA.pause()
      this.data.pausedA = true
    }
  },
  toPlayB(e){
    if (this.data.audioA) {
      this.data.audioA.stop();
      this.data.pausedA = true
    }
    if (this.data.pausedB) {
      this.data.audioB.play()  
      this.data.pausedB = false    
    } else {
      this.data.audioB.pause()
      this.data.pausedB = true   
    }
  },
  showDesc() {
    this.setData({
      isShowIntro: true
    })
  },
  hideDesc() {
    this.setData({
      isShowIntro: false
    })
  },
  toDetail(e){
    let data = e.currentTarget.dataset;
    if (data.remaining>0) {
      wx.navigateTo({
        url: '../exchangeDetail/exchangeDetail?id=' + data.id + '&integral=' + this.data.integral
      })
    }
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})