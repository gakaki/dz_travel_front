// components/none/none.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:''
    },
    tip: {
      type: String,
      value: ''
    },
    btnInfo:{
      type: String,
      value: null
    },
    all:{
      type:String,
      value:false
    },
    src:{
      type:String,
      value:null
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
    toShop:function(){
      this.triggerEvent('toShop')
    }
  }
})
