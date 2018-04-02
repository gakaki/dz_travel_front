// pages/travelLog/travelLog.js
import { formatTime } from '../../utils/util.js'
import { TravelLog } from '../../api.js';


let data = [
    {
      city: '北京',
      time: '3月20日',
      scenicSpots: [{
        time: '3月20日',
        spots: ['种树领', '秦淮河']
      }, {
        time: '3月21日',
        spots: ['故宫', '长城','aaa']
      }]
    },
    {
      city: '南京',
      time: '3月18日',
      scenicSpots: [{
        time: '3月18日',
        spots: ['种树领', '秦淮河', '我 的']
      }, {
        time: '3月19日',
        spots: ['故宫', '长城']
      },
      {
        time: '3月20日',
        spots: ['故宫', 'A']
      }]
    },
    {
      city: '上海',
      time: '2月18日',
      scenicSpots: [{
        time: '2月18日',
        spots: ['种树领', '秦淮河', '我 的']
      }, {
        time: '2月19日',
        spots: ['故宫', '长城']
      }]
    },
    {
      city: '上海',
      time: '2月18日',
      year: '2018',
      scenicSpots: [{
        time: '2月18日',
        spots: ['种树领', '秦淮河', '我 的']
      }, {
        time: '2月19日',
        spots: ['故宫', '长城']
      }]
    },
    {
      city: '上海',
      time: '12月01日',
      scenicSpots: [{
        time: '12月5日',
        spots: ['种树领', '秦淮河', '我 的']
      }]
    },
    {
      city: '上海',
      time: '12月01日',
      year:'2017',
      scenicSpots: [{
        time: '12月5日',
        spots: ['种树领', '秦淮河', '我 的']
      }]
    },
  ]





Page({

  /**
   * 页面的初始数据
   */
  data: {
    init:null,
    // myIdx: 'myIdx' + (this.data.init.length-1)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let req = new TravelLog();
    req.fetch().then(req => {
      console.log(req.allLogs)
      this.setData({
        init: req.allLogs
      })

    })
    
  },
  formatTime(time, dateType){
     let arr = time.split('-')
     if (dateType == 1) {
       return arr.join('/')
     }
     return arr[1] + '月' + arr[2] + '日'
     
  },
  onReady(){
    // let req = new TravelLog();
    // req.fetch().then(req => {
    //   console.log(88888888, req.allLogs)
    //   this.setData({
    //     init: req.allLogs
    //   })
     
    // })

    // for(let i in data) {
    //   data[i].time = this.formatTime('2018-3-5');
    // }
    // this.setData({
    //   init: data
    // })
  },
  toCity(){
    wx.navigateTo({
      url: '../cityRaiders/cityRaiders',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})