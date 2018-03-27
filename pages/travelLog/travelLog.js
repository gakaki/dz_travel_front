// pages/travelLog/travelLog.js
import { formatTime } from '../../utils/util.js'


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
    for(let i in data) {
      data[i].time = this.formatTime('2018-3-5',1);
    }
    this.setData({
      init: data
    })
  },
  formatTime(time,type){
     let arr = time.spilt('-')
     if (dateType == 1) {
       return arr.join('/')
     }
     return arr[0] + '月' + day + '日'
     
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})