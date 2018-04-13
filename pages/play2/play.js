// pages/play2/play.js
import { shareSuc, shareTitle, Timeline, shareToIndex } from '../../utils/util.js';
import { TourIndexInfo, Season, FinishGuide, CheckGuide, SetRouter, FreshSpots, PlayLoop,Http } from '../../api.js';
const resRoot = 'https://gengxin.odao.com/update/h5/travel/play/';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasPlay: true,//是否玩过，玩过的不显示新手引导
        scale: 1, // 当前缩放倍率
        cid: 0, //城市id
        mapBg: '', //背景图url
        season: '', //季节
        weather: '',//天气图标
        licheng: 0, //里程,
        hasPath: false, //是否已经规划了路线
        spots: [], //景点列表[{id,cid,name,building,index,x,y,tracked,tracking}]//index>0表示此点在路径中的位置，tracked=true时表示此点已经到过了,tracking=true表示快要到了
        planedSpots: [], //规划到路线中的景点[{id,cid,name,building,index,x,y,tracked}]
        dasheLines: [], //虚线[{x, y, wd, rotation}],存的是虚线的起始点、长度、旋转
        solidLines: [], //实线[{x, y, wd, rotation}],存的是虚线的起始点、长度、旋转
        roles: [], //行人[{x,y, img, rotation, walk:Boolean}]
        started: false, //是否已经开始（规划完路线就算开始了）
        eventTipImg: '', // 事件气泡图标
        unreadEventCnt: 0, //未读事件数
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

        //拉取初始信息、景点列表、路线状态等
        let req = new TourIndexInfo();
        req.cid = options.cid;

        req.fetch().then(()=> {

            this.setData({
                weatherImg: sheet.Weather.Get(req.weather).icon,
                licheng: app.globalData.userInfo.mileage,
                season: app.globalData.season,
                startPoint: req.startPos,
            });

            this.updateSpots(req.spots);

        })

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
            //如果已经有spots数据，则只更新 新spot里带来的tracked和arriveStamp字段，保留旧Spot里的x,y等信息
            let olds = this.data.spots;
            olds.sort((a,b) => a.id - b.id);
            spots.sort((a,b) => a.id - b.id);
            for (let i = 0; i < olds.length; i++) {
                let o = olds[i];
                let n = spots[i];
                o.tracked = n.tracked;
                o.arriveStamp = n.arriveStamp;
            }
            spots = olds;
        }
        this.data.spots = spots;
        let planedSpots = spots.filter(o => {
            return o.index > -1;
        });
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
        let spots = this.data.planedSpots.concat().sort((a,b) => {return a.index - b.index});
        let dashes = [];
        let solids = [];

        let len = spots.length - 1;
        for (let i = 0; i < len; i++) {
            let cur = spots[i];
            let nxt = spots[i+1];

            let dy = nxt.y - cur.y;
            let dx = nxt.x - cur.x;
            let wd = wd = Math.hypot(dy, dx);
            let rotation = Math.atan2(dy, dx) * 180 / Math.PI;
            let p = {id: cur.id, x: cur.x, y: cur.y, wd, rotation};

            nxt.tracked ? solids.push(p) : dashes.push(p);

        }

        this.setData({solidLines: solids, dashLines: dashes});
    },

    createRoles() {

    },

    updateRoles() {},

    //修改路线
    chgLine() {
        this.setData({
            started: false,//设为非游玩状态
            planedSpots: this.data.planedSpots.filter(s => s.tracked || s.tracking)//保留已经走过和即将到达的点
        })
    },

    //点击景点
    tapSpot(e) {
        let sid = e.target.dataset.sid;
        let spot = this.data.spots.find(s => s.id == sid);
        console.log('click spot', spot)

        //游玩中
        if (this.data.started) {
            if (spot.tracked) {
                //已经到达了，点击后进入观光
                this.toTour(sid);
            }
        }
        else {
            //规划路线
            if (this.data.planedSpots.indexOf(spot) == -1) {
                this.data.planedSpots.push(spot);
                //render
                this.updateLines();
            }
            else {
                //已经在路线中了
                wx.showToast({title: '此景点已经在路线当中了！'});
            }
        }
    },

    //提交路径到服务器
    sendPath() {
        let req = new SetRouter();
        req.cid = this.data.cid;
        req.line = this.data.planedSpots;

        req.fetch().then(()=> {
            app.globalData.gold = req.goldNum;
            this.data.spots = req.spots;
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


})