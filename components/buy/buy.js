// components/buy/buy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cfmStr: {
      type: String,
      value: '购买'
    },
    picUrl: {
      type: String,
      value: 'https://gengxin.odao.com/update/h5/travel/props/gold.png'
    },
    name: {
      type: String,
      value: '冒菜'
    },
    goldNum: {
      type: Number,
      value: 777
    },
    descOne: {
      type: String,
      value: '购买特产后可前往其他城市高价售卖'
    },
    descTwo: {
      type: String,
      value: '赚取金币'
    },
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
    toHide() {
      this.triggerEvent('toclose')
    },
    notDo() {
      this.triggerEvent('notDo')
    },
    toCfm() {
      this.triggerEvent('toBuy')
    }
  }
})
