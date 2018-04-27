// pages/city/city.js
const app = getApp();
import { shareToIndex } from '../../utils/util.js';
const sheet = require('../../sheets.js');
import { TicketType } from '../../api.js';
let cid;//选中的城市id
let location;//用户现在所在城市
let province = [] , pages = 1 , endPage = true;
let preventTapClick = false;  //阻止用户在购买随机机票和确定之间快速切换点击导致进入下一个页面显示错误
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
    location = options.location;
    // let readCity = sheet.finds.map(o=>{
    //   let obj={}
    //   obj.init =  new sheet.Find(o).pword;
    //   obj.name = new sheet.Find(o).province;
    //   obj.cities = new sheet.Find(o).city;
    //   obj.cityid = new sheet.Find(o).cityid;
    //   return obj;
    // })
    // //过滤掉直辖市和特别行政区
    // let province = readCity.filter((item)=>{
    //   return item.name!=item.cities
    // })
    
    this.pageProvince(pages,10)
    
  },

  onUnload() {
    province = []; 
    pages = 1; 
    endPage = true;
    preventTapClick = false;
  },

  toStart(e) {
    if (app.preventMoreTap(e)) return;
    if (!preventTapClick){
      preventTapClick = true;
      if (this.data.isChoose) {

        this.toFly(cid, this.data.isChoose, TicketType.SINGLEBUY)
      }
      else {
        wx.showToast({
          title: '请选择目的地',
          icon: 'none'
        })
        preventTapClick = false
      }
    }
    
  },

  toRandom(e) {
    if (app.preventMoreTap(e)) return;
    if (!preventTapClick){
      preventTapClick = true
      wx.redirectTo({
        url: '../start/start?random=true&type=' + TicketType.RANDOMBUY,
      })
    }
  },

  choose(e) {
    // if (app.preventMoreTap(e)) return;
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
      preventTapClick = false
    }
    else{
      wx.redirectTo({
        url: '../start/start?cid=' + cid + '&terminal=' + terminal + '&type=' + ticket,
      })
    }
  },

  getProvince() {
    this.pageProvince(pages,10)
  },

  pageProvince(page,limit) {
    let start = (page-1)*limit
    let end = page*limit
    for (let i = start; i < end; i++) {
      let item = sheet.Find.Get(i + 1);
      if (item && item.province != item.city) {
        let obj = {}
        obj.init = item.pword;
        obj.name = item.province;
        obj.cities = item.city;
        obj.cityid = item.cityid;
        province.push(obj);
      }
      else if(item == null){
        if(endPage){
          this.setData({
            province,
          })
          endPage = false
        }
        pages++
        
        return;
      }
    }
    pages++
    this.setData({
      province,
    })
  },

  international() {
    wx.showToast({
      title: '国际航班暂未开放，敬请期待',
      icon: 'none'
    })
  },

  _back() {
    this.setData({
      focus: false,
      isChoose:''
    })
  },

  _selected(e) {
    this.toFly(e.detail.id, e.detail.select, TicketType.SINGLEBUY)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  },
})