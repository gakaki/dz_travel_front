// components/cmap/cmap.js
let tapStamp;
const DOUBLE_TAP_INTERVAL = 600;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mapBg: {
      type:String,
        value:''
    },
      mapWidth:Number,
      mapHeight:Number,
      mapZ:{
      type: Number,
          value: 0
      },
    areas: {
      type: Object,
      value: []
    },
    lines: {
      type: Object,
      value: []
    },
    points: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    double:false,//是否放大到两倍显示
    scrollLeft:0,//滚动位置x
    scrollTop: 0,//滚动位置y
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {

    },
    touchMove(e) {

    },
    touchEnd(e) {

    },
    touchTap(e) {
      // check if triggered double tap
      let now = Date.now();
      if (tapStamp && now - tapStamp < DOUBLE_TAP_INTERVAL) {
        this.doubleTap();
      }
      tapStamp = now;
    },
    doubleTap() {
      let double = !this.data.double;
      this.setData({double});
      console.log(double, 'double')
    },
    tapEle(e) {
      console.log('tap element')
    }

  },
  

})
