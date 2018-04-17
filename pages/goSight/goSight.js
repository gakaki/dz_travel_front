const app = getApp();
import { shareToIndex } from '../../utils/util.js';
import { spliceStr } from '../../utils/util.js'
import { ymd } from '../../utils/rest.js'
import { Photography, Season, ReqEnterspot, SpotTour } from '../../api.js'
const sheet = require('../../sheets.js');
let pointId = ''
let cid = ''
let oldStr = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ggGold: sheet.Parameter.Get(sheet.Parameter.TOURCONSUME).value,
    events: [],
    isCongratulations: false,
    isDialogQuestion: false,
    spotName: '',
    pic: '',
    url: '',
    date: '',
    season: '',
    weather: 'sun',
    myGold: 0,
    testStr: '',
    goldBuzu: false,
    isGetPost: false,
    toTop: true,
    freePhoto: [],
    freeSight: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pointId = options.pointId
    cid = options.cid

    let req = new ReqEnterspot()
    req.spotId = pointId
    req.fetch().then(req => {
      console.log('req', req)
      console.log(this.data.season)
      oldStr = req.spot.description
      this.setData({
        freePhoto: req.spot.freePhoto,
        freeSight: req.spot.freeSight,
        events: req.events,
        season: app.globalData.season,
        weather: sheet.Weather.Get(req.spot.weather).icon,
        pic: req.spot.picture,
        spotName: req.spot.scenicspot,
        testStr: req.spot.description,
        // evtArr: req.questList,
        myGold: app.globalData.gold ? app.globalData.gold : 0,
        date: ymd('cn')
      })
      wx.setNavigationBarTitle({
        title: '景点观光'
      })
      this.spliceStr()
    })
    this.checkMore()
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

  hideCongratulations() {
    isCongratulations: false
  },
  guanguang() {
    
    if (this.data.freePhoto[0] == 0) {
      this.setData({
        goldBuzu: true
      })
      return
    }
    let req = new SpotTour()
    req.cid = cid
    req.spotId = pointId
    req.fetch().then(req => {
      let freeSight = this.data.freeSight.slice()
      let events = this.data.events
      freeSight[0] = freeSight[0] - 1
      events.push(req.event)
      this.setData({
        events: events,
        freeSight: freeSight
      })
      console.log(this.data.events)
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
    if (this.data.freePhoto[0] == 0) {
      this.setData({
        goldBuzu: true
      })
      return
    }
    let req = new Photography();
    req.cityId = 0;
    req.spotId = 100101
    req.fetch().then(req => {
      let freePhoto = this.data.freePhoto.slice()
      freePhoto[0] = freePhoto[0] - 1
      
      this.setData({
        isGetPost: true,
        freePhoto: freePhoto,
        //url:req.picture
        url: "jingdian/shanxi/xian/jd/2.jpg"
      })
    })
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
      goldBuzu: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})