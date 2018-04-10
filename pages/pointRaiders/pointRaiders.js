import { spliceStr } from '../../utils/util.js'
import { PostList, PostType, CommentPost } from '../../api.js';
const LIMIT = 5;
import { shareToIndex } from '../../utils/util.js';
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
      console.log(req)
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
  chgTab(e) {
    if(e.currentTarget.dataset.id == 1) {
      this.setData({
        viewpoint: true,
        specialty: false
      })
    } else {
      this.setData({
        viewpoint: false,
        specialty: true
      })
    }
    if(!this.data.specialty) {
      this.pullList(PostType.JINGDIAN)
    }
    else {
      this.pullList(PostType.TECHAN)
    }
  },
  //超出字数部分用...代替
 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,1)
  }
})