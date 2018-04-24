import { spliceStr } from '../../utils/util.js'
import { PostList, PostType, CommentPost } from '../../api.js';
const LIMIT = 3;
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
  postArr: [],
  jdArr:[],
  index1:1,
  index2:1,
  v:1,
  first:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
      title: options.city+'攻略',
      first:false
    })
   
  },
  onShow(){
    if(!this.data.first) {
      this.pullList(this.data.v)
    }
    
  },
  pullList(v) {
    let req = new PostList()
    req.cityId = cid
    if(v == 1) {
      req.page = this.data.index1
    } else{
      req.page = this.data.index2
    }
    // req.limit = LIMIT
    req.type = v
    req.fetch().then(req => {
      console.log(req)
      let arr = []
      if (v == PostType.JINGDIAN) {
         arr = req.posts.map(o => {
          o.content = spliceStr(o.content, 42)
          return o
        })
         arr = this.data.postArr.concat(arr)
         this.setData({
           postArr: arr
         })
      } else {
        arr = this.data.jdArr.concat(req.posts )
        this.setData({
          jdArr: arr
        })
      }
      if (v == 1) {
        this.data.index1 = this.data.index1 + 1
      } else {
        this.data.index2 = this.data.index2 + 1
      }
    })
  },
  toDetail(e) {
    wx.navigateTo({
      url: '../raiders/raiders?cityId=' + e.currentTarget.dataset.cityId + '&postId=' + e.currentTarget.dataset.postId + '&type=' + e.currentTarget.dataset.type + '&name=' + e.currentTarget.dataset.name
    })
    // if(this.data.v == 1) {
    //   this.setData({
    //     index1: 1,
    //     postArr:[]
    //   })
    // } else {
    //   this.setData({
    //     index2: 1,
    //     jdArr: []
    //   })
    // }
  },
  chgTab(e) {
    if(e.currentTarget.dataset.id == 1) {
      this.setData({
        viewpoint: true,
        specialty: false,
        index1:1,
        v:1,
        postArr: [],
        jdArr: []
      })
    } else {
      this.setData({
        viewpoint: false,
        specialty: true,
        index2: 1,
        v:2,
        postArr: [],
        jdArr: []
      })
    }
    if(!this.data.specialty) {
      this.pullList(PostType.JINGDIAN)
    }
    else {
      this.pullList(PostType.TECHAN)
    }
  },
  lower(){
    this.data.index = this.data.index + 1;
    if (!this.data.specialty) {
      this.pullList(PostType.JINGDIAN)
    }
    else {
      this.pullList(PostType.TECHAN)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})