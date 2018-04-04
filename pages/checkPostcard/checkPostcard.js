const app = getApp();
import { spliceStr,shareSuc, shareTitle  } from '../../utils/util.js'
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
    tip:'',
    nickName:'',
    write:true,
    allMessage:null,
    index:0,
    time:'',
    message:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.title = shareTitle(4)
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
        //如果有留言,就将留言当成文本展示
        if (res.lastestMessage.length) {  
          this.setData({
            allMessage: res.lastestMessage,
            url:res.mainUrl
          })
          this.nowInfo(this.data.index)
        } 
      })
    }
  },
  nowInfo(i){ //展示最后一条留言
    let allMessage = this.data.allMessage;
    this.setData({
      lastestMessage: allMessage[i],
      nickName: spliceStr(allMessage[i].userInfo.nickName, 8),
      btnInfo: '留言',
      write: false,
      time: allMessage[i].time,
      message:''
    })
    this.spiltMessage(allMessage[i].message);  //展示的消息
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
      mes2
    })
  },
  sendPost(tip){
    let m = new SendPostcard();
    m.id = this.data.id;
    m.message = this.data.message;
    m.fetch().then(res => {
      console.log(res)
      this.setData({
        index:0
      })
      this.getData()
      this.showMask(this, '', tip)
    })
  },
  formSubmit(e) {
    let str = e.detail.value.ta1 + e.detail.value.ta2;
      //更新message数据,将message发送给后端
    this.setData({
      message:str
    })      

    if (this.data.btnInfo == '留言') {
      this.setData({
        btnInfo: '发送明信片',
        write: true,
        index:-1,
        nickName:'',
        time:''
      })
    } else {  //按钮在分享或者发送明信片时
      //如果玩家没有留言就开始点击分享明信片,提示玩家
      if (!str.trim().length) {
        this.showMask(this, '', '请先写信再分享至好友')
        return
      } 
      if (this.data.btnInfo == '发送明信片') {
        this.sendPost('发送成功')
      }

    }
    
  },
  bindInput(e) {
    //如果玩家有输入内容,则显示分享按钮
    let v = e.detail.value.trim();
    if (this.data.btnInfo == '分享明信片') {
      //判断点击按钮时是否出现微信分享
      this.setData({
        message: v.trim()
      })
    }
    if (e.detail.cursor == 54) {
      this.setData({
        secTa: false,
  
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
  showMask(_that,btnInfo,tip){
    _that.setData({
      tipPOp: true,
    })
    if (btnInfo) {
      _that.setData({
        btnInfo: btnInfo
      })
    }
    if(tip) {
      _that.setData({
        tip: tip
      })
    }
    setTimeout(() => {
      _that.setData({
        tipPOp: false
      })
    }, 1000)
  },
  hideTipPop(){
    this.setData({
      tipPOp: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _that = this;
    return {
      title: _that.data.title,
      path: '/page/index/index?shareUid: ' + _that.data.uid,
      success:function(){
        shareSuc()
        if (_that.data.btnInfo == '分享明信片') {
          _that.sendPost('分享成功')
        }
      }
    }
  }
})