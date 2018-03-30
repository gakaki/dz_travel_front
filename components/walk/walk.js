let timer
let sto
let walkInfoObj = {}
let st = 6000  //模拟服务器的时间戳
let restTime = 0 // 当前的数据对象，此段路程剩余的时间
let curPoint = { x: 0, y: 0 }
let isLast = false
let idx = 0 //第几次执行move方法
import { Base } from '../../api.js';
Component({
  properties: {
    walkInfoArr: {
      type: Array,
      value: []
    },
    sex: {
      type: Number,
      value: 1
    }
  },
  data: {
    show: false,
    animationData: {},
    left: 0,
    // walkInfo: { x: 0, y: 0, tX: 100, tY: 100, time: 3000 }  // time为未来的时间戳
  },
  attached() {

  },
  ready() {
    timer = setInterval(() => {
      let l = this.data.left - 38 == -228 ? 0 : this.data.left - 38
      this.setData({
        left: l
      })
    }, 150)
    this.func()
  },

  detached() {
    clearInterval(timer)
    if (sto) clearTimeout(sto)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    func() {
      if (isLast) return
      //let st = Base.servertime
      walkInfoObj = this.properties.walkInfoArr.find((v, i) => {
        return v.time > st
      })
      if (walkInfoObj.idx == this.properties.walkInfoArr.length - 1) {
        isLast = true
      }

      let lastObj = this.properties.walkInfoArr[walkInfoObj.idx - 1]
      //一段路走过的百分比hideIntro
      let per = (st - lastObj.time) / (walkInfoObj.time - lastObj.time)
      curPoint.x = parseInt(lastObj.x + (walkInfoObj.x - lastObj.x) * per)
      curPoint.y = parseInt(lastObj.y + (walkInfoObj.y - lastObj.y) * per)
      restTime = parseInt((walkInfoObj.time - lastObj.time) * (1 - per))
      let obj = { x: curPoint.x, y: curPoint.y, tX: walkInfoObj.x, tY: walkInfoObj.y, time: restTime }



      idx++
      if (idx == 1) {
        this.setData({
          show: true
        })
        this.move({ tX: curPoint.x, tY: curPoint.y,time: 1})
        setTimeout(()=>{
          this.move(obj)
        },200)
      }else{
        this.move(obj)
      }
        
      
      st = st + restTime + 1000
      sto = setTimeout(() => {
        this.func()
      }, restTime)
    },
    move(obj) {
      console.log(obj)
      //移动动画
      let animation = wx.createAnimation({
        duration: obj.time,
        timingFunction: 'linear'
      })
      this.animation = animation
      animation.top(obj.tY - 81 + 'rpx').left(obj.tX - 19 + 'rpx').step()
      this.setData({
        animationData: animation.export()
      })
    }
  }
})
