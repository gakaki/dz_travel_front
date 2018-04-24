// pages/play2/play.js
import { shareSuc, shareTitle, shareToIndex, secToDHM } from '../../utils/util.js';
import { City, Weather } from '../../sheets.js';
import { TourIndexInfo, Base, EventShow, FinishGuide, CheckGuide, SetRouter, FreshSpots, PlayLoop, Http, ModifyRouter } from '../../api.js';
const scaleMax = 2;
let tapStamp;
let display;
let citysName;
const DOUBLE_TAP_INTERVAL = 600;
const resRoot = 'https://gengxin.odao.com/update/h5/travel/play/';
const startImg = `${resRoot}start.png`;
const app = getApp();
const GENDER_FEMALE = 2;
const ROLE_OFFSET = 10;//双人旅行时，小人位置差值
const EVENT_TYPE_NORMAL = 1;
const EVENT_TYPE_STORY = 2;
const EVENT_TYPE_QUEST = 3;
const LOOP_INTERVAL = 1000

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
  '33a': { wd: 46, ht: 155 },
  '34a': { wd: 157, ht: 142 },
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherImg: '',
    startPoint: {},
    hasPlay: true,//是否玩过，玩过的不显示新手引导
    scale: 1, // 当前缩放倍率
    double: false,//是否放大了
    cid: 0, //城市id
    cityName: '',
    mapBg: '', //背景图url
    mapWidth: 750,
    mapHeight: 1340,
    season: '', //季节
    weather: '',//天气图标
    licheng: 0, //里程,
    hasPath: false, //是否已经规划了路线
    spots: [], //景点列表[{id,cid,name,building,index,x,y,tracked,tracking}]//index>0表示此点在路径中的位置，tracked=true时表示此点已经到过了,tracking=true表示快要到了
    planedSpots: [], //规划到路线中的景点[{id,cid,name,building,index,x,y,tracked}]
    lines: [],//线[{x, y, wd, rotation}],存的是虚线的起始点、长度、旋转
    roleMe: {},//自己{x,y, img, rotation, walk:Boolean}
    roleFriend: null,//组队好友{x,y, img, rotation, walk:Boolean}
    partener: null,//组队好友信息{nickName//名字,gender//性别,img//头像,isInviter//是否是邀请者}
    task: null, //任务进度
    planing: false,//是否处于规划路线状态
    planed:false,//是否完成了规划
    started: false, //是否已经开始（规划完路线就算开始了）
    spotsTracked: 0, //有几个景点到达了,客户端维护
    planedFinished: false,//当前规则的景点是事都到达了
    spotsAllTracked: false, //地图上的所有景点是否都走过了
    eventTipImg: resRoot + 'evts.png', // 事件气泡图标
    unreadEventCnt: 0, //未读事件数
    curEvtIdx: 1,//当前事件序号
    totalEvt: 1,//事件总数
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    app.globalData.hasCar = false
    this.data.cid = options.cid;
    let city = City.Get(options.cid);
    let cityName = city.city;
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
        if (req.partener) {
          roleFriend = { x: startPoint.x + ROLE_OFFSET, y: startPoint.y + ROLE_OFFSET, display: req.display }
          this.genRoleCls(roleFriend, req.partener.gender);
          this.setData({
            roleFriend
          })
        }
        this.setData({
          roleMe
        })


      this.setData({
        weatherImg: Weather.Get(req.weather).icon,
        licheng: req.mileage,
        season: app.globalData.season,
        startPoint,
        task: req.task,
        partener: req.partener,
        mapBg: `${resRoot}bg/${city.picture}-1.jpg`
      });

      this.updateSpots(req.spots);
      this.onShow();
      this.freshTask();

    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.partener || this.data.started) {
      Http.listen(PlayLoop, this.onPlayLoop, this, LOOP_INTERVAL);
     
    }
    // if (this.data.started)
    if (app.globalData.hasCar) this.freshSpots();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    Http.unlisten(PlayLoop, this.onPlayLoop, this);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    Http.unlisten(PlayLoop, this.onPlayLoop, this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareToIndex(this)
  },


  //更新路线
  updateLines(force = false) {
    if (!this.data.planedSpots.length && !force) {
      return;
    }
    let spots = this.data.planedSpots.concat();

    let startPoint = this.data.startPoint;
    startPoint.tracked = true;
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
      let tracked = nxt.tracked;
      let p = { id: cur.id, x: cur.x, y: cur.y, wd, rotation, tracked };
      if (tracked) {
        trackedNum++;
      }

      if (cur.tracked) {
        roleTrackedSpot = cur;
        roleTrackingSpot = nxt;
        roleTrackingLineLength = wd;
        roleTrackingAngle = angle;

        if (!nxt.tracked) {
          nxt.tracking = true;
        }

      }

      lines.push(p);

    }

    let planedFinished = this.data.planedFinished;
    //update role pos
     let roleMe = this.data.roleMe;
     if (this.data.roleCar) {
        roleMe = this.data.roleCar
     } 
    if (len > 0) {

      if (this.data.planing) {
        //如果正在规划路线，则保持人物原点不动
        this.setData({ lines });
        return;
      }
      let now = Base.servertime;
      let beforeStamp = roleTrackedSpot.tracked && roleTrackedSpot.startime ? roleTrackedSpot.startime : roleTrackedSpot.arriveStamp;
      let dtBefore = now - beforeStamp;
      let dtAll = roleTrackingSpot.arriveStamp - beforeStamp;
      let distBefore = roleTrackingLineLength * dtBefore / dtAll;
      distBefore = Math.min(distBefore, roleTrackingLineLength);
      distBefore = Math.max(0, distBefore);
      if (this.data.started) {
        roleMe.walkCls = roleMe._walkCls
      }
      if (trackedNum == spots.length) {
        planedFinished = true;
        //规划的路线已经走完
        roleMe.walkCls = '';

        Http.unlisten(PlayLoop, this.onPlayLoop, this);
      }
      roleMe.x = Math.cos(roleTrackingAngle) * distBefore + roleTrackedSpot.x;
      roleMe.y = Math.sin(roleTrackingAngle) * distBefore + roleTrackedSpot.y;
      const halfPI = Math.PI / 2;
      roleMe.scale = roleTrackingAngle > -halfPI && roleTrackingAngle <= halfPI ? 1 : -1;

      this.setData({ lines, roleMe, planedFinished });
      if (this.data.roleCar) {
        this.setData({ lines, roleCar: roleMe ,planedFinished});
      } else this.setData({ lines, roleMe ,planedFinished});
    }
    else {
      this.setData({ lines: null, 'roleMe.walkCls': '' })
    }

  },

  //修改路线
  chgLine() {
    //暂停轮询
    Http.unlisten(PlayLoop, this.onPlayLoop, this);

    let req = new ModifyRouter();
    req.spotsAllTracked = this.data.spotsAllTracked ? 1 : 0;
    req.fetch().then(() => {
      app.globalData.gold = req.goldNum;
      this.updateSpots(req.spots, false);
      this.setData({
        started: false,//设为非游玩状态
        planing: true, //设为编辑路线状态
        planed: false,//是否完成了规划
        planedFinished: false,//
        planedSpots: this.data.planedSpots.filter(s => s.tracked || s.tracking)//保留已经走过和即将到达的点
      })
      console.log(this.data.planing)
        this.updateLines()
    })
  },

  //根据性别，设置初始的人物cls
  genRoleCls(obj, gender) {
    if (obj.display == 0) {
      obj.img = resRoot; //如果租的有车，则换成车
      obj.roleCls = '';
      obj.walkCls = ''
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
        obj.wd = 150;
        obj.ht = 69;
        obj.img += 'haohua.png';
        obj.roleCls = 'play-role-haohua';
        obj._walkCls = '';
      } else if (obj.display == 2) {
        obj.wd = 118;
        obj.ht = 92;
        obj.img += 'shangwu.png';
        obj.roleCls = 'play-role-shangwu';
        obj._walkCls = '';
      } else if (obj.display == 3) {
        obj.wd = 109;
        obj.ht = 63;
        obj.img += 'jingji.png';
        obj.roleCls = 'play-role-jingji';
        obj._walkCls = '';
      }

    }

  },

  //轮询
  onPlayLoop(res) {
    let lineUpdated = false;
    if (res.code) {
      //如果有错误码，底层会终止轮询
      console.log('Playloop stopped, error code>>', res.code);
    }
    if (res.freshSpots) {
      //景点列表需要刷新
      lineUpdated = true;
      this.freshSpots();
    }
    else if (res.spotsTracked != this.data.spotsTracked) {
      //景点到达数有变化
      this.data.spotsTracked = res.spotsTracked;
      lineUpdated = true;
      this.freshSpots();
    }

    if (res.newEvent) {
      //显示事件气泡
      let unreadEventCnt = this.data.unreadEventCnt;
      unreadEventCnt++;
      this.setData({ unreadEventCnt });
    }
      //所有景点都走过了,前端表现是？
    this.setData({spotsAllTracked: res.spotsAllTracked})
    if (!lineUpdated) {
      this.updateLines()
    }


  },

  //刷新任务
  freshTask() {
    let num = 0
    let allNum = 0
    for (let o in this.data.task) {
      if (!this.data.partener && (o == 'parterTour' || o == 'parterPhoto')) { }
      else {
        num = num + this.data.task[o][0]
        allNum = allNum + this.data.task[o][1]
      }
    }
    let rel = num / allNum
    this.setData({
      taskPer: rel * 100
    })
  },
  updateIcon(obj) {
    obj.img = resRoot; //如果租的有车，则换成车
    if (obj.display == 1) {
      obj.wd = 150;
      obj.ht = 69;
      obj.img += 'haohua.png';
      obj.roleCls = 'play-role-haohua';
      obj._walkCls = '';
    } else if (obj.display == 2) {
      obj.wd = 118;
      obj.ht = 92;
      obj.img += 'shangwu.png';
      obj.roleCls = 'play-role-shangwu';
      obj._walkCls = '';
    } else if (obj.display == 3) {
      obj.wd = 109;
      obj.ht = 63;
      obj.img += 'jingji.png';
      obj.roleCls = 'play-role-jingji';
      obj._walkCls = '';
    }
  },
  //刷新景点状态列表
  freshSpots() {
    let req = new FreshSpots();
    
    req.fetch().then(() => {
      this.setData({ task: req.task })
      this.updateSpots(req.spots, display);
      if (req.display != 0 && display != req.display) {
        this.data.roleFriend = null
        let roleMe = this.data.roleMe
        roleMe.display = req.display
        this.updateIcon(roleMe)
        this.setData({
          roleMe
        })
      }
      display = req.display
    })

    //更新任务进度
    this.freshTask();
  },

  //更新景点状态列表
  updateSpots(spots, show, updateLine = true) {

    let now = Base.servertime;
    if (this.data.spots.length) {
      let olds = this.data.spots;
      olds.sort((a, b) => a.id - b.id);
      spots.sort((a, b) => a.id - b.id);

      //check if all same
      let allSame = true;

      for (let i = 0; i < olds.length; i++) {
        if (i < spots.length) {
          let o = olds[i];
          let n = spots[i];
          let tracked = n.tracked;
          let arriveStamp = n.arriveStamp;
          let startime = n.startime;

          allSame = allSame && o.tracked == tracked && o.arriveStamp == arriveStamp;
          //将旧数据中的x,y等信息合并到新数据中,而保留新数据的tracked, arrivedStamp
          Object.assign(o, n, o, { tracked, arriveStamp,startime });
        }
        else {
          //新的景点列表，数量比 旧的多，理论上不会出现这种情况
          allSame = false;
          break;
        }
      }

      if (allSame) {
        //全部一样的话，不必更新渲染
        updateLine && this.updateLines();
        return;
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
    this.data.spots = spots;
    let planedSpots = spots.filter(o => {
      return o.index > -1;
    }).sort((a, b) => { return a.index - b.index });

    //即将到达的点，显示预计到达时间
    let timeShowed = false;
    for (let i = 0; i < planedSpots.length; i++) {
      let s = planedSpots[i];
      if (s.arriveStamp && !s.tracked && !timeShowed) {
        timeShowed = true;
        s.arriveTime = secToDHM((s.arriveStamp - now) / 1000) + '后到达'
      }
      else {
        s.arriveTime = '';
      }
    }

    this.data.planedSpots = planedSpots;
    let started = planedSpots.length > 0;
    this.setData({
      spots,
      started,
      hasPath: started
    });

    updateLine && this.updateLines();
  },

  //提交路径到服务器
  sendPath() {
    if (!this.data.planed) {
      wx.showToast(
        {
          title: '请先规划路线',
          icon: 'none',
          mask: true
        })
      return;
    }

    //恢复轮询
    Http.listen(PlayLoop, this.onPlayLoop, this, LOOP_INTERVAL);

    this.setData({ planing: false });

    let req = new SetRouter();
    req.cid = this.data.cid;
    req.line = this.data.planedSpots.map(s => s.id);

    req.fetch().then(() => {
      app.globalData.gold = req.goldNum;
      this.data.startPoint.arriveStamp = req.startTime;
      this.updateSpots(req.spots);
    })
  },

  //点击景点
  tapSpot(e) {
      let dataset = e.currentTarget.dataset;
    let sid = dataset.sid;
    let spot = this.data.spots.find(s => s.id == sid);
    console.log('click spot', spot)

    let idxInSpots = this.data.spots.indexOf(spot);
    //游玩中
    if (this.data.started) {
      if (spot.tracked) {
        //已经到达了，点击后进入观光
        let name = e.currentTarget.dataset.name
        this.toTour(sid, name);
      }
      else {
        wx.showToast({
          title: '请先点击“规划路线”进行路线添加',
          icon: 'none',
          mask: true
        })
      }
    }
    else if (this.data.planing) {
      //规划路线
      if (this.data.planedSpots.indexOf(spot) == -1) {
          this.data.planed = true;
          console.log(this.data.planedSpots.length)
        spot.index = this.data.planedSpots.length;
        this.data.planedSpots.push(spot);


        this.setData({
            [`spots[${idxInSpots}]`]: spot
        });
        //render
        this.updateLines();
      }
      else {
        //已经在路线中了
        wx.showToast({
          title: '路线规划不可前往相同景点',
          icon: 'none',
          mask: true
        });
      }
    }
    else {
      //即没在游玩中，又没在规划路线状态，那应该是刚进入这个城市
      wx.showToast({
        title: '请先点击“规划路线”进行路线添加',
        icon: 'none',
        mask: true
      })
    }
  },

  touchMap() {
    // check if triggered double tap
    let now = Date.now();
    if (tapStamp && now - tapStamp < DOUBLE_TAP_INTERVAL) {
      this.doubleTap();
    }
    tapStamp = now;
  },
  doubleTap() {
    let double = !this.data.double;
    let scale = double ? scaleMax : 1;
    this.setData({ double, scale });
  },
  zoomplus() {
    this.setData({
      double: true,
      scale: scaleMax
    })
  },
  zoomminus() {
    this.setData({
      double: false,
      scale: 1
    })
  },



  //点击小人
  tapRole() {
    if (this.data.unreadEventCnt) {
      this.fetchEvent();
    }
  },

  toNextEvent() {
    this.hidePop();
    this.fetchEvent();
  },

  //请求一次事件信息
  fetchEvent() {
    let req = new EventShow();
    req.cid = this.data.cid;

    req.fetch().then(() => {
      this.data.unreadEventCnt = req.total - req.current;
      let quest = req.quest;
      this.data.quest = quest;
      let curEvtIdx = req.current;
      let totalEvt = req.total;

      switch (quest.type) {
        case EVENT_TYPE_NORMAL:
          this.setData({
            showPop: true,
            showEventNormal: true,
            curEvtIdx,
            totalEvt
          });
          break;
        case EVENT_TYPE_STORY:
        case EVENT_TYPE_QUEST:
          this.setData({
            showPop: true,
            showEventQuest: true,
            curEvtIdx,
            totalEvt
          });
          break;
      }
    })
  },

  hidePop() {
    this.setData({
      showPop: false,
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
    this.setData({ showPop: true, showMissionInfo: true });
  },

  //到攻略页面
  toPr() {
    wx.navigateTo({
      url: '../pointRaiders/pointRaiders?cid=' + this.data.cid + '&city=' + citysName
    })
  },
  //到道具和特产页面
  toProps() {
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