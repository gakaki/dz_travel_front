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
      value:false
    },
    hasIntegral:{
      type:Boolean,
      value:false
    },
    showGoldAndIntegral:{
      type: Boolean,
      value: false
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
