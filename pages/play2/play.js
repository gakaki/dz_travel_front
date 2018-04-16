// pages/play2/play.js
import { shareSuc, shareTitle, Timeline, shareToIndex } from '../../utils/util.js';
import {City, Weather} from '../../sheets.js';
import { TourIndexInfo, Base, FinishGuide, CheckGuide, SetRouter, FreshSpots, PlayLoop,Http } from '../../api.js';
const scaleMax = 2;
let tapStamp;
const DOUBLE_TAP_INTERVAL = 600;
const resRoot = 'https://gengxin.odao.com/update/h5/travel/play/';
const startImg = `${resRoot}start.png`;
const app = getApp();
const selfInfo = app.globalData.userInfo;
const GENDER_MALE = 1;

const spotSize = {
    '1a': {wd: 123, ht: 98},
    '2a': {wd: 105, ht: 60},
    '3a': {wd: 117, ht: 77},
    '4a': {wd: 78, ht: 106},
    '5a': {wd: 92, ht: 115},
    '6a': {wd: 90, ht: 97},
    '7a': {wd: 91, ht: 132},
    '8a': {wd: 90, ht: 110},
    '9a': {wd: 92, ht: 85},
    '10a': {wd: 96, ht: 126},
    '11a': {wd: 91, ht: 90},
    '12a': {wd: 106, ht: 106},
    '13a': {wd: 105, ht: 111},
    '14a': {wd: 93, ht: 172},
    '15a': {wd: 105, ht: 108},
    '16a': {wd: 81, ht: 126},
    '17a': {wd: 105, ht: 161},
    '18a': {wd: 104, ht: 108},
    '19a': {wd: 99, ht: 95},
    '20a': {wd: 104, ht: 100},
    '21a': {wd: 52, ht: 143},
    '22a': {wd: 92, ht: 139},
    '23a': {wd: 91, ht: 127},
    '24a': {wd: 104, ht: 80},
    '25a': {wd: 108, ht: 124},
    '26a': {wd: 39, ht: 142},
    '27a': {wd: 72, ht: 136},
    '28a': {wd: 104, ht: 63},
    '29a': {wd: 76, ht: 109},
    '30a': {wd: 91, ht: 130},
    '31a': {wd: 104, ht: 96},
    '32a': {wd: 104, ht: 148},
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasPlay: true,//是否玩过，玩过的不显示新手引导
        scale: 1, // 当前缩放倍率
        double: false,//是否放大了
        cid: 0, //城市id
        mapBg: '', //背景图url
        mapWidth: 750,
        mapHeight: 1340,
        season: '', //季节
        weather: '',//天气图标
        licheng: 0, //里程,
        hasPath: false, //是否已经规划了路线
        spots: [], //景点列表[{id,cid,name,building,index,x,y,tracked,tracking}]//index>0表示此点在路径中的位置，tracked=true时表示此点已经到过了,tracking=true表示快要到了
        planedSpots: [], //规划到路线中的景点[{id,cid,name,building,index,x,y,tracked}]
        dasheLines: [], //虚线[{x, y, wd, rotation}],存的是虚线的起始点、长度、旋转
        solidLines: [], //实线[{x, y, wd, rotation}],存的是虚线的起始点、长度、旋转
        lines: [],//实线[{x, y, wd, rotation}],存的是虚线的起始点、长度、旋转
        roleMe: null,//自己{x,y, img, rotation, walk:Boolean}
        roleFriend :null,//组队好友{x,y, img, rotation, walk:Boolean}
        planing: false,//是否处于规划路线状态
        started: false, //是否已经开始（规划完路线就算开始了）
        spotsAllTraced: false, //地图上的所有景点是否都走过了
        eventTipImg: '', // 事件气泡图标
        unreadEventCnt: 0, //未读事件数
        showPop: false,//是否显示弹出
        showPlayIntro: false, //是否显示玩法提示pop
        showEventNormal: false, //是否显示普通事件pop
        showEventQuest: false, //是否显示问题事件pop
        showFreeRent: false, //是否显示免费租赁pop
        showMissionInfo: false, //是否显示任务信息pop
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let m = new CheckGuide();
        m.fetch().then(res => {
            this.setData({
                hasPlay: res.hasPlay
            })
        });

        this.data.cid = options.cid;
        let city = City.Get(options.cid);

        //拉取初始信息、景点列表、路线状态等
        let req = new TourIndexInfo();
        req.cid = options.cid;

        req.fetch().then(()=> {

            let startPoint = Object.assign({index: -1, img: startImg, arriveStamp: req.startTime}, req.startPos);
            //小人儿
            let roleBg = resRoot + selfInfo.gender == GENDER_MALE ? 'nan.png' : 'nv.png';
            let roleMe = {x: startPoint.x, y: startPoint.y, img: roleBg, walk: false};

            this.setData({
                weatherImg: Weather.Get(req.weather).icon,
                licheng: app.globalData.userInfo.mileage,
                season: app.globalData.season,
                startPoint,
                roleMe,
                mapBg: `${resRoot}bg/${city.picture}-1.jpg`
            });

            this.updateSpots(req.spots);

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
        Http.listen(PlayLoop, this.onPlayLoop, this, 60000);
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

    },
    onPlayLoop(res) {

    },

    //更新景点状态列表
    updateSpots(spots) {

        if (this.data.spots.length) {
            let olds = this.data.spots;
            olds.sort((a,b) => a.id - b.id);
            spots.sort((a,b) => a.id - b.id);

            //check if all same
            let allSame = true;

            for (let i = 0; i < spots.length; i++) {
                if (i < olds.length) {
                    let o = olds[i];
                    let n = spots[i];
                    let tracked = n.tracked;
                    let arriveStamp = n.arriveStamp;

                    allSame = allSame && o.tracked == tracked && o.arriveStamp == arriveStamp;
                    //将旧数据中的x,y等信息合并到新数据中,而保留新数据的tracked, arrivedStamp
                    Object.assign(n, o, {tracked, arriveStamp})
                }
                else {
                    //新的景点列表，数量比 旧的多，理论上不会出现这种情况
                    allSame = false;
                    break;
                }
            }

            if (allSame) {
                //全部一样的话，不必更新渲染
                return;
            }
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
        }).sort((a,b) => {return a.index - b.index});

        this.data.planedSpots = planedSpots;
        let started = planedSpots.length > 0;
        this.setData({
            spots,
            started,
            hasPath: started
        });
        
        this.updateLines();
    },
    
    //更新路线
    updateLines() {
        if (!this.data.planedSpots.length) {
            return;
        }
        let spots = this.data.planedSpots.concat();

        let startPoint = this.data.startPoint;
        spots.unshift(startPoint);//将起点加入

        let lines = [];
        let roleTrackedSpot = spots[0];
        let roleTrackingSpot = spots[1];
        let roleTrackingLineLength = 0;
        let roleTrackingAngle = 0;

        let len = spots.length - 1;
        for (let i = 0; i < len; i++) {
            let cur = spots[i];
            let nxt = spots[i+1];

            let dy = nxt.y - cur.y;
            let dx = nxt.x - cur.x;
            let wd = wd = Math.hypot(dy, dx);
            let angle = Math.atan2(dy, dx);
            let rotation = angle * 180 / Math.PI;
            let p = {id: cur.id, x: cur.x, y: cur.y, wd, rotation};

            if (cur.tracked) {
                roleTrackedSpot = cur;
                roleTrackingSpot = nxt;
                roleTrackingLineLength = wd;
                roleTrackingAngle = angle;
            }

            lines.push(p);

        }
            
        //update role pos
        let now = Base.servertime;
        let dtBefore = now - roleTrackedSpot.arriveStamp;
        let dtAll = roleTrackingSpot.arriveStamp - roleTrackedSpot.arriveStamp;
        let distBefore = roleTrackingLineLength * dtBefore / dtAll;
        let roleMe = this.data.roleMe;
        roleMe.x = Math.cos(angle) * distBefore + roleTrackedSpot.x;
        roleMe.y = Math.sin(angle) * distBefore + roleTrackedSpot.y;
        const halfPI = Math.PI / 2;
        roleMe.scale = angle > -halfPI && angle <= halfPI ? 1 : -1;

        this.setData({ lines, roleMe });

    },

    //修改路线
    chgLine() {
        this.setData({
            started: false,//设为非游玩状态
            planing: true, //设为编辑路线状态
            planedSpots: this.data.planedSpots.filter(s => s.tracked || s.tracking)//保留已经走过和即将到达的点
        })
    },

    //点击景点
    tapSpot(e) {
        let sid = e.currentTarget.dataset.sid;
        let spot = this.data.spots.find(s => s.id == sid);
        console.log('click spot', spot)

        //游玩中
        if (this.data.started) {
            if (spot.tracked) {
                //已经到达了，点击后进入观光
                this.toTour(sid);
            }
        }
        else if (this.data.planing){
            //规划路线
            if (this.data.planedSpots.indexOf(spot) == -1) {
                spot.index = this.data.planedSpots.length;
                this.data.planedSpots.push(spot);
                //render
                this.updateLines();
            }
            else {
                //已经在路线中了
                wx.showToast({title: '此景点已选过！'});
            }
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
    zoomminus(){
        this.setData({
            double: false,
            scale: 1
        })
    },

    //提交路径到服务器
    sendPath() {
        this.setData({planing: false});

        let req = new SetRouter();
        req.cid = this.data.cid;
        req.line = this.data.planedSpots.map(s => s.id);

        req.fetch().then(()=> {
            app.globalData.gold = req.goldNum;
            this.updateSpots(req.spots);
            this.updateRoles();
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
        this.setData({showPlayIntro: true});
    },

    popEventNormal() {
        this.setData({showEventNormal: true});
    },

    popEventQuest() {
        this.setData({showEventQuest: true});
    },

    popFreeRent() {
        this.setData({showFreeRent: true});
    },

    popMissionInfo() {
        this.setData({showMissionInfo: true});
    },

    //到攻略页面
    toPr() {
        wx.navigateTo({
            url: '../pointRaiders/pointRaiders?cid=' + this.data.cid
        })
    },
    //到道具和特产页面
    toProps() {
        wx.navigateTo({
            url: '../props/props?cid=' + this.data.cid
        })
    },
    //到观光页面
    toTour(sid) {
        wx.navigateTo({
            url: '../goSight/goSight?pointId=' + sid
        })
    },

    //标记完成新手引导
    finishGuide() {
        let req = new FinishGuide();
        req.fetch().then(()=> {
            this.setData({hasPlay: true});
        })

    },
})