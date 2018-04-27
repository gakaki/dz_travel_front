Component({

  options: {
    multipleSlots: true
  },
  
  properties: {
    str: {
      type: String,
      value: '发送成功'
    },
    backdrop: {
      type: Boolean,
      value: true
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
    animation: ''
  },


  ready: function () {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hide() {
      this.triggerEvent("hidetip")
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
    }

    

  }
})
