//-------------enums---------------
class Season{
    
    static SPRING = '春';
    
    static SUMMER = '夏';
    
    static AUTUMN = '秋';
    
    static WINTER = '冬';
    
}
class PresentTktType{
    
    static SINGLE = 1;
    
    static DOUBLE = 2;
    
}
class Code{
    
    static AUTH_FAILED = -99;
    
    static LOGIN_FAILED = -100;
    
    static USER_EXISTS = -101;
    
    static LOGIN_EXPIRED = -102;
    
    static ANNOYMOUS_DENY = -103;
    
    static USER_NOT_FOUND = -104;
    
    static VERIFY_FAILED = -105;
    
    static ROOMID_FAILED = -106;
    
    static FRIEND_WAIT = -107;
    
    static REQUIREMENT_FAILED = -108;
    
    static ROOM_FULLED = -109;
    
    static ROOM_NEED_UPDATE = -88;
    
    static ROOM_EXPIRED = -110;
    
    static ROOM_USER_EXISTS = -111;
    
    static BAG_FULLED = -112;
    
    static NEED_ITEMS = -113;
    
    static FRIEND_APPLY = -114;
    
    static FRIEND_DONE = -115;
    
    static SPE_LIMIT = -116;
    
    static PICKED = -117;
    
    static REQUIRED_LOST = -118;
    
    static USER_OFFLINE = -119;
    
    static USER_INTEAM = -120;
    
    static ANSWER_WRONG = -121;
    
    static CANNOT_BE_SELF = -122;
    
    static MUST_FRIEND = -127;
    
    static ISSHARED = -134;
    
    static NO_MONEY = -136;
    
    static EXCEED_COUNT = -137;
    
    static LESS_MONEY = -138;
    
    static LEVEL_MAX = -140;
    
    static ITEM_MAX = -141;
    
    static ITEM_LESS = -142;
    
    static NOT_FOUND = -10086;
    
    static HAS_LIKE = -521;
    
    static NEED_COUPON = -170;
    
    static NEED_MONEY = -171;
    
    static NEED_INTEGRAL = -172;
    
    static NEED_ADDRESS = -173;
    
    static NONE_ADDRESS = -174;
    
    static RANK_NOT_MEET = 150;
    
    static INTEGRAL_NOT_MEET = 151;
    
    static ALREADY_GOT = 152;
    
    static HAS_SIGNIN = -144;
    
    static UNKNOWN = -1000;
    
    static EXCEPTION = -999;
    
    static ROUTER_NOT_FOUND = -998;
    
    static CONTEXT_LOST = -997;
    
    static MODEL_ERROR = -996;
    
    static PARAMETER_NOT_MATCH = -995;
    
    static NEED_AUTH = -994;
    
    static TYPE_MISMATCH = -993;
    
    static FILESYSTEM_FAILED = -992;
    
    static FILE_NOT_FOUND = -991;
    
    static ARCHITECT_DISMATCH = -990;
    
    static SERVER_NOT_FOUND = -989;
    
    static LENGTH_OVERFLOW = -988;
    
    static TARGET_NOT_FOUND = -987;
    
    static PERMISSIO_FAILED = -986;
    
    static WAIT_IMPLEMENTION = -985;
    
    static ACTION_NOT_FOUND = -984;
    
    static TARGET_EXISTS = -983;
    
    static STATE_FAILED = -982;
    
    static UPLOAD_FAILED = -981;
    
    static MASK_WORD = -980;
    
    static PASS_FAILED = -978;
    
    static OVERFLOW = -977;
    
    static AUTH_EXPIRED = -976;
    
    static SIGNATURE_ERROR = -975;
    
    static WX_REQUEST_ERR = -6;
    
    static THIRD_FAILED = -5;
    
    static MULTIDEVICE = -4;
    
    static HFDENY = -3;
    
    static TIMEOUT = -2;
    
    static FAILED = -1;
    
    static OK = 0;
    
    static DELAY_RESPOND = 10000;
    
    static REST_NEED_RELISTEN = 10001;
    
    static NO_DB_ROW = 11001;
    
    static NO_CFG_ROW = 11002;
    
}
class TicketType{
    
    static RANDOMBUY = '00';
    
    static SINGLEBUY = '01';
    
    static DOUBLEBUY = '02';
    
    static SINGLEPRESENT = '11';
    
    static DOUBLEPRESENT = '12';
    
}
class RankType{
    
    static THUMBS = 1;
    
    static FOOT = 2;
    
    static SCORE = 3;
    
}
class RankSubtype{
    
    static COUNTRY = 1;
    
    static FRIEND = 2;
    
}
class PostType{
    
    static JINGDIAN = 1;
    
    static TECHAN = 2;
    
}
class MessageType{
    
    static POSTCARD = 1;
    
    static SYSTEM = 2;
    
    static STRATEGY = 3;
    
    static RANKREWARD = 4;
    
}
//------------classes--------------
class Payload {
    constructor() {
    
    
        //prop type: string
        this.timeStamp = null;
    
        //prop type: string
        this.nonceStr = null;
    
        //prop type: string
        this.package = null;
    
        //prop type: string
        this.signType = null;
    
        //prop type: string
        this.paySign = null;
    
        
        
        
    }
}
class Event {
    constructor() {
    
    
        //prop type: 
        this.cityname = null;
    
        //prop type: 
        this.cityper = null;
    
        
        
        
    }
}
class oneSpot {
    constructor() {
    
    
        
        
        
    }
}
class OneDayLog {
    constructor() {
    
    
        //prop type: string
        this.time = null;
    
        //prop type: string[]
        this.spots = null;
    
        
        
        
    }
}
class OneCityLog {
    constructor() {
    
    
        //prop type: string
        this.city = null;
    
        //prop type: string
        this.time = null;
    
        //prop type: 
        this.scenicSpots = null;
    
        
        
        
    }
}
class Log {
    constructor() {
    
    
        //prop type: string
        this.year = null;
    
        //prop type: OneCityLog[]
        this.oneCityLog = null;
    
        
        
        
    }
}
class FriendInfo {
    constructor() {
    
    
        //prop type: string
        this.cid = null;
    
        //prop type: string
        this.cityName = null;
    
        
        
        
    }
}
class Shop {
    constructor() {
    
    
        //prop type: string
        this.id = null;
    
        //prop type: string
        this.pic = null;
    
        //prop type: string
        this.name = null;
    
        //prop type: string
        this.integral = null;
    
        
        
        
    }
}
class ExchangeShopDetail {
    constructor() {
    
    
        //prop type: string
        this.nickName = null;
    
        //prop type: string
        this.avatarUrl = null;
    
        //prop type: string
        this.shopName = null;
    
        
        
        
    }
}
class MessageItem {
    constructor() {
    
    
        //prop type: number
        this.mid = null;
    
        //prop type: MessageType
        this.type = null;
    
        //prop type: string
        this.title = null;
    
        //prop type: string
        this.date = null;
    
        //prop type: string
        this.content = null;
    
        
        
        
    }
}
class Comment {
    constructor() {
    
    
        //prop type: UserBriefInfo//用户简单信息
        this.user = null;
    
        //prop type: string//评论id
        this.commentId = null;
    
        //prop type: string//评论内容
        this.content = null;
    
        //prop type: number//评论得分
        this.score = null;
    
        //prop type: number//点赞数
        this.thumbs = null;
    
        //prop type: boolean//是否已经点赞
        this.haslike = null;
    
        //prop type: string//创建时间
        this.time = null;
    
        
        
        
    }
}
class UserBriefInfo {
    constructor() {
    
    
        //prop type: string
        this.uid = null;
    
        //prop type: string
        this.nickName = null;
    
        //prop type: string
        this.avatarUrl = null;
    
        
        
        
    }
}
class OtherUserInfo {
    constructor() {
    
    
        //prop type: number
        this.totalIntegral = null;
    
        //prop type: number
        this.mileage = null;
    
        //prop type: number
        this.postcard = null;
    
        //prop type: number
        this.comment = null;
    
        //prop type: number
        this.likeNum = null;
    
        //prop type: number
        this.specialty = null;
    
        
        
        
    }
}
class Post {
    constructor() {
    
    
        //prop type: string//城市id
        this.cityId = null;
    
        //prop type: string//景点或特产id
        this.postId = null;
    
        //prop type: PostType//帖子类型：景点or特产
        this.type = null;
    
        //prop type: string//帖子内容，为景点或特产的介绍
        this.content = null;
    
        //prop type: 
        this.name = null;
    
        //prop type: string//景点或特产图片url
        this.img = null;
    
        //prop type: string//帖子的评分
        this.score = null;
    
        //prop type: number//评论数
        this.commentNum = null;
    
        
        
        
    }
}
class RealInfo {
    constructor() {
    
    
        //prop type: string
        this.uid = null;
    
        //prop type: string
        this.name = null;
    
        //prop type: string
        this.birthday = null;
    
        //prop type: string
        this.phoneNumber = null;
    
        //prop type: string
        this.address = null;
    
        
        
        
    }
}
class TicketInfo {
    constructor() {
    
    
        //prop type: string
        this.cid = null;
    
        //prop type: string
        this.tid = null;
    
        //prop type: PresentTktType
        this.type = null;
    
        
        
        
    }
}
class OneBriefMessage {
    constructor() {
    
    
        //prop type: number
        this.id = null;
    
        //prop type: string
        this.time = null;
    
        //prop type: 
        this.userInfo = null;
    
        //prop type: string
        this.message = null;
    
        
        
        
    }
}
class PostcardBriefDetail {
    constructor() {
    
    
        //prop type: string
        this.id = null;
    
        //prop type: string
        this.url = null;
    
        //prop type: OneBriefMessage
        this.lastestLiveMessage = null;
    
        
        
        
    }
}
class CityPostcardInfo {
    constructor() {
    
    
        //prop type: string
        this.city = null;
    
        //prop type: number
        this.collectPostcardNum = null;
    
        //prop type: number
        this.allPostcardNum = null;
    
        //prop type: PostcardBriefDetail[]
        this.postcardsDetail = null;
    
        
        
        
    }
}
class ProvincePostcardInfo {
    constructor() {
    
    
        //prop type: string
        this.url = null;
    
        //prop type: string
        this.province = null;
    
        //prop type: number
        this.collectPostcardNum = null;
    
        //prop type: number
        this.allPostcardNum = null;
    
        
        
        
    }
}
class SelfRank {
    constructor() {
    
    
        //prop type: number
        this.rank = null;
    
        //prop type: number
        this.weekAchievement = null;
    
        //prop type: number
        this.achievement = null;
    
        
        
        
    }
}
class RankItem {
    constructor() {
    
    
        //prop type: number
        this.rank = null;
    
        //prop type: number
        this.weekAchievement = null;
    
        //prop type: number
        this.achievement = null;
    
        //prop type: UserBriefInfo
        this.userInfo = null;
    
        //prop type: number
        this.reward = null;
    
        
        
        
    }
}
class Sight {
    constructor() {
    
    
        //prop type: string//景点id
        this.pointId = null;
    
        //prop type: string//返回景点的图片地址
        this.img = null;
    
        
        
        
    }
}
class Speciality {
    constructor() {
    
    
        //prop type: number//特产id
        this.propId = null;
    
        //prop type: string//特产图片
        this.img = null;
    
        //prop type: string//特产名
        this.name = null;
    
        //prop type: string//特产介绍
        this.desc = null;
    
        //prop type: number//特产价格
        this.price = null;
    
        //prop type: nunber//限购数量
        this.limitNum = null;
    
        
        
        
    }
}
class ProvencePer {
    constructor() {
    
    
        //prop type: 
        this.proLetter = null;
    
        //prop type: 
        this.proName = null;
    
        //prop type: 
        this.citys = null;
    
        
        
        
    }
}
class Base {
    constructor() {
    
    
        //prop type: number
        this._timestamp = null;
    
        //prop type: App
        this._app = null;
    
        //prop type: string
        this.action = null;
    
        //prop type: number//服务器返回的状态码
        this.code = null;
    
        //prop type: string[]
        this.requireFileds = null;
    
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
                  if (this.code != Code.OK) {
                      console.log('fetch got an error code',this.code);
                      reject(this.code);
                  }
                  else {
                      resolve(this);
                  }
                },
                fail: err => {
                    this.error(err)
                    reject(Code.WX_REQUEST_ERR);
                }
              })
        })
    }
   get reqData() {
        let tmp ={};
        let sid=Base.GetSID();
        if (sid)
            tmp.sid=sid;
        let uid=Base.GetUID();
        if (uid)
            tmp.uid=uid;
        this.reqFields.forEach(k => {
            tmp[k]=this[k] === null ? '':this[k];
        });
        tmp.appName=Base.APP_NAME;
        tmp.action=this.action;
        return tmp;
    }
   parse(data, serverSide=false) {
        Object.assign(this, data);
        for (let f in this.requireFileds) {
            if (!this[f]) {
                break;
                if (serverSide)
                    ctx.body ={code: Code.PARAMETER_NOT_MATCH}
                else {
                    throw new Error('参数不全')
                }
            }
        }
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
   static Start(appName, url, shareUid) {
        if(shareUid)
            this.shareUid=shareUid;
        return new Promise((resolve,reject) => {
            let app=getApp();
            if (this.LOGINED) {
                //已经有用户数据
                resolve();
            }
            else {
                this.DoStart(appName, url).then(resolve).catch(reject);
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
        if (this.shareUid) {
            req.reqFields.push('shareUid');
            req.shareUid=this.shareUid;
        }
        //wx login
        wx.getUserInfo({
            success: info =>{
                let app=getApp();
                //fetch srv
                req.info=info.userInfo;
                req.fetch().then(()=>{
                    this.AUTHED=true;
                    this.LOGINED=true;
                    this.shareUid=null;
                    app.globalData.userInfo=req.info;
                    this.SID=req.sid;
                    this._timestampD=Date.now()/1000  - req.timestamp;
                    wx.setStorageSync('sid', this.SID);
                    suc(req);
                });
            }
        });
    }
   static get servertime() {
        return ( Date.now()/1000-this._timestampD) * 1000
    }
}
class CityPer {
    constructor() {
    
    
        //prop type: string//城市id
        this.cityId = null;
    
        //prop type: 
        this.cityname = null;
    
        //prop type: 
        this.cityper = null;
    
        //prop type: 
        this.cityEff = null;
    
        
        
        
    }
}
class Quest {
    constructor() {
    
    
        //prop type: string
        this.id = null;
    
        //prop type: string
        this.type = null;
    
        //prop type: string
        this.describe = null;
    
        //prop type: number
        this.gold_used = null;
    
        //prop type: KV[]
        this.rewards = null;
    
        //prop type: string
        this.question = null;
    
        //prop type: string[]
        this.answers = null;
    
        
        
        
    }
}
class Ws {
    constructor() {
    
    
        
        
        
    }
   static init(wss) {
        if (this.IO) {
            return;
        }
        //初始化websocket
        this.WSS=wss=wss || `wss://h5.ddz2018.com/${Base.APP_NAME}`;//websocket服务器链接
        this.IO=require('./libs/io.js')(wss + `?_sid=${Base.GetSID()}&uid=${Base.GetUID()}&appName=${Base.APP_NAME}`);//query里直接用sid连接不上，必须用_sid，不知道为啥
        this._listenings=new Map();
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
   static listen(wsReceiveCls, cb, ctx) {
        if (!this._listenings) {
            console.error('ws has not inited');
            return;
        }
        let action=wsReceiveCls.name.toLowerCase();
        if (!this._listenings.has(action)) {
            this._listenings.set(action, new wsReceiveCls);
        }
        let listener=this._listenings.get(action);
        listener.cbx ={cb, ctx};
        this.IO.on(action, this._onReceive.bind(this));
    }
   static unlisten(wsReceiveCls, cb, ctx) {
        if (!this._listenings) {
            console.error('ws has not inited');
            return;
        }
        let action=wsReceiveCls.name.toLowerCase();
        if (this._listenings.has(action)) {
            let listener=this._listenings.get(action);
            listener.cbx=null;
        }
    }
   static _onReceive(res) {
        let data=res.data
        let action=data.action;
        if (!this._listenings.has(action))
            return;
        let listener=this._listenings.get(action);
        listener.parse(data);
        listener.code=res.code;
        let cbx=listener.cbx;
        cbx && cbx.ctx ? cbx.cb.call(cbx.ctx, listener):cbx.cb(listener);
    }
   static send(wsSend) {
        this.IO.emit(wsSend.action, wsSend.reqData);
    }
   static close() {
        if(this.IO) {
            this.IO.close();
            wx.closeWebsocket();
            this.IO=null;
        }
    }
}
class Http {
    constructor() {
    
    
        
        
        
    }
   static init() {
        this.LS_IDLE='IDLE';
        this.LS_BUSY='BUSY';
        this.LS_SUC='SUC';
        this.LOOP_INTERVAL=300;
        this._listenings=this._listenings || new Map();
    }
   static listen(apiCls, cb, ctx, interval=300, preFetch=null) {
        if (!this._listenings) {
            console.error('Http loop has not inited');
            return;
        }
        let action=apiCls.name.toLowerCase();
        if (!this._listenings.has(action)) {
            this._listenings.set(action, new apiCls);
        }
        let listener=this._listenings.get(action);
        listener.cbx ={cb, ctx, interval, status: this.LS_IDLE, passedTm: 0, preFetch: preFetch};
        //start loop
        this.loopListen();
    }
   static unlisten(apiCls, cb, ctx) {
        if (!this._listenings) {
            console.error('Http loop has not inited');
            return;
        }
        let action=apiCls.name.toLowerCase();
        if (this._listenings.has(action)) {
            let listener=this._listenings.get(action);
            listener.cbx=null;
            this._listenings.delete(action);
            if (!this._listenings.size) {
                this.clearLoop();
            }
        }
    }
   static loopListen() {
        if (this._listenHdl) {
            return;
        }
        this._listenHdl=setInterval(() => {
            this._listenings.forEach(lsnr => {
                let cfg=lsnr.cbx;
                cfg.passedTm += this.LOOP_INTERVAL;
                if (cfg.passedTm >= cfg.interval) {
                    cfg.passedTm=0;
                    switch(cfg.status) {
                        case this.LS_IDLE:
                            cfg.status=this.LS_BUSY;
                            if (cfg.preFetch) {
                                //fetch之前，可以通过此回调，对lsnr请求字段付值
                                cfg.ctx ? cfg.preFetch.call(cfg.ctx, lsnr):cfg.preFetch(lsnr);
                            }
                            lsnr.fetch().then(()=>{
                                cfg.status=this.LS_SUC;
                            }).catch(errCode => {
                                cfg.ctx ? cfg.cb.call(cfg.ctx, lsnr, errCode):cfg.cb(lsnr, errCode);
                            });
                            break;
                        case this.LS_SUC:
                            cfg.status=this.LS_BUSY;
                            cfg.ctx ? cfg.cb.call(cfg.ctx, lsnr):cfg.cb(lsnr);
                            cfg.status=this.LS_IDLE;
                            break;
                        case this.LS_BUSY:
                            //wait to be suc
                            break;
                    }
                }
            })
        }, this.LOOP_INTERVAL);
    }
   static clearLoop() {
        if (this._listenHdl) {
            clearInterval(this._listenHdr);
            this._listenHdl=null;
        }
    }
}
class QuestReport {
    constructor() {
    
    
        //prop type: number
        this.spotCount = null;
    
        //prop type: number
        this.questCount = null;
    
        //prop type: number
        this.postcardCount = null;
    
        
        
        
    }
}
class Position {
    constructor() {
    
    
        //prop type: number
        this.x = null;
    
        //prop type: number
        this.y = null;
    
        
        
        
    }
}
class Spot {
    constructor() {
    
    
        //prop type: number
        this.cid = null;
    
        //prop type: number
        this.id = null;
    
        //prop type: number
        this.x = null;
    
        //prop type: number
        this.y = null;
    
        //prop type: string
        this.name = null;
    
        //prop type: boolean
        this.isStart = null;
    
        //prop type: boolean
        this.tracked = null;
    
        //prop type: number
        this.index = null;
    
        //prop type: number
        this.createDate = null;
    
        
        
        
    }
}
class EnterSpot {
    constructor() {
    
    
        //prop type: string
        this.id = null;
    
        //prop type: string
        this.scenicspot = null;
    
        //prop type: string
        this.season = null;
    
        //prop type: number
        this.weather = null;
    
        //prop type: number[]
        this.freePhoto = null;
    
        //prop type: number[]
        this.freeSight = null;
    
        //prop type: string
        this.picture = null;
    
        //prop type: string
        this.description = null;
    
        
        
        
    }
}
class TourTask {
    constructor() {
    
    
        //prop type: number[]
        this.spot = null;
    
        //prop type: number[]
        this.tour = null;
    
        //prop type: number[]
        this.photo = null;
    
        
        
        
    }
}
class Postcard {
    constructor() {
    
    
        //prop type: string
        this.id = null;
    
        //prop type: string
        this.pattern = null;
    
        //prop type: string
        this.picture = null;
    
        //prop type: string
        this.type = null;
    
        
        
        
    }
}
class FinishGuide extends Base {
    constructor() {
        super();
        this.action = 'tour.finishguide';
    
        this._play = null;
        this.requireFileds = ["play"];
        this.reqFields = ["play"];
        this.resFields = [];
    }
    //client input, require, type: boolean
    get play() {return this._play}
    set play(v) {this._play = v}
}
class LeaveTour extends Base {
    constructor() {
        super();
        this.action = 'tour.leavetour';
    
        this._userinfo = null;
        this._cityPer = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["userinfo","cityPer"];
    }
    //server output, type: UserInfo
    get userinfo() {return this._userinfo}
    set userinfo(v) {this._userinfo = v}
    //server output, type: CityPer
    get cityPer() {return this._cityPer}
    set cityPer(v) {this._cityPer = v}
}
class ChangeRouter extends Base {
    constructor() {
        super();
        this.action = 'tour.changerouter';
    
        this._spotId = null;
        this._position = null;
        this._nextSpot = null;
        this.requireFileds = ["spotId","position"];
        this.reqFields = ["spotId","position"];
        this.resFields = ["nextSpot"];
    }
    //client input, require, type: number
    get spotId() {return this._spotId}
    set spotId(v) {this._spotId = v}
    //client input, require, type: Position
    get position() {return this._position}
    set position(v) {this._position = v}
    //server output, type: NextSpot
    get nextSpot() {return this._nextSpot}
    set nextSpot(v) {this._nextSpot = v}
}
class NextRouter extends Base {
    constructor() {
        super();
        this.action = 'tour.nextrouter';
    
        this._cid = null;
        this._spotIdCurrent = null;
        this._spotIdNext = null;
        this._uid = null;
        this._nextSpot = null;
        this.requireFileds = ["cid","spotIdCurrent","spotIdNext","uid"];
        this.reqFields = ["cid","spotIdCurrent","spotIdNext","uid"];
        this.resFields = ["nextSpot"];
    }
    //client input, require, type: string
    get cid() {return this._cid}
    set cid(v) {this._cid = v}
    //client input, require, type: string
    get spotIdCurrent() {return this._spotIdCurrent}
    set spotIdCurrent(v) {this._spotIdCurrent = v}
    //client input, require, type: string
    get spotIdNext() {return this._spotIdNext}
    set spotIdNext(v) {this._spotIdNext = v}
    //client input, require, type: string
    get uid() {return this._uid}
    set uid(v) {this._uid = v}
    //server output, type: NextSpot
    get nextSpot() {return this._nextSpot}
    set nextSpot(v) {this._nextSpot = v}
}
class QuestEnterSpot extends Base {
    constructor() {
        super();
        this.action = 'tour.questenterspot';
    
        this._sid = null;
        this._spotId = null;
        this._eventId = null;
        this._userinfo = null;
        this.requireFileds = ["sid","spotId"];
        this.reqFields = ["sid","spotId"];
        this.resFields = ["eventId","userinfo"];
    }
    //client input, require, type: number
    get sid() {return this._sid}
    set sid(v) {this._sid = v}
    //client input, require, type: number
    get spotId() {return this._spotId}
    set spotId(v) {this._spotId = v}
    //server output, type: number
    get eventId() {return this._eventId}
    set eventId(v) {this._eventId = v}
    //server output, type: UserInfo
    get userinfo() {return this._userinfo}
    set userinfo(v) {this._userinfo = v}
}
class AnswerQuestion extends Base {
    constructor() {
        super();
        this.action = 'tour.answerquestion';
    
        this._answerResult = null;
        this._userinfo = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["answerResult","userinfo"];
    }
    //server output, type: boolean
    get answerResult() {return this._answerResult}
    set answerResult(v) {this._answerResult = v}
    //server output, type: UserInfo
    get userinfo() {return this._userinfo}
    set userinfo(v) {this._userinfo = v}
}
class QuestRandom extends Base {
    constructor() {
        super();
        this.action = 'tour.questrandom';
    
        this._eventId = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["eventId"];
    }
    //server output, type: number
    get eventId() {return this._eventId}
    set eventId(v) {this._eventId = v}
}
class CheckGuide extends Base {
    constructor() {
        super();
        this.action = 'tour.checkguide';
    
        this._hasPlay = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["hasPlay"];
    }
    //server output, type: boolean
    get hasPlay() {return this._hasPlay}
    set hasPlay(v) {this._hasPlay = v}
}
class Photography extends Base {
    constructor() {
        super();
        this.action = 'tour.photography';
    
        this._uid = null;
        this._cid = null;
        this._spotId = null;
        this._postcard = null;
        this.requireFileds = ["uid","cid","spotId"];
        this.reqFields = ["uid","cid","spotId"];
        this.resFields = ["postcard"];
    }
    //client input, require, type: number
    get uid() {return this._uid}
    set uid(v) {this._uid = v}
    //client input, require, type: number
    get cid() {return this._cid}
    set cid(v) {this._cid = v}
    //client input, require, type: number
    get spotId() {return this._spotId}
    set spotId(v) {this._spotId = v}
    //server output, type: Postcard
    get postcard() {return this._postcard}
    set postcard(v) {this._postcard = v}
}
class NextSpot extends Spot {
    constructor() {
        super();
    
        //prop type: number
        this.spodIdNext = null;
    
        //prop type: number
        this.createDate = null;
    
        //prop type: number
        this.arrivedDate = null;
    
        //prop type: string
        this.needTime = null;
    
        //prop type: number
        this.elapsedTimeSecond = null;
    
        
        
        
    }
}
class WsReceive extends Base {
    constructor() {
        super();
    
        
        
        
    }
}
class Enterspot extends Base {
    constructor() {
        super();
        this.action = 'tour.enterspot';
    
        this._uid = null;
        this._spotId = null;
        this._spot = null;
        this._quests = null;
        this.requireFileds = ["uid","spotId"];
        this.reqFields = ["uid","spotId"];
        this.resFields = ["spot","quests"];
    }
    //client input, require, type: number
    get uid() {return this._uid}
    set uid(v) {this._uid = v}
    //client input, require, type: number
    get spotId() {return this._spotId}
    set spotId(v) {this._spotId = v}
    //server output, type: EnterSpot
    get spot() {return this._spot}
    set spot(v) {this._spot = v}
    //server output, type: Quest[]
    get quests() {return this._quests}
    set quests(v) {this._quests = v}
}
class SpotTour extends Base {
    constructor() {
        super();
        this.action = 'tour.spottour';
    
        this._sid = null;
        this._cid = null;
        this._spotId = null;
        this._userinfo = null;
        this.requireFileds = ["sid","cid","spotId"];
        this.reqFields = ["sid","cid","spotId"];
        this.resFields = ["userinfo"];
    }
    //client input, require, type: number
    get sid() {return this._sid}
    set sid(v) {this._sid = v}
    //client input, require, type: number
    get cid() {return this._cid}
    set cid(v) {this._cid = v}
    //client input, require, type: number
    get spotId() {return this._spotId}
    set spotId(v) {this._spotId = v}
    //server output, type: UserInfo
    get userinfo() {return this._userinfo}
    set userinfo(v) {this._userinfo = v}
}
class TourSpotAnswer extends Base {
    constructor() {
        super();
        this.action = 'tour.tourspotanswer';
    
        this._uid = null;
        this._id = null;
        this._answer = null;
        this._correct = null;
        this._userInfo = null;
        this._rewards = null;
        this.requireFileds = ["uid","id","answer"];
        this.reqFields = ["uid","id","answer"];
        this.resFields = ["correct","userInfo","rewards"];
    }
    //client input, require, type: number
    get uid() {return this._uid}
    set uid(v) {this._uid = v}
    //client input, require, type: number
    get id() {return this._id}
    set id(v) {this._id = v}
    //client input, require, type: string
    get answer() {return this._answer}
    set answer(v) {this._answer = v}
    //server output, type: boolean
    get correct() {return this._correct}
    set correct(v) {this._correct = v}
    //server output, type: 
    get userInfo() {return this._userInfo}
    set userInfo(v) {this._userInfo = v}
    //server output, type: 
    get rewards() {return this._rewards}
    set rewards(v) {this._rewards = v}
}
class EventShow extends Base {
    constructor() {
        super();
        this.action = 'tour.eventshow';
    
        this._uid = null;
        this._cid = null;
        this._id = null;
        this._quest = null;
        this._userinfo = null;
        this.requireFileds = ["uid","cid"];
        this.reqFields = ["uid","cid"];
        this.resFields = ["id","quest","userinfo"];
    }
    //client input, require, type: number
    get uid() {return this._uid}
    set uid(v) {this._uid = v}
    //client input, require, type: number
    get cid() {return this._cid}
    set cid(v) {this._cid = v}
    //server output, type: string
    get id() {return this._id}
    set id(v) {this._id = v}
    //server output, type: Quest
    get quest() {return this._quest}
    set quest(v) {this._quest = v}
    //server output, type: UserInfo
    get userinfo() {return this._userinfo}
    set userinfo(v) {this._userinfo = v}
}
class ShowQuestReport extends Base {
    constructor() {
        super();
        this.action = 'tour.showquestreport';
    
        this._questReport = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["questReport"];
    }
    //server output, type: QuestReport
    get questReport() {return this._questReport}
    set questReport(v) {this._questReport = v}
}
class Minapppay extends Base {
    constructor() {
        super();
        this.action = 'weChat.minapppay';
    
        this._goodsId = null;
        this._payCount = null;
        this._payload = null;
        this.requireFileds = ["goodsId","payCount"];
        this.reqFields = ["goodsId","payCount"];
        this.resFields = ["payload"];
    }
    //client input, require, type: number
    get goodsId() {return this._goodsId}
    set goodsId(v) {this._goodsId = v}
    //client input, require, type: number
    get payCount() {return this._payCount}
    set payCount(v) {this._payCount = v}
    //server output, type: Payload
    get payload() {return this._payload}
    set payload(v) {this._payload = v}
}
class RentProp extends Base {
    constructor() {
        super();
        this.action = 'tour.rentprop';
    
        this._rentId = null;
        this.requireFileds = ["rentId"];
        this.reqFields = ["rentId"];
        this.resFields = [];
    }
    //client input, require, type: number
    get rentId() {return this._rentId}
    set rentId(v) {this._rentId = v}
}
class RentedProp extends Base {
    constructor() {
        super();
        this.action = 'tour.rentedprop';
    
        this._rentItems = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["rentItems"];
    }
    //server output, type: KV[]//已租用的所有道具。
    get rentItems() {return this._rentItems}
    set rentItems(v) {this._rentItems = v}
}
class TourStart extends Base {
    constructor() {
        super();
        this.action = 'tour.tourstart';
    
        this._cid = null;
        this._line = null;
        this._weather = null;
        this._friendList = null;
        this._spots = null;
        this._startPos = null;
        this._task = null;
        this._weather = null;
        this.requireFileds = ["cid","line","weather"];
        this.reqFields = ["cid","line","weather"];
        this.resFields = ["friendList","spots","startPos","task","weather"];
    }
    //client input, require, type: string
    get cid() {return this._cid}
    set cid(v) {this._cid = v}
    //client input, require, type: array
    get line() {return this._line}
    set line(v) {this._line = v}
    //client input, require, type: string
    get weather() {return this._weather}
    set weather(v) {this._weather = v}
    //server output, type: array
    get friendList() {return this._friendList}
    set friendList(v) {this._friendList = v}
    //server output, type: Spot[]
    get spots() {return this._spots}
    set spots(v) {this._spots = v}
    //server output, type: Position
    get startPos() {return this._startPos}
    set startPos(v) {this._startPos = v}
    //server output, type: TourTask
    get task() {return this._task}
    set task(v) {this._task = v}
    //server output, type: number
    get weather() {return this._weather}
    set weather(v) {this._weather = v}
}
class WsSend extends Base {
    constructor() {
        super();
    
        
        
        
    }
}
class ShareInfo extends Base {
    constructor() {
        super();
        this.action = 'player.shareinfo';
    
        this._isFirst = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["isFirst"];
    }
    //server output, type: boolean
    get isFirst() {return this._isFirst}
    set isFirst(v) {this._isFirst = v}
}
class CityListPer extends Base {
    constructor() {
        super();
        this.action = 'city.citylistper';
    
        this._data = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["data"];
    }
    //server output, type: ProvencePer[]
    get data() {return this._data}
    set data(v) {this._data = v}
}
class FlyInfo extends Base {
    constructor() {
        super();
        this.action = 'startGame.flyinfo';
    
        this._type = null;
        this._gold = null;
        this._isSingleFirst = null;
        this._isDoubleFirst = null;
        this._season = null;
        this._weather = null;
        this._cost = null;
        this._doubleCost = null;
        this._location = null;
        this._holiday = null;
        this._cid = null;
        this.requireFileds = ["type"];
        this.reqFields = ["type"];
        this.resFields = ["gold","isSingleFirst","isDoubleFirst","season","weather","cost","doubleCost","location","holiday","cid"];
    }
    //client input, require, type: TicketType
    get type() {return this._type}
    set type(v) {this._type = v}
    //server output, type: number
    get gold() {return this._gold}
    set gold(v) {this._gold = v}
    //server output, type: Boolean
    get isSingleFirst() {return this._isSingleFirst}
    set isSingleFirst(v) {this._isSingleFirst = v}
    //server output, type: Boolean
    get isDoubleFirst() {return this._isDoubleFirst}
    set isDoubleFirst(v) {this._isDoubleFirst = v}
    //server output, type: Season
    get season() {return this._season}
    set season(v) {this._season = v}
    //server output, type: number
    get weather() {return this._weather}
    set weather(v) {this._weather = v}
    //server output, type: number
    get cost() {return this._cost}
    set cost(v) {this._cost = v}
    //server output, type: number
    get doubleCost() {return this._doubleCost}
    set doubleCost(v) {this._doubleCost = v}
    //server output, type: string
    get location() {return this._location}
    set location(v) {this._location = v}
    //server output, type: string
    get holiday() {return this._holiday}
    set holiday(v) {this._holiday = v}
    //server output, type: string
    get cid() {return this._cid}
    set cid(v) {this._cid = v}
}
class StartGame extends Base {
    constructor() {
        super();
        this.action = 'startGame.startgame';
    
        this._type = null;
        this._cid = null;
        this._cost = null;
        this._inviteCode = null;
        this._tid = null;
        this._score = null;
        this._reward = null;
        this.requireFileds = ["type","cid","cost"];
        this.reqFields = ["type","cid","cost","inviteCode","tid"];
        this.resFields = ["score","reward"];
    }
    //client input, require, type: TicketType
    get type() {return this._type}
    set type(v) {this._type = v}
    //client input, require, type: number
    get cid() {return this._cid}
    set cid(v) {this._cid = v}
    //client input, require, type: number
    get cost() {return this._cost}
    set cost(v) {this._cost = v}
    //client input, optional, type: string
    get inviteCode() {return this._inviteCode}
    set inviteCode(v) {this._inviteCode = v}
    //client input, optional, type: string
    get tid() {return this._tid}
    set tid(v) {this._tid = v}
    //server output, type: number
    get score() {return this._score}
    set score(v) {this._score = v}
    //server output, type: number
    get reward() {return this._reward}
    set reward(v) {this._reward = v}
}
class CreateCode extends Base {
    constructor() {
        super();
        this.action = 'startGame.createcode';
    
        this._inviteCode = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["inviteCode"];
    }
    //server output, type: string
    get inviteCode() {return this._inviteCode}
    set inviteCode(v) {this._inviteCode = v}
}
class CheckCode extends Base {
    constructor() {
        super();
        this.action = 'startGame.checkcode';
    
        this._inviteCode = null;
        this.requireFileds = ["inviteCode"];
        this.reqFields = ["inviteCode"];
        this.resFields = [];
    }
    //client input, require, type: string
    get inviteCode() {return this._inviteCode}
    set inviteCode(v) {this._inviteCode = v}
}
class DeleteCode extends Base {
    constructor() {
        super();
        this.action = 'startGame.deletecode';
    
        this._inviteCode = null;
        this.requireFileds = ["inviteCode"];
        this.reqFields = ["inviteCode"];
        this.resFields = [];
    }
    //client input, require, type: string
    get inviteCode() {return this._inviteCode}
    set inviteCode(v) {this._inviteCode = v}
}
class PartnerInfo extends Base {
    constructor() {
        super();
        this.action = 'startGame.partnerinfo';
    
        this._inviteCode = null;
        this._nickName = null;
        this._avatarUrl = null;
        this._gold = null;
        this._season = null;
        this._weather = null;
        this._cid = null;
        this._location = null;
        this._holiday = null;
        this._parLocation = null;
        this._isFly = null;
        this._score = null;
        this._reward = null;
        this.requireFileds = ["inviteCode"];
        this.reqFields = ["inviteCode"];
        this.resFields = ["nickName","avatarUrl","gold","season","weather","cid","location","holiday","parLocation","isFly","score","reward"];
    }
    //client input, require, type: string
    get inviteCode() {return this._inviteCode}
    set inviteCode(v) {this._inviteCode = v}
    //server output, type: string
    get nickName() {return this._nickName}
    set nickName(v) {this._nickName = v}
    //server output, type: string
    get avatarUrl() {return this._avatarUrl}
    set avatarUrl(v) {this._avatarUrl = v}
    //server output, type: number
    get gold() {return this._gold}
    set gold(v) {this._gold = v}
    //server output, type: Season
    get season() {return this._season}
    set season(v) {this._season = v}
    //server output, type: number
    get weather() {return this._weather}
    set weather(v) {this._weather = v}
    //server output, type: string
    get cid() {return this._cid}
    set cid(v) {this._cid = v}
    //server output, type: string
    get location() {return this._location}
    set location(v) {this._location = v}
    //server output, type: string
    get holiday() {return this._holiday}
    set holiday(v) {this._holiday = v}
    //server output, type: string
    get parLocation() {return this._parLocation}
    set parLocation(v) {this._parLocation = v}
    //server output, type: number
    get isFly() {return this._isFly}
    set isFly(v) {this._isFly = v}
    //server output, type: number
    get score() {return this._score}
    set score(v) {this._score = v}
    //server output, type: number
    get reward() {return this._reward}
    set reward(v) {this._reward = v}
}
class TraveledPlaces extends Base {
    constructor() {
        super();
        this.action = 'player.traveledplaces';
    
        this._playerUid = null;
        this._provinces = null;
        this._citys = null;
        this.requireFileds = [];
        this.reqFields = ["playerUid"];
        this.resFields = ["provinces","citys"];
    }
    //client input, optional, type: string//用户uid，不传则是自己的
    get playerUid() {return this._playerUid}
    set playerUid(v) {this._playerUid = v}
    //server output, type: string[]//点亮的省名数组,如[‘江苏’]
    get provinces() {return this._provinces}
    set provinces(v) {this._provinces = v}
    //server output, type: string[]//点亮的城市名数组，如[‘苏州’]
    get citys() {return this._citys}
    set citys(v) {this._citys = v}
}
class MySpe extends Speciality {
    constructor() {
        super();
    
        //prop type: number//特产卖出价格
        this.sellPrice = null;
    
        //prop type: number//我的某个特产的数量
        this.num = null;
    
        
        
        
    }
}
class CitySpes extends Base {
    constructor() {
        super();
        this.action = 'speciality.cityspes';
    
        this._cityId = null;
        this._specialtys = null;
        this.requireFileds = ["cityId"];
        this.reqFields = ["cityId"];
        this.resFields = ["specialtys"];
    }
    //client input, require, type: number//城市id
    get cityId() {return this._cityId}
    set cityId(v) {this._cityId = v}
    //server output, type: Speciality[]
    get specialtys() {return this._specialtys}
    set specialtys(v) {this._specialtys = v}
}
class MySpes extends Base {
    constructor() {
        super();
        this.action = 'speciality.myspes';
    
        this._specialtys = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["specialtys"];
    }
    //server output, type: MySpe[]
    get specialtys() {return this._specialtys}
    set specialtys(v) {this._specialtys = v}
}
class Spe extends Base {
    constructor() {
        super();
        this.action = 'speciality.spe';
    
        this._propId = null;
        this._count = null;
        this.requireFileds = ["propId","count"];
        this.reqFields = ["propId","count"];
        this.resFields = [];
    }
    //client input, require, type: number//特产id
    get propId() {return this._propId}
    set propId(v) {this._propId = v}
    //client input, require, type: number//购买数量
    get count() {return this._count}
    set count(v) {this._count = v}
}
class GetUserLocation extends Base {
    constructor() {
        super();
        this.action = 'integralShop.getuserlocation';
    
        this._nickName = null;
        this._tel = null;
        this._address = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["nickName","tel","address"];
    }
    //server output, type: string
    get nickName() {return this._nickName}
    set nickName(v) {this._nickName = v}
    //server output, type: string
    get tel() {return this._tel}
    set tel(v) {this._tel = v}
    //server output, type: string
    get address() {return this._address}
    set address(v) {this._address = v}
}
class ExchangeShop extends Base {
    constructor() {
        super();
        this.action = 'integralShop.exchangeshop';
    
        this._id = null;
        this._tel = null;
        this._addr = null;
        this.requireFileds = ["id","tel","addr"];
        this.reqFields = ["id","tel","addr"];
        this.resFields = [];
    }
    //client input, require, type: string
    get id() {return this._id}
    set id(v) {this._id = v}
    //client input, require, type: string
    get tel() {return this._tel}
    set tel(v) {this._tel = v}
    //client input, require, type: string
    get addr() {return this._addr}
    set addr(v) {this._addr = v}
}
class TravelFootprint extends Base {
    constructor() {
        super();
        this.action = 'player.travelfootprint';
    
        this._playerUid = null;
        this._userInfo = null;
        this._items = null;
        this._reachrovince = null;
        this._totalArrive = null;
        this._totalArrivePercent = null;
        this._travelPercent = null;
        this.requireFileds = [];
        this.reqFields = ["playerUid"];
        this.resFields = ["userInfo","items","reachrovince","totalArrive","totalArrivePercent","travelPercent"];
    }
    //client input, optional, type: string
    get playerUid() {return this._playerUid}
    set playerUid(v) {this._playerUid = v}
    //server output, type: UserBriefInfo
    get userInfo() {return this._userInfo}
    set userInfo(v) {this._userInfo = v}
    //server output, type: KV[]
    get items() {return this._items}
    set items(v) {this._items = v}
    //server output, type: number
    get reachrovince() {return this._reachrovince}
    set reachrovince(v) {this._reachrovince = v}
    //server output, type: number
    get totalArrive() {return this._totalArrive}
    set totalArrive(v) {this._totalArrive = v}
    //server output, type: number
    get totalArrivePercent() {return this._totalArrivePercent}
    set totalArrivePercent(v) {this._totalArrivePercent = v}
    //server output, type: number
    get travelPercent() {return this._travelPercent}
    set travelPercent(v) {this._travelPercent = v}
}
class viewpointInfo extends Base {
    constructor() {
        super();
        this.action = 'sight.viewpointinfo';
    
        this._pointId = null;
        this._season = null;
        this._weather = null;
        this._img = null;
        this._name = null;
        this._desc = null;
        this.requireFileds = ["pointId"];
        this.reqFields = ["pointId"];
        this.resFields = ["season","weather","img","name","desc"];
    }
    //client input, require, type: string
    get pointId() {return this._pointId}
    set pointId(v) {this._pointId = v}
    //server output, type: Season
    get season() {return this._season}
    set season(v) {this._season = v}
    //server output, type: number
    get weather() {return this._weather}
    set weather(v) {this._weather = v}
    //server output, type: string//返回景点的图片地址
    get img() {return this._img}
    set img(v) {this._img = v}
    //server output, type: string//景点名称
    get name() {return this._name}
    set name(v) {this._name = v}
    //server output, type: string//景点介绍
    get desc() {return this._desc}
    set desc(v) {this._desc = v}
}
class Photograph extends Base {
    constructor() {
        super();
        this.action = 'sight.photograph';
    
        this._pointId = null;
        this._postImg = null;
        this.requireFileds = ["pointId"];
        this.reqFields = ["pointId"];
        this.resFields = ["postImg"];
    }
    //client input, require, type: string//景点id
    get pointId() {return this._pointId}
    set pointId(v) {this._pointId = v}
    //server output, type: string
    get postImg() {return this._postImg}
    set postImg(v) {this._postImg = v}
}
class ToSign extends Base {
    constructor() {
        super();
        this.action = 'player.tosign';
    
        this._theDay = null;
        this.requireFileds = [];
        this.reqFields = ["theDay"];
        this.resFields = [];
    }
    //client input, optional, type: number
    get theDay() {return this._theDay}
    set theDay(v) {this._theDay = v}
}
class SignInfo extends Base {
    constructor() {
        super();
        this.action = 'player.signinfo';
    
        this._theDay = null;
        this._hasSign = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["theDay","hasSign"];
    }
    //server output, type: number
    get theDay() {return this._theDay}
    set theDay(v) {this._theDay = v}
    //server output, type: number
    get hasSign() {return this._hasSign}
    set hasSign(v) {this._hasSign = v}
}
class RankInfo extends Base {
    constructor() {
        super();
        this.action = 'rank.rankinfo';
    
        this._rankType = null;
        this._rankSubtype = null;
        this._page = null;
        this._limit = null;
        this._selfRank = null;
        this._ranks = null;
        this.requireFileds = ["rankType","rankSubtype"];
        this.reqFields = ["rankType","rankSubtype","page","limit"];
        this.resFields = ["selfRank","ranks"];
    }
    //client input, require, type: RankType
    get rankType() {return this._rankType}
    set rankType(v) {this._rankType = v}
    //client input, require, type: RankSubtype
    get rankSubtype() {return this._rankSubtype}
    set rankSubtype(v) {this._rankSubtype = v}
    //client input, optional, type: number
    get page() {return this._page}
    set page(v) {this._page = v}
    //client input, optional, type: number
    get limit() {return this._limit}
    set limit(v) {this._limit = v}
    //server output, type: SelfRank
    get selfRank() {return this._selfRank}
    set selfRank(v) {this._selfRank = v}
    //server output, type: RankItem[]
    get ranks() {return this._ranks}
    set ranks(v) {this._ranks = v}
}
class LookTicket extends Base {
    constructor() {
        super();
        this.action = 'player.lookticket';
    
        this._ticket = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["ticket"];
    }
    //server output, type: TicketInfo[]
    get ticket() {return this._ticket}
    set ticket(v) {this._ticket = v}
}
class ModifyRealInfo extends Base {
    constructor() {
        super();
        this.action = 'player.modifyrealinfo';
    
        this._name = null;
        this._birthday = null;
        this._phone = null;
        this._address = null;
        this._realInfo = null;
        this.requireFileds = ["name","birthday","phone","address"];
        this.reqFields = ["name","birthday","phone","address"];
        this.resFields = ["realInfo"];
    }
    //client input, require, type: string
    get name() {return this._name}
    set name(v) {this._name = v}
    //client input, require, type: string
    get birthday() {return this._birthday}
    set birthday(v) {this._birthday = v}
    //client input, require, type: string
    get phone() {return this._phone}
    set phone(v) {this._phone = v}
    //client input, require, type: string
    get address() {return this._address}
    set address(v) {this._address = v}
    //server output, type: RealInfo
    get realInfo() {return this._realInfo}
    set realInfo(v) {this._realInfo = v}
}
class GetRealInfo extends Base {
    constructor() {
        super();
        this.action = 'player.getrealinfo';
    
        this._realInfo = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["realInfo"];
    }
    //server output, type: RealInfo
    get realInfo() {return this._realInfo}
    set realInfo(v) {this._realInfo = v}
}
class PlayerInfo extends Base {
    constructor() {
        super();
        this.action = 'player.playerinfo';
    
        this._playerUid = null;
        this._info = null;
        this.requireFileds = [];
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
class DetailLiveMessage extends OneBriefMessage {
    constructor() {
        super();
    
        //prop type: boolean
        this.hasNext = null;
    
        //prop type: boolean
        this.hasUp = null;
    
        
        
        
    }
}
class MyPostcards extends Base {
    constructor() {
        super();
        this.action = 'postcard.mypostcards';
    
        this._playerUid = null;
        this._postcardInfo = null;
        this.requireFileds = [];
        this.reqFields = ["playerUid"];
        this.resFields = ["postcardInfo"];
    }
    //client input, optional, type: string
    get playerUid() {return this._playerUid}
    set playerUid(v) {this._playerUid = v}
    //server output, type: ProvincePostcardInfo[]
    get postcardInfo() {return this._postcardInfo}
    set postcardInfo(v) {this._postcardInfo = v}
}
class CityPostcards extends Base {
    constructor() {
        super();
        this.action = 'postcard.citypostcards';
    
        this._province = null;
        this._playerUid = null;
        this._LM = null;
        this._postcardInfo = null;
        this.requireFileds = ["province"];
        this.reqFields = ["playerUid","LM","province"];
        this.resFields = ["postcardInfo"];
    }
    //client input, require, type: string
    get province() {return this._province}
    set province(v) {this._province = v}
    //client input, optional, type: string
    get playerUid() {return this._playerUid}
    set playerUid(v) {this._playerUid = v}
    //client input, optional, type: number
    get LM() {return this._LM}
    set LM(v) {this._LM = v}
    //server output, type: CityPostcardInfo[]
    get postcardInfo() {return this._postcardInfo}
    set postcardInfo(v) {this._postcardInfo = v}
}
class DetailPostcard extends Base {
    constructor() {
        super();
        this.action = 'postcard.detailpostcard';
    
        this._id = null;
        this._page = null;
        this._messageLength = null;
        this._pattern = null;
        this._mainUrl = null;
        this._lastestMessage = null;
        this.requireFileds = ["id"];
        this.reqFields = ["id","page","messageLength"];
        this.resFields = ["pattern","mainUrl","lastestMessage"];
    }
    //client input, require, type: number
    get id() {return this._id}
    set id(v) {this._id = v}
    //client input, optional, type: number
    get page() {return this._page}
    set page(v) {this._page = v}
    //client input, optional, type: number
    get messageLength() {return this._messageLength}
    set messageLength(v) {this._messageLength = v}
    //server output, type: number
    get pattern() {return this._pattern}
    set pattern(v) {this._pattern = v}
    //server output, type: string
    get mainUrl() {return this._mainUrl}
    set mainUrl(v) {this._mainUrl = v}
    //server output, type: DetailLiveMessage[]
    get lastestMessage() {return this._lastestMessage}
    set lastestMessage(v) {this._lastestMessage = v}
}
class SendPostcard extends Base {
    constructor() {
        super();
        this.action = 'postcard.sendpostcard';
    
        this._id = null;
        this._message = null;
        this.requireFileds = ["id","message"];
        this.reqFields = ["id","message"];
        this.resFields = [];
    }
    //client input, require, type: number
    get id() {return this._id}
    set id(v) {this._id = v}
    //client input, require, type: string
    get message() {return this._message}
    set message(v) {this._message = v}
}
class UserInfo extends UserBriefInfo {
    constructor() {
        super();
    
        //prop type: string
        this.gender = null;
    
        //prop type: number
        this.totalArrive = null;
    
        //prop type: number
        this.overmatch = null;
    
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
    
        //prop type: OtherUserInfo
        this.otherUserInfo = null;
    
        
        
        
    }
}
class ExchangeDetail extends Base {
    constructor() {
        super();
        this.action = 'integralShop.exchangedetail';
    
        this._page = null;
        this._exchangeDetail = null;
        this.requireFileds = ["page"];
        this.reqFields = ["page"];
        this.resFields = ["exchangeDetail"];
    }
    //client input, require, type: number
    get page() {return this._page}
    set page(v) {this._page = v}
    //server output, type: ExchangeShopDetail[]
    get exchangeDetail() {return this._exchangeDetail}
    set exchangeDetail(v) {this._exchangeDetail = v}
}
class PostList extends Base {
    constructor() {
        super();
        this.action = 'post.postlist';
    
        this._cityId = null;
        this._page = null;
        this._limit = null;
        this._type = null;
        this._posts = null;
        this.requireFileds = ["cityId","page","limit","type"];
        this.reqFields = ["cityId","page","limit","type"];
        this.resFields = ["posts"];
    }
    //client input, require, type: string//城市id
    get cityId() {return this._cityId}
    set cityId(v) {this._cityId = v}
    //client input, require, type: number//页码
    get page() {return this._page}
    set page(v) {this._page = v}
    //client input, require, type: number//本次拉取的条数
    get limit() {return this._limit}
    set limit(v) {this._limit = v}
    //client input, require, type: PostType//帖子类型：景点or特产
    get type() {return this._type}
    set type(v) {this._type = v}
    //server output, type: Post[]//服务器返回帖子列表
    get posts() {return this._posts}
    set posts(v) {this._posts = v}
}
class CommentPost extends Base {
    constructor() {
        super();
        this.action = 'post.commentpost';
    
        this._cityId = null;
        this._postId = null;
        this._content = null;
        this._score = null;
        this._type = null;
        this._comments = null;
        this.requireFileds = ["cityId","postId","content","score","type"];
        this.reqFields = ["cityId","postId","content","score","type"];
        this.resFields = ["comments"];
    }
    //client input, require, type: string//城市id
    get cityId() {return this._cityId}
    set cityId(v) {this._cityId = v}
    //client input, require, type: string//景点或特产id
    get postId() {return this._postId}
    set postId(v) {this._postId = v}
    //client input, require, type: string//评论内容
    get content() {return this._content}
    set content(v) {this._content = v}
    //client input, require, type: number//评分
    get score() {return this._score}
    set score(v) {this._score = v}
    //client input, require, type: PostType//帖子类型：景点or特产
    get type() {return this._type}
    set type(v) {this._type = v}
    //server output, type: Comment//自己的的评论信息
    get comments() {return this._comments}
    set comments(v) {this._comments = v}
}
class PostComments extends Base {
    constructor() {
        super();
        this.action = 'post.postcomments';
    
        this._cityId = null;
        this._postId = null;
        this._page = null;
        this._limit = null;
        this._type = null;
        this._content = null;
        this._name = null;
        this._img = null;
        this._comments = null;
        this.requireFileds = ["cityId","postId","page","limit","type"];
        this.reqFields = ["cityId","postId","page","limit","type"];
        this.resFields = ["content","name","img","comments"];
    }
    //client input, require, type: string//城市id
    get cityId() {return this._cityId}
    set cityId(v) {this._cityId = v}
    //client input, require, type: string//帖子id
    get postId() {return this._postId}
    set postId(v) {this._postId = v}
    //client input, require, type: number//页码
    get page() {return this._page}
    set page(v) {this._page = v}
    //client input, require, type: number//本次拉取的条数
    get limit() {return this._limit}
    set limit(v) {this._limit = v}
    //client input, require, type: PostType//帖子类型：景点or特产
    get type() {return this._type}
    set type(v) {this._type = v}
    //server output, type: string//帖子内容，为景点或特产的介绍
    get content() {return this._content}
    set content(v) {this._content = v}
    //server output, type: 
    get name() {return this._name}
    set name(v) {this._name = v}
    //server output, type: string//景点或特产图片url
    get img() {return this._img}
    set img(v) {this._img = v}
    //server output, type: Comment[]//该帖子下的评论
    get comments() {return this._comments}
    set comments(v) {this._comments = v}
}
class ThumbComment extends Base {
    constructor() {
        super();
        this.action = 'post.thumbcomment';
    
        this._commentId = null;
        this._thumbs = null;
        this._haslike = null;
        this.requireFileds = ["commentId"];
        this.reqFields = ["commentId"];
        this.resFields = ["thumbs","haslike"];
    }
    //client input, require, type: string//评论id
    get commentId() {return this._commentId}
    set commentId(v) {this._commentId = v}
    //server output, type: number//点赞数
    get thumbs() {return this._thumbs}
    set thumbs(v) {this._thumbs = v}
    //server output, type: boolean//是否点赞
    get haslike() {return this._haslike}
    set haslike(v) {this._haslike = v}
}
class IntegralShop extends Base {
    constructor() {
        super();
        this.action = 'integralShop.integralshop';
    
        this._integral = null;
        this._rank = null;
        this._shops = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["integral","rank","shops"];
    }
    //server output, type: number
    get integral() {return this._integral}
    set integral(v) {this._integral = v}
    //server output, type: number
    get rank() {return this._rank}
    set rank(v) {this._rank = v}
    //server output, type: Shop[]
    get shops() {return this._shops}
    set shops(v) {this._shops = v}
}
class GetMessage extends Base {
    constructor() {
        super();
        this.action = 'message.getmessage';
    
        this._page = null;
        this._limit = null;
        this._messageType = null;
        this._messages = null;
        this.requireFileds = ["page","limit"];
        this.reqFields = ["page","limit","messageType"];
        this.resFields = ["messages"];
    }
    //client input, require, type: number
    get page() {return this._page}
    set page(v) {this._page = v}
    //client input, require, type: number
    get limit() {return this._limit}
    set limit(v) {this._limit = v}
    //client input, optional, type: MessageType
    get messageType() {return this._messageType}
    set messageType(v) {this._messageType = v}
    //server output, type: MessageItem[]
    get messages() {return this._messages}
    set messages(v) {this._messages = v}
}
class CheckMsgCnt extends Base {
    constructor() {
        super();
        this.action = 'message.checkmsgcnt';
    
        this._unreadMsgCnt = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["unreadMsgCnt"];
    }
    //server output, type: number
    get unreadMsgCnt() {return this._unreadMsgCnt}
    set unreadMsgCnt(v) {this._unreadMsgCnt = v}
}
class ClearMsg extends Base {
    constructor() {
        super();
        this.action = 'message.clearmsg';
    
        this._mid = null;
        this.requireFileds = ["mid"];
        this.reqFields = ["mid"];
        this.resFields = [];
    }
    //client input, require, type: string
    get mid() {return this._mid}
    set mid(v) {this._mid = v}
}
class TravelLog extends Base {
    constructor() {
        super();
        this.action = 'travel.travellog';
    
        this._playerUid = null;
        this._page = null;
        this._length = null;
        this._allLogs = null;
        this.requireFileds = [];
        this.reqFields = ["playerUid","page","length"];
        this.resFields = ["allLogs"];
    }
    //client input, optional, type: string
    get playerUid() {return this._playerUid}
    set playerUid(v) {this._playerUid = v}
    //client input, optional, type: number
    get page() {return this._page}
    set page(v) {this._page = v}
    //client input, optional, type: number
    get length() {return this._length}
    set length(v) {this._length = v}
    //server output, type: Log[]
    get allLogs() {return this._allLogs}
    set allLogs(v) {this._allLogs = v}
}
class IndexInfo extends Base {
    constructor() {
        super();
        this.action = 'travel.indexinfo';
    
        this._isFirst = null;
        this._season = null;
        this._weather = null;
        this._playerCnt = null;
        this._friends = null;
        this._unreadMsgCnt = null;
        this._location = null;
        this._gold = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["isFirst","season","weather","playerCnt","friends","unreadMsgCnt","location","gold"];
    }
    //server output, type: Boolean
    get isFirst() {return this._isFirst}
    set isFirst(v) {this._isFirst = v}
    //server output, type: Season
    get season() {return this._season}
    set season(v) {this._season = v}
    //server output, type: number
    get weather() {return this._weather}
    set weather(v) {this._weather = v}
    //server output, type: number
    get playerCnt() {return this._playerCnt}
    set playerCnt(v) {this._playerCnt = v}
    //server output, type: FriendInfo[]
    get friends() {return this._friends}
    set friends(v) {this._friends = v}
    //server output, type: number
    get unreadMsgCnt() {return this._unreadMsgCnt}
    set unreadMsgCnt(v) {this._unreadMsgCnt = v}
    //server output, type: number
    get location() {return this._location}
    set location(v) {this._location = v}
    //server output, type: number
    get gold() {return this._gold}
    set gold(v) {this._gold = v}
}
class TestSend extends WsSend {
    constructor() {
        super();
        this.action = 'testsend';
    
        this._test = null;
        this.requireFileds = ["test"];
        this.reqFields = ["test"];
        this.resFields = [];
    }
    //client input, require, type: string//测试字段
    get test() {return this._test}
    set test(v) {this._test = v}
}
class SysMessage extends WsReceive {
    constructor() {
        super();
        this.action = 'sysmessage';
    
        this._mid = null;
        this._type = null;
        this._title = null;
        this._content = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["mid","type","title","content"];
    }
    //server output, type: number//消息Id
    get mid() {return this._mid}
    set mid(v) {this._mid = v}
    //server output, type: number//消息类型
    get type() {return this._type}
    set type(v) {this._type = v}
    //server output, type: string//消息标题
    get title() {return this._title}
    set title(v) {this._title = v}
    //server output, type: string//消息内容
    get content() {return this._content}
    set content(v) {this._content = v}
}
class SellSpe extends Spe {
    constructor() {
        super();
        this.action = 'speciality.sellspe';
    
        this._goldNum = null;
        this.requireFileds = ["propId","count"];
        this.reqFields = ["propId","count"];
        this.resFields = ["goldNum"];
    }
    //server output, type: number//返回剩余的金币数
    get goldNum() {return this._goldNum}
    set goldNum(v) {this._goldNum = v}
}
class TourIndexInfo extends IndexInfo {
    constructor() {
        super();
        this.action = 'tour.tourindexinfo';
    
        this._cid = null;
        this._uid = null;
        this._line = null;
        this._firstPlay = null;
        this._spots = null;
        this._userInfo = null;
        this._task = null;
        this.requireFileds = ["cid","uid"];
        this.reqFields = ["cid","uid","line"];
        this.resFields = ["firstPlay","spots","userInfo","task","isFirst","season","weather","playerCnt","friends","unreadMsgCnt","location","gold"];
    }
    //client input, require, type: number
    get cid() {return this._cid}
    set cid(v) {this._cid = v}
    //client input, require, type: number
    get uid() {return this._uid}
    set uid(v) {this._uid = v}
    //client input, optional, type: 
    get line() {return this._line}
    set line(v) {this._line = v}
    //server output, type: boolean
    get firstPlay() {return this._firstPlay}
    set firstPlay(v) {this._firstPlay = v}
    //server output, type: Spot[]
    get spots() {return this._spots}
    set spots(v) {this._spots = v}
    //server output, type: UserInfo
    get userInfo() {return this._userInfo}
    set userInfo(v) {this._userInfo = v}
    //server output, type: TourTask
    get task() {return this._task}
    set task(v) {this._task = v}
}
class BuySpe extends Spe {
    constructor() {
        super();
        this.action = 'speciality.buyspe';
    
        this._goldNum = null;
        this.requireFileds = ["propId","count"];
        this.reqFields = ["propId","count"];
        this.resFields = ["goldNum"];
    }
    //server output, type: number//返回剩余的金币数
    get goldNum() {return this._goldNum}
    set goldNum(v) {this._goldNum = v}
}
//-------------exports---------------
exports.Season = Season;
exports.PresentTktType = PresentTktType;
exports.Code = Code;
exports.TicketType = TicketType;
exports.RankType = RankType;
exports.RankSubtype = RankSubtype;
exports.PostType = PostType;
exports.MessageType = MessageType;
exports.Payload = Payload;
exports.Event = Event;
exports.oneSpot = oneSpot;
exports.OneDayLog = OneDayLog;
exports.OneCityLog = OneCityLog;
exports.Log = Log;
exports.FriendInfo = FriendInfo;
exports.Shop = Shop;
exports.ExchangeShopDetail = ExchangeShopDetail;
exports.MessageItem = MessageItem;
exports.Comment = Comment;
exports.UserBriefInfo = UserBriefInfo;
exports.OtherUserInfo = OtherUserInfo;
exports.Post = Post;
exports.RealInfo = RealInfo;
exports.TicketInfo = TicketInfo;
exports.OneBriefMessage = OneBriefMessage;
exports.PostcardBriefDetail = PostcardBriefDetail;
exports.CityPostcardInfo = CityPostcardInfo;
exports.ProvincePostcardInfo = ProvincePostcardInfo;
exports.SelfRank = SelfRank;
exports.RankItem = RankItem;
exports.Sight = Sight;
exports.Speciality = Speciality;
exports.ProvencePer = ProvencePer;
exports.Base = Base;
exports.CityPer = CityPer;
exports.Quest = Quest;
exports.Ws = Ws;
exports.Http = Http;
exports.QuestReport = QuestReport;
exports.Position = Position;
exports.Spot = Spot;
exports.EnterSpot = EnterSpot;
exports.TourTask = TourTask;
exports.Postcard = Postcard;
exports.FinishGuide = FinishGuide;
exports.LeaveTour = LeaveTour;
exports.ChangeRouter = ChangeRouter;
exports.NextRouter = NextRouter;
exports.QuestEnterSpot = QuestEnterSpot;
exports.AnswerQuestion = AnswerQuestion;
exports.QuestRandom = QuestRandom;
exports.CheckGuide = CheckGuide;
exports.Photography = Photography;
exports.NextSpot = NextSpot;
exports.WsReceive = WsReceive;
exports.Enterspot = Enterspot;
exports.SpotTour = SpotTour;
exports.TourSpotAnswer = TourSpotAnswer;
exports.EventShow = EventShow;
exports.ShowQuestReport = ShowQuestReport;
exports.Minapppay = Minapppay;
exports.RentProp = RentProp;
exports.RentedProp = RentedProp;
exports.TourStart = TourStart;
exports.WsSend = WsSend;
exports.ShareInfo = ShareInfo;
exports.CityListPer = CityListPer;
exports.FlyInfo = FlyInfo;
exports.StartGame = StartGame;
exports.CreateCode = CreateCode;
exports.CheckCode = CheckCode;
exports.DeleteCode = DeleteCode;
exports.PartnerInfo = PartnerInfo;
exports.TraveledPlaces = TraveledPlaces;
exports.MySpe = MySpe;
exports.CitySpes = CitySpes;
exports.MySpes = MySpes;
exports.Spe = Spe;
exports.GetUserLocation = GetUserLocation;
exports.ExchangeShop = ExchangeShop;
exports.TravelFootprint = TravelFootprint;
exports.viewpointInfo = viewpointInfo;
exports.Photograph = Photograph;
exports.ToSign = ToSign;
exports.SignInfo = SignInfo;
exports.RankInfo = RankInfo;
exports.LookTicket = LookTicket;
exports.ModifyRealInfo = ModifyRealInfo;
exports.GetRealInfo = GetRealInfo;
exports.PlayerInfo = PlayerInfo;
exports.DetailLiveMessage = DetailLiveMessage;
exports.MyPostcards = MyPostcards;
exports.CityPostcards = CityPostcards;
exports.DetailPostcard = DetailPostcard;
exports.SendPostcard = SendPostcard;
exports.UserInfo = UserInfo;
exports.ExchangeDetail = ExchangeDetail;
exports.PostList = PostList;
exports.CommentPost = CommentPost;
exports.PostComments = PostComments;
exports.ThumbComment = ThumbComment;
exports.IntegralShop = IntegralShop;
exports.GetMessage = GetMessage;
exports.CheckMsgCnt = CheckMsgCnt;
exports.ClearMsg = ClearMsg;
exports.TravelLog = TravelLog;
exports.IndexInfo = IndexInfo;
exports.TestSend = TestSend;
exports.SysMessage = SysMessage;
exports.SellSpe = SellSpe;
exports.TourIndexInfo = TourIndexInfo;
exports.BuySpe = BuySpe;
