import { spliceStr } from '../../utils/util.js'
import { DetailPostcard, SendPostcard } from '../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secTa: true,
    tipPOp: false,
    nn: '速度放缓的风格和的风格和',
    message:null,
    mes1:'123',
    mes2:'345',
    page:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options && options.id) {
      this.data.id = options.id
    }
    if (options && options.postid) {
      this.data.postid = options.postid
    }  
    
    this.getData()
    
    this.setData({
      nn: spliceStr(this.data.nn,7)
    })
  },
  getData(toNext = true){
    if (this.data.id) {
      let m = new DetailPostcard();
      m.id = this.data.id;
      m.messageLength = 1;
      m.page = this.data.page;
      m.fetch().then(res=>{
        console.log(res)
        if (toNext) {
          this.data.page = this.data.page + 1
        } else {
          this.data.page = this.data.page -1
        }
        this.data.postid = res.postid;
        this.setData({
          message: res.lastestMessage[0]
        })
      })
    }
  },
  hideTipPop() {
    this.setData({
      tipPOp: false
    })
  },
  formSubmit(e) {
    let str = e.detail.value.ta1 + e.detail.value.ta2
    let m = new SendPostcard();
    m.id = this.data.id;
    m.message = str;
    m.fetch().then(res=>{
      console.log(res)
    })
    this.setData({
      tipPOp: true
    })
  },
  bindInput(e) {
    if (e.detail.cursor == 54) {
      this.setData({
        secTa: false
      })
    }
  },
  bindInputSec(e) {
    if (e.detail.cursor == 0) {
      this.setData({
        secTa: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})