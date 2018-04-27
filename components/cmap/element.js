// components/cmap/element.js
let mvInterval = 100;//移动帧频间隔时间（毫秒）
Component({

  externalClasses: ['double-cls'],
  /**
   * 组件的属性列表
   */
  properties: {

    x: {
      type: Number,
      value: 0
    },
    y: {
      type: Number,
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
      isPlayer: {
      type: Number,
          value: false
      },
    double: {
      type: Number,
      value: false
    },
    txtX: {
      type: Number,
      value: 0
    },
    txtY: {
      type: Number,
      value: 0
    },
    targetX: {
      type: Number,
      value: 0,
    },
    targetY: {
      type: Number,
      value: 0,
    },
    moveToTarget: {
      type: Boolean,
      value: false
    },
    moveDuration: {
      type: Number,
      value: 1000,//毫秒,
      observer: function(newVal) {
        setTimeout(()=> {
          this.startMove();

        }, 10);
      }
    },
    // statusImgs: {
    //   type: Array,
    //   value: []
    // },
    img: {
      type:String,
      value: ''
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
    // img: '',//当前状态下显示的图片，
    mvHdl: null,//移动倒计时
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onEleTap(e) {
    },

    startMove() {
      this.clearMvHdl();

      if (!this.data.moveToTarget)
        return;

      //start new move
      let duration = this.data.moveDuration;
      let step = Math.round(duration / mvInterval);
      let stepX = Math.round(this.data.targetX - this.data.x);
      let stepY = Math.round(this.data.targetY - this.data.y);

      this.data.mvHdl = setInterval(()=> {
        if (step-- > 0) {
          let x = this.data.x + stepX;
          let y = this.data.y + stepY;
          this.setData({x,y});
        }
        else {
          this.clearMvHdl();
        }
      }, mvInterval);

    },
    clearMvHdl() {
      let mvHdl = this.data.mvHdl;
      mvHdl && clearInterval(mvHdl);
      this.data.mvHdl = null;
    }


  },

  attached() {
  }

})
