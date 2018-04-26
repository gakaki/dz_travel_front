
// pages/raiders/raiders.js
import { shareToIndex } from '../../utils/util.js';
import { Comment, CommentPost, PostComments, ThumbComment } from '../../api.js'
let postId
let lastCmtId = 0
let cityId = ''
let types
let name
const LIMIT = 5;
let num = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starDft: 'https://gengxin.odao.com/update/h5/travel/raiders/star-dft.png',
    isShowPop: false,
    starWid: 114,
    starCount: 5,
    comments: [],  //评论列表
    tipPop: false,
    commentId: 1,
    content: '',
    img: '',
    commentLen : 0,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    postId = options.postId
    cityId = options.cityId
    types = options.type
    name = options.name
    wx.setNavigationBarTitle({
      title: name
    })
    this.freshList(num)
  },
  onUnload() {
    num = 1
  },
  addPage() {
    this.freshList(++num)
  },
  dianzan(e) {
    console.log(e.currentTarget.dataset)
    let obj = e.currentTarget.dataset
    let req = new ThumbComment();
    req.commentId = obj.id;
    req.fetch().then(() => {

      //评论列表后面追加一条，并翻转顺序
      //let comments = this.data.comments.concat(req.comments);
      let newCmts = this.data.comments
      newCmts.map(o => {
        if (o.commentId == obj.id) {
          o.thumbs = o.thumbs + 1
        }
        return o
      })
      this.setData({
        comments: newCmts
      })
    },()=>{
      // if(req.code == -521) {
      //   wx.showToast({
      //     title: '你已经点赞过了哦',
      //     icon: 'none',
      //     mask: true
      //   })
      // }
    })
  },
  hideTipPop() {
    this.setData({
      tipPop: false
    })
  },
  judge(v) {
    console.log(v)
    if (!this.data.commentLen) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      })
      return
    }
    if (!v.detail.star) {
      wx.showToast({
        title: '打个分吧',
        icon: 'none'
      })
      return
    }
    let that = this
    console.log(v)
    this.setData({
      tipPop: true,
      isShowPop: !this.data.isShowPop
    })
    
    let req = new CommentPost()
    req.type = types
    req.postId = postId
    req.cityId = cityId
    req.content = v.detail.str
    req.score = parseInt(v.detail.star)
    req.fetch().then(() => {
      console.log(req)
      //把我刚才的评论插到第一条
      let tArr = that.data.comments
      tArr.push(req.comments)
       that.setData({
         comments: tArr
      })
    })
  },
  isPop() {
    this.setData({
      isShowPop: !this.data.isShowPop
    })
    if (types == 1) {
      this.setData({
        placeholder:'旅行中有哪些小故事发生，分享给大家吧'
      })
    } else if (types == 2) {
      this.setData({
        placeholder: '快来评价一下这个特产吧'
      })
    }
  },

  _strLen(e) {
    console.log(e.detail.len)
    this.data.commentLen = e.detail.len
  },

  freshList(num) {
    let req = new PostComments()
    req.cityId = cityId
    req.postId = postId
    req.page = num
    req.limit = LIMIT
    req.type = types

    req.fetch().then(() => {
      this.setData({
        content:req.content,
        img:req.img
      })
      this.setData({ comments: this.data.comments.concat(req.comments)})
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})