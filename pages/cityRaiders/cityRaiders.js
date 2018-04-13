
const app = getApp();
import { shareToIndex } from '../../utils/util.js';
import { CityListPer, ProvencePer } from '../../api.js'
import { ymd } from '../../utils/rest.js'
let city //选中的城市
let cityId = ''
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
      let zimu = ''
      for(let i = 0;i< arr.length;i++) {
        if (zimu == '') zimu = arr[i].proLetter
        else {
          if (zimu == arr[i].proLetter) arr[i].proLetter = ''
          else zimu = arr[i].proLetter
        }
      }
      this.setData({
        allCity: cityArr,
        cityData: arr,
        myAbc: arr.map(o => {
          return o.proLetter
        })
      })
      ///test------
      let arr1 = []
      this.data.myAbc.forEach(o=>{
        if(o != '') arr1.push(o)
      })
      let abc = this.data.abc
      for (let i = 0; i < abc.length; i++) {
        if (abc[i] == arr1[i]) continue
        else arr1.splice(i, 0, '')
      }
      this.setData({
        myAbc: arr1
      })
console.log('arr1',arr1)
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
      checkId: e.currentTarget.dataset.cityId
    })
    console.log(this.data.checkId)
    city = e.currentTarget.dataset.city
    cityId = e.currentTarget.dataset.cityId
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
      url: '../pointRaiders/pointRaiders?city=' + city+ '&cid='+cityId   //还要把城市id传过去
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this,1)
  }
})