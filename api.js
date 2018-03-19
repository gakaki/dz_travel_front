//-------------enums---------------
class Season{
    
    static SPRING = '春';
    
    static SUMMER = '夏';
    
    static AUTUMN = '秋';
    
    static WINTER = '冬';
    
}
class Weather{
    
    static SUNNY = '晴';
    
    static CLOUDY = '阴';
    
    static RAIN = '雨';
    
    static SNOW = '雪';
    
    static WINDY = '风';
    
}
class RankType{
    
    static DAY = 1;
    
    static MONTH = 3;
    
    static RECHARGE = 9;
    
}
//------------classes--------------
class UserInfo  {
    constructor(){
    
    
        //prop type: string
        this.uid = null;
    
        //prop type: string
        this.nickName = null;
    
        //prop type: string
        this.avatarUrl = null;
    
        //prop type: string
        this.gender = null;
    
        //prop type: string
        this.city = null;
    
        //prop type: string
        this.province = null;
    
        //prop type: string
        this.country = null;
    
        //prop type: Boolean
        this.online = null;
    
        //prop type: KV[]
        this.items = null;
    
        //prop type: string[]
        this.friends = null;
    
        
        
    }
}
class RankItem  {
    constructor(){
    
    
        //prop type: string
        this.name = null;
    
        //prop type: number
        this.rank = null;
    
        
        
    }
}
class Base  {
    constructor(){
    
    
        //prop type: App
        this._app = null;
    
        //prop type: string
        this.action = null;
    
        //prop type: number//服务器返回的状态码
        this.code = null;
    
        //prop type: string[]
        this.reqFields = null;
    
        
        
    }
   get app() {
        if (!this._app) {
            this._app=getApp();
        }
        return this._app;
    }
   fetch() {
        return new Promise((resolve, reject) => {
            wx.request({
                url: Base.SRV,
                data: this.reqData,
                success: res => {
                  this.parse(res.data.data);
                  this.code=res.data.code;
                  resolve(this)
                },
                fail: err => {
                    this.error(err)
                    reject(err);
                }
              })
        })
    }
   get reqData() {
        let tmp ={};
        let sid=Base.GetSID();
        if (sid)
            tmp._sid=sid;
        let uid=Base.GetUID();
        if (uid)
            tmp.uid=uid;
        this.reqFields.forEach(k => {
            tmp[k]=this[k]
        });
        tmp.appName=Base.APP_NAME;
        tmp.action=this.action;
        return tmp;
    }
   parse(data) {
        Object.assign(this, data);
    }
   error(err) {

    }
   static GetUID() {
        if (!Base.UID) {
            Base.UID=wx.getStorageSync('uid');
        }
        return Base.UID;
    }
   static GetSID() {
        if (!Base.SID) {
            Base.SID=wx.getStorageSync('sid');
        }
        return Base.SID;
    }
   static Start(appName, url) {
        return new Promise(resolve => {
            let app=getApp();
            if (app.globalData.userInfo) {
                //已经有用户数据
                resolve();
            }
            else {
                this.DoStart(appName, url).then(resolve);
            }
        });
    }
   static DoStart(appName, url) {
        //定义一些静态变量
        this.SID='';
        this.UID='';
        this.APP_NAME=appName;
        this.SRV=url || 'https://h5.ddz2018.com/';//https服务器链接
        this.AUTHED=false;

        //start
        return new Promise(resolve => {
            wx.checkSession({
                success: () => {
                    if (Base.GetSID() || Base.GetUID()){
                        this.AUTHED=true;
                        this.UserLogin(resolve)
                    }
                    else {
                        wx.login({
                            success: res => {
                                this.AUTHED=false;
                                this.UserAuth(res.code, resolve);
                            }
                        })
                    }
                },
                fail: res => {
                    wx.login({
                        success: res => {
                            this.AUTHED=false;
                            this.UserAuth(res.code, resolve);
                        }
                    })
                }
            });
        });

    }
   static UserAuth(code, suc) {
        let req=new Base();
        req.action='weChat.auth';
        req.reqFields=['payload'];

        //set data
        req.payload ={code};
        req.fetch().then( res => {
            this.UID=res.uid;
            wx.setStorageSync('uid', this.UID);
            this.UserLogin(suc);
        });
    }
   static UserLogin(suc) {
        let req=new Base();
        req.action='user.login';
        req.reqFields=[ 'info'];

        //wx login
        wx.getUserInfo({
            success: info =>{
                let app=getApp();

                //fetch srv
                req.info=info.userInfo;
                req.fetch().then(()=>{
                    this.AUTHED=true;
                    if (req.code != 0) {
                        req.error(req.code);
                    }
                    else {
                        app.globalData.userInfo=req.info;
                        this.SID=req.sid;
                        wx.setStorageSync('sid', this.SID);
                        suc(req);
                    }
                });
            }
        });

    }
   static InitWs(wss) {
        //初始化websocket
        this.WSS=wss=wss || `wss://h5.ddz2018.com/${this.APP_NAME}`;//websocket服务器链接
        this.IO=require('./libs/io.js')(wss + `?_sid=${this.SID}&appName=${this.APP_NAME}`);

        return new Promise(resolve => {
            this.IO.on('connect', () => {
                console.log('socket connected')
                resolve();
            });

            this.IO.on('disconnect', msg => {
                console.log('socket disconnected', msg);
            });

            this.IO.on('disconnecting', () => {
                console.log('socket disconnecting');
            });

            this.IO.on('error', () => {
                console.log('socket error');
            });
        });
    }
   static WsReceive(action,suc) {
        this.IO.on(action, res => {suc(res)});
    }
   static WsSend(action, data) {
        this.IO.emit(action, data);
    }
   static WsClose(...actions) {
        actions.forEach( a=> {
            this.IO.removeAllListeners(a);
        });
    }
}
class IndexInfo extends Base {
    constructor(){
        super();
        this.action = 'travel.indexinfo';
    
        this._isFirst = null;
        this._season = null;
        this._weather = null;
        this._playerCnt = null;
        this._friends = null;
        this._unreadMsgCnt = null;
        this.reqFields = [];
        this.resFields = ["isFirst","season","weather","playerCnt","friends","unreadMsgCnt"];
    }
    //server output, type: Boolean
    get isFirst() {return this._isFirst}
    set isFirst(v) {this._isFirst = v}
    //server output, type: Season
    get season() {return this._season}
    set season(v) {this._season = v}
    //server output, type: Weather
    get weather() {return this._weather}
    set weather(v) {this._weather = v}
    //server output, type: number
    get playerCnt() {return this._playerCnt}
    set playerCnt(v) {this._playerCnt = v}
    //server output, type: string[]
    get friends() {return this._friends}
    set friends(v) {this._friends = v}
    //server output, type: number
    get unreadMsgCnt() {return this._unreadMsgCnt}
    set unreadMsgCnt(v) {this._unreadMsgCnt = v}
}
class PlayerInfo extends Base {
    constructor(){
        super();
        this.action = 'travel.playerinfo';
    
        this._playerUid = null;
        this._info = null;
        this.reqFields = ["playerUid"];
        this.resFields = ["info"];
    }
    //client input, optional, type: string
    get playerUid() {return this._playerUid}
    set playerUid(v) {this._playerUid = v}
    //server output, type: UserInfo
    get info() {return this._info}
    set info(v) {this._info = v}
}
class RankInfo extends Base {
    constructor(){
        super();
        this.action = 'rank.rankinfo';
    
        this._rankType = null;
        this._limit = null;
        this._selfRank = null;
        this._ranks = null;
        this.reqFields = ["rankType","limit"];
        this.resFields = ["selfRank","ranks"];
    }
    //client input, require, type: RankType
    get rankType() {return this._rankType}
    set rankType(v) {this._rankType = v}
    //client input, optional, type: number
    get limit() {return this._limit}
    set limit(v) {this._limit = v}
    //server output, type: number
    get selfRank() {return this._selfRank}
    set selfRank(v) {this._selfRank = v}
    //server output, type: RankItem[]
    get ranks() {return this._ranks}
    set ranks(v) {this._ranks = v}
}
class RechargeRankInfo extends RankInfo {
    constructor(){
        super();
        this.action = 'rank.rechargerankinfo';
    
        this._myRecharge = null;
        this.reqFields = ["rankType","limit"];
        this.resFields = ["myRecharge","selfRank","ranks"];
    }
    //server output, type: number
    get myRecharge() {return this._myRecharge}
    set myRecharge(v) {this._myRecharge = v}
}
//-------------exports---------------
exports.Season = Season;
exports.Weather = Weather;
exports.RankType = RankType;
exports.UserInfo = UserInfo;
exports.RankItem = RankItem;
exports.Base = Base;
exports.IndexInfo = IndexInfo;
exports.PlayerInfo = PlayerInfo;
exports.RankInfo = RankInfo;
exports.RechargeRankInfo = RechargeRankInfo;
