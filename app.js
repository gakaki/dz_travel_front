//app.js
import { start } from './utils/rest.js';
App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    //获取登录时的网络状态
    wx.getNetworkType({
      success: function(res) {
        console.log(res.networkType)
        if(res.networkType=='none'){
          that.globalData.noNetwork = true
          wx.showLoading({
            title: '请检查网络状态',
          })
        }
      },
    })

    //监听网络状态
    wx.onNetworkStatusChange(function(res){
      if (res.isConnected){
        that.globalData.noNetwork = false
        wx.hideLoading()
      }
      else{
        that.globalData.noNetwork = true
        wx.showLoading({
          title: '请检查网络状态',
        })
      }
      
    })

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function(options) {
    console.log(options);
  },
  globalData: {
    userInfo: null,
    season: '',
    weather: '',
    gold: null,
    cid:null,
    cityName:null,
    isFirst: false,
    picBase:"https://gengxin.odao.com/update/h5/travel/",
    noNetwork:false,
  },
  //事件里的随机图片配置路径
  getEventPicURL(reqQuestPictureURL) {
    if (!reqQuestPictureURL) return reqQuestPictureURL;
    let url = this.globalData.picBase + reqQuestPictureURL;
    if (reqQuestPictureURL && reqQuestPictureURL.match(/\//)) { //有斜杠说明是正确的url 

    } else {
      //不然就是6.jpg这种了
      url = this.globalData.picBase + "play/eventimg/" + reqQuestPictureURL;
    }
    return url;
  },
  preventMoreTap: function (e) {
    let globaTime = this.globalData.globalLastTapTime;
    let time = e.timeStamp;
    if (Math.abs(time - globaTime) < 500 && globaTime != 0) {
      this.globalData.globalLastTapTime = time;
      return true;
    } else {
      this.globalData.globalLastTapTime = time;
      return false;
    }
  },
})