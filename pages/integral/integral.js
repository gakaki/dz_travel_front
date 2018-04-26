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
    replaceC:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  onShow:function(){
    this.data.audioC = wx.createInnerAudioContext();
    this.getUserInfo()
  },
  onHide() {
    this.data.audioC && this.data.audioC.destroy();
  },
  onUnload(){
    this.data.audioC && this.data.audioC.destroy();
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
 

  
  lower(){
    if (this.data.exchangeDetail.length>0)  this.getExchangeDetail()
  },
  toPlay(e){
    let audio = this.data.audioC
    if (e.currentTarget.dataset.men) {
      audio.src = 'https://gengxin.odao.com/update/h5/travel/integral/men.mp3'
    } else {
      audio.src = 'https://gengxin.odao.com/update/h5/travel/integral/women.mp3'
    }
    audio.autoplay = true
    audio.loop = false
  },
  showDesc() {
    this.setData({
      isShowIntro: true
    })
    // this.getEndtime()
  },
  hideDesc() {
    this.setData({
      isShowIntro: false
    })
  },
  // getEndtime(){
  //   let m = new ExchangeDeadline();
  //   m.fetch().then(m=>{
  //     this.setData({
  //       replaceC: m.endtime
  //     })
  //   })
  // },
  toDetail(e){
    let data = e.currentTarget.dataset;
    if (this.data.shops[data.index].remaining > 0) {
      wx.navigateTo({
        url: '../exchangeDetail/exchangeDetail?index=' + data.index + '&integral=' + this.data.integral,
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