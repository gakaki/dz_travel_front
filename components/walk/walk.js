let timer, timerTwo
let aa = 0
let sto
let walkInfoObj = {}
let st = 0  //模拟服务器的时间戳
let restTime = 0 // 当前的数据对象，此段路程剩余的时间
let curPoint = { x: 0, y: 0 }
let isLast = false
//let idx = 0 //第几次执行move方法
let index = 0 //初始化需清零
let rgt = true//上一次小人是否向右行走
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
    left: 0,// walkInfo: { x: 0, y: 0, idx:0, time: 3000 }  // time为未来的时间戳
    x: 0,
    y: 0,
    deg: 0//小人是否需要旋转
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
    timerTwo = setInterval(()=>{
      aa = aa + 1000
    },1000)
    this.func()
  },

  detached() {
    isLast = false
    //idx = 0
    rgt = true
    clearInterval(timerTwo)
    index = 0
    this.setData({
      deg: 0
    })
    clearInterval(timer)
    if (sto) clearTimeout(sto)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    func() {
      if (isLast) {
        this.triggerEvent('lineWidth', { 'per': 0, 'time': 0, 'idx': this.properties.walkInfoArr.length-1 })
        console.log(1)
        // if (index == 0) {
        //   this.setData({
        //     x: this.properties.walkInfoArr[this.properties.walkInfoArr.length - 1].x,
        //     y: this.properties.walkInfoArr[this.properties.walkInfoArr.length - 1].y,
        //     show: true
        //   })
        // }
        return
      }
      index++
      st = Base.servertime
      walkInfoObj = this.properties.walkInfoArr.find((v) => {
        return v.time > st
      })
        if (!walkInfoObj) {
          walkInfoObj = this.properties.walkInfoArr[this.properties.walkInfoArr.length-1]
        }
      let i = this.properties.walkInfoArr.indexOf(walkInfoObj)
      if (i == this.properties.walkInfoArr.length - 1) {
        isLast = true
      }
      if (walkInfoObj.x - this.properties.walkInfoArr[i - 1].x >= 0 && rgt) {
        this.setData({
          //deg: 0
          deg: this.data.deg
        })
        rgt = true
      } else if (walkInfoObj.x - this.properties.walkInfoArr[i - 1].x >= 0 && !rgt) {
        this.setData({
          //deg: 180
          deg: this.data.deg+180
        })
        rgt = true
      } else if (walkInfoObj.x - this.properties.walkInfoArr[i - 1].x < 0 && rgt) {
        this.setData({
          //deg: 180
          deg: this.data.deg + 180
        })
        rgt = false
      } else if (walkInfoObj.x - this.properties.walkInfoArr[i - 1].x < 0 && !rgt) {
        this.setData({
          //deg: 0
          deg: this.data.deg
        })
        rgt = false
      }
      let lastObj = this.properties.walkInfoArr[walkInfoObj.idx - 1]
      //一段路走过的百分比hideIntro
      let per = (st - lastObj.time) / (walkInfoObj.time - lastObj.time)
      curPoint.x = parseInt(lastObj.x + (walkInfoObj.x - lastObj.x) * per)
      curPoint.y = parseInt(lastObj.y + (walkInfoObj.y - lastObj.y) * per)
      restTime = parseInt((walkInfoObj.time - lastObj.time) * (1 - per))
      let obj = { x: curPoint.x, y: curPoint.y, tX: walkInfoObj.x, tY: walkInfoObj.y, time: restTime }




      if (index == 1) {
        this.setData({
          x: obj.x,
          y: obj.y,
          show: true
        })
        setTimeout(() => {
          this.triggerEvent('lineWidth', { 'per': per, 'time': restTime, 'idx': walkInfoObj.idx - 1 })
          console.log(2)
          this.move(obj)
        }, 30)

      } else {
        this.setData({
          x: obj.x,
          y: obj.y,
          show: true
        })
        this.triggerEvent('lineWidth', { 'per': per, 'time': restTime, 'idx': walkInfoObj.idx - 1 })
        console.log(3)
        this.move(obj)
      
      }
      sto = setTimeout(() => {

        clearTimeout(sto)
        this.func()
      }, restTime)
    },
    move(obj) {
      //移动动画
      // let animation = wx.createAnimation({
      //   duration: obj.time,
      //   timingFunction: 'linear'
      // })
      // this.animation = animation
      // animation.top(obj.tY - 81 + 'rpx').left(obj.tX - 19 + 'rpx').step()

        let animation = wx.createAnimation({})
        animation.rotateY(this.data.deg).step({
          duration: 10,
          timingFunction: 'linear'
        })
        this.setData({
          animationData: animation.export()
        })
        setTimeout(()=>{
          animation.top(obj.tY - 81 + 'rpx').left(obj.tX - 19 + 'rpx').step({
            duration: obj.time - 40,
            timingFunction: 'linear'
          })
          this.setData({
            animationData: animation.export()
          })
        },30)
      
    }
  }
})
