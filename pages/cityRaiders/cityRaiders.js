
const app = getApp();
import { shareSuc, shareTitle } from '../../utils/util.js';
import { CityListPer, ProvencePer } from '../../api.js'
import { ymd } from '../../utils/rest.js'
let city //选中的城市
let arr  //数据列表
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: (app.globalData.userInfo && app.globalData.userInfo.gender) || 1,
    allCity: [],
    focus: false,
    isChoose: '',
    position: '',
    abc: ['A', 'B', 'C', 'F', 'G', 'H', 'J', 'L', 'N', 'Q', 'S', 'T', 'X', 'Y', 'Z'],
    myAbc: [],  //wo去过的省
    num: 0, //选中的第几个字母,
    checkId: '',
    cityData: [],
    id: 'A',
    animationData: {},
    walkArr: [{ x: 0, y: 0, tX: 100, tY: 100, time: 3000 }, { x: 50, y: 50, tX: 150, tY: 150, time: 3000 }, { x: 150, y: 150, tX: 250, tY: 250, time: 3000 }],
    walkInfo: { x: 0, y: 0, tX: 100, tY: 100, time: 3000 },
  },

  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '城市攻略'
    })
    let m = new CityListPer()
    m.fetch().then(res => {
      arr = res.data.slice()
      console.log(arr, '城市完成度列表')
      let cityArr = []
      arr.forEach(item => {
        item.citys.forEach(v => {
          cityArr = cityArr.concat(v.cityname)
        })
      })
      this.setData({
        allCity: cityArr,
        cityData: arr,
        myAbc: arr.map(o => {
          return o.proLetter
        })
      })
      ///test------
      let arr1 = this.data.myAbc
      let abc = this.data.abc
      for (let i = 0; i < abc.length; i++) {
        if (abc[i] == arr1[i]) continue
        else arr1.splice(i, 0, '')
      }
      this.setData({
        myAbc: arr1
      })

    })



    //test----


    //模拟的数据
    // for (let i = 0; i < this.data.abc.length-3;i++) {
    //    let xx = new ProvencePer()
    //   xx.proLetter = this.data.abc[i]
    //   xx.proName = '四川'
    //   xx.citys = [{ cityname: '成都', cityper: 100 }, { cityname: '成都', cityper: 100 }, { cityname: '成都', cityper: 100 }]
    //   arr.push(xx)
    // }
    // let cityArr = []
    // arr.forEach(item => {
    //   item.citys.forEach(v => {
    //     cityArr = cityArr.concat(v.cityname)
    //   })
    // })
    // this.setData({
    //   allCity: cityArr,
    //   cityData: arr,
    //   myAbc: arr.map(o => {
    //     return o.proLetter
    //   })
    // })
    // ///test------
    // let arr1 = this.data.myAbc
    // let abc = this.data.abc
    // for (let i = 0; i < abc.length; i++) {
    //   if (abc[i] == arr1[i]) continue
    //   else arr1.splice(i, 0, '')
    // }
    // this.setData({
    //   myAbc: arr1
    // })
  },
  choose(e) {
    this.setData({
      num: e.currentTarget.dataset.idx,
      id: this.data.abc[e.currentTarget.dataset.idx]
    })
  },
  check(e) {
    this.setData({
      checkId: e.currentTarget.dataset.id
    })
    city = e.currentTarget.dataset.city
  },
  focus(e) {
    this.setData({
      focus: true,
    })
  },
  _back() {
    this.setData({
      focus: false,
      isChoose: ''
    })
  },

  _selected(e) {
    wx.navigateTo({
      url: '../pointRaiders/pointRaiders?city=' + e.detail.select   //还要把城市id传过去
    })
  },
  tocR() {
    wx.navigateTo({
      url: '../pointRaiders/pointRaiders?city=' + city   //还要把城市id传过去
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
  testZuobiao(e) {
    console.log(e)
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