const app = getApp();
import { shareToIndex } from '../../utils/util.js';
import { spliceStr } from '../../utils/util.js'
import { ymd } from '../../utils/rest.js'
import { Photograph, Season, ReqEnterspot, SpotTour } from '../../api.js'
const sheet = require('../../sheets.js');
let pointId = ''
let cid = ''
let oldStr = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCongratulations: false,
    isDialogQuestion: false,
    evtArr: [],
    spotName: '',
    pic: '',
    url: '',
    date: '',
    season: '',
    weather: 'sun',
    myGold: 0,
    testStr: '',
    canPhoto: false,
    isGetPost: false,
    toTop: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pointId = options.pointId
    cid = options.cid
    this.checkMore()
    //test
    let pointData = {
      spot: {
        id: "100104",
        scenicspot: "天坛",
        season: "SPRING",
        weather: 1,
        picture: "jingdian/shanxi/xian/jd/2.jpg",
        description: "天坛位于北京城南端，是明清两代皇帝祭祀天地之神和祈祷五谷丰收的地方。天坛包括圜丘和祈谷二坛，围墙分内外两层，呈回字形。北围墙为弧圆形，南围墙与东西墙成直角相交，为方形。"
      },
      questList: [{
        time: "16:00",
        id: "110067",
        describe: "与好友一起逛街拍照吃小吃。",
        gold_used: 5,
        item: {
          100020: 5
        }
      },
      {
        time: "17:05",
        id: "110048",
        describe: "风景区地势陡峭，因有好友同行，两人相互帮助攀上峰顶。",
        gold_used: 5,
        item: {
          100023: 15
        }
      }
      ]
    }
    //test

    // let req = new ReqEnterspot()
    // req.spotId = pointId
    // req.fetch().then(req => {

    // })

    console.log(this.data.season)
    oldStr = pointData.spot.description
    this.setData({
      season: Season[pointData.spot.season],
      weather: sheet.Weather.Get(pointData.spot.weather).icon,
      pic: pointData.spot.picture,
      spotName: pointData.spot.scenicspot,
      testStr: pointData.spot.description,
      // evtArr: pointData.questList,
      myGold: app.globalData.gold ? app.globalData.gold : 0,
      date: ymd('cn')
    })
    wx.setNavigationBarTitle({
      title: '景点观光'
    })
    console.log(123)
    this.spliceStr()
  },
  hideDialogQuestion() {
    this.setData({
      isDialogQuestion: false
    })
  },
  jiangli() {
    this.setData({
      isCongratulations: true,
      isDialogQuestion: false
    })
  },
  hideFirstIn() {
    let evtArr = this.data.evtArr.slice()
    let arr = {
      time: "16:00",
      id: "110067",
      describe: "回答了问题",
      gold_used: 5,
      item: {
        100020: 5
      }
    }
    evtArr.push(arr)
    this.setData({
      isCongratulations: false,
      evtArr: evtArr
    })
  },
  hideCongratulations() {
    isCongratulations: false
  },
  guanguang() {
    let req = new SpotTour()
    req.cid = cid
    req.spotId = pointId
    req.fetch().then(req => {
    })

    this.setData({
      isDialogQuestion: true
    })
  },
  spliceStr() {
    let str = spliceStr(this.data.testStr, 46)
    this.setData({
      testStr: str
    })
  },
  checkMore(e) {
    this.setData({
      toTop: !this.data.toTop
    })
    if (this.data.testStr == oldStr) {
      this.spliceStr()
    } else {
      this.setData({
        testStr: oldStr
      })
    }

  },
  getPost() {
    console.log(333)
    this.setData({
      isGetPost: true,
      url: "jingdian/shanxi/xian/jd/2.jpg"
    })
    // let req = new Photograph();
    // req.cityId = 0;
    // req.spotId = 100101
    // req.fetch().then(() => {

    // })
  },
  hidePost() {
    this.setData({
      isGetPost: false
    })
  },
  toBuy() {
    this.hidePop()
    wx.navigateTo({
      url: '../props/props',
    })
  },
  hidePop() {
    this.setData({
      canPhoto: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})