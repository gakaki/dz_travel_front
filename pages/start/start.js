// pages/start/start.js
import { FlyInfo, StartGame, TicketType, Season, Code } from '../../api.js';
import { ymd } from '../../utils/rest.js';
const sheet = require('../../sheets.js');
let allCity = [];
let ticketType; //机票类型
let cid , tid; //城市id和赠送的机票id
let locationCid;   //当前所在城市cid
let time = null , preventFastClick = false;
let onlySingle = false , onlyDouble = false;
const app = getApp();
import { shareSuc, shareTitle } from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapConWd: 710,
    mapConHt: 600,
    onlySingle: false,    //是否是赠送的单人票  
    onlyDouble: false,    //是否是赠送的双人票
    isWaiting:true,       //是否在等待好友接收邀请
    isRandom:true,        //是否是随机机票
    destination: '',
    isArrive: false,      //是否到达目的地
    partnerName: '',
    avatarSrc: '',
    isDouble: false,        //是否邀请两个人一起飞
    isSingleFirst: false,   //是否第一次单人起飞
    isDoubleFirst: false,   //是否第一次双人起飞
    date: '',      //当前日期
    flyInfo:{weather:'sun'},      //页面相关信息,默认给weather：sun，避免渲染层报错
    showHelp:false,
    
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'起飞界面options')
    if(options.type == TicketType.SINGLEPRESENT){
      onlySingle = true
    }
    else if (options.type == TicketType.DOUBLEPRESENT){
      onlyDouble = true
    }

    if(options && options.tid){
      tid = options.tid
    }
    //从全局变量中把用户信息拿过来
    let userInfo = app.globalData.userInfo

    //获取页面信息
    let info = new FlyInfo();
    info.type = options.type
    info.fetch().then((req)=>{
      locationCid = req.location
      //以下数据不进行渲染（仅在调api时发送）
      ticketType = options.type;
      //不是随机机票就从options中获取cid
      if(req.cid){
        cid = req.cid;
      }
      else{
        cid = options.cid
      }
      
      console.log(req,'起飞界面数据',onlySingle)
      let flyInfo = {};
      flyInfo.cost = req.cost;
      flyInfo.doubleCost = req.doubleCost;
      flyInfo.gold = req.gold;
      flyInfo.holiday = req.holiday;
      flyInfo.location = req.location ? sheet.City.Get(req.location).city : '';
      flyInfo.season = Season[req.season];
      flyInfo.weather = sheet.Weather.Get(req.weather).icon;
      this.setData({
        flyInfo,
        date: ymd('cn'),
        isSingleFirst: req.isSingleFirst,
        isDoubleFirst: req.isDoubleFirst,
        avatarSrc: userInfo.avatarUrl,
        onlySingle,
        onlyDouble,
        players: [{ location: locationCid, img: userInfo.avatarUrl}]
      })
    })

    //是否是随机机票
    if(options && options.random){
      //随机机票把全部城市取出来进行随机操作
      let city = sheet.finds.map(o => {
        return new sheet.Find(o).city;
      })
      city.forEach((item) => {
        allCity.push.apply(allCity, item);
      })
      this.setData({
        isRandom: true,
      })
    }
    else{
      this.setData({
        isRandom: false,
        destination: options.terminal,
      })
    }
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
    onlyDouble = false
    onlySingle = false
    clearInterval(time)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    onlyDouble = false
    onlySingle = false
    preventFastClick = false
    clearInterval(time)
  },

  startTour() {
    console.log(cid, this.data.flyInfo.cost)
    if (preventFastClick) return;
    preventFastClick = true;
    let start = new StartGame();
    start.cid = cid;
    //判断是不是双人起飞
    if (this.data.partnerName) {
      //有没有免费的
      if(this.data.isDoubleFirst){
        start.cost = 0;
        start.type = TicketType.DOUBLEBUY;
      }
      //是不是赠送的双人机票
      else if (onlyDouble && !this.data.isDoubleFirst){
        start.cost = 0;
        start.type = TicketType.DOUBLEPRESENT;
        start.tid = tid;
      }
      else{
        start.cost = this.data.flyInfo.doubleCost;
        start.type = TicketType.DOUBLEBUY;
      }
      start.partnerUid = 1
    }
    else{
      //有没有免费的
      if (this.data.isSingleFirst){
        start.cost = 0;
        start.type = TicketType.SINGLEBUY;
      }
      //是不是随机
      else if (this.data.isRandom && !this.data.isSingleFirst){
        start.cost = this.data.flyInfo.cost;
        start.type = TicketType.RANDOMBUY;
      }
      //是不是使用赠送的
      else if (onlySingle && !this.data.isSingleFirst){
        start.cost = 0;
        start.type = TicketType.SINGLEPRESENT;
        start.tid = tid;
      }
      else{
        start.cost = this.data.flyInfo.cost;
        start.type = TicketType.SINGLEBUY;
      }
    }
    start.fetch().then((req) => {
      this.readyFly()
    }).catch((req) => {
      switch(req){
        case Code.NEED_ITEMS:
          this.tip('金币或道具不足');
          break;
        case Code.USER_NOT_FOUND:
          this.tip('获取用户信息失败');
          break;
        case Code.PARAMETER_NOT_MATCH:
          this.tip('非法传参，请检查参数');
          break;
        case Code.NOT_FOUND:
          this.tip('道具不存在或已使用');
        case Code.REQUIREMENT_FAILED:
          this.tip('已在当前城市，请重新选择城市进行游玩');
        default:
          this.tip('未知错误');
      }
      preventFastClick = false;
    })
    
  },

  readyFly() {
    if (this.data.isRandom) {
      if (allCity.length) {
        let i = 0;
        time = setInterval(() => {
          i++
          let ind = Math.floor(Math.random() * allCity.length)
          let des = allCity[ind]
          this.setData({
            destination: des,
          })
          if (i > 20) {
            let destination = sheet.City.Get(cid).city;
            clearInterval(time)
            this.setData({
              destination
            })
            this.planeFly(locationCid ? locationCid : 1,cid)
          }
        }, 100)
      }
      else {
        this.tip('没有城市列表')
      }
    }
    else {
      this.planeFly(locationCid ? locationCid : 1, cid)
    }
  },

  planeFly(from,to) {
    let airlines = [
      { from, to },
      // {from:205, to:3}
    ]
    this.setData({
      airlines,
    })
  },

  onArrived() {
    console.log('plane arrived')
    this.setData({
      isArrive: true
    })
    preventFastClick = false;
  },

  tip(tip) {
    wx.showToast({
      title: tip,
      icon: 'none'
    })
  },

  double() {
    this.setData({
      isDouble:true
    })
  },

  showHelp() {
    this.setData({
      showHelp: true
    })
  },

  //带下划线的为监听组件内的事件
  _confirm() {
    wx.redirectTo({
      url: '../play/play?cid=' + locationCid,
    })
  },

  _helpCfr() {
    this.setData({
      showHelp: false
    })
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