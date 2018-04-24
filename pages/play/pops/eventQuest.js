// pages/play2/pops/eventQuest.js
import {AnswerQuest} from '../../../api.js';
const app = getApp();
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
      //总共几个
      total: {
          type: Number,
          value: 1
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      picture: null,
      content: null,
      answers: [],
      showResult: false,
      correct: false,
      rewards: null,
      choice: '',
      isShowGX: false //是否显示恭喜答对
  },

  /**
   * 组件的方法列表
   */
  methods: {
      toNext(e) {
        this.triggerEvent('next', { cur: e.currentTarget.dataset.current});
      },
      choose(e) {
        let str = e.currentTarget.dataset.str;
        let req = new AnswerQuest();

        req.id = this.data.quest.dbId;
        req.answer = str;
        let choice = str;
        req.fetch().then(()=> {
          //update userinfo
            if (req.userInfo) {
                app.globalData.userInfo = req.userInfo;
            }

          let correct = req.correct;
          let rewards = req.rewards;
          let isShowGX = req.type == 3 ? true : false;
          this.setData({ rewards, correct, isShowGX, showResult: true, choice});
        })
      }
  },
 
    attached() {
        let quest = this.properties.quest;
        if (quest) {
            let pic   = app.getEventPicURL(quest.picture);
            this.setData({picture:pic, content: quest.describe, answers: quest.answers});
        }
    }
})
