// pages/integral/integral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getRewardInfo: [{ avatar: "", name: "胖迪", goods: "冰淇凌" }, 
    { avatar: "", name: "胖迪1", goods: "冰淇凌1" },
    { avatar: "", name: "胖迪2", goods: "冰淇凌2" },
    { avatar: "", name: "胖迪3", goods: "冰淇凌3" },
    { avatar: "", name: "胖迪4", goods: "冰淇凌4" }],

    goodsInfo: [{ img: "", goodsName: "冰淇凌1", integral:"3000"},
      { img: "", goodsName: "冰淇凌2", integral: "4000" },
      { img: "", goodsName: "冰淇凌3", integral: "5000" }],




    underline:0
  },

  buttonItems: function(e){
    console.log(e),
    this.setData({
      underline: e.currentTarget.dataset.items
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})