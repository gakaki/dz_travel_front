// pages/city/city.js
const app = getApp();
import { shareToIndex } from '../../utils/util.js';
const sheet = require('../../sheets.js');
import { TicketType } from '../../api.js';
let cid;//选中的城市id
let location;//用户现在所在城市
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDomestic:true,
    province: [],
    focus:false,
    isChoose:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.title)
    location = options.location;

    let readCity = sheet.finds.map(o=>{
      let obj={}
      obj.init =  new sheet.Find(o).pword;
      obj.name = new sheet.Find(o).province;
      obj.cities = new sheet.Find(o).city;
      obj.cityid = new sheet.Find(o).cityid;
      return obj;
    })
    //过滤掉直辖市和特别行政区
    let province = readCity.filter((item)=>{
      return item.name!=item.cities
    })
    this.setData({
      province,
    })
  },

  toStart() {
    if(this.data.isChoose){
      
      this.toFly(cid, this.data.isChoose, TicketType.SINGLEBUY)
    }
    else{
      wx.showToast({
        title: '请选择目的地',
        icon:'none'
      })
    }
  },

  toRandom() {
    wx.redirectTo({
      url: '../start/start?random=true&type=' + TicketType.RANDOMBUY,
    })
  },

  choose(e) {
    console.log(e.currentTarget.dataset)
    cid = e.currentTarget.dataset.id
    this.setData({
      isChoose: e.currentTarget.dataset.ind
    })
  },

  focus(e) {
    this.setData({
      focus:true,
    })
  },

  toFly(cid,terminal,ticket) {
    if(location == terminal){
      wx.showToast({
        title: '已在当前城市，请重新选择',
        icon: 'none'
      })
    }
    else{
      wx.redirectTo({
        url: '../start/start?cid=' + cid + '&terminal=' + terminal + '&type=' + ticket,
      })
    }
  },

  _back() {
    this.setData({
      focus: false,
      isChoose:''
    })
  },

  _selected(e) {
    console.log(e.detail)
    this.toFly(e.detail.id, e.detail.select, TicketType.SINGLEBUY)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,1)
  },
})