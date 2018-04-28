// components/sign/sign.js
import { Login, logins } from '../../sheets.js';
import { ToSign } from '../../api.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theDay:{
      type:Number,
      value: 1
    },
    hasSign:{  //1代表以及签完,0代表么有
      type: Number,
      value: 1
    }
  },
  data:{
    isFirst:true
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
      // if (this.data.isFirst) {
      //   this.data.isFirst = false;
        let m = new ToSign();
        m.theDay = this.data.theDay
        m.fetch().then(res=>{
          let title = '金币+' + this.data.init[this.data.theDay-1]
          this.setData({
            theDay: this.data.theDay + 1
          })
          setTimeout(() => {
            this.setData({
              hasSign: 1
            })
          }, 1000)
          wx.showToast({
            title,
            icon: "none"
          })
          this.triggerEvent("sign")
        })
        
      // }
      
    }
  }
})
