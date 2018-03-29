// pages/travelLog/travelLog.js
import { formatTime } from '../../utils/util.js'
import { TravelLog, Base } from '../../api.js';

let data = [{
  city: '南京',
  time: '3月15日',
  car: true,
  scenicSpots: ['种树领', '秦淮河']
},
{
  time: '3月15日',
  car: false,
  scenicSpots: ['种树领']
},
{
  city: '北京',
  time: '3月15日',
  car: false,
  scenicSpots: ['种树领', '秦淮河heheheeehh']
},
{
  time: '3月15日',
  car: true,
  scenicSpots: ['种树领', '秦淮河heheheeehh']
},
{
  city: '苏州',
  time: '3月15日',
  car: false,
  scenicSpots: ['种树领', '秦淮河heheheeehh']
}]


Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
  },
  formatTime(time, dateType){
     let arr = time.split('-')
     if (dateType == 1) {
       return arr.join('/')
     }
     return arr[1] + '月' + arr[2] + '日'
     
  },
  onReady(){
    let req = new TravelLog();
    req.fetch().then(req => {
      console.log(88888888, req.allLogs)
      this.setData({
        init: req.allLogs
      })
     
    })

    // for(let i in data) {
    //   data[i].time = this.formatTime('2018-3-5');
    // }
    // this.setData({
    //   init: data
    // })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})