// components/rankDirections/rankDirections.js
import { RankType } from '../../api.js';
const sheet = require('../../sheets.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    helpId:{
      type: Number,
      value: 5,
    },
    resHeight:{
      type: Number,
      value: 694,
    },
    title:{
      type: String,
      value: '达人排行榜规则',
    },
    showNum:{
      type:Boolean,
      value: true
    },
    replaceC:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    con:[]
  },

  attached() {
    let help = sheet.Help.Get(this.properties.helpId).help.split("\\n")
    console.log(help)
    if (this.data.replaceC) {
      help = help.map(v => {
        return v.replace('s%', this.data.replaceC)
      })
    }
    this.setData({
      con: help
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm() {
      this.triggerEvent("confirm")
    }
  }
})
