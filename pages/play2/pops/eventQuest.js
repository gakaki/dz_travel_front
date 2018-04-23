// pages/play2/pops/eventQuest.js
import {AnswerQuest} from '../../../api.js';
const app = getApp();
const resRoot = 'https://gengxin.odao.com/update/h5/travel/';
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
      rewards: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
      toNext() {
          this.triggerEvent('next');
      },
      choose(e) {
        let str = e.currentTarget.dataset.str;
        let req = new AnswerQuest();

        req.id = this.data.quest.dbId;
        req.answer = str;

        req.fetch().then(()=> {
          //update userinfo
          app.globalData.userInfo = req.userInfo;

          let correct = req.correct;
          let rewards = req.rewards;

          this.setData({ rewards, correct, showResult: true});
        })
      },
      getEventPicURL(reqQuestPictureURL) {
        if (!reqQuestPictureURL) return reqQuestPictureURL;
        let url = app.globalData.picBase + reqQuestPictureURL;
        if (reqQuestPictureURL && reqQuestPictureURL.match(/\//)) { //有斜杠说明是正确的url 
    
        } else {
          //不然就是6.jpg这种了
          url = app.globalData.picBase + "play/eventimg/" + reqQuestPictureURL;
        }
        return url;
      },
  },
 
    attached() {
        let quest = this.properties.quest;
        if (quest) {
            let pic   = this.getEventPicURL(quest.picture);
            console.log(pic);
            this.setData({picture:pic, content: quest.describe, answers: quest.answers});
        }
    }
})
