// components/newPlayer/newbieGuide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    allImgs:[
      'https://gengxin.odao.com/update/h5/travel/newbieGuide/1.png',
      'https://gengxin.odao.com/update/h5/travel/newbieGuide/2.png',
      'https://gengxin.odao.com/update/h5/travel/newbieGuide/3.png',
      'https://gengxin.odao.com/update/h5/travel/newbieGuide/4.png',
      'https://gengxin.odao.com/update/h5/travel/newbieGuide/5.png',
      'https://gengxin.odao.com/update/h5/travel/newbieGuide/6.png',
    ],
    index:0,
    mask:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toNext(){
      this.setData({
        index:this.data.index + 1
      })
    },
    toPrev(){
      this.setData({
        index: this.data.index - 1
      })
    },
    toSure(){
      this.setData({
        index: 0,
        mask:false
      })
    }
  }
})
