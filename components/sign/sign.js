// components/sign/sign.js
import { Login, logins } from '../../sheets.js';
let isFirst = true;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSign:{
      type:Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasSign:3
  },
  attached:function(){
    let init = []
    init = logins.map(v=>{
      return v.gold
    })
    this.setData({
      init
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toSign(){
      if(isFirst) {
        isFirst = false;
        let title = '恭喜获得' + this.data.init[this.data.hasSign+1]+ '金币'
        this.setData({
          hasSign: this.data.hasSign + 1
        })
        setTimeout(()=>{
          this.setData({
            showSign: false
          })
        },1000)
        wx.showToast({
          title,
          icon:"none",
          duration:1000
        })
      }
      
    }
  }
})
