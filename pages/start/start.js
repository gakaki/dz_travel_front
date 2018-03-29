// pages/start/start.js
import { FlyInfo, StartGame, TicketType, Season, Code } from '../../api.js';
import { ymd } from '../../utils/rest.js';
const app = getApp()
const sheet = require('../../sheets.js');
let allCity = [], terminalPoint = [], routePoint = [], partnerPoint = [];
let ticketType; //机票类型
let cid; //城市id
let time = null, timer = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWaiting:true,
    isRandom:true,
    destination: '',
    isArrive: false,
    isFirst: false,  //是否第一次起飞
    moveX:-38,  //飞机的位置,默认为-38
    routeWid:0, //飞行长度
    routePoint: [],  //飞行的起始点坐标
    routeR: 0,
    terminalPoint: [], //目的地坐标
    partnerName: '你成绩各自',
    avatarSrc: '',
    partnerPoint: [], //好友坐标
    partnerWid: 0,
    partnerR: 0,
    partnerMove: -38,
    isDouble: false,
    date: '',      //当前日期
    flyInfo:{weather:'sun'}      //页面相关信息,默认给weather：sun，避免渲染层报错
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //test(模拟坐标，城市列表)---------------------
    terminalPoint = [550,200]
    routePoint = [150,300]
    partnerPoint = [400, 500]
    this.setData({
      partnerPoint,
    })
    allCity = ['上海', '北京', '香港', '澳门', '台北', '杭州', '成都', '南京', '南宁', '天津', '石家庄', '呼伦贝尔']
    //---------------------------------
    console.log(options)
    //从全局变量中把用户信息拿过来
    let userInfo = app.globalData.userInfo

    //获取页面信息
    let info = new FlyInfo();
    info.type = options.type
    info.fetch().then((req)=>{
      //以下数据不进行渲染（仅在调api时发送）
      ticketType = options.type;
      //不是随机机票就从options中获取cid
      if(req.cid){
        cid = req.cid;
      }
      else{
        cid = options.cid
      }
      

      console.log(req,'info')
      let flyInfo = {};
      flyInfo.cost = req.cost;
      flyInfo.doubleCost = req.doubleCost;
      flyInfo.gold = req.gold;
      flyInfo.holiday = req.holiday;
      flyInfo.location = req.location;
      flyInfo.season = Season[req.season];
      flyInfo.weather = sheet.Weather.Get(req.weather).icon;
      this.setData({
        flyInfo,
        date: ymd('cn'),
        isFirst: req.isFirst,
        avatarSrc: userInfo.avatarUrl
      })
    })
    //是否是随机机票
    if(options && options.random){
      this.setData({
        isRandom: true,
        routePoint: [150,300]
      })
    }
    else{
      
     
      this.setData({
        isRandom: false,
        destination: options.terminal,
        routePoint: [150, 300],
      })
      this.calcRoute(terminalPoint, routePoint, false)
      //是否是双人旅行-------
      if(this.data.isDouble){
        this.calcRoute(terminalPoint, partnerPoint, true)
      }
      
    }
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
    clearInterval(time)
    clearTimeout(timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(time)
    clearTimeout(timer)
  },

  startTour() {
    console.log(cid, this.data.flyInfo.cost)
    let start = new StartGame();
    start.type = ticketType;
    start.cid = cid;
    start.cost = this.data.flyInfo.cost;
    if (this.data.isDouble) {
      start.partnerUid = 1
    }
    start.fetch().then((req) => {
      this.readyFly()
    }).catch((req) => {
      switch(req){
        case Code.NEED_ITEMS:
          this.tip('金币或道具不足');
          break;
        case Code.USER_NOT_FOUND:
          this.tip('获取用户信息失败');
          break;
        case Code.PARAMETER_NOT_MATCH:
          this.tip('非法传参，请检查参数');
          break;
        default:
          this.tip('未知错误');
      }
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
            this.calcRoute(terminalPoint, routePoint, false)
            this.setData({
              destination,
              moveX: this.data.routeWid - 38
            })
            timer = setTimeout(() => {
              this.setData({
                isArrive: true
              })
            }, 2500)
          }
        }, 100)
      }
      else {
        this.tip('没有城市列表')
      }
    }
    else {
      if (this.data.isDouble) {
        this.setData({
          moveX: this.data.routeWid - 38,
          partnerMove: this.data.partnerWid - 38
        })
      }
      else {
        this.setData({
          moveX: this.data.routeWid - 38
        })
      }
      timer = setTimeout(() => {
        this.setData({
          isArrive: true
        })
      }, 2500)
    }
  },

  calcRoute(terminal,route,isPartner) {
    //两点之间X轴和Y轴的距离
    let distanceY = terminal[1] - route[1];
    let distanceX = terminal[0] - route[0]
    //旋转的角度和两点之间的长度
    let routeR = Math.atan2(distanceY, distanceX)*(180/Math.PI);
    let routeWid = Math.pow((distanceX * distanceX + distanceY * distanceY),0.5);
    console.log(routeR,routeWid)

    //是否为小伙伴的路线
    if(isPartner){
      this.setData({
        partnerWid:routeWid,
        partnerR:routeR
      })
    }
    else{
      this.setData({
        routeWid,
        routeR,
      })
    }
    
  },

  tip(tip) {
    wx.showToast({
      title: tip,
      icon: 'none'
    })
  },

  //带下划线的为监听组件内的事件
  _confirm() {
    wx.redirectTo({
      url: '../play/play',
    })
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