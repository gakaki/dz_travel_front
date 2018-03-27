// components/cmap/element.js
Component({

  externalClasses: ['double-cls'],
  /**
   * 组件的属性列表
   */
  properties: {
    
    x: {
      type:Number,
      value: 0
    },
    y: {
      type:Number,
      value: 0
    },
    imgWd: {
      type: Number,
      value: 0
    },
    imgHt: {
      type: Number,
      value: 0
    },
    statusImgs: {
      type:Array,
      value: []
    },
    txt: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status:0,//当前状态
    img:''//当前状态下显示的图片
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setStatus(idx) {
      if (idx == this.data.status) {
        return;
      }
      if (idx >= this.data.statusImgs.length) {
        return;
      }
      
      let img = this.data.statusImgs[idx];
      this.setData({
        status: idx,
        img: img,
      })

    },

    onEleTap(e) {
      console.log(this.img, 'element tap')
    }

    
  },

  attached() {
    if (!this.data.img && this.data.statusImgs.length) {
      let img = this.data.statusImgs[0];
      this.setData({
        status: 0,
        img: img
      })
    }
  },
  
})
