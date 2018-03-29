// pages/xiangce/xiangce.js
let data = [{
  city:'哈尔滨',
  collectPostcardNum:10,
  allPostcardNum:5,
  postcardsDetail:[
    {
      id:1,
      url:'',
      lastestLiveMessage:'我大姐按实际开发阿康师傅安居客是否安居客按时是是'
    },
    {
      id: 1,
      url: ''
    }]},
  {
    city: '哈尔滨',
    collectPostcardNum: 10,
    allPostcardNum: 5,
    postcardsDetail: [
      {
        id: 1,
        url: '',
        lastestLiveMessage: '我大姐按实际开发阿康师傅安居客是否安居客按时是是'
      },
      {
        id: 1,
        url: '',
        lastestLiveMessage: '我大姐按实际开发阿康师傅安居客是否安居客按时是是'
        }]
      },
      {
        city: '哈尔滨',
        collectPostcardNum: 10,
        allPostcardNum: 5,
        postcardsDetail: [
          {
            id: 1,
            url: '',
            lastestLiveMessage: '我大姐按实际开发阿康师傅安居客是否安居客按时是是'
          },
          {
            id: 1,
            url: '',
            lastestLiveMessage: '我大姐按实际开发阿康师傅安居客是否安居客按时是是'
          }]
      }
    ];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewpoint: true,
    specialty: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.province
    })
    // this.setData({
    //   init:data
    // })
  },
  toMsgPost() {
wx.navigateTo({
  url: '../checkPostcard/checkPostcard',
})
  },
  chgTab(e) {
    let v = e.currentTarget.dataset.id;
    if(v) {
      this.setData({
        viewpoint: false,
        specialty: true
      })
    } else {
      this.setData({
        viewpoint: true,
        specialty: false
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