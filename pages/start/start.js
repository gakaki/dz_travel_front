// pages/start/start.js
import { FlyInfo, StartGame, TicketType, Season, Code, CreateCode, DeleteCode, Http, PartnerInfo } from '../../api.js';
import { ymd } from '../../utils/rest.js';
const sheet = require('../../sheets.js');
let allCity = [];
let cid , tid; //城市id和赠送的机票id
let locationCid , partnerCid;   //当前所在城市cid
let time = null, timer = null, preventFastClick = false, startFly = true//标记被邀请人是否执行飞行动画; 
let onlySingle = false , onlyDouble = false;
let inviteCode;  //邀请码
let partnerEnter = false //判断小伙伴是否进入
let score = 50 , reward = 50;    //上次旅行得分和奖励
let initCity = sheet.Parameter.Get(sheet.Parameter.FIRSTCITY).value;
const app = getApp();
import { shareToIndex } from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapConWd: 710,
    mapConHt: 600,
    onlySingle: false,    //是否是赠送的单人票  
    onlyDouble: false,    //是否是赠送的双人票
    isWaiting:true,       //是否在等待好友接收邀请
    isRandom:false,        //是否是随机机票
    destination: '',
    isArrive: false,      //是否到达目的地
    partnerName: '',
    avatarSrc: '',
    isDouble: false,        //是否邀请两个人一起飞
    isSingleFirst: false,   //是否第一次单人起飞
    isDoubleFirst: false,   //是否第一次双人起飞
    date: '',      //当前日期
    flyInfo:{weather:'sun'},      //页面相关信息,默认给weather：sun，避免渲染层报错
    showHelp:false,
    invitee:false,
    needItem:false
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'起飞界面options')
    if(options.type == TicketType.SINGLEPRESENT){
      onlySingle = true
      tid = options.tid
    }
    else if (options.type == TicketType.DOUBLEPRESENT){
      onlyDouble = true
      tid = options.tid
    }

    //从全局变量中把用户信息拿过来
    let userInfo = app.globalData.userInfo

    //获取页面信息,判断是不是通过邀请进来的
    if(options.share){
      inviteCode = options.inviteCode;
      cid = options.cid;
      

      let info = new PartnerInfo();
      info.inviteCode = inviteCode;
      info.fetch().then(req=>{
        //通过分享进来的在此处设置两人的坐标城市id
        locationCid = req.location ? req.location : initCity
        partnerCid = req.parLocation ? req.parLocation : initCity
        let flyInfo = this.setFlyInfo(req);
        this.setData({
          flyInfo,
          isWaiting:false,
          isDouble:true,
          invitee: true,
          date: ymd('cn'),
          partnerName: req.nickName,
          
          avatarSrc: req.avatarUrl,
          players: [{ location: partnerCid, img: req.avatarUrl },
            { location: locationCid, img: userInfo.avatarUrl }
          ]
        })
        
        if(req.isFly){
          //修改部分全局变量
          if (app.globalData.isFirst) {
            app.globalData.isFirst = false
          }
          app.globalData.cid = cid
          app.globalData.cityName = options.terminal


          let airlines = [
            { from: locationCid, to: cid },
            { from: partnerCid, to: cid }
          ]
          this.planeFly(airlines);
        }
        else{
          Http.listen(PartnerInfo, this.parInfo, this, 1000, this.fillCode);
        }
      }).catch(req=>{
        switch (req) {
          case Code.ROOM_EXPIRED:
            this.tip('邀请码错误');
            break;
          case Code.ROOM_FULLED:
            this.tip('房间已满');
            break;
          default:
            this.tip('未知错误');
        }
      })
    }
    else{
      let info = new FlyInfo();
      info.type = options.type
      info.fetch().then((req) => {
        //在此处设置自己的坐标城市id，待监听好友是否进来时在获取好友坐标城市id
        locationCid = req.location ? req.location : initCity

        //以下数据不进行渲染（仅在调api时发送）
        //不是随机机票就从options中获取cid
        if (req.cid) {
          cid = req.cid;
        }
        else {
          cid = options.cid
        }

        console.log(req, '起飞界面数据', onlySingle)
        let flyInfo = this.setFlyInfo(req);
        this.setData({
          flyInfo,
          date: ymd('cn'),
          isSingleFirst: req.isSingleFirst,
          isDoubleFirst: req.isDoubleFirst,
          avatarSrc: userInfo.avatarUrl,
          onlySingle,
          onlyDouble,
          players: [{ location: locationCid, img: userInfo.avatarUrl }]
        })
      })
    }
    

    //是否是随机机票
    if(options && options.random){
      //随机机票把全部城市取出来进行随机操作
      let city = sheet.finds.map(o => {
        return new sheet.Find(o).city;
      })
      city.forEach((item) => {
        allCity.push.apply(allCity, item);
      })
      this.setData({
        isRandom: true,
      })
    }
    else{
      //只要不是固定了单人飞行的就在此处生成邀请码，否则在点击邀请好友时生成邀请码会导致分享出去的邀请码为空。
      if (!onlySingle && !options.share){
        this.createCode() 
      }
      
      this.setData({
        destination: options.terminal,
      })
    }
  },

  setFlyInfo(req) {
    let flyInfo = {};
    if(req.cost){
      flyInfo.cost = req.cost;
      flyInfo.doubleCost = req.doubleCost;
    }
    flyInfo.gold = req.gold;
    flyInfo.holiday = req.holiday;
    flyInfo.location = req.location ? sheet.City.Get(req.location).city : '';
    flyInfo.season = Season[req.season];
    flyInfo.weather = sheet.Weather.Get(req.weather).icon;
    return flyInfo;
  },

  fillCode(req) {
    req.inviteCode = inviteCode;
  },

  createCode() {
    let create = new CreateCode()
    create.fetch().then(req => {
      console.log(req, '生成邀请码')
      inviteCode = req.inviteCode
    }).catch(req => {
      switch (req) {
        case Code.ROOM_USER_EXISTS:
          this.tip('已在房间内, 无法邀请别人');
          break;
        default:
          this.tip('未知错误');
      }
    })
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
    clearInterval(time)
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.delCode(false)
    startFly = true;
    onlyDouble = false;
    onlySingle = false;
    preventFastClick = false;
    inviteCode = '';
    clearInterval(time);
    clearTimeout(timer);
    Http.unlisten(PartnerInfo, this.parInfo, this);
    console.log("start------------->onUnload")
  },

  parInfo(res, err) {
    if (err) {
      console.log('http listen error, code:', err)
      switch (err) {
        case Code.ROOM_EXPIRED:
          
          if(this.data.invitee){
            this.tip('对方解除组队');
            timer = setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          }
          else{
            this.tip('邀请码错误');
          }
          
          break;
        case Code.ROOM_FULLED:
          this.tip('房间已满');
          break;
        default:
          this.tip('未知错误');
      }
    }
    else{
      if(this.data.invitee){
        if (res.isFly && startFly) {
          //修改部分全局变量
          if (app.globalData.isFirst) {
            app.globalData.isFirst = false
          }
          app.globalData.cid = cid
          app.globalData.cityName = options.terminal
          
          console.log(locationCid, cid, '起飞城市id')
          startFly = false;
          let airlines = [
            { from: locationCid, to: cid },
            { from: partnerCid, to: cid }
          ]
          this.planeFly(airlines)
          score = res.score;
          reward = res.reward;
        }
      }
      else{
        let userInfo = app.globalData.userInfo;
        if (res.nickName && res.avatarUrl && !partnerEnter) {
          partnerEnter = true
          partnerCid = res.parLocation ? res.parLocation : initCity;
          console.log(partnerCid, locationCid, res.parLocation, '小伙伴cid，自己cid，返回小伙伴cid')
          this.setData({
            isWaiting: false,
            partnerName: res.nickName,
            avatarSrc: res.avatarUrl,
            players: [{ location: locationCid, img: userInfo.avatarUrl },
            { location: partnerCid, img: res.avatarUrl }
            ]
          })
        }
        else if (!res.nickName && !res.avatarUrl && partnerEnter) {
          console.log('小伙伴退出了-------------')
          partnerEnter = false
          this.setData({
            isWaiting: true,
            partnerName: res.nickName,
            avatarSrc: res.avatarUrl,
            players: [{ location: locationCid, img: userInfo.avatarUrl }
            ]
          })
        }
      }
    }
  },

  startTour() {
    // console.log(cid, this.data.flyInfo.cost,'startTour cost')
    if(this.data.invitee){
      wx.showToast({
        title: '只有邀请人可以开始旅行',
        icon: 'none'
      })
      return;
    }
    if (preventFastClick) return;
    preventFastClick = true;
    Http.unlisten(PartnerInfo, this.parInfo, this);
    let start = new StartGame();
    start.cid = cid;
    //判断是不是双人起飞
    if (!this.data.isWaiting) {
      //有没有免费的
      if(this.data.isDoubleFirst){
        start.cost = 0;
        start.type = TicketType.DOUBLEBUY;
      }
      //是不是赠送的双人机票
      else if (onlyDouble && !this.data.isDoubleFirst){
        start.cost = 0;
        start.type = TicketType.DOUBLEPRESENT;
        start.tid = tid;
      }
      else{
        start.cost = this.data.flyInfo.doubleCost;
        start.type = TicketType.DOUBLEBUY;
      }
      start.inviteCode = inviteCode;
    }
    else{
      //有没有免费的
      if (this.data.isSingleFirst){
        start.cost = 0;
        start.type = TicketType.SINGLEBUY;
      }
      //是不是随机
      else if (this.data.isRandom && !this.data.isSingleFirst){
        start.cost = this.data.flyInfo.cost;
        start.type = TicketType.RANDOMBUY;
      }
      //是不是使用赠送的
      else if (onlySingle && !this.data.isSingleFirst){
        start.cost = 0;
        start.type = TicketType.SINGLEPRESENT;
        start.tid = tid;
      }
      else{
        start.cost = this.data.flyInfo.cost;
        start.type = TicketType.SINGLEBUY;
      }
    }
    start.fetch().then((req) => {
      //修改部分全局变量
      if (app.globalData.isFirst){
        app.globalData.isFirst = false
      }
      app.globalData.cid = cid
      app.globalData.cityName = sheet.City.Get(cid).city


      score = req.score;
      reward = req.reward;
      this.readyFly()
    }).catch((req) => {
      switch(req){
        case Code.NEED_ITEMS:
          this.setData({
            needItem:true
          })
          break;
        case Code.USER_NOT_FOUND:
          this.tip('获取用户信息失败');
          break;
        case Code.PARAMETER_NOT_MATCH:
          this.tip('非法传参，请检查参数');
          break;
        case Code.NOT_FOUND:
          this.tip('道具不存在或已使用');
          break;
        case Code.REQUIREMENT_FAILED:
          this.tip('已在当前城市，请重新选择城市进行游玩');
          wx.navigateBack({
            delta:1
          })
          break;
        default:
          this.tip('未知错误');
      }
      preventFastClick = false;
    })
    
  },

  readyFly() {
    if (this.data.isRandom) {
      if (allCity.length) {
        let i = 0;
        time = setInterval(() => {
          i++
          let ind = Math.floor(Math.random() * allCity.length)
          let des = allCity[ind]
          this.setData({
            destination: des,
          })
          if (i > 20) {
            let destination = sheet.City.Get(cid).city;
            clearInterval(time)
            this.setData({
              destination
            })
            this.planeFly([{from:locationCid,to:cid}])
          }
        }, 100)
      }
      else {
        this.tip('没有城市列表')
      }
    }
    else {
      if(this.data.isWaiting){
        this.planeFly([{from:locationCid, to:cid}])
      }
      else{
        console.log(partnerCid, locationCid, '小伙伴cid，自己cid')
        let airlines = [
          { from: locationCid, to: cid },
          { from: partnerCid, to: cid}
        ]
        this.planeFly(airlines)
      }
    }
  },

  planeFly(airlines) {
    this.setData({
      airlines,
    })
  },

  onArrived() {
    Http.unlisten(PartnerInfo, this.parInfo, this);
    console.log('plane arrived')
    if(this.data.flyInfo.location){
      this.setData({
        isArrive: true,
        tipContent: '在' + this.data.flyInfo.location + '旅行路线规划评分：' + score + '分，奖励' + reward + '积分\n航班已到达祝您旅途愉快',
      })
    }
    else{
      this.setData({
        isArrive: true,
        tipContent: '航班已到达祝您旅途愉快',
      })
    }
    
    preventFastClick = false;
  },

  tip(tip) {
    wx.showToast({
      title: tip,
      icon: 'none'
    })
  },

  double(e) {
    if (app.preventMoreTap(e)) return;
    if(!this.data.isDouble){
      this.setData({
        isDouble: true
      })
    }
    
    //根据isWaiting来判断是生成code还是删除code。一般来说isWaiting为false时表示已经有好友进来此时已生成过code
    if(this.data.isWaiting){
      Http.listen(PartnerInfo, this.parInfo, this, 1000, this.fillCode);
    }
    else{
      if(this.data.invitee){
        wx.navigateBack({
          delta:1
        })
      }
      else{
        this.delCode(true)
        let userInfo = app.globalData.userInfo
        this.setData({
          isWaiting: true,
          partnerName: '',
          avatarSrc: '',
          players: [{ location: locationCid, img: userInfo.avatarUrl }]
        })
        
        Http.unlisten(PartnerInfo, this.parInfo, this);
      }
    }
  },

  delCode(reCreate) {
    let det = new DeleteCode()
    det.inviteCode = inviteCode
    det.fetch().then(req => {
      console.log(req, '删除邀请码')
      if(reCreate){
        console.log('enter createCode')
        this.createCode()
      }
    }).catch(req => {

    })
  },

  showHelp() {
    this.setData({
      showHelp: true
    })
  },

  //带下划线的为监听组件内的事件
  _confirm() {
    wx.redirectTo({
      url: '../play/play?cid=' + cid,
    })
  },

  _helpCfr() {
    this.setData({
      showHelp: false
    })
  },

  _close() {
    this.setData({
      needItem:false
    })
  },

  _toShop() {
    this.setData({
      needItem:false
    })
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let toShareLink = {
      start: true,
      terminal: this.data.destination,
      inviteCode: inviteCode,
      cid: cid
    }
    return shareToIndex(this, {type:3}, toShareLink)
  }
})