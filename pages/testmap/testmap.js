// pages/testmap/testmap.js

const mapAssetsRoot = '../../assets/province/'
const mapWidth = 714;
const mapHeight = 828;
const provinces = [
    {name:'新疆',statusImgs:['xinjiang'], x: 2, y: 73, imgWd:285, imgHt:216},
    {name:'内蒙',statusImgs:['neimeng'], x: 296, y: 11, imgWd:313, imgHt:269},
    {name:'甘肃',statusImgs:['gansu'], x: 232, y: 190, imgWd:206, imgHt:168},
    {name:'黑龙江',statusImgs:['heilongjiang'], x: 550, y: 5, imgWd:158, imgHt:142},
    {name:'吉林',statusImgs:['jilin'], x: 578, y: 117, imgWd:117, imgHt:82},
    {name:'辽宁',statusImgs:['liaoning'], x: 557, y: 161, imgWd:82, imgHt:80},
    {name:'河北',statusImgs:['hebei'], x: 497, y: 187, imgWd:77, imgHt:108},
    {name:'北京',statusImgs:['beijing'], x: 519, y: 213, imgWd:27, imgHt:29},
    {name:'天津',statusImgs:['tianjin'], x: 535, y: 225, imgWd:16, imgHt:28},
    {name:'山西',statusImgs:['shanxii'], x: 459, y: 222, imgWd:51, imgHt:102},
    {name:'陕西',statusImgs:['shanxi'], x: 395, y: 242, imgWd:76, imgHt:128},
    {name:'宁夏',statusImgs:['ningxia'], x: 381, y: 246, imgWd:44, imgHt:71},
    {name:'青海',statusImgs:['qinghai'], x: 184, y: 242, imgWd:178, imgHt:126},
    {name:'西藏',statusImgs:['xizang'], x: 32, y: 270, imgWd:275, imgHt:170},
    {name:'山东',statusImgs:['shandong'], x: 519, y: 256, imgWd:95, imgHt:62},
    {name:'河南',statusImgs:['henan'], x: 459, y: 292, imgWd:85, imgHt:79},
    {name:'四川',statusImgs:['sichuan'], x: 285, y: 326, imgWd:153, imgHt:135},
    {name:'江苏',statusImgs:['jiangsu'], x: 539, y: 302, imgWd:83, imgHt:67},
    {name:'安徽',statusImgs:['anhui'], x: 522, y: 314, imgWd:70, imgHt:82},
    {name:'上海',statusImgs:['shanghai'], x: 609, y: 351, imgWd:15, imgHt:17},
    {name:'浙江',statusImgs:['zhejiang'], x: 573, y: 363, imgWd:58, imgHt:64},
    {name:'湖北',statusImgs:['hubei'], x: 437, y: 344, imgWd:110, imgHt:68},
    {name:'重庆',statusImgs:['chongqing'], x: 394, y: 362, imgWd:68, imgHt:64},
    {name:'江西',statusImgs:['jiangxi'], x: 513, y: 387, imgWd:69, imgHt:95},
    {name:'湖南',statusImgs:['hunan'], x: 444, y: 394, imgWd:80, imgHt:88},
    {name:'贵州',statusImgs:['guizhou'], x: 370, y: 410, imgWd:85, imgHt:74},
    {name:'云南',statusImgs:['yunnan'], x: 280, y: 408, imgWd:130, imgHt:131},
    {name:'广西',statusImgs:['guangxi'], x: 382, y: 452, imgWd:113, imgHt:83},
    {name:'福建',statusImgs:['fujian'], x: 548, y: 412, imgWd:64, imgHt:79},
    {name:'广东',statusImgs:['guangdong'], x: 459, y: 464, imgWd:113, imgHt:90},
    {name:'台湾',statusImgs:['taiwan'], x: 613, y: 453, imgWd:26, imgHt:58},
    {name:'海南',statusImgs:['hainan'], x: 444, y: 546, imgWd:38, imgHt:33},
].map(o => {
  o.statusImgs = o.statusImgs.map(m => {
      return mapAssetsRoot + m + '.png';
  })
    return o;
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areas:provinces,
      mapBg : mapAssetsRoot + 'china.png',
      mapWidth,
      mapHeight,
      mapZ: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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