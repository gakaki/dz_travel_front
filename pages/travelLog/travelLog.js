// pages/travelLog/travelLog.js
import { formatTime, shareToIndex } from '../../utils/util.js'
import { TravelLog } from '../../api.js';
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    init:[],
    index:1,
    uid:null,
    hasInfo:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.uid) {
      this.setData({
        uid:options.uid
      })
    }
    console.log(this.data.uid)
    this.getData()
  },
  getData(){
    if (this.data.hasInfo) {
      let length = 20;
      let m = new TravelLog(); 
      if (this.data.uid) {
        m.playerUid = this.data.uid;
      }
      m.page = this.data.index;
      m.fetch().then(req => {
        let logs = req.allLogs.concat(this.data.init);
        // let logs = this.data.init.concat(req.allLogs);
        console.log(req.allLogs.length - 1)
        this.setData({
          init: logs,
          myIdx: 'myIdx' + (req.allLogs.length - 1)
        })
        console.log(this.data.myIdx)
        this.data.index = this.data.index + 1;
        if (logs.length < length) {
          this.data.hasInfo = false
        }
      })
    }
    
  },
  upper(){
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
    return shareToIndex(this,{type:6},{'travelLog':true})
  }
})