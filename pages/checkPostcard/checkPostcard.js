import { spliceStr } from '../../utils/util.js'
import { DetailPostcard, SendPostcard } from '../../api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secTa: true,
    tipPOp: false,
    lastestMessage:null,
    mes1:'',
    mes2:'',
    btnInfo:'分享明信片',
    nickName:'',
    write:false,
    allMessage:null,
    index:0
    
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
  },
  getData(){
    if (this.data.id) {
      let m = new DetailPostcard();
      m.id = this.data.id;
      m.fetch().then(res=>{
        console.log(res)
        this.data.postid = res.postid;
        if (res.lastestMessage.length) {
          this.setData({
            allMessage: res.lastestMessage
          })
          this.nowInfo(this.data.index)
        } else {
          this.setData({
            write: true
          })
        }
      })
    }
  },
  nowInfo(i){
    let allMessage = this.data.allMessage;
    this.setData({
      lastestMessage: allMessage[i],
      nickName: spliceStr(allMessage[i].userInfo.nickName, 8)
    })
    this.spiltMessage(allMessage[i].message);
  },
  spiltMessage(mes){
    let mes1='';
    let mes2='';
    if (mes.length > 54) {
      mes1 = mes.substring(0, 54);
      mes2 = mes.substring(54)
    } else {
      mes1 = mes
    }
    this.setData({
      mes1,
      mes2,
      btnInfo:'留言',
      write:false
    })
  },
  hideTipPop() {
    this.setData({
      tipPOp: false
    })
  },
  formSubmit(e) {
    if (this.data.btnInfo == '留言') {
      this.setData({
        btnInfo: '发送明信片',
        write: true,
        index:0
      })
    } else {
      let str = e.detail.value.ta1 + e.detail.value.ta2;
      if(str.trim().length) {
        let m = new SendPostcard();
        m.id = this.data.id;
        m.message = str;
        m.fetch().then(res => {
          console.log(res)
        })
      }
      this.setData({
        tipPOp: true
      })
    }
    
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
  toUp() {
    this.data.index = this.data.index + 1;
    this.nowInfo(this.data.index);
  },
  toDown() {
    this.data.index = this.data.index - 1;
    this.nowInfo(this.data.index);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function () {

      }
    }
  }
})