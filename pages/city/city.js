// pages/city/city.js
const app = getApp();
import { shareToIndex } from '../../utils/util.js';
const sheet = require('../../sheets.js');
import { TicketType } from '../../api.js';
let cid;//选中的城市id
let location;//用户现在所在城市
let province = [] , pages = 1 , endPage = true;
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
  },

  toStart(e) {
    if (app.preventMoreTap(e)) return;
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

  toRandom(e) {
    if (app.preventMoreTap(e)) return;
    wx.redirectTo({
      url: '../start/start?random=true&type=' + TicketType.RANDOMBUY,
    })
  },

  choose(e) {
    // if (app.preventMoreTap(e)) return;
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

  getProvince() {
    this.pageProvince(pages,10)
  },

  pageProvince(page,limit) {
    let start = (page-1)*limit
    let end = page*limit
    for (let i = start; i < end; i++) {
      // console.log(i, 'testI', sheet.Find.Get(i + 1) , page ,'page')
      let item = sheet.Find.Get(i + 1);
      if (item && item.province != item.city) {
        // console.log(item, true, i)
        let obj = {}
        obj.init = item.pword;
        obj.name = item.province;
        obj.cities = item.city;
        obj.cityid = item.cityid;
        province.push(obj);
        // console.log(province,'push province')
      }
      else if(item == null){
        if(endPage){
          // console.log('setData')
          this.setData({
            province,
          })
          endPage = false
        }
        pages++
        
        return;
      }
    }
    // console.log(province)
    pages++
    this.setData({
      province,
    })
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
    return shareToIndex(this)
  },
})