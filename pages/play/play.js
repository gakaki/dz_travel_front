import { shareSuc, shareTitle, shareToIndex, secToDHM, tplStr } from '../../utils/util.js';
import { City, Weather } from '../../sheets.js';
import {
  TourIndexInfo,
  Base,
  EventShow,
  FinishGuide,
  CheckGuide,
  SetRouter,
  FreshSpots,
  PlayLoop,
  Http,
  ModifyRouter,
  CancelParten
} from '../../api.js';

const scaleMax = 2;
const scaleMin = 0.7;
let tapStamp;
let secondPoint;
let display;
let sound;
let reGoin = 0; //重新进入页面
let citysName;
let invited = false;//是否是被邀请者
let curPlanedFinished = false;//是否走完规划完的路线
const DOUBLE_TAP_INTERVAL = 600;
const resRoot = 'https://gengxin.odao.com/update/h5/travel/play/';
const startImg = `${resRoot}start.png`;
const app = getApp();
const GENDER_FEMALE = 2;
const ROLE_OFFSET = 30;//双人旅行时，小人位置差值
const EVENT_TYPE_NORMAL = 1;
const EVENT_TYPE_STORY = 2;
const EVENT_TYPE_QUEST = 3;
const LOOP_INTERVAL = 3000;//轮询间隔
const MV_INTERVAL = 100;//检测移动的间隔

const DIR_UP = { from: 247.5, to: 292.5 };
const DIR_UP_RIGHT = { from: 292.5, to: 337.5 };
const DIR_RIGHT = { from: 337.5, to: 22.5 };
const DIR_BOTTOM_RIGHT = { from: 22.5, to: 67.5 };
const DIR_BOTTOM = { from: 67.5, to: 112.5 };
const DIR_BOTTOM_LEFT = { from: 112.5, to: 157.5 };
const DIR_LEFT = { from: 157.5, to: 202.5 };
const DIR_UP_LEFT = { from: 202.5, to: 247.5 };

const spotSize = {
  '1a': { wd: 123, ht: 98 },
  '2a': { wd: 105, ht: 60 },
  '3a': { wd: 117, ht: 77 },
  '4a': { wd: 78, ht: 106 },
  '5a': { wd: 92, ht: 115 },
  '6a': { wd: 90, ht: 97 },
  '7a': { wd: 91, ht: 132 },
  '8a': { wd: 90, ht: 110 },
  '9a': { wd: 92, ht: 85 },
  '10a': { wd: 96, ht: 126 },
  '11a': { wd: 91, ht: 90 },
  '12a': { wd: 106, ht: 106 },
  '13a': { wd: 105, ht: 111 },
  '14a': { wd: 93, ht: 172 },
  '15a': { wd: 105, ht: 108 },
  '16a': { wd: 81, ht: 126 },
  '17a': { wd: 105, ht: 161 },
  '18a': { wd: 104, ht: 108 },
  '19a': { wd: 99, ht: 95 },
  '20a': { wd: 104, ht: 100 },
  '21a': { wd: 52, ht: 143 },
  '22a': { wd: 92, ht: 139 },
  '23a': { wd: 91, ht: 127 },
  '24a': { wd: 104, ht: 80 },
  '25a': { wd: 108, ht: 124 },
  '26a': { wd: 39, ht: 142 },
  '27a': { wd: 72, ht: 136 },
  '28a': { wd: 104, ht: 63 },
  '29a': { wd: 76, ht: 109 },
  '30a': { wd: 91, ht: 130 },
  '31a': { wd: 104, ht: 96 },
  '32a': { wd: 104, ht: 148 },
  '33a': { wd: 36, ht: 141 },
  '34a': { wd: 157, ht: 142 },
  '35a': { wd: 128, ht: 120 },
  '36a': { wd: 100, ht: 182 }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lowDevice: app.lowDevice(),
    tipPop: false,
    tipStr: '',
    planLines: 0,//规划的还没走过的路线
    hasIndexInfo: false,
    invited: false,//是否是被邀请者
    finishedTip: '已点亮城市,可飞往下一城市旅行',
    anmIdx: 0,
    flower: ['flower_00.png', 'flower_01.png', 'flower_02.png', 'flower_03.png', 'flower_04.png', 'flower_05.png', 'flower_06.png', 'flower_07.png', 'flower_08.png', 'flower_09.png', 'flower_10.png', 'flower_11.png', 'flower_12.png', 'flower_13.png', 'flower_14.png', 'flower_15.png', 'flower_16.png', 'flower_17.png', 'flower_18.png', 'flower_19.png', 'flower'],
    present: false,//第二次進入的城市送車
    trans: '',
    hua: 'hua-lf',
    cfmStr: '',
    cfmDesc: '是否花费100金币修改路线',
    chgLines: false,//是否正在修改路线 弹窗
    taskdonePop: false,//任务是否完成
    weatherImg: '',
    startPoint: {},
    hasPlay: true,//是否玩过，玩过的不显示新手引导
    scale: 1, // 当前缩放倍率
    minimal: false,//是否缩小了
    cid: 0, //城市id
    cityName: '',
    mapBg: '', //背景图url
    mapWidth: 1125,
    mapHeight: 2010,
    season: '', //季节
    weather: '',//天气图标
    licheng: 0, //里程,
    spots: [], //景点列表[{id,cid,name,building,index,x,y,tracked,roundTracked,tracking}]//index>0表示此点在路径中的位置，tracked=true时表示此点已经到过了,roundTracked=true表示此轮中此点已经到过，tracking=true表示快要到了
    planedSpots: [], //规划到路线中的景点[{id,cid,name,building,index,x,y,tracked}]
    lines: [],//线[{x, y, wd, rotation}],存的是虚线的起始点、长度、旋转
    roleMe: {},//自己{x,y, img, rotation, walk:Boolean}
    roleFriend: null,//组队好友{x,y, img, rotation, walk:Boolean}
    partener: null,//组队好友信息{nickName//名字,gender//性别,img//头像,isInviter//是否是邀请者}
    showCancelDouble: false,//是否显示‘取消双人旅行’，只有在邀请方等待对方规划路线时才显示
    task: null, //任务进度
    planing: false,//是否处于规划路线状态
    planed: false,//是否完成了规划
    lineDone: false,//是否完成了规划
    started: false, //是否已经开始（规划完路线就算开始了）
    mvHdl: undefined, //移动interval句柄
    spotsTracked: 0, //有几个景点到达了,客户端维护
    planedFinished: false,//当前规划的景点是否都到达了
    spotsAllTracked: false, //地图上的所有景点是否都走过了
    eventTipImg: resRoot + 'tanhao.png', // 事件气泡图标
    unreadEventCnt: 0, //未读事件数
    curEvtIdx: 1,//当前事件序号
    totalEvt: 1,//事件总数
    hasNextEvt: false, //是否有下一个事件不然显示为确定
    postPicture: '',//获取的明信片图片路径
    postSpotName: '',//获取的明信片所在景点名
    taskPer: 0,//任务进度百分比
    quest: null,//{id:130010, type:3, picture:'6.jpg', describe: '上图是s%的哪个特产？上图是s%的哪个特产？上图是s%的哪个特产？上图是s%的哪个特产？',rewards:[{k:2,v:5}], answers:['不知道','不晓得','不清楚','随便了']}, //null, //当前要显示的事件
    showPop: false,//是否显示弹出
    showPlayIntro: false, //是否显示玩法提示pop
    showEventNormal: false, //是否显示普通事件pop
    showEventQuest: false, //是否显示问题事件pop
    showFreeRent: false, //是否显示免费租赁pop
    showGotPost: false, //是否显示获得明信片pop
    showMissionInfo: false, //是否显示任务信息pop
    newEvent: false, //是否有新事件
    changeRouteing: false, //是否正在修改路线，可能是自己，也可能是双人模式下对方在修改
    modifySending: false, //是否已发送修改路线请求
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.curPlanedFinishedNum = 0
    app.globalData.hasCar = false
    this.data.cid = options.cid;
    let city = City.Get(options.cid);
    let cityName = city.city;
    wx.setNavigationBarTitle({
      title: cityName + '游玩'
    })
    citysName = cityName
    let m = new CheckGuide();
    m.fetch().then(res => {
      this.setData({
        hasPlay: res.hasPlay,
        cityName
      })

    });

    //拉取初始信息、景点列表、路线状态等
    let req = new TourIndexInfo();
    req.cid = options.cid;

    req.fetch().then(() => {
      display = req.display
      if (display != 0) app.globalData.hasCar = true
      let selfInfo = app.globalData.userInfo;
      let startPoint = Object.assign({ index: -1, img: startImg, arriveStamp: req.startTime }, req.startPos);
      //小人儿
      let roleMe = { x: startPoint.x, y: startPoint.y, display: req.display };
      this.genRoleCls(roleMe, selfInfo.gender);
      let roleFriend = null;//组队好友
      if (req.partener && !display) {
        roleFriend = { x: startPoint.x + ROLE_OFFSET, y: startPoint.y + ROLE_OFFSET, display: req.display }
        this.genRoleCls(roleFriend, req.partener.gender);
      }

      this.setData({
        roleMe,
        roleFriend,
        hasIndexInfo: true
      })

      let num = 0;
      let spotsAllTracked = true;
      req.spots.forEach(o => {
        if (o.roundTracked) num++
        spotsAllTracked = spotsAllTracked && o.tracked;
      })
      app.globalData.curPlanedFinishedNum = num + 1
      this.setData({
        spotsTracked: num,
        spotsAllTracked,
        weatherImg: Weather.Get(req.weather).icon,
        licheng: req.mileage,
        season: app.globalData.season,
        startPoint,
        task: req.task,
        present: req.present || false,
        partener: req.partener,
        mapBg: `${resRoot}bg/${city.picture}-1.jpg`
      });

      let rel = this.updateTaskPer()
      app.globalData.taskPer = rel
      this.updateSpots(req.spots);
      this.onShow();

      this.updateLines()
      this.freshTask();
    });

  },
  hideLineDone() {
    this.setData({
      lineDone: false
    })
  },
  toGonglue() {
    this.hideLineDone()
    wx.navigateTo({
      url: '../pointRaiders/pointRaiders?cid=' + this.data.cid + '&city=' + citysName
    })
  },
  toTechan() {
    this.hideLineDone()
    wx.navigateTo({
      url: '../props/props?cid=' + this.data.cid + '&city=' + citysName
    })
  },
  hideSecondIn() {
    this.setData({
      present: false
    })
  },
  huadong() {
    this.setData({
      hua: this.data.hua == 'hua-rgt' ? 'hua-lf' : 'hua-rgt',
      trans: this.data.trans == 'zheng' ? '' : 'zheng'
    })
  },
  hideHuadong() {
    if (this.data.hua == 'hua-rgt' && this.data.trans == 'zheng') {
      this.setData({
        hua: 'hua-lf',
        trans: ''
      })
    }
  },
  hideGuide() {
    this.setData({
      hasPlay: true
    }
    )
  },
  hidePops() {
    this.setData({
      chgLines: false
    })
  },
  hidePopss() {
    this.setData({
      taskdonePop: false
    })
  },
  hideDoubleTip() {
    this.setData({
      invited: false
    })
    invited = true
  },
  toCfm() {
    if (app.globalData.gold >= 100) {
      this.chgLine()
      return
    }
    else {
      wx.navigateTo({
        url: '../recharge/recharge'
      })
      this.setData({
        chgLines: false
      })
    }
  },
  toCfms() {
    wx.redirectTo({
      url: '../city/city?location=' + this.data.cityName,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      sound = wx.createAudioContext('audioM', this)
      sound.setSrc('https://gengxin.odao.com/update/h5/travel/play/music.mp3')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    if (this.data.showCancelDouble) {
      if (!invited) {
        this.setData({
          invited: true
        })
      }

    } else {
      this.setData({
        invited: false
      })
    }
    if (!this.data.planing && (this.data.partener || this.data.started)) {
      Http.listen(PlayLoop, this.onPlayLoop, this, LOOP_INTERVAL);
      this.startMvLoop();
    }


    // if (app.globalData.hasCar) {
    this.freshAllTrackedStat();
    this.freshSpots()
    // this.updateLines(true)
    // }
    let m = new CheckGuide();
    m.fetch().then(res => {
      this.setData({
        hasPlay: res.hasPlay
      })

    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.clearPage();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.clearPage();
  },

  clearPage() {
    Http.unlisten(PlayLoop, this.onPlayLoop, this);
    reGoin = 0;
    this.hideHuadong();
    this.stopMvLoop();
    curPlanedFinished = false;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  },
  //启动移动循环
  startMvLoop() {
    this.stopMvLoop();
    if (this.data.started) {
      this.data.mvHdl = setInterval(this.updateLines.bind(this), MV_INTERVAL);
    }
  },
  //关闭移动循环
  stopMvLoop() {
    if (this.data.mvHdl) {
      clearInterval(this.data.mvHdl);
      this.data.mvHdl = null;
    }
  },

  //更新路线
  updateLines(force = false) {
    if (!this.data.planedSpots.length && !force) {
      return;
    }
    let spots = this.data.planedSpots.concat();

    let startPoint = this.data.startPoint;
    startPoint.tracked = true;
    startPoint.tracking = false;
    startPoint.roundTracked = true;
    let trackedNum = 1;

    spots.unshift(startPoint);//将起点加入

    let lines = [];
    let roleTrackedSpot = spots[0];
    let roleTrackingSpot = spots[1];
    let roleTrackingLineLength = 0;
    let roleTrackingAngle = 0;

    let len = spots.length - 1;
    for (let i = 0; i < len; i++) {
      let cur = spots[i];
      let nxt = spots[i + 1];

      let dy = nxt.y - cur.y;
      let dx = nxt.x - cur.x;
      let wd = wd = Math.hypot(dy, dx);
      let angle = Math.atan2(dy, dx);
      let rotation = angle * 180 / Math.PI;
      rotation = rotation >> 0;
      let roundTracked = nxt.roundTracked;
      let p = { id: cur.id, x: cur.x, y: cur.y, wd, rotation, roundTracked };
      if (nxt.roundTracked) {
        trackedNum++;
      }

      nxt.tracking = false;
      if (cur.roundTracked) {
        roleTrackedSpot = cur;
        roleTrackingSpot = nxt;
        roleTrackingLineLength = wd;
        roleTrackingAngle = angle;

        if (!nxt.roundTracked) {
          nxt.tracking = true;
        }

      }

      lines.push(p);

    }

    let planedFinished = this.data.planedFinished;
    //update role pos
    let roleMe = this.data.roleMe;
    let roleFriend = this.data.partener ? this.data.roleFriend : null;
    let carImg = roleMe._carImg;//用于显示汽车的类
    if (this.data.roleMe.display != 0) {
      roleFriend = null;

      if (this.data.partener) {
        //双人
        carImg += 's_';
      }
      else {
        //单人
        carImg += 'd_';
      }
    }
    if (len > 0) {

      if (this.data.planing) {
        //如果正在规划路线，则保持人物原点不动
        this.setData({ lines });
        return;
      }
      let now = Base.servertime;
      let beforeStamp = roleTrackedSpot.roundTracked && roleTrackedSpot.startime ? roleTrackedSpot.startime : roleTrackedSpot.arriveStamp;
      let dtBefore = now - beforeStamp;
      let dtAll = roleTrackingSpot.arriveStamp - beforeStamp;
      let distBefore = roleTrackingLineLength * dtBefore / dtAll;
      distBefore = Math.min(distBefore, roleTrackingLineLength);
      distBefore = Math.max(0, distBefore);
      if (this.data.started) {
        roleMe.walkCls = roleMe._walkCls;

        if (roleFriend) {
          roleFriend.walkCls = roleFriend._walkCls;
        }
      }
      if (trackedNum == spots.length) {
        planedFinished = true;
        this.setData({
          planedFinished: true
        })
        if (app.globalData.curPlanedFinishedNum != trackedNum && this.data.hasIndexInfo) {
          app.globalData.curPlanedFinishedNum = trackedNum
          curPlanedFinished = true
        }
        // if (curPlanedFinishedIdx == 1) curPlanedFinished = false
        //规划的路线已经走完
        roleMe.walkCls = '';
        if (this.data.roleMe.display != 0) {
          roleFriend = null;
        }
        else if (this.data.partener){
            roleFriend.walkCls = '';
        }

        if (!this.data.partener) {
          //单人
          Http.unlisten(PlayLoop, this.onPlayLoop, this);
        }
      

        this.stopMvLoop();
        this.freshAllTrackedStat();

      } else {
        this.setData({
          planedFinished: false
        })
      }
      roleMe.x = Math.cos(roleTrackingAngle) * distBefore + roleTrackedSpot.x;
      roleMe.y = Math.sin(roleTrackingAngle) * distBefore + roleTrackedSpot.y;
      const halfPI = Math.PI / 2;
      roleMe.scale = roleTrackingAngle > -halfPI && roleTrackingAngle <= halfPI ? 1 : -1;
      roleMe.rotate = 0
      roleMe.weiqiRotate = 0

      if (roleFriend) {
        //组队中
        distBefore -= ROLE_OFFSET;
        roleFriend.x = Math.cos(roleTrackingAngle) * distBefore + roleTrackedSpot.x;
        roleFriend.y = Math.sin(roleTrackingAngle) * distBefore + roleTrackedSpot.y;
        roleFriend.scale = roleMe.scale;
      }

      if (carImg) {
        roleMe.scale = 1;
        //计算车的朝向，车资源是8方向的，按顺时针，12点方向编号0，每45度编号增1，资源编号0-7
        let carRotation = (roleTrackingAngle * 180 / Math.PI + 360) % 360;//将弧度修正到0-360角度内
        if (planedFinished) {
          let dir = roleTrackingAngle > -halfPI && roleTrackingAngle <= halfPI ? '2' : '6'
          carImg += dir;//景点完成后使用平视图
        }
        else if (DIR_UP.from < carRotation && carRotation <= DIR_UP.to) {
          carImg += '0'
          roleMe.rotate = carRotation - (DIR_UP.to - 22.5)
          roleMe.weiqiRotate = 270
        }
        else if (DIR_UP_RIGHT.from < carRotation && carRotation <= DIR_UP_RIGHT.to) {
          carImg += '1';
          roleMe.rotate = carRotation - (DIR_UP_RIGHT.to - 22.5)
          roleMe.weiqiRotate = 315
        }
        else if (DIR_RIGHT.from < carRotation || carRotation <= DIR_RIGHT.to) {
          carImg += '2';
          if (carRotation < 360) {
            roleMe.rotate = carRotation - 360
          } else roleMe.rotate = carRotation - 0
          roleMe.weiqiRotate = 0
        }
        else if (DIR_BOTTOM_RIGHT.from < carRotation && carRotation <= DIR_BOTTOM_RIGHT.to) {
          carImg += '3';
          roleMe.rotate = carRotation - (DIR_BOTTOM_RIGHT.to - 22.5)
          roleMe.weiqiRotate = 45
        }
        else if (DIR_BOTTOM.from < carRotation && carRotation <= DIR_BOTTOM.to) {
          carImg += '4';
          roleMe.rotate = carRotation - (DIR_BOTTOM.to - 22.5)
          roleMe.weiqiRotate = 90
        }
        else if (DIR_BOTTOM_LEFT.from < carRotation && carRotation <= DIR_BOTTOM_LEFT.to) {
          carImg += '5';
          roleMe.rotate = carRotation - (DIR_BOTTOM_LEFT.to - 22.5)
          roleMe.weiqiRotate = 135
        }
        else if (DIR_LEFT.from < carRotation && carRotation <= DIR_LEFT.to) {
          carImg += '6';
          roleMe.rotate = carRotation - (DIR_LEFT.to - 22.5)
          roleMe.weiqiRotate = 180
        }
        else if (DIR_UP_LEFT.from < carRotation && carRotation <= DIR_UP_LEFT.to) {
          carImg += '7';
          roleMe.rotate = carRotation - (DIR_UP_LEFT.to - 25)
          roleMe.weiqiRotate = 225
        }

        roleMe.img = carImg + '.png';

      }

      // this.setData({ lines, roleMe, roleFriend, planedFinished });
      this.setData({ lines, roleMe, roleFriend });
    }
    else {
      roleMe.walkCls = '';
      if (carImg && this.data.hasIndexInfo) {
        roleMe.img = carImg + '2.png';
      }
      if (this.data.spotsAllTracked) {
        this.setData({ planedFinished: true })
      }
      this.setData({ lines: null, roleMe, roleFriend })
    }

  },
  //调用一次loop
  freshAllTrackedStat() {
    let req = new PlayLoop();
    req.fetch().then(() => {
      if (req.newEvent) {
        //显示事件气泡
        let unreadEventCnt = this.data.unreadEventCnt;
        unreadEventCnt++;
        this.setData({ newEvent: true, unreadEventCnt });
      } else {
        this.setData({ newEvent: false, unreadEventCnt: 0 });
      }
      this.data.spotsAllTracked = req.spotsAllTracked;
      if (req.spotsTracked == this.data.spotsTracked) {
        reGoin = 1//防止进页面就播放音效
      }
      if (req.spotsTracked != this.data.spotsTracked) {
        if (reGoin != 0 && (this.data.spotsTracked != 0 || req.spotsTracked != 0)) {
          sound.play()
        }
        else reGoin = 1
        this.data.spotsTracked = req.spotsTracked;
      }
    });
  },
  //隐藏提示
  hideTipPop() {
    this.setData({
      tipPop: false
    })
  },
  //添加或修改路线
  xiugaiLine() {
    if (!this.data.hasPlay) {
      this.finishGuide()
      return
    }
    if (this.data.planedFinished || !this.data.started) {
      this.chgLine()
      return
    }
    if (this.data.planedFinished) {
      this.chgLine()
      return
    }
    let num = 0//到达的景点
    this.data.spots.forEach(o => {
      if (o.roundTracked) num++
    })
    if (num == this.data.spots.length - 1 && !this.data.planedFinished) {
      // wx.showToast({
      //   title: '已经要走完了，再耐心等待一下吧',
      //   icon: 'none'
      // });
      this.setData({
        tipPop: true,
        tipStr: '已经要走完了，再耐心等待一下吧'
      })
      return
    }
    if (app.globalData.gold < 100) {
      this.setData({
        chgLines: true,
        cfmStr: '前往商城',
        cfmDesc: '金币不足,可前往商城'
      })
      return
    } else {
      this.setData({
        chgLines: true,
        cfmStr: '确定'
      })

    }

  },
  //首次规划路线
  firstPlanSpots() {
    this.setData({
      chgLines: false,
      started: false,//设为非游玩状态
      planing: true, //设为编辑路线状态
      planed: false,//是否完成了规划
      planedFinished: false,//
      planedSpots: []
    })
    this.stopMvLoop();
  },
  //修改路线
  chgLine() {
    if (!this.data.hasPlay) {
      this.finishGuide()
      return
    }
    let num = 0//到达的景点
    this.data.spots.forEach(o => {
      if (o.roundTracked) num++
    })
    if (num == this.data.spots.length - 1 && !this.data.planedFinished) {
      this.setData({
        chgLines: false
      })
      // wx.showToast({
      //   title: '已经要走完了，再耐心等待一下吧',
      //   icon: 'none'
      // });
      this.setData({
        tipPop: true,
        tipStr: '已经要走完了，再耐心等待一下吧'
      })
      return
    }


    if (this.data.planing) {
      return;
    }
    if (this.data.changeRouteing && this.data.partener) {
      // wx.showToast({
      //   title: '对方正在修改路线',
      //   icon: 'none'
      // })
      this.setData({
        tipPop: true,
        tipStr: '好友正在修改路线'
      })
      this.setData({
        chgLines: false
      })
      return;
    }
    if (!this.data.started && !this.data.spotsAllTracked) {
      //首次规划路线
      if (this.data.partener) {
        //双人模式下，只允许被邀请者规划
        if (!this.data.partener.isInviter && !this.data.spotsAllTracked) {
          // wx.showToast({
          //   title: '请等待被邀请者规划路线',
          //   icon: 'none'
          // });
          this.setData({
            tipPop: true,
            tipStr: '请等待被邀请者规划路线'
          })
          return;
        }
        //我是被邀请者，可以规则路线
        this.firstPlanSpots();
      }
      else {
        //单人模式
        this.firstPlanSpots();
      }
      //暂停轮询
      Http.unlisten(PlayLoop, this.onPlayLoop, this);
      this.zoomOnPlaning();//缩放
      this.stopMvLoop();

      return;
    }

    if (this.data.modifySending) {
      return;
    }

    //修改或续接路线--------------
    this.data.modifySending = true;
    //暂停轮询
    Http.unlisten(PlayLoop, this.onPlayLoop, this);
    //缩放
    this.zoomOnPlaning();
    this.stopMvLoop();

    let req = new ModifyRouter();
    req.planedAllTracked = this.data.planedFinished ? 1 : 0;
    req.spotsAllTracked = this.data.spotsAllTracked ? 1 : 0;
    req.fetch().then(() => {
      app.globalData.gold = req.goldNum;
      this.data.modifySending = false
      this.data.planing = true;//先内存中标记一下进入编辑状态，以便freshSpots中拦截
      this.updateSpots(req.spots, false);//此时后端会把未到达的点清掉，所以前端不再自己缓存planedSpots = this.data.planedSpots.filter(s => s.roundTracked || s.tracking)

      this.setData({
        chgLines: false,
        started: false,//设为非游玩状态
        planing: true, //设为编辑路线状态
        planed: false,//是否完成了规划
        planedFinished: false,
      })
      this.updateLines(true)
    }, (code) => {
      this.data.modifySending = false
      this.setData({
        tipPop: true,
        tipStr: '好友正在修改路线'
      })
      this.setData({
        chgLines: false
      })
      Http.listen(PlayLoop, this.onPlayLoop, this, LOOP_INTERVAL);
    })
  },

  //根据性别，设置初始的人物cls
  genRoleCls(obj, gender) {
    if (obj.display == 0) {
      obj.img = resRoot; //如果租的有车，则换成车
      obj.roleCls = '';
      obj.walkCls = '';
      obj._carImg = '';
      obj.wd = 34;
      obj.ht = 81;
      obj.clipNum = 6;//动画帧数
      obj.scale = 1;
      if (gender == GENDER_FEMALE) {
        obj.img += 'nv.png';
        obj.roleCls = 'play-role-nv';
        obj._walkCls = 'walk-nv';
      }
      else {
        obj.img += 'nan.png';
        obj.roleCls = 'play-role-nan';
        obj._walkCls = 'walk-nan';
        obj.wd = 36;
      }
    } else {

      obj.img = resRoot; //如果租的有车，则换成车
      obj.roleCls = '';
      obj.walkCls = ''
      obj.clipNum = 6;//动画帧数
      obj.scale = 1;
      if (obj.display == 1) {
        obj.wd = 120;
        obj.ht = 120;
        // obj.img += 'haohua.png';
        obj.roleCls = 'play-role-haohua';
        obj._carImg = resRoot + '/che/haohua_';
        // obj._carCls = 'play-role-haohua-';
        obj._walkCls = '';
      } else if (obj.display == 2) {
        obj.wd = 120;
        obj.ht = 120;
        // obj.img += 'shangwu.png';
        obj.roleCls = 'play-role-shangwu';
        obj._carImg = resRoot + '/che/shangwu_';
        // obj._carCls = 'play-role-shangwu-';
        obj._walkCls = '';
      } else if (obj.display == 3) {
        obj.wd = 120;
        obj.ht = 120;
        // obj.img += 'jingji.png';
        obj.roleCls = 'play-role-jingji';
        obj._carImg = resRoot + '/che/jingji_';
        // obj._carCls = 'play-role-jingji-';
        obj._walkCls = '';
      }

    }

  },
  //轮询
  onPlayLoop(res) {
    if (this.data.modifySending) {
      return;
    }

    let lineUpdate = false;
    if (res.code) {
      //如果有错误码，底层会终止轮询
    }
    if (res.freshSpots) {
      //景点列表需要刷新
      lineUpdate = true;
    }
    if (res.spotsTracked == this.data.spotsTracked) {
      reGoin = 1//https://local.ddz2018.com/?sid=089e159f711d062c32f1db9f1635df21&uid=ov5W35XwjECAWGq0UK3omMfu9nak&cid=190&appName=travel&action=tour.eventshow防止进页面就播放音效
    }
    if (res.spotsTracked != this.data.spotsTracked) {
      if (reGoin != 0 && (this.data.spotsTracked != 0 || res.spotsTracked != 0)) {
        sound.play()
      }
      else reGoin = 1

      //景点到达数有变化
      this.data.spotsTracked = res.spotsTracked;
      lineUpdate = true;
    }


    if (res.newEvent) {
      //显示事件气泡
      let unreadEventCnt = this.data.unreadEventCnt;
      unreadEventCnt++;
      this.setData({ newEvent: true, unreadEventCnt });
    } else {
      this.setData({ newEvent: false, unreadEventCnt: 0 });
    }
    if (res.doubleState === false && this.data.partener) {
      //如果之前是双人，现在变成了单人，则清一下队员
      this.data.partener = null;
    }
    //是否正在修改路线
    if (res.changeRouteing != this.data.changeRouteing) {
      this.setData({ changeRouteing: res.changeRouteing })
    }
    //所有景点都走过了,前端表现是？
    this.setData({ spotsAllTracked: res.spotsAllTracked })
    if (lineUpdate) {
      this.freshSpots();
    }
    else {
      this.updateLines()
    }


  },
 updateTaskPer() {
   let num = 0
   let allNum = 0
   for (let o in this.data.task) {
     if (!this.data.partener && (o == 'parterTour' || o == 'parterPhoto')) {
     } else {
       num = num + (this.data.task[o][0] >= this.data.task[o][1] ? this.data.task[o][1] : this.data.task[o][0])
       allNum = allNum + this.data.task[o][1]
     }

   }
   let rel = num / allNum
   this.setData({
     taskPer: rel * 100
   })
   return rel
 },
  //刷新任务
  freshTask() {
    if (!this.data.hasIndexInfo) return
    let rel = this.updateTaskPer()
    if (rel != 1) app.globalData.taskPer = rel
    
    if (rel == 1) {
      // try {
      //   let value = wx.getStorageSync('cid' + this.data.cid)//每个城市任务完成后记录一下
      //   if (value) {
      //     return
      //   }else {
      //     try {
      //       wx.setStorageSync('cid' + this.data.cid, this.data.cid)
      //     } catch (e) {
      //     }
      //   }
      // } catch (e) {
      // }
      if (this.data.planedFinished && curPlanedFinished || app.globalData.taskPer != 1) {
      // if (curPlanedFinished && (this.data.planedFinished || app.globalData.taskPer)) {  
        this.setData({
          finishedTip: '已点亮城市，可前往下一城市旅行',
          taskdonePop: true
        })
        curPlanedFinished = false
        app.globalData.taskPer = 1
      }
      // if (this.data.task['spot'][0] > 6 && curPlanedFinished) {
      //   this.setData({
      //     finishedTip: '规划路线已走完，可以飞往下一城市',
      //     taskdonePop: true
      //   })
      //   curPlanedFinished = false
      // }

    } else {
      if (this.data.planedFinished && curPlanedFinished) {
        // wx.showToast({
        //   title: '规划路线已走完，记得完成任务哦',
        //   icon: 'none'
        // })
        this.setData({
          tipPop: true,
          tipStr: '规划路线已走完，记得完成任务哦'
        })
        curPlanedFinished = false
      }

    }
  },

  //刷新景点状态列表
  freshSpots() {
    if (this.data.modifySending || this.data.planing) {
      return;
    }

    let req = new FreshSpots();
    req.fetch().then(() => {
      //更新人物图标
      if (req.display != display && req.display != 0) {
        display = req.display;
        let roleMe = this.data.roleMe
        roleMe.display = display
        this.genRoleCls(this.data.roleMe, this.data.roleMe.gender);

        this.setData({
          roleMe: roleMe,
          roleFriend: null//有车了，就不显示队友，只显示一辆车
        })
      }

      //更新里程
      let licheng = req.mileage;
      this.setData({ licheng })

      //更新景点进度
      this.updateSpots(req.spots);

      //更新任务进度

      if (req.task != this.data.task) {
        this.setData({
          task: req.task
        })
        this.freshTask();
        this.data.task = req.task;
      }

    })

  },

  //更新景点状态列表
  updateSpots(spots, updateLine = true) {

    let now = Base.servertime;
    if (this.data.spots.length) {
      let olds = this.data.spots;
      olds.sort((a, b) => a.id - b.id);
      spots.sort((a, b) => a.id - b.id);


      for (let i = 0; i < olds.length; i++) {
        if (i < spots.length) {
          let o = olds[i];
          let n = spots[i];
          let tracked = n.tracked;
          let roundTracked = n.roundTracked;
          let arriveStamp = n.arriveStamp;
          let startime = n.startime;
          let index = n.index;

          //将旧数据中的x,y等信息合并到新数据中,而保留新数据的tracked, arrivedStamp
          Object.assign(o, n, o, { tracked, arriveStamp, startime, roundTracked, index });
        }
        else {
          //新的景点列表，数量比 旧的多，理论上不会出现这种情况
          break;
        }
      }


      spots = olds;
    }
    else {
      //第一次设置spots
      spots.forEach(s => {
        let building = s.building;
        s.img1 = `${resRoot}build/${building[0]}.png`;
        s.img2 = `${resRoot}build/${building[1]}.png`;

        let size = spotSize[building[0]];
        if (size) {
          s.wd = size.wd;
          s.ht = size.ht;
        }
      })
    }
    //按y值排序，以景深排序
    spots.sort((a, b) => a.y - b.y);

    let planedSpots = spots.filter(o => {
      return o.index > -1;
    }).sort((a, b) => {
      return a.index - b.index
    });

    //即将到达的点，显示预计到达时间
    let timeShowed = false;
    for (let i = 0; i < planedSpots.length; i++) {
      let s = planedSpots[i];
      if (s.arriveStamp && !s.roundTracked && !timeShowed) {
        timeShowed = true;
        s.arriveTime = secToDHM((s.arriveStamp - now) / 1000) + '后到达'
      }
      else {
        s.arriveTime = '';
      }
    }

    this.data.planedSpots = planedSpots;
    let started = planedSpots.length > 0;
    // if (started) {
    //   if (LOOP_INTERVAL == 1000) {
    //     Http.unlisten(PlayLoop, this.onPlayLoop, this);
    //     LOOP_INTERVAL = 60000
    //     Http.listen(PlayLoop, this.onPlayLoop, this, LOOP_INTERVAL);
    //   } 
    // }
    let showCancelDouble = !this.data.spotsAllTracked && !started && this.data.partener && this.data.partener.isInviter;
    let invit = false
    if (!invited) invit = showCancelDouble
    // try {
    //       let value = wx.getStorageSync('invited' + this.data.cid)//每个城市
    //       if (value) {
    //         return
    //       }else {
    //         try {
    //           wx.setStorageSync('invited' + this.data.cid, this.data.cid)
    //         } catch (e) {
    //         }
    //       }
    //     } catch (e) {
    //     }


    let startPoint = this.data.startPoint;
    if (started && !startPoint.arriveStamp && this.data.partener) {
      //双人模式下，邀请方onload里没有机会设置起点的arriveStamp（用于计算当前位移）
      startPoint.arriveStamp = Base.servertime - LOOP_INTERVAL;
    }
    this.setData({
      spots,
      started,
      showCancelDouble,
      invited: invit
    });
    if (!this.data.mvHdl && started) {
      this.startMvLoop();
    }
    updateLine && this.updateLines(updateLine);
  },

  cancleDouble() {
    let req = new CancelParten();
    req.fetch().then(() => {
      this.setData({
        showCancelDouble: false,
        partener: null,
        roleFriend: null
      })
    })
  },
  //提交路径到服务器
  sendPath() {
    if (!this.data.planed) {
      // wx.showToast(
      //   {
      //     title: '请先规划路线',
      //     icon: 'none'
      //   })
      this.setData({
        tipPop: true,
        tipStr: '请先规划路线'
      })
      return;
    }


    let req = new SetRouter();
    req.cid = this.data.cid;
    req.line = this.data.planedSpots.map(s => s.id);

    req.fetch().then(() => {
      this.setData({
        lineDone: true
      })
      this.data.planLines = 0
      this.data.startPoint.arriveStamp = req.startTime;
      this.updateSpots(req.spots);
      //恢复轮询
      Http.listen(PlayLoop, this.onPlayLoop, this, LOOP_INTERVAL);
      this.zoomOnPlaned();
      this.freshSpots()
    },(code)=>{
      // wx.showToast(
      //   {
      //     title: '请先规划路线',
      //     icon: 'none'
      //   })
      this.setData({
        tipPop: true,
        tipStr: '请先规划路线'
      })
    })
  },
  //清除规划了的还没走过的路线
  clearPlanLines() {
    let planedSpots = this.data.planedSpots.slice()
    let lines = this.data.lines.slice()

    for (let i = 0; i < this.data.planLines; i++) {
      let spot = this.data.spots.find(s => s.index == this.data.planedSpots.length - 1 - i);
      spot.index = -1
      let idxInSpots = this.data.spots.indexOf(spot);
      this.setData({
        [`spots[${idxInSpots}]`]: spot
      });
    }
    this.setData({
      planedSpots: planedSpots.slice(0, planedSpots.length - this.data.planLines),
      lines: lines.slice(0, lines.length - this.data.planLines)
    });
    this.data.planLines = 0
  },
  //点击景点
  tapSpot(e) {
    let dataset = e.currentTarget.dataset;
    let sid = dataset.sid;
    let spot = this.data.spots.find(s => s.id == sid);


    if (this.data.planing) {
      //规划路线
      if (this.data.planedSpots.indexOf(spot) == -1) {
        this.data.planed = true;
        spot.index = this.data.planedSpots.length;
        this.data.planedSpots.push(spot);
        this.data.planLines = this.data.planLines + 1
        let idxInSpots = this.data.spots.indexOf(spot);
        this.setData({
          [`spots[${idxInSpots}]`]: spot
        });
        //render
        this.updateLines();
      }
      else {
        //已经在路线中了
        this.setData({
          tipPop: true,
          tipStr: '路线规划不可前往相同景点'
        })
      }
    }
    else if (spot.tracked) {
      //已经到达了，点击后进入观光
      let name = e.currentTarget.dataset.name
      this.toTour(sid, name);
    }
    else if (this.data.planedSpots.length) {
      this.setData({
        tipPop: true,
        tipStr: '未到达此景点无法观光'
      })
    }
    else {
      //没有到过，也没有路线，那应该是刚进入这个城市
      // wx.showToast({
      //   title: '请先点击“规划路线”进行路线添加',
      //   icon: 'none'
      // })
      this.setData({
        tipPop: true,
        tipStr: '请先点击“规划路线”进行路线添加'
      })
    }
  },

  touchMap() {
    // check if triggered minimal tap
    if (this.data.planing) {
      //规划路线时，不支持点击缩放
      return;
    }
    let now = Date.now();
    if (tapStamp && now - tapStamp < DOUBLE_TAP_INTERVAL) {
      this.doubleTap();
    }
    tapStamp = now;
  },
  doubleTap() {
    let minimal = !this.data.minimal;
    let scale = minimal ? scaleMin : 1;
    this.setData({ minimal, scale });
  },
  //规划路线时，强制缩到最小
  zoomOnPlaning() {
    this.setData({
      scale: scaleMin
    });
  },
  //规划完成时，缩放回原先
  zoomOnPlaned() {
    let minimal = this.data.minimal;
    let scale = minimal ? scaleMin : 1;
    this.setData({
      scale,
      planing: false
    })
  },

  //点击小人
  tapRole() {
    this.newEvent = false;
    if (this.data.newEvent) {
      this.fetchEvent();
    }
  },

  toNextEvent(e) {
    if (e.detail.cur == 1) {
      this.hidePop();
      this.setData({
        newEvent: false
      })
      return
    }
    this.newEvent = false;
    this.hidePop();
    this.fetchEvent();
  },

  //请求一次事件信息
  fetchEvent() {
    let req = new EventShow();
    req.cid = this.data.cid;
    req.toastErr = false;

    req.fetch().then(() => {
      let unreadEventCnt = req.total - req.current;
      let quest = req.quest;
      this.data.quest = quest;
      let curEvtIdx = req.current;
      let totalEvt = req.total;


      if (!req.quest) {
        this.setData({
          unreadEventCnt: 0,
          hasNextEvt: false,
          newEvent: false,
        })
        return
      }
      switch (quest.type) {
        case EVENT_TYPE_NORMAL:
          this.setData({
            showPop: true,
            showEventNormal: true,
            unreadEventCnt,
            curEvtIdx,
            totalEvt,
            hasNextEvt: req.hasNext ? true : false
          });
          break;
        case EVENT_TYPE_STORY:
        case EVENT_TYPE_QUEST:
          this.setData({
            showPop: true,
            showEventQuest: true,
            unreadEventCnt,
            curEvtIdx,
            totalEvt,
            hasNextEvt: req.hasNext ? true : false
          });
          break;
        default:
          this.setData({
            unreadEventCnt: 0,
            hasNextEvt: req.hasNext ? true : false,
            newEvent: false
          })
      }
    })
  },

  hidePop(e) {
    if (e && e.target.id == 'play-pop-bg' && e.type == 'tap') {
      if (this.data.showEventNormal || this.data.showEventQuest) {
        return;//事件的弹框点击蒙层不隐藏弹框
      }
    }
    this.setData({
      showPop: false,
      // newEvent : false, //关闭之后应该要newEvent关闭啊
      showPlayIntro: false, //是否显示玩法提示pop
      showEventNormal: false, //是否显示普通事件pop
      showEventQuest: false, //是否显示问题事件pop
      showFreeRent: false, //是否显示免费租赁pop
      showMissionInfo: false, //是否显示任务信息pop
    });
  },

  popPlayIntro() {
    this.setData({ showPop: true, showPlayIntro: true });
  },

  popEventNormal() {
    this.setData({ showPop: true, showEventNormal: true });
  },

  popEventQuest() {
    this.setData({ showPop: true, showEventQuest: true });
  },

  popFreeRent() {
    this.setData({ showPop: true, showFreeRent: true });
  },

  popGotPost() {
    this.setData({ showPop: true, showGotPost: true });
  },

  popMissionInfo() {
    if (!this.data.hasPlay) {
      this.finishGuide()
      return
    }
    let req = new FreshSpots();
    req.fetch().then(() => {
      this.setData({ task: req.task })
      //更新任务进度
      this.freshTask();
      this.setData({ showPop: true, showMissionInfo: true });
    })

  },

  //到攻略页面
  toPr() {
    if (!this.data.hasPlay) {
      this.finishGuide()
      return
    }
    wx.navigateTo({
      url: '../pointRaiders/pointRaiders?cid=' + this.data.cid + '&city=' + citysName
    })
  },
  //到道具和特产页面
  toProps() {
    if (!this.data.hasPlay) {
      this.finishGuide()
      return
    }
    wx.navigateTo({
      url: '../props/props?cid=' + this.data.cid + '&city=' + citysName
    })
  },
  //到观光页面
  toTour(sid, name) {
    wx.navigateTo({
      url: '../goSight/goSight?pointId=' + sid + '&cid=' + this.data.cid + '&name=' + name
    })
  },

  //标记完成新手引导
  finishGuide() {
    let req = new FinishGuide();
    req.fetch().then(() => {
      this.setData({ hasPlay: true });
    })

  },
})