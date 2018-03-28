// pages/start/start.js
import { FlyInfo, StartGame, TicketType } from '../../api.js';
const app = getApp()
const sheet = require('../../sheets.js');
let allCity = [], terminalPoint = [], routePoint = [], partnerPoint = [];
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
    moveX:-38,  //飞机的位置,默认为-38
    routeWid:0, //飞行长度
    routePoint: [],  //飞行的起始点坐标
    routeR: 0,
    terminalPoint: [], //目的地坐标
    partnerName: '你成绩各自',
    avatarSrc: 'https://wx.qlogo.cn/mmopen/vi_32/ODicJCxia34ErfQyhZ7ZHH7iaGSmylmqpgo5goTggk4xnvia07tvicwUNkicQo7xia0JFbtpW74NzQoQ562smbk1Z8k0g/0',
    partnerPoint: [], //好友坐标
    partnerWid: 0,
    partnerR: 0,
    partnerMove: -38,
    isDouble: false
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

  getFlyInfo(type) {
    let req = new FlyInfo()

  },

  startTour() {
    if(this.data.isRandom){
      if(allCity.length){
        let i = 0;
        time = setInterval(() => {
          i++
          let ind = Math.floor(Math.random() * allCity.length)
          let des = allCity[ind]
          this.setData({
            destination: des,
          })
          if (i > 20) {
            clearInterval(time)
            this.calcRoute(terminalPoint, routePoint, false)
            this.setData({
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
      else{
        wx.showToast({
          title:'没有城市列表',
          icon:'none'
        })
      }
    }
    else{
      if(this.data.isDouble){
        this.setData({
          moveX: this.data.routeWid - 38,
          partnerMove: this.data.partnerWid - 38
        })
      }
      else{
        this.setData({
          moveX: this.data.routeWid - 38
        })
      }
      timer = setTimeout(()=>{
        this.setData({
          isArrive: true
        })
      },2500)
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

  //带下划线的为监听组件内的事件
  _confirm() {
    let start = new StartGame()
    start.terminal = this.data.destination
    start.fetch().then((req) => {
      wx.navigateTo({
        url: '../play/play?rid='+req.rid,
      })
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