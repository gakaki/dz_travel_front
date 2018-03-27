import { CityListPer, ProvencePer } from '../../api.js'
import { ymd } from '../../utils/rest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    isChoose: '',
    position: '',
    abc: ['A', 'B', 'C', 'F', 'G', 'H', 'J', 'L', 'N', 'Q', 'S', 'T', 'X', 'Y', 'Z'],
    myAbc: [],  //wo去过的省
    num: 0, //选中的第几个字母,
    checkId: '',
    cityData: [],
    id: 'A'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //test----
    let arr = []
    for (let i = 0; i < this.data.abc.length-3;i++) {
       let xx = new ProvencePer()
      xx.proLetter = this.data.abc[i]
      xx.proName = '四川'
      xx.citys = [{ cityname: '成都', cityper: 100 }, { cityname: '成都', cityper: 100 }, { cityname: '成都', cityper: 100 }]
      arr.push(xx)
    }
    console.log(arr)
     this.setData({ 
       cityData: arr,
       myAbc: arr.map(o => {
         return o.proLetter
       })
       }) 
    ///test------
    let arr1 = this.data.myAbc
    let abc = this.data.abc
    for(let i = 0;i<abc.length;i++) {
      if(abc[i] == arr1[i]) continue
      else arr1.splice(i,0,'')
    }
    this.setData({
      myAbc: arr1
    }) 
    //this.pullList()
  },
  pullList() {
    // let req = new CityListPer();
    // req.fetch().then(req => {
    //   this.setData({
    //     cityData: req.data,
    //   })
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
    console.log(e.detail.select)
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