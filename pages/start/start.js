// pages/start/start.js
import { RandomCityList } from '../../api.js';
const app = getApp()
const sheet = require('../../sheets.js');
let allCity = [];
let time = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWaiting:true,
    isRandom:true,
    destination: '',
    isArrive: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options && options.random){
      let req = new RandomCityList();
      req.fetch().then(()=>{
        allCity = req.city
      })
      this.setData({
        isRandom: true,
      })
    }
    else{
      this.setData({
        isRandom: false,
        destination: options.terminal
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
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  startTour() {
    if(this.data.isRandom){
      if(allCity.length){
        let i = 0;
        time = setInterval(() => {
          i++
          let ind = Math.floor(Math.random() * allCity.length)
          let des = allCity[ind]
          this.setData({
            destination: des,
          })
          if (i > 20) {
            clearInterval(time)
            this.setData({
              isArrive: true
            })
          }
        }, 100)
      }
      else{
        wx.showToast({
          title:'没有城市列表',
          icon:'none'
        })
      }
    }
    else{
      this.setData({
        isArrive: true
      })
    }
  },

  //带下划线的为监听组件内的事件
  _confirm() {
    wx.navigateTo({
      url: '../play/play',
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