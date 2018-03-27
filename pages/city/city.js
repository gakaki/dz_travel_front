// pages/city/city.js
const app = getApp();
const sheet = require('../../sheets.js');
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
      wx.navigateTo({
        url: '../start/start?terminal=' + this.data.isChoose,
      })
    }
    else{
      wx.showToast({
        title: '请选择目的地',
        icon:'none'
      })
    }
  },

  toRandom() {
    wx.navigateTo({
      url: '../start/start?random=true',
    })
  },

  choose(e) {
    this.setData({
      isChoose: e.currentTarget.dataset.ind
    })
  },

  focus(e) {
    this.setData({
      focus:true,
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})