// components/star/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    wid: {
      type: Number,
      value: 240
    },
    hei: {
      type: Number,
      value: 18
    },
    starNum: {
      type: Number,
      value: 3.5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mg: 'sm',
    starH: 'sm-h',
    starDft: 'https://gengxin.odao.com/update/h5/travel/raiders/star-dft.png',
    starAct: 'https://gengxin.odao.com/update/h5/travel/raiders/star-act.png'
  },
  attached: function () {
    console.log(this.properties.wid)
    if (this.properties.wid == 130) {
      this.setData({
        mg: 'sm',
        starH: 'sm-h',
        starDft: 'https://gengxin.odao.com/update/h5/travel/raiders/star-dft.png',
        starAct: 'https://gengxin.odao.com/update/h5/travel/raiders/star-act.png'
      })
    }
    if (this.properties.wid == 240) {
      this.setData({
        mg: 'mid',
        starH: 'mid-h',
        starDft: 'https://gengxin.odao.com/update/h5/travel/raiders/star-mid-dft.png',
        starAct: 'https://gengxin.odao.com/update/h5/travel/raiders/star-mid-act.png'
      })
    }
    if (this.properties.wid == 390) {
      this.setData({
        mg: 'big',
        starH: 'big-h',
        starDft: 'https://gengxin.odao.com/update/h5/travel/raiders/star-big-dft.png',
        starAct: 'https://gengxin.odao.com/update/h5/travel/raiders/star-big-act.png'
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
