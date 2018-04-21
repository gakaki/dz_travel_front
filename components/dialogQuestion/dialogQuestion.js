Component({

  options: {
    multipleSlots: true
  },

  properties: {
    answers:{
      type: Array,
      value: []
    },
    answer:{
      type: String,
      value: ""
    },
    coin: {
      type: Number,
      value: 0
    },
    credit: {
      type: Number,
      value: 0
    },
    question: {
      type: Object,
      value: {}
    },
    animated: {
      type: Boolean,
      value: true
    },

    modalSize: {
      type: String,
      value: "md"
    },

    animationOption: {
      type: Object,
      value: {
        duration: 300
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    animation: '',
    a: false,
    b: false,
    c: false,
    d: false
  },


  ready: function () {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabOne() {
      this.setData({
        a: true,
        b: false,
        c: false,
        d: false,
      })
      this.triggerEvent("right", { id: '1', answaer: 'aaa' })
    },
    tabTwo() {
      this.setData({
        a: false,
        b: true,
        c: false,
        d: false,
      })
      this.triggerEvent("right", { id: '1', answaer: 'aaa' })
    },
    tabThree() {
      this.setData({
        a: false,
        b: false,
        c: true,
        d: false,
      })
      this.triggerEvent("right", { id: '1', answaer: 'aaa' })
    },
    tabFour() {
      this.setData({
        a: false,
        b: false,
        c: false,
        d: true,
      })
      this.triggerEvent("right",{id:'1',answaer:'aaa'})
    },

    hideModal: function (e) {
      if (e) {
        let type = e.currentTarget.dataset.type;
        if (type == 'mask' && !this.data.backdrop) {
          return;
        }
      }
      if (this.data.isShow) this._toggleModal();
    },

    showModal: function () {
      console.log("showmodal")
    }



  }
})
