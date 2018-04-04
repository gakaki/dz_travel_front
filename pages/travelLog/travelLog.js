// pages/travelLog/travelLog.js
import { formatTime } from '../../utils/util.js'
import { TravelLog } from '../../api.js';
const app = getApp();
import { shareSuc, shareTitle } from '../../utils/util.js';


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