let timer
let walkInfoObj = {}
let restTime = 0 // 当前的数据对象，此段路程剩余的时间
let curPoint = { x: 0, y: 0 }
import { Base } from '../../api.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    walkInfoArr: {
      type: Array,
      value: []
    },
    // walkInfo: {
    //   type: Object,
    //   value: { x: 0, y: 0, tX: 100, tY: 100, time: 3000 }
    // },
    sex: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    left: 0,
    walkInfo: { x: 0, y: 0, tX: 100, tY: 100, time: 3000 }  // time为未来的时间戳
  },
  attached() {

    //let st = Base.servertime  
    let st = 5500
    walkInfoObj =  this.properties.walkInfoArr.find((v,i)=>{
      return v.time>st
    })
    let lastObj = this.properties.walkInfoArr[walkInfoObj.idx-1]
    //一段路走过的百分比
    let per = (st - lastObj.time) / (walkInfoObj.time - lastObj.time)
    curPoint.x = parseInt( walkInfoObj.x + (walkInfoObj.tX - walkInfoObj.x)*per)
    curPoint.y = parseInt(walkInfoObj.y + (walkInfoObj.tY - walkInfoObj.y) * per)
    restTime = parseInt(lastObj.time + (walkInfoObj.time - lastObj.time)*per)
  },
  ready() {
    //行走动画
    timer = setInterval(() => {
      let l = this.data.left - 38 == -228 ? 0 : this.data.left - 38
      this.setData({
        left: l
      })
    }, 100)
    let fObj = { x: walkInfoObj.x, y: walkInfoObj.y, tX: curPoint.x, tY: curPoint.y, time: 1}
    this.setData({
      walkInfo: fObj
    })
    this.move(this.data.walkInfo)
    setTimeout(()=>{
      let obj = { x: curPoint.x, y: curPoint.y, tX: walkInfoObj.tX, tY: walkInfoObj.tY, time: restTime}
      this.setData({
        walkInfo: obj
      })
      this.move(this.data.walkInfo)
    },100)
   
  },
 
  detached() {
    timer = null
  },
  /**
   * 组件的方法列表
   */
  methods: {
    move(obj) {
      console.log(obj)
      //移动动画
      let animation = wx.createAnimation({
        duration: obj.time,
        timingFunction: 'linear',
      })

      this.animation = animation
      // animation.left(this.properties.walkInfo.tX - 19 + 'rpx').top(this.properties.walkInfo.tY - 81 + 'rpx').step()
      animation.left(obj.tX - 19 + 'rpx').top(obj.tY - 81 + 'rpx').step()
      this.setData({
        animationData: animation.export()
      })
    }
  }
})
