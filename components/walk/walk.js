let timer
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
    isDouble: {
      type: Boolean,
      value: false
    },
    per: {
      type:Number,
      value: 0
    },
    display: {
      type: Number,
      value: 0
    },
    sex: {
      type: Number,
      value: 1
    },
    partnerSex: {
      type: Number,
      value: 1
    },
    evt: {
      type:Boolean,
      value: true
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
    console.log('this.properties.display',this.properties.display)
    if (!this.properties.isDouble) {
      timer = setInterval(() => {

        // if (this.properties.sex == 1) {
        let l = this.data.left - 38 == -228 ? 0 : this.data.left - 38
        // }
        // if (this.properties.sex == 0) {
        //   let l = this.data.left - 34 == -204 ? 0 : this.data.left - 34
        // }
        this.setData({
          left: l
        })
      }, 150)
    }
    

    this.func()
  },

  detached() {
    isLast = false
    //idx = 0
    rgt = true
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
    touchEvt() {
      this.triggerEvent('chufaEvt')
    },
    func() {
      if (isLast) {
        this.triggerEvent('lineWidth', { 'per': 0, 'time': 0, 'idx': this.properties.walkInfoArr.length-1 })
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
        // return v.tracked == false
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
      let per = 0
      if (this.properties.per == 0) {
        per = (st - lastObj.time) / (walkInfoObj.time - lastObj.time)
      }
      else {  per = 0}
      let pers = (st - lastObj.time) / (walkInfoObj.time - lastObj.time)
      curPoint.x = parseInt(lastObj.x + (walkInfoObj.x - lastObj.x) * per)
      curPoint.y = parseInt(lastObj.y + (walkInfoObj.y - lastObj.y) * per)
      restTime = parseInt((walkInfoObj.time - lastObj.time) * (1 - pers))
      let obj = { x: curPoint.x, y: curPoint.y, tX: walkInfoObj.x, tY: walkInfoObj.y, time: restTime }




      if (index == 1) {
        this.setData({
          x: obj.x,
          y: obj.y,
          show: true
        })
        setTimeout(() => {
          if (walkInfoObj.idx != this.properties.walkInfoArr.length -1) {
            this.triggerEvent('lineWidth', { 'per': per, 'time': restTime, 'idx': walkInfoObj.idx - 1 })
          }
         
          this.move(obj)
        }, 30)

      } else {
        this.setData({
          x: obj.x,
          y: obj.y,
          show: true
        })
        this.triggerEvent('lineWidth', { 'per': per, 'time': restTime, 'idx': walkInfoObj.idx - 1 })
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
          if (this.properties.display == 0) {
            animation.top(obj.tY - 81 + 'rpx').left(obj.tX - 19 + 'rpx').step({
              duration: obj.time - 40,
              timingFunction: 'linear'
            })
          } 
          
          if (this.properties.display == 1) {
            animation.top(obj.tY - 69 + 'rpx').left(obj.tX - 75 + 'rpx').step({
              duration: obj.time - 40,
              timingFunction: 'linear'
            })
          }
          if (this.properties.display == 2) {
            animation.top(obj.tY - 92 + 'rpx').left(obj.tX - 59 + 'rpx').step({
              duration: obj.time - 40,
              timingFunction: 'linear'
            })
          }
          if (this.properties.display == 3) {
            animation.top(obj.tY - 63 + 'rpx').left(obj.tX - 55 + 'rpx').step({
              duration: obj.time - 40,
              timingFunction: 'linear'
            })
          }
          this.setData({
            animationData: animation.export()
          })
        },30)
      
    }
  }
})
