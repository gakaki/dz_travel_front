  // pages/xiangce/xiangce.js
const app = getApp();
import { shareToIndex } from '../../utils/util.js';
import { CityPostcards } from '../../api.js';
let province = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewpoint: true,
    specialty: false,
    none:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.uid) {
      this.data.uid = options.uid
    }
    wx.setNavigationBarTitle({
      title: options.province
    })
    if (options && options.province) {
      province = options.province;
    } else {
      console.log('忘记传省份给我拉')
    }
    this.getPostcardInfo(0, province)
    
    
  },
  toMsgPost(e) {
    if(this.data.uid) {return}
    let v = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../checkPostcard/checkPostcard?id=' + v.id + '&postid=' + v.postid
    })
   
  },
  chgTab(e) {
    let v = e.currentTarget.dataset.id;
    if(v) {
      this.getPostcardInfo(1, province)
      this.setData({
        viewpoint: false,
        specialty: true
      })
    } else {
      this.getPostcardInfo(0, province)
      this.setData({
        viewpoint: true,
        specialty: false
      })
    }
    
  },
  getPostcardInfo(lm, province){
    let m = new CityPostcards();
    m.LM = lm;
    m.province = province;
    if(this.data.uid) {
      m.playerUid = this.data.uid
    }
    m.fetch().then(res => {
      if(lm == 0) {
        this.setData({
          allInit: res.postcardInfo
        })
      } else {
        if (!res.postcardInfo.length) {
          this.setData({
            none: true
          })
        } else {
          this.setData({
            none: false
          })
        }
        this.setData({
          LMInit: res.postcardInfo
        })
      }
      
    })
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  }
})