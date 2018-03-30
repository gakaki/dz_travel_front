// components/rankDirections/rankDirections.js
import { RankType } from '../../api.js';
const sheet = require('../../sheets.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rankType:{
      type: RankType,
      value: RankType.THUMBS
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    con:[]
  },

  attached() {
    let id;
    let type = this.properties.rankType
    if (type == RankType.THUMBS){
      id = 5
    }
    else if (type == RankType.FOOT){
      id = 4
    }
    else if (type == RankType.SCORE){
      id = 3
    }
    else{
      wx.showToast({
        title: 'type传参错误',
      })
    }
    let help = sheet.Help.Get(id).help.split("\\n")
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
