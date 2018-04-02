// pages/settings/settings.js
import { GetRealInfo, ModifyRealInfo } from '../../api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'请输入真实姓名',
    birthday:'请输入生日',
    phone:'请输入手机号',
    address:'请输入地址'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let req = new GetRealInfo();
    req.fetch().then(()=>{
      this.getInfo(req)
    })
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
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  //提交的表单数据（用户收货信息）
  formSubmit(e) {
    console.log(e.detail.value)
    let value = e.detail.value
    let req = new ModifyRealInfo();
    req.name = value.name;
    req.birthday = value.birthday;
    req.phone = value.phone;
    req.address = value.address;
    req.fetch().then(()=>{
      this.getInfo(req,()=>{
        wx.showToast({
          title: '已保存',
          icon: 'none'
        })
      })
    })
  },

  getInfo(req,suc) {
    if (req.code != 0) {
      wx.showToast({
        title: '请求数据失败',
        icon:'none'
      })
    }
    else {
      let info = req.realInfo;
      //当用户所有信息都有的时候显示用户信息
      if (info.name && info.birthday && info.phoneNumber && info.address) {
        this.setData({
          name: info.name,
          birthday: info.birthday,
          phone: info.phoneNumber,
          address: info.address
        })
        suc()
      }
    }
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