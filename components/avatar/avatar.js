// components/avatar/avatar.js
Component({
  /**
   * 组件的属性列表
   */
  
  
  properties: {
    src:{
      type:String,
      value:''
    },
    integral:{
      type: String,
      value:'5000'
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
