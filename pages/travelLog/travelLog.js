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
    init:[],
    index:1,
    uid:'',
    hasInfo:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.uid) {
      this.data.uid = options.uid;
    }
    this.getData()
  },
  getData(options){
    if (this.data.hasInfo) {
      let length = 20;
      let m = new TravelLog(); 
      if (this.data.uid) {
        m.playerUid = this.data.uid;
      }
      m.page = this.data.index;
      m.fetch().then(req => {
        let logs = this.data.init.concat(req.allLogs);
        this.setData({
          init: logs,
          myIdx: 'myIdx' + (logs.length - 1)
        })
        this.data.index = this.data.index + 1;
        if (logs.length < length) {
          this.data.hasInfo = false
        }
      })
    }
    
  },
  upper(){
    console.log(222222)
    this.getData()
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