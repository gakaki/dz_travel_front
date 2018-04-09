// pages/settings/settings.js
import { GetRealInfo, ModifyRealInfo, Code } from '../../api.js'
import { shareToIndex } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'请输入真实姓名',
    birthday:'请输入生日',
    phone:'请输入手机号',
    address:'请输入地址',
    changeColor: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.settings) {
      this.data.settings = options.settings;
    }
    let req = new GetRealInfo();
    req.fetch().then(()=>{
      console.log(req,'setting数据')
      this.getInfo(req)
    })
  },

  //提交的表单数据（用户收货信息）
  formSubmit(e) {
    console.log(e.detail.value)
    
    let value = e.detail.value
    //判断电话号码是否符合
    if (value.phone.length != 11 && value.phone){
      wx.showToast({
        title: '请输入正确的电话号码',
        icon: 'none'
      })
      return;
    }
    let req = new ModifyRealInfo();
    req.name = value.name ? value.name : this.data.name;
    req.birthday = value.birthday ? value.birthday : this.data.birthday;
    req.phone = value.phone ? value.phone : this.data.phone;
    req.address = value.address ? value.address : this.data.address;
    req.fetch().then(()=>{
      console.log(req)
      this.getInfo(req,()=>{
        wx.showToast({
          title: '已保存',
          icon: 'none',
          duration:1000
        })
        
        if (this.data.settings) {
          setTimeout(() => {
          wx.navigateBack({
            delta: 1
            })
          }, 1000)
        }
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
        suc && suc()
      }
    }
  },

  chooseDate(e) {
    console.log(e.detail.value)
    if(e.detail.value != this.data.birthday){
      this.setData({
        birthday: e.detail.value,
        changeColor: true 
      })
    }
    
  },

  checkPhone(e) {
    if(e.detail.value.length != 11 ){
      wx.showToast({
        title: '请输入正确的电话号码',
        icon: 'none'
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,1)
  }
})