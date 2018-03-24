import { CityList } from '../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: [{ init: 'A', name: '安徽', cities: ['合肥', '安庆', '蚌埠', '亳州', '巢湖', '池州', '滁州', '阜阳', '淮北', '淮南', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城'] }],
    focus: false,
    isChoose: '',
    position: '',
    abc: ['A','B','C','F','G','H','J','L','N','Q','S','T','X','Y','Z'],
    num: 0, //选中的第几个字母,
    checkId: '',
    cityData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pullList()
  },
  pullList() {
    let req = new CityList();
    req.fetch().then(req => {
      this.setData({
        cityData: req.data,
      })
    })
  },
  choose(e) {
this.setData({
  num: e.currentTarget.dataset.idx
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