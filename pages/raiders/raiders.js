
// pages/raiders/raiders.js
const app = getApp();
import { shareSuc, shareTitle } from '../../utils/util.js';
import { Comment, CommentPost, PostComments, ThumbComment } from '../../api.js'
let postId, lastCmtId = 0;
const LIMIT = 5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starDft: 'https://gengxin.odao.com/update/h5/travel/raiders/star-dft.png',
    isShowPop: false,
    starWid: 130,
    starCount: 5,
    comments: [],
    tipPop: false,
    commentId: 1
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '中央大街'
    })

    postId = options.postId;
    this.freshList();
  },
  dianzan() {
    // let req = new ThumbComment();
    // req.commentId = commentId;
    // req.fetch().then(() => {
    //   //评论列表后面追加一条，并翻转顺序
    //   //let comments = this.data.comments.concat(req.comments);
    // })
  },
  hideTipPop() {
    this.setData({
      tipPop: false
    })
  },
  judge(v) {
    this.setData({
      tipPop: true,
      isShowPop: !this.data.isShowPop
    })
    // let req = new CommentPost();
    // req.postId = postId;
    // req.content = v.detail.str;
    // req.score = v.detail.star;
    // req.fetch().then(() => {
    //   //评论列表后面追加一条，并翻转顺序
    //   //let comments = this.data.comments.concat(req.comments);
    // })
  },
  isPop() {
    this.setData({
      isShowPop: !this.data.isShowPop
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

  freshList() {
    let req = new PostComments();
    req.postId = postId;
    req.lastCmtId = lastCmtId;
    req.limit = LIMIT;

    req.fetch().then(() => {
      let comments = this.data.comments.concat(req.comments);
      // this.setData({comments})
    });
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