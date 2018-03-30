// pages/xiangce/xiangce.js
import { CityPostcards } from '../../api.js';
let province = '';
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
    if (options && options.province) {
      province = options.province;
    } else {
      console.log('忘记传省份给我拉')
    }
    this.getPostcardInfo(0, province)
    
    
  },
  toMsgPost(e) {
    let v = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../checkPostcard/checkPostcard?id=' + v.id + '&postid=' + v.postid,
    })
  },
  chgTab(e) {
    let v = e.currentTarget.dataset.id;
    if(v) {
      this.getPostcardInfo(1, province)
      this.setData({
        viewpoint: false,
        specialty: true
      })
    } else {
      this.getPostcardInfo(0, province)
      this.setData({
        viewpoint: true,
        specialty: false
      })
    }
    
  },
  getPostcardInfo(lm, province){
    let m = new CityPostcards();
    m.LM = lm;
    m.province = province;
    m.fetch().then(res => {
      console.log(res)
      if(lm == 0) {
        this.setData({
          allInit: res.postcardInfo
        })
      } else {
        this.setData({
          LMInit: res.postcardInfo
        })
      }
      
    })
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})