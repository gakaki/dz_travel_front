import { spliceStr } from '../../utils/util.js'
import { PostList, PostType, CommentPost } from '../../api.js';
const LIMIT = 5;
const app = getApp();
import { shareSuc, shareTitle } from '../../utils/util.js';
const sheet = require('../../sheets.js');
let cid = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
  viewpoint: true,
  specialty: false,
  starWid: 240,
  starCount: 1,
  postArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.cid != 'undefined') {
      cid = options.cid
      this.pullList(PostType.JINGDIAN)
    }else {
      let cityArr = []
      sheet.citys.forEach(o=>{
        if (o.city == options.city) {
          cityArr.push(o)
        }
      })
       cid = cityArr[0].id
       this.pullList(PostType.JINGDIAN)
    }
    
    wx.setNavigationBarTitle({
      title: options.city+'攻略'
    })
   
  },
  pullList(v) {
    let req = new PostList()
    req.cityId = cid
    req.page = 1
    req.limit = LIMIT
    req.type = v
    req.fetch().then(req => {
      let arr = []
      if(v == 1) {
         arr = req.posts.map(o => {
          o.content = spliceStr(o.content, 42)
          return o
        })
      } else arr = req.posts
      
      this.setData({
        postArr: arr
      })
    })
  },
  toDetail(e) {
    wx.navigateTo({
      url: '../raiders/raiders?cityId=' + e.currentTarget.dataset.cityId + '&postId=' + e.currentTarget.dataset.postId + '&type=' + e.currentTarget.dataset.type + '&name=' + e.currentTarget.dataset.name
    })
  },
  chgTab() {
this.setData({
  viewpoint: !this.data.viewpoint,
  specialty: !this.data.specialty
})
if(!this.data.specialty) {
  this.pullList(PostType.JINGDIAN)
}
else {
  this.pullList(PostType.TECHAN)
}
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