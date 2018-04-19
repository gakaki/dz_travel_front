// components/comment/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    starDft: 'https://gengxin.odao.com/update/h5/travel/raiders/star-big-dft.png',
    starAct: 'https://gengxin.odao.com/update/h5/travel/raiders/star-big-act.png',
    starNum: 0,
    starArr: [],
    score: 0,
    strLen: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chgTextarer(e) {
      this.setData({
        strLen: e.detail.value.length
      })
    },
    formSubmit(e) {
      console.log(e.detail.value.ta)
      //let str = e.detail.value.ta
      
      this.triggerEvent('doComm', { str: e.detail.value.ta,star:this.data.score })
    },
    toClose() {
      this.triggerEvent('toclose')
    },
    doComment(e) {
      console.log(e.currentTarget.dataset.idx)
     
      let arr = []
      arr.length = e.currentTarget.dataset.idx
      this.setData({
        starNum: e.currentTarget.dataset.idx,
        starArr: arr,
        score: e.currentTarget.dataset.idx
      })
    }
  }
})
