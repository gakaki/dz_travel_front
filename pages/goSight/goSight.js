const app = getApp();
import { shareToIndex } from '../../utils/util.js';
import { spliceStr } from '../../utils/util.js'
import { ymd } from '../../utils/rest.js'
import { Photography, Season, ReqEnterspot, SpotTour, Code } from '../../api.js'
const sheet = require('../../sheets.js');
let pointId = ''
let cid = ''
let oldStr = ''
let toUrl = ''//点击弹窗去哪个页面
let musics
let spotName = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipPop:false,
    tipStr:'',
    firstTime: false,//第一次花费金币进行观光
    toView: '',
    cfmStr: '',
    content: '',
    goldNum: 0,
    ggGold: sheet.Parameter.Get(sheet.Parameter.TOURCONSUME).value,
    events: [],
    // isCongratulations: false,
    // isDialogQuestion: false,
    spotName: '',
    pic: '',
    url: '',
    date: '',
    season: '',
    weather: '',
    testStr: '',
    countBuzu: false,
    isGetPost: false,
    toTop: true,
    freePhoto: 0,
    freeSight: 0
  },
  onHide() {
    app.globalData.gold = this.data.goldNum
  },
  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    pointId = options.pointId
    cid = options.cid
    spotName = options.name

    musics = wx.createAudioContext('musicTag', this)
    musics.setSrc('https://gengxin.odao.com/update/h5/travel/play/photograph.mp3')
  },
  onShow() {
    let req = new ReqEnterspot()
    req.spotId = pointId
    req.cid = cid
    req.fetch().then(req => {
      oldStr = req.spot.description

      this.setData({
        goldNum: req.goldNum,
        freePhoto: req.spot.freePhoto,
        freeSight: req.spot.freeSight,
        events: req.events,
        season: app.globalData.season,
        weather: sheet.Weather.Get(req.spot.weather).icon,
        pic: req.spot.picture,
        spotName: spotName,
        testStr: req.spot.description,
        // evtArr: req.questList,
        date: ymd('cn')
      })
      wx.setNavigationBarTitle({
        title: '景点观光'
      })
      this.spliceStr()
    })
    this.checkMore()
  },
  onHide() {
    this.setData({
      countBuzu: false
    })
  },
  onUnload() {
    this.setData({
      countBuzu: false
    })
  },
  // hideDialogQuestion() {
  //   this.setData({
  //     isDialogQuestion: false
  //   })
  // },
  // jiangli() {
  //   this.setData({
  //     isCongratulations: true,
  //     isDialogQuestion: false
  //   })
  // },

  // hideCongratulations() {
  //   isCongratulations: false
  // },
  guanguang(e) {

    if (this.data.freeSight== 0) {
      if (app.globalData.gold < sheet.Parameter.Get(sheet.Parameter.TOURCONSUME).value) {
        this.setData({
          content: '金币不足,可前往商城',
          cfmStr: '前往商城',
          countBuzu: true
        })
        toUrl = '../recharge/recharge'
        return
      }
      try {
        var value = wx.getStorageSync('ggTip')//第一次消耗金币给与提示
        if (value) {
        }else {
          this.setData({
            content: '是否花费' + this.data.ggGold + '金币进行观光',
            cfmStr: '确定',
            firstTime: true,
            countBuzu: true
          })
          try {
            wx.setStorageSync('ggTip',true)
            return
          } catch (e) {
          }
        }
      } catch (e) {
      }
     
      // this.setData({
      //   content: '本地游玩免费观光次数（' + sheet.Parameter.Get(sheet.Parameter.TOURNUMBER).value + '次)已使用完毕\n是否花费' + this.data.ggGold + '金币进行观光',
      //   cfmStr: '确定',
      //   countBuzu: true
      // })
      // return
    }
    if (app.preventMoreTap(e)) return
    let req = new SpotTour()
    req.cid = cid
    req.spotId = pointId
    req.fetch().then(req => {
      if (this.data.freeSight == 0) {
        wx.showToast({
          title: '金币-' + this.data.ggGold,
          icon: 'none'
        })
      }
      let events = this.data.events
      events.push(req.event)
      this.setData({
        events: events,
        goldNum: req.goldNum,
        toView: 'id'+(events.length-1),
         freeSight: req.freeSight
      })
    },()=>{
      // if (app.globalData.gold < sheet.Parameter.Get(sheet.Parameter.TOURCONSUME).value) {
      if (req.code == Code.NEED_MONEY) {
        this.setData({
          content: '金币不足,可前往商城',
          cfmStr: '前往商城',
          countBuzu: true
        })
        toUrl = '../recharge/recharge'
      }
    })

    // this.setData({
    //   isDialogQuestion: true
    // })
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
    let req = new Photography();
    req.cid = cid;
    req.spotId = pointId
    req.fetch().then(req => {
      musics.play()
      this.setData({
        isGetPost: true,
        freePhoto: req.freePhoto,
        url: req.postcard.cfg.picture
       // url: "jingdian/shanxi/xian/jd/2.jpg"
      })
    },code=>{
      //拍了一次之后
      if (code == Code.NEED_ITEMS) {
        this.setData({
          content: '本地游玩免费拍照次数（' + sheet.Parameter.Get(sheet.Parameter.PHOTOGRAGH).value + '次)已使用完毕\n前往旅行装备处租用单反相机获得拍照次数',
          cfmStr: '前往旅行装备',
          countBuzu: true
        })
        toUrl = '../props/props'
      }
      if (code == Code.EXCEED_COUNT) {
        this.setData({
          tipPop: true,
          tipStr: '每个景点只能拍照一次'
        })
        return
      }
    })
  },
  hidePost() {
    this.setData({
      isGetPost: false
    })
  },
  hideTipPop() {
    this.setData({
      tipPop: false
    })
  },
  toBuy() {
    this.hidePop()
    if(this.data.firstTime) {
      let req = new SpotTour()
      req.cid = cid
      req.spotId = pointId
      req.fetch().then(req => {
        wx.showToast({
          title: '金币-' + this.data.ggGold,
          icon: 'none'
        })
        let events = this.data.events
        events.push(req.event)
        this.setData({
          events: events,
          goldNum: req.goldNum,
          toView: 'id' + (events.length - 1),
          freeSight: req.freeSight
        })
      }, () => {
        // if (app.globalData.gold < sheet.Parameter.Get(sheet.Parameter.TOURCONSUME).value) {
        if (req.code == Code.NEED_MONEY) {
          this.setData({
            content: '金币不足,可前往商城',
            cfmStr: '前往商城',
            countBuzu: true
          })
          toUrl = '../recharge/recharge'
        }
      })

    }else {
      wx.navigateTo({
        url: toUrl
      })
    }
   
  },
  hidePop() {
    this.setData({
      countBuzu: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})