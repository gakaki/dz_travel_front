// components/buy-num/buy-num.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    picUrl: {
      type: String,
      value: 'https://gengxin.odao.com/update/h5/travel/props/gold.png'
    },
    name: {
      type: String,
      value: '冒菜'
    },
    // goldNum: {
    //   type: Number,
    //   value: 1
    // },
    descOne: {
      type: String,
      value: '购买特产后可前往其他城市高价售卖'
    },
    descTwo: {
      type: String,
      value: '赚取金币'
    },
    gold: {
      type: Number,
      value: 100
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goldNum: 10
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
      this.triggerEvent('toBuy')
    },
    rGold() {
      let t = this.data.goldNum-- > 0 ? this.data.goldNum:0
      this.setData({
        goldNum: t
      })
    },
    pGold() {
      let t = this.data.goldNum++ < 10 ? this.data.goldNum : 10
      this.setData({
        goldNum: t
      })
    }
  }
})
