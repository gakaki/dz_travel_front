// pages/start/start.js
const app = getApp()
let time = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWaiting:true,
    isRandom:true,
    destination: '',
    allCity: ['合肥', '安庆', '蚌埠', '亳州', '巢湖', '池州', '滁州', '阜阳', '淮北', '淮南', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城', '北京', '上海', '重庆', '天津'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options && options.random){
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
      let i = 0;
      time = setInterval(() => {
        i++
        let ind = Math.floor(Math.random() * this.data.allCity.length)
        let des = this.data.allCity[ind]
        this.setData({
          destination: des,
        })
        if (i > 20) {
          clearInterval(time)
        }
      }, 100)
    }
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