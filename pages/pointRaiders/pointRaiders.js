import { spliceStr } from '../../utils/util.js'
import { PostList } from '../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  viewpoint: true,
  specialty: false,
  starWid: 240,
  starCount: 1,
  testStr: '阿桑的歌士大夫敢死队风格山东分公司的说法士大夫士大夫敢死队风格但是阿桑的歌士大夫敢死队风格山东分公司的说法士大夫士大夫敢死队风格但是阿桑的歌士大夫敢死队风格山东分公司的说法士大夫士大夫敢死队风格但是',
  posts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '成都攻略'
    })
   this.setData({
     testStr:spliceStr(this.data.testStr,42)
   })
   let req = new PostList()
   req.fetch().then(req => {
     this.setData({
       posts: req.posts
     })
   })
  },
  toDetail() {
    wx.navigateTo({
      url: '../raiders/raiders'
    })
  },
  chgTab() {
this.setData({
  viewpoint: !this.data.viewpoint,
  specialty: !this.data.specialty
})
  },
  //超出字数部分用...代替
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