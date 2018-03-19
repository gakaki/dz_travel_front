// pages/city/city.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDomestic:true,
    province: [{ init: 'A', name: '安徽', cities: ['合肥', '安庆', '蚌埠', '亳州', '巢湖', '池州', '滁州', '阜阳', '淮北', '淮南', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城'] }, { init: 'F', name: '福建', cities: ['合肥', '安庆', '蚌埠', '亳州', '巢湖', '池州', '滁州', '阜阳', '淮北', '淮南', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城'] }, { init: 'F', name: '福建', cities: ['合肥', '安庆', '蚌埠', '亳州', '巢湖', '池州', '滁州', '阜阳', '淮北', '淮南', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城'] }, { init: 'G', name: '广东', cities: ['合肥', '安庆', '蚌埠', '亳州', '巢湖', '池州', '滁州', '阜阳', '淮北', '淮南', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城'] }],
    focus:false,
    isChoose:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    wx.navigateTo({
      url: '../start/start?terminal=' + this.data.isChoose,
    })
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
    console.log(e.detail.select)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})