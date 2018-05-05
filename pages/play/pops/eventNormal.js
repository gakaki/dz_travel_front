// pages/play2/pops/eventNormal.js
import {tplStr} from '../../../utils/util.js';
const resRoot = 'https://gengxin.odao.com/update/h5/travel/play/eventimg/';
const resRoots = 'https://gengxin.odao.com/update/h5/travel/';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      //事件内容
      quest: {
        type: Object
      },
      //当前第几个
      current: {
        type: Number,
          value: 1
      },
      hasNext: {
        type: Boolean,
        value: false
      },      
      //总共几个
      total: {
        type: Number,
          value: 1
      },
      cityName: {
          type: String,
          value: ''
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
      picture: null,
      content: null,
      rewards: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
      toNext(e) {
          // if(this.data.quest.rewards.find(kv => kv.k == ))
        this.triggerEvent('next', { cur: e.currentTarget.dataset.current});
      },

      close() {
        this.triggerEvent('hide')
      }
  },

    attached() {
    let quest = this.properties.quest;
      if (quest) {
        let rewards = quest.rewards || '';
        this.setData({ picture: quest.picture.length > 10 ? (resRoots + quest.picture) : resRoot + quest.picture, content: tplStr(quest.describe, '%s', this.data.cityName), rewards});
      }
    }
})
