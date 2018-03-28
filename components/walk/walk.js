// components/walk/walk.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    walkInfo: {
      type:Object,
      value: {x:0,y:0,tX:100,tY:100,time:3000}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {}
  },
  ready() {
    //行走动画
    let animation = wx.createAnimation({
      duration: this.properties.walkInfo.time,
      timingFunction: 'linear',
    })

    this.animation = animation
    animation.left(this.properties.walkInfo.tX + 'rpx').top(this.properties.walkInfo.tY + 'rpx').step()
    this.setData({
      animationData: animation.export()
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
