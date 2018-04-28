// components/avatar/avatar.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  
  
  properties: {
    src:{
      type:String,
      value:''
    },
    nickname:{
      type: String,
      value: ''
    },
    integral:{
      type: Number,
      value:0
    },
    goldNum:{
      type:Number,
      value:0
    },
    hasGoldIcon:{
      type:Boolean,
      value:true
    },
    hasIntegral:{
      type:Boolean,
      value:true
    },
    showGoldAndIntegral:{
      type: Boolean,
      value: true
    },
    avatarWid:{
      type:Number,
      value:120
    },
    avatarHeg:{
      type: Number,
      value: 120
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultImg: app.globalData.defaultAvatar
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
