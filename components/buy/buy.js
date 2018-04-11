// components/buy/buy.js
let app = getApp();
Component({
  /**
   * 外部样式类,由外部传进来的样式决定组件内的样式
   */
  externalClasses: ['outer-class'],  
  /**
   * 组件的属性列表
   */
  properties: {
    isBuy: {
      type: Boolean,
      value: true
    },
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
    desc: {
      type: String,
      value: '购买特产后可前往其他城市高价售卖赚取金币'
    },
    content: {
      type: String,    //content为组件中的描述文字，其中字体样式由外部样式outer-class决定
      value: '本地游玩免费拍照次数（2次)已使用完毕\n前往旅行装备处租用单反相机获得拍照次数'
    },
    single: {
      type: Boolean,
      value: false
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
    toHide(e) {
      if (app.preventMoreTap(e)) return;
      this.triggerEvent('toclose')
    },
    notDo() {
      this.triggerEvent('notDo')
    },
    toCfm(e) {
      if (app.preventMoreTap(e)) return;
      this.triggerEvent('confirm')
    }
  }
})
