// pages/index/index.js

import { start, ymd } from '../../utils/rest.js';
import { SignInfo, Base, IndexInfo, GetMessage, Ws, LookTicket, Season, TicketType, CheckMsgCnt } from '../../api.js';
const sheet = require('../../sheets.js');
const app = getApp();
//机票类型和城市id
let tktType , cid , terminal;
let enterOnload = true //判断是否进入onload生命周期函数中
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapConWd: 710,
    mapConHt: 730,
    lightProvinces: ['上海', '海南', '北京', '河南', '天津','四川'],//test
    lightCitys: ['上海', '海口', '北京', '郑州', '天津','成都'],//test
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isFirst: false,
    season:'SPRING',
    weather:'sun',
    playerCnt:2000,
    messages:0,
    gold:0,
    nickName:'',
    avatar:'',
    date:'',
    hasSign:1,
    location:'',
    presentTkt:[],
    chooseInd: 0,
    showTicket:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    enterOnload = true;
    start(ok=> {
      ok && this.gotUserInfo();
    })
    // var stage = new createjs.Stage('myCanvas');
    // var shape = new createjs.Shape();
    // shape.graphics.beginFill('red').drawRect(0, 0, 120, 120);
    // stage.addChild(shape);
    // stage.update();

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    //   console.log(app.globalData.userInfo)
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }

    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

  },
  toPlay() {
    //需要判断是否在游玩
    wx.navigateTo({
      url: '../play/play'
      // url: '../cityRaiders/cityRaiders'
    })
  },
  gotUserInfo() {
    //start的回调里，一般情况下已经走完了登录流程，且将userInfo放到了globalData上，除非用户拒绝授权给我们
    let userInfo = app.globalData.userInfo;
    if (userInfo){
      console.log(userInfo,'userInfo')
      let m = new SignInfo()
      m.fetch().then(res => {
        console.log(res, '签到数据')
        this.setData({
          theDay: res.theDay,
          hasSign: res.hasSign
        })
      })
    
      this.getIndexInfo(userInfo) 
    }
    else {
      console.log('用户拒绝授权个人信息！！')
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
    //因为当用户切换tabbar上的页面和返回到此页面时不会进入onload，故需在此处进行api调用已更新数据
    if(!enterOnload){
      console.log('没有进入onload')
      this.getIndexInfo(app.globalData.userInfo)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    enterOnload = false
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    enterOnload = false
  },

  getIndexInfo(userInfo) {
    //请求主页数据
    let req = new IndexInfo();
    req.fetch().then(req => {
      console.log(req, '首页数据')
      let season = Season[req.season]
      let weather = sheet.Weather.Get(req.weather).icon
      app.globalData.season = season
      app.globalData.weather = weather
      app.globalData.gold = req.gold
      this.setData({
        isFirst: req.isFirst,
        season,
        weather,
        gold: req.gold,
        playerCnt: req.playerCnt,
        nickName: userInfo.nickName,
        avatar: userInfo.avatarUrl,
        location: req.location,
        date: ymd('cn')
      })
    })

    //查看是否有未读消息
    let msgCnt = new CheckMsgCnt()
    msgCnt.fetch().then((req)=>{
      console.log(req,'消息条数')
      this.setData({
        messages: req.unreadMsgCnt
      })
    })
  },

  /**
   * 点击事件
   */
  toFly() {
    //查询用户是否有赠送的机票
    let req = new LookTicket()
    req.fetch().then(()=>{
      console.log(req.ticket,'机票')
      if(req.ticket.length){
        let presentTkt = []
        req.ticket.forEach((item,index)=>{
          let obj = {};
          console.log(item)
          obj.province = sheet.City.Get(item.cid).province;
          obj.city = sheet.City.Get(item.cid).city;
          obj.tkt = item.type==1 ? '单人机票' : '双人机票';
          obj.type = item.type;
          obj.cid = item.cid
          presentTkt[index] = obj
        })
        this.initTer(presentTkt[0])
        this.setData({
          presentTkt,
          showTicket:true
        })
      }
      else{
        wx.navigateTo({
          url: '../city/city?location=' + this.data.location,
        })
      }
    })
    this.setData({
      isFirst: false
    })
    
  },

  buyTkt() {
    this.setData({
      showTicket:false
    })
    wx.navigateTo({
      url: '../city/city?location=' + this.data.location,
    })
  },

  useTkt() {
    console.log(cid)
    this.setData({
      showTicket: false
    })
    wx.navigateTo({
      url: '../start/start?cid=' + cid + '&terminal=' + terminal + '&type=' + tktType,
    })
  },

  toMessage() {
    wx.navigateTo({
      url: '../message/message',
    })
  },

  chooseTicket(e) {
    let data = e.currentTarget.dataset
    this.initTer(data)
    this.setData({
      chooseInd: data.ind
    })
  },

  //如果有赠送的机票，初始化需要传递的信息
  initTer(data) {
    console.log(data)
    if (data.type == 1) {
      tktType = TicketType.SINGLEPRESENT
    }
    else if (data.type == 2) {
      tktType = TicketType.DOUBLEPRESENT
    }
    cid = data.cid
    terminal = data.city
  },
  toIntegralShop(){
    wx.navigateTo({
      url: '../integral/integral',
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