// pages/index/index.js
import { shareToIndex, redGold, addGold } from '../../utils/util.js'
import { start, ymd } from '../../utils/rest.js';
import { SignInfo, Base, IndexInfo, Http, LookTicket, Season, TicketType, CheckMsgCnt, CheckCode, Code, SendMockId } from '../../api.js';
const sheet = require('../../sheets.js');
const app = getApp();
//机票类型和城市id
let tktType , cid , terminal , tid , locationCid;
let inviteOpt , getLocationCid = false;
let enterOnload = true //判断是否进入onload生命周期函数中
let loadOpts;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipPop:false,
    tipStr:'',
    mapConWd: 710,
    mapConHt: 730,
    lightProvinces: ['上海', '海南', '北京', '河南', '天津','四川'],//test
    lightCitys: ['上海', '海口', '北京', '郑州', '天津','成都'],//test
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isFirst: false,
    season:'SPRING',
    weather:'sun',
    playerCnt:2000,
    messages:0,
    gold:0,
    nickName:'',
    avatar:'',
    date:'',
    hasSign:1,
    location:'',
    uid:'',
    presentTkt:[],
    chooseInd: 0,
    showTicket:false,
    showInvite:false,
    launch:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // let test = 'dsfasfds(aaa,#ccc)dsfdsfgd(dfgdfsgdfs,#f6f6f6)hjkljkljj'
  // let reg = /\(.*?\)/
  // let as = []
  //  while(reg.test(test)){
  //    let r = test.match(reg)[0]
  //    as.push(r)
  //    test = test.replace(r,"")
  //  }
  //  console.log(as)
    loadOpts = options;
    let that = this;
    enterOnload = true;
    wx.getNetworkType({
      success:function(res){
        if(res.networkType =='none') {
          wx.onNetworkStatusChange(res => {
            if (res.isConnected) {
              that.pageInfo(options, that)
            }
          })
        } else {
          that.pageInfo(options, that)
        }
      }
    })
  },
  pageInfo(options,that){
    start(ok => {
      ok && that.gotUserInfo(options);
    }, options.shareUid)
    setTimeout(() => {
      that.setData({
        launch: false
      })
    }, 1000)
  },
  toPlay(e) {
    if (app.globalData.noNetwork) {
      wx.showToast({
        title: '请检查网络状态'
      })
      
    }
    if (app.preventMoreTap(e)) return;
    //需要判断是否在游玩
    if(getLocationCid){
      wx.navigateTo({
        url: '../play/play?cid=' + locationCid
      })
    }
    
  },
  //options主要为了处理分享出去进来的跳转设置
  gotUserInfo(options) {
    //start的回调里，一般情况下已经走完了登录流程，且将userInfo放到了globalData上，除非用户拒绝授权给我们
    let userInfo = app.globalData.userInfo;
    let hasUserInfo = userInfo != null;
    if (userInfo){
      let m = new SignInfo()
      m.fetch().then(res => {
        if(res.hasSign){
          this.getIndexInfo(userInfo)
        }
        else{
          this.setData({
            theDay: res.theDay,
            hasSign: res.hasSign,
            uid: userInfo.uid
          })
        }
        options && this.shareTo(options)
      })
      
    }
    else {
      console.log('用户拒绝授权个人信息！！')
    }

    this.setData({hasUserInfo})
  },
  hideTipPop() {
    this.setData({
      tipPop: false
    })
  },
  //分享相关跳转
  shareTo(options) {
    if(!options.shareUid){return}
    if(options.start){
      this.checkCode(options,false)
    } else if (options.travelLog) {
      wx.navigateTo({
        url: '../travelLog/travelLog?uid='+options.shareUid
      })
    } else if (options.footprint) {
      wx.navigateTo({
        url: '../footprint/footprint?uid=' + options.shareUid
      })
    } else if (options.other) {
      wx.navigateTo({
        url: '../other/other?uid=' + options.shareUid
      })
    } else if (options.rank) {
      wx.switchTab({
        url: '../rank/rank?uid=' + options.shareUid
      })
    } else if (options.checkPostcard) {
      let url = '../checkPostcard/checkPostcard?shareUid=' + options.shareUid
      if(options.id) { url += '&id=' + options.id }
      if (options.postid) { url += '&id=' + options.postid }
      wx.navigateTo({
        url: url
      })
    }
  },

  checkCode(options,agree) {
    let check = new CheckCode();
    check.inviteCode = options.inviteCode;
    if(agree){
      check.agree = 1;
    }
    check.fetch().then(req => {
      wx.navigateTo({
        url: '../start/start?share=true&inviteCode=' + options.inviteCode + '&cid=' + options.cid + '&terminal=' + options.terminal,
      })
    }).catch(req => {
      switch (req) {
        case Code.ROOM_EXPIRED:
          this.tip('邀请码已过期');
          break;
        case Code.ROOM_USER_EXISTS:
          this.tip('已在房间内');
          break;
        case Code.ROOM_FULLED:
          this.tip('房间已满');
          break;
        case Code.ISTRAVELLING:
          inviteOpt = options
          this.setData({
            showInvite:true
          })
          break;
        default:
          this.tip('未知错误，checkCode');
      }
    })
  }, 

  tip(tip) {
    wx.showToast({
      title: tip
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //因为当用户切换tabbar上的页面和返回到此页面时不会进入onload，故需在此处进行api调用已更新数据
    if(!enterOnload){
      this.gotUserInfo()
    }
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    Http.unlisten(CheckMsgCnt, this.loopMsg, this);
    getLocationCid = false;
    enterOnload = false;
    this.setData({
      isFirst: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    Http.unlisten(CheckMsgCnt, this.loopMsg, this);
    getLocationCid = false;
    enterOnload = false;
    this.setData({
      isFirst: false
    })
  },

  getIndexInfo(userInfo) {
    //请求主页数据
    let req = new IndexInfo();
    req.fetch().then(req => {
      locationCid = req.location
      let season = Season[req.season]
      let weather
      if(Number(req.weather)){
        weather = sheet.Weather.Get(req.weather).icon
      }
      else{
        weather = sheet.Weather.Get(1).icon
      }
      app.globalData.season = season
      app.globalData.weather = weather
      app.globalData.gold = req.gold
      app.globalData.isFirst = req.isFirst
      if(req.location){
        app.globalData.cid = req.location
        app.globalData.cityName = sheet.City.Get(req.location).city
      }

      this.setData({
        isFirst: req.isFirst,
        season,
        weather,
        gold: req.gold,
        playerCnt: req.playerCnt,
        nickName: userInfo.nickName,
        avatar: userInfo.avatarUrl ? userInfo.avatarUrl : app.globalData.defaultAvatar,
        location: req.location ? sheet.City.Get(req.location).city : '',
        date: ymd('cn'),
        chooseInd: 0,
        messages: req.unreadMsgCnt,
      })

      //地图上显示好友所在位置
      let players = []
      players = req.friends.map(o=>{
        let friend = {}
        friend.location = o.cid;
        friend.img = o.avatarUrl;
        return friend;
      });
      if(req.location){
        let self = {}
        self.location = req.location
        self.img = userInfo.avatarUrl
        players.push(self)
      }
      if(players.length){
        this.setData({
          players,
        })
      }

      //加的保护，防止用户点击城市游玩时还没有获取到当前cid
      getLocationCid = true
      
    }).catch((req) => {
      switch (req) {
        case Code.USER_NOT_FOUND:
          this.tip('用户不存在');
          break;
        default:
          if (!app.globalData.noNetwork){
            this.tip('未知错误，indexInfo');
          }
      }
    })

    Http.listen(CheckMsgCnt, this.loopMsg, this, 600000);
  },

  loopMsg(res) {
    this.setData({
      message: res.unreadMsgCnt
    });
    
    
  },

  /**
   * 点击事件
   */
  toFly(e) {
    if (app.globalData.noNetwork) {
      wx.showToast({
        title: '请检查网络状态'
      })
    }
    if (app.preventMoreTap(e) || !getLocationCid) return;
    //查询用户是否有赠送的机票
    let req = new LookTicket()
    req.fetch().then(()=>{
      if(req.ticket.length){
        let presentTkt = []
        req.ticket.forEach((item,index)=>{
          let obj = {};
          obj.province = sheet.City.Get(item.cid).province;
          obj.city = sheet.City.Get(item.cid).city;
          obj.tkt = item.type==1 ? '单人机票' : '双人机票';
          obj.type = item.type;
          obj.cid = item.cid;
          obj.tid = item.tid;
          presentTkt[index] = obj
        })
        this.initTer(presentTkt[0])
        this.setData({
          presentTkt,
          showTicket:true
        })
      }
      else{
        wx.navigateTo({
          url: '../city/city?location=' + this.data.location,
        })
      }
    }).catch(()=>{
      switch (req) {
        case Code.USER_NOT_FOUND:
          this.tip('用户不存在');
          break;
        default:
          if (!app.globalData.noNetwork) {
            this.tip('未知错误，LookTicket');
          }
      }
    })
  },

  buyTkt(e) {
    if (app.preventMoreTap(e)) return;
    this.setData({
      showTicket:false
    })
    wx.navigateTo({
      url: '../city/city?location=' + this.data.location,
    })
  },

  useTkt(e) {
    if (app.preventMoreTap(e)) return;
    if(this.data.location == terminal){
      this.setData({
        tipPop: true,
        tipStr: '已在当前城市，请重新选择'
      })
      return 
    }
    this.setData({
      showTicket: false
    })
    wx.navigateTo({
      url: '../start/start?cid=' + cid + '&terminal=' + terminal + '&type=' + tktType + '&tid=' + tid,
    })
  },

  toMessage(e) {
    if (app.preventMoreTap(e)) return;
    wx.navigateTo({
      url: '../message/message',
    })
  },

  chooseTicket(e) {
    // if (app.preventMoreTap(e)) return;
    let data = e.currentTarget.dataset
    this.initTer(data)
    this.setData({
      chooseInd: data.ind
    })
  },

  //如果有赠送的机票，初始化需要传递的信息
  initTer(data) {
    if (data.type == 1) {
      tktType = TicketType.SINGLEPRESENT
    }
    else if (data.type == 2) {
      tktType = TicketType.DOUBLEPRESENT
    }
    cid = data.cid
    terminal = data.city
    tid = data.tid
  },
  toIntegralShop(e){
    if (app.preventMoreTap(e)) return;
    wx.navigateTo({
      url: '../integral/integral',
    })
  },
  toShop(e){
    if (app.preventMoreTap(e)) return;
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },

  //推送相关
  sendMockId(e) {
    let mock = new SendMockId();
    mock.formId = e.detail.formId;
    mock.fetch().then(()=>{
      // console.log('send formId suc')
    })
  },

  //监听组件事件
  _sign() {
    let userInfo = app.globalData.userInfo;
    this.getIndexInfo(userInfo)
  },

  _agreeInvite() {
    this.setData({
      showInvite: false
    })
    this.checkCode(inviteOpt,true)
  },

  _hideInvite() {
    this.setData({
      showInvite:false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  },
  checkReAuth() {
    Base.ReAuth(()=>{
      this.onLoad(loadOpts)
    });
  },

  test(e) {
    // if(app.preventMoreTap(e)) return;
    // wx.showShareMenu({
    //   success(){
    //   }
    // })
    // Http.unlisten(CheckMsgCnt, this.loopMsg, this);
    // wx.navigateTo({
    //   url: '../settings/settings',
    // })
  }
})