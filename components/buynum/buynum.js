// components/buy-num/buy-num.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    single: {
      type: Boolean,
      value: false
    },
    picUrl: {
      type: String,
      value: 'https://gengxin.odao.com/update/h5/travel/props/gold.png'
    },
    name: {
      type: String,
      value: '冒菜'
    },
    xg: { //限购
      type: Boolean,
      value: false
    },
    maxNum: {
      type: Number,
      value: -1
    },
    maimai: {
      type: String,
      value: '购买'
    },
    // goldNum: {
    //   type: Number,
    //   value: 1
    // },
    desc: {
      type: String,
      value: '购买特产后可前往其他城市高价售卖赚取金币'
    },
    gold: {
      type: Number,
      value: 10
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goldNum: 1,
    money: 0
  },
  ready() {
    this.setData({
      money: this.properties.gold
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

    toHide() {
      this.triggerEvent('toclose')
    },
    notDo() {
      this.triggerEvent('notDo')
    },
    toCfm() {
      this.triggerEvent('toBuy', { num: this.data.goldNum })
    },
    rGold() {
      let t = this.data.goldNum-- > 1 ? this.data.goldNum : 1
      this.setData({
        goldNum: t,
        money: this.properties.gold * t
      })
    },
    pGold() {
      let t = 0
      console.log(this.properties.maxNum)
      if (this.properties.maxNum == -1) {
        t = this.data.goldNum+1
      } else {
        t = this.data.goldNum++ < this.properties.maxNum ? this.data.goldNum : this.properties.maxNum
      }

      this.setData({
        goldNum: t,
        money: this.properties.gold * t
      })
    }
  }
})
