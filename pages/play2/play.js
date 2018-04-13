// pages/play2/play.js
import { shareSuc, shareTitle, Timeline, shareToIndex } from '../../utils/util.js';
import { TourIndexInfo, Season, FinishGuide, CheckGuide, Base } from '../../api.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasPlay: true,//是否玩过，玩过的不显示新手引导
        cid: 0, //城市id
        season: '', //季节
        weatherImg: '',//天气图标
        licheng: 0, //里程,
        spots: [], //景点列表[{id,cid,name,building,index,x,y,tracked}]//index>0表示此点在路径中的位置，tracked=true时表示此点已经到过了
        dasheLines: [], //虚线[{x, y, wd, rotation}],存的是虚线的起始点、长度、旋转
        solidLines: [], //实线[{x, y, wd, rotation}],存的是虚线的起始点、长度、旋转
        started: false, //是否已经开始（规划完路线就算开始了）
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
                spots: req.spots,
                startPoint: req.startPos
            });
            let started = this.data.spots.some(o => {
                return o.index > -1;
            })

            this.setData({
                started
            })
            this.createLines();


            // if (started) { //游玩过
            //     //this.startplay()
            //     let arrs = this.data.spots.slice()
            //     arrs.sort((x, y) => {
            //         return x.index - y.index
            //     })
            //     let count = 0
            //     for (let i = 0; i < arrs.length; i++) {
            //         if (arrs[i].index != -1) count++
            //     }
            //     arrs = arrs.slice(-count)//路线中的点
            //     this.lineState(arrs)
            // }
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    //生成路线
    createLines() {
        let spots = this.data.spots.concat().sort((a,b) => {return a.index - b.index});
        let dashes = [];
        let solids = [];

        let len = spots.length - 1;
        for (let i = 0; i < len; i++) {
            let cur = spots[i];
            let nxt = spots[i+1];

            if (nxt.index == -1) {
                break;
            }

            let dy = nxt.y - cur.y;
            let dx = nxt.x - cur.x;
            let wd = wd = Math.hypot(dy, dx);
            let rotation = Math.atan2(dy, dx) * 180 / Math.PI;
            let p = {x: cur.x, y: cur.y, wd, rotation};

            nxt.tracked ? solids.push(p) : dashes.push(p);

        }
    }
})