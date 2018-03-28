// pages/index/index.js

import { start } from '../../utils/rest.js';
import { IndexInfo, HasMessage, MessageNum, Ws, LookTicket } from '../../api.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isFirst: true,
    season:{},
    weather:{},
    playerCnt:2000,
    messages:99
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  gotUserInfo() {
    //start的回调里，一般情况下已经走完了登录流程，且将userInfo放到了globalData上，除非用户拒绝授权给我们
    let userInfo = app.globalData.userInfo;
    if (userInfo){
      this.setData({userInfo});
    
      //请求主页数据
      let req = new IndexInfo();
      req.fetch().then(req => {
        // console.log(req,'首页数据')
        this.setData({
          isFirst: req.isFirst,
          season: req.season,
          weather: req.weather,
          playerCnt: req.playerCnt
        })
      })

      //websocket请求消息信息
      // let message = new HasMessage()
      // Ws.send(message)

      // Ws.listen(MessageNum,req=>{
      //   console.log(req,'消息条数')
      //   this.setData({
      //     messages: req.number
      //   })
      // })      
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
    // if (app.globalData.userInfo){
    //   Ws.listen(MessageNum, req => {
    //     console.log(req, '消息条数')
    //     this.setData({
    //       messages:req.number
    //     })
    //   })
    // }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //取消监听ws
    console.log('hide')
    Ws.unlisten(MessageNum)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //取消监听ws
    Ws.unlisten(MessageNum)
  },

  /**
   * 点击事件
   */
  toFly() {
    //查询用户是否有赠送的机票
    let req = new LookTicket()
    req.fetch().then(()=>{

    })
    this.setData({
      isFirst: false
    })
    wx.navigateTo({
      url: '../city/city',
    })
  },

  toMessage() {
    wx.navigateTo({
      url: '../message/message',
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