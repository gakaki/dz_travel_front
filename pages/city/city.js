// pages/city/city.js
const app = getApp();
const sheet = require('../../sheets.js');
import { TicketType } from '../../api.js';
let cid;//选中的城市id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDomestic:true,
    province: [],
    focus:false,
    isChoose:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let readCity = sheet.finds.map(o=>{
      let obj={}
      obj.init =  new sheet.Find(o).pword;
      obj.name = new sheet.Find(o).province;
      obj.cities = new sheet.Find(o).city;
      obj.cityid = new sheet.Find(o).cityid;
      return obj;
    })
    //过滤掉直辖市和特别行政区
    let province = readCity.filter((item)=>{
      return item.name!=item.cities
    })
    this.setData({
      province,
    })
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

  toStart() {
    if(this.data.isChoose){
      
      this.toFly(cid, this.data.isChoose, TicketType.SINGLEBUY)
    }
    else{
      wx.showToast({
        title: '请选择目的地',
        icon:'none'
      })
    }
  },

  toRandom() {
    wx.redirectTo({
      url: '../start/start?random=true&type=' + TicketType.RANDOMBUY,
    })
  },

  choose(e) {
    console.log(e.currentTarget.dataset)
    cid = e.currentTarget.dataset.id
    this.setData({
      isChoose: e.currentTarget.dataset.ind
    })
  },

  focus(e) {
    this.setData({
      focus:true,
    })
  },

  toFly(cid,terminal,ticket) {
    wx.redirectTo({
      url: '../start/start?cid=' + cid + '&terminal=' + terminal + '&type=' + ticket,
    })
  },

  _back() {
    this.setData({
      focus: false,
      isChoose:''
    })
  },

  _selected(e) {
    console.log(e.detail)
    this.toFly(e.detail.id, e.detail.select, TicketType.SINGLEBUY)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})