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
    
    static GANG_FULLED = -112;
    
    static NEED_ITEMS = -113;
    
    static FRIEND_APPLY = -114;
    
    static FRIEND_DONE = -115;
    
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
    
    static NEED_COUPON = -170;
    
    static NEED_MONEY = -171;
    
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
class SelfRank  {
    constructor(){
    
    
        //prop type: number
        this.rank = null;
    
        //prop type: UserInfo
        this.userInfo = null;
    
        
        
        
    }
}
class oneDayLog  {
    constructor(){
    
    
        //prop type: string
        this.time = null;
    
        //prop type: string
        this.city = null;
    
        //prop type: string[]
        this.scenicSpots = null;
    
        //prop type: number
        this.rentCarType = null;
    
        
        
        
    }
}
class CityPer  {
    constructor(){
    
    
        //prop type: 
        this.cityname = null;
    
        //prop type: 
        this.cityper = null;
    
        
        
        
    }
}
class UserBriefInfo  {
    constructor(){
    
    
        //prop type: string
        this.uid = null;
    
        //prop type: string
        this.nickName = null;
    
        //prop type: string
        this.avatarUrl = null;
    
        
        
        
    }
}
class otherUserInfo  {
    constructor(){
    
    
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
class RealInfo  {
    constructor(){
    
    
        //prop type: string
        this.uid = null;
    
        //prop type: string
        this.name = null;
    
        //prop type: string
        this.birthday = null;
    
        //prop type: string
        this.phoneNumber = null;
    
        //prop type: string
        this.adress = null;
    
        
        
        
    }
}
class TicketInfo  {
    constructor(){
    
    
        //prop type: string
        this.cid = null;
    
        //prop type: PresentTktType
        this.type = null;
    
        
        
        
    }
}
class Base  {
    constructor(){
    
    
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
   static Start(appName, url) {
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
        //wx login
        wx.getUserInfo({
            success: info =>{
                let app=getApp();
                //fetch srv
                req.info=info.userInfo;
                req.fetch().then(()=>{
                    this.AUTHED=true;
                    this.LOGINED=true;
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
class Ws  {
    constructor(){
    
    
        
        
        
    }
   static init(wss) {
        //初始化websocket
        this.WSS=wss=wss || `wss://h5.ddz2018.com/${this.APP_NAME}`;//websocket服务器链接
        this.IO=this.IO || require('./libs/io.js')(wss + `?_sid=${this.SID}&appName=${this.APP_NAME}`);
        this._listenings=this._listenings || new Map();
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
        this.IO.on(action, this._onReceive);
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
        let action=res.action;
        if (!this._listenings.has(action))
            return;
        let listener=this._listenings.get(action);
        listener.parse(res);
        let cbx=listener.cbx;
        cbx && cbx.ctx ? cbx.cb.call(cbx.ctx, listener):cbx.cb(listener);
    }
   static send(wsSend) {
        this.IO.emit(wsSend.action, wsSend.reqData);
    }
   static close() {
        this.IO.close();
        wx.closeWebsocket();
    }
}
class Sight  {
    constructor(){
    
    
        //prop type: number//城市id
        this.cityId = null;
    
        //prop type: string//返回明信片的图片地址
        this.img = null;
    
        
        
        
    }
}
class RankItem  {
    constructor(){
    
    
        //prop type: number
        this.rank = null;
    
        //prop type: UserInfo
        this.userInfo = null;
    
        
        
        
    }
}
class ProvencePer  {
    constructor(){
    
    
        //prop type: 
        this.proLetter = null;
    
        //prop type: 
        this.proName = null;
    
        //prop type: 
        this.citys = null;
    
        
        
        
    }
}
class Log  {
    constructor(){
    
    
        //prop type: string
        this.year = null;
    
        //prop type: 
        this.cityLogs = null;
    
        
        
        
    }
}
class Specialty  {
    constructor(){
    
    
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
    
        
        
        
    }
}
class ProvincePostcardInfo  {
    constructor(){
    
    
        //prop type: string
        this.postid = null;
    
        //prop type: string
        this.province = null;
    
        //prop type: number
        this.collectPostcardNum = null;
    
        //prop type: number
        this.allPostcardNum = null;
    
        
        
        
    }
}
class CityPostcardInfo  {
    constructor(){
    
    
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
class PostcardBriefDetail  {
    constructor(){
    
    
        //prop type: string
        this.id = null;
    
        //prop type: string
        this.postid = null;
    
        //prop type: OneBriefMessage
        this.lastestLiveMessage = null;
    
        
        
        
    }
}
class OneBriefMessage  {
    constructor(){
    
    
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
class Post  {
    constructor(){
    
    
        //prop type: number//帖子id
        this.postId = null;
    
        //prop type: PostType//帖子类型：景点or特产
        this.type = null;
    
        //prop type: string//帖子内容，为景点或特产的介绍
        this.content = null;
    
        //prop type: 
        this.name = null;
    
        //prop type: number//帖子的评论
        this.score = null;
    
        //prop type: string//景点或特产图片url
        this.img = null;
    
        //prop type: number//评论数
        this.commentNum = null;
    
        
        
        
    }
}
class Comment  {
    constructor(){
    
    
        //prop type: number//帖子id
        this.postId = null;
    
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
    
        //prop type: number//创建时间
        this.time = null;
    
        
        
        
    }
}
class MessageItem  {
    constructor(){
    
    
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
class exchangeShopDetail  {
    constructor(){
    
    
        //prop type: string
        this.nickname = null;
    
        //prop type: string
        this.shopName = null;
    
        
        
        
    }
}
class UserInfo extends UserBriefInfo {
    constructor(){
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
    
        //prop type: KV[]
        this.rentItems = null;
    
        //prop type: string[]
        this.friends = null;
    
        //prop type: otherUserInfo
        this.otherUserInfo = null;
    
        
        
        
    }
}
class FlyInfo extends Base {
    constructor(){
        super();
        this.action = 'startGame.flyinfo';
    
        this._type = null;
        this._gold = null;
        this._isFirst = null;
        this._season = null;
        this._weather = null;
        this._cost = null;
        this._doubleCost = null;
        this._location = null;
        this._holiday = null;
        this._cid = null;
        this.requireFileds = ["type"];
        this.reqFields = ["type"];
        this.resFields = ["gold","isFirst","season","weather","cost","doubleCost","location","holiday","cid"];
    }
    //client input, require, type: TicketType
    get type() {return this._type}
    set type(v) {this._type = v}
    //server output, type: number
    get gold() {return this._gold}
    set gold(v) {this._gold = v}
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
    constructor(){
        super();
        this.action = 'startGame.startgame';
    
        this._type = null;
        this._cid = null;
        this._cost = null;
        this._partnerUid = null;
        this.requireFileds = ["type","cid","cost"];
        this.reqFields = ["type","cid","cost","partnerUid"];
        this.resFields = [];
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
    get partnerUid() {return this._partnerUid}
    set partnerUid(v) {this._partnerUid = v}
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
    //server output, type: string[]
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
class Photograph extends Base {
    constructor(){
        super();
        this.action = 'sight.photograph';
    
        this._cityId = null;
        this._img = null;
        this.requireFileds = ["cityId"];
        this.reqFields = ["cityId"];
        this.resFields = ["img"];
    }
    //client input, require, type: number//城市id
    get cityId() {return this._cityId}
    set cityId(v) {this._cityId = v}
    //server output, type: string
    get img() {return this._img}
    set img(v) {this._img = v}
}
class TravelLog extends Base {
    constructor(){
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
class PlayerInfo extends Base {
    constructor(){
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
class RankInfo extends Base {
    constructor(){
        super();
        this.action = 'rank.rankinfo';
    
        this._rankType = null;
        this._rankSubtype = null;
        this._limit = null;
        this._selfRank = null;
        this._ranks = null;
        this.requireFileds = ["rankType","rankSubtype"];
        this.reqFields = ["rankType","rankSubtype","limit"];
        this.resFields = ["selfRank","ranks"];
    }
    //client input, require, type: RankType
    get rankType() {return this._rankType}
    set rankType(v) {this._rankType = v}
    //client input, require, type: RankSubtype
    get rankSubtype() {return this._rankSubtype}
    set rankSubtype(v) {this._rankSubtype = v}
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
class getUserLocation extends Base {
    constructor(){
        super();
        this.action = 'integralShop.getuserlocation';
    
        this._nickname = null;
        this._tel = null;
        this._address = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["nickname","tel","address"];
    }
    //server output, type: string
    get nickname() {return this._nickname}
    set nickname(v) {this._nickname = v}
    //server output, type: string
    get tel() {return this._tel}
    set tel(v) {this._tel = v}
    //server output, type: string
    get address() {return this._address}
    set address(v) {this._address = v}
}
class GetRealInfo extends Base {
    constructor(){
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
class ModifyRealInfo extends Base {
    constructor(){
        super();
        this.action = 'player.modifyrealinfo';
    
        this._name = null;
        this._birthday = null;
        this._phone = null;
        this._adress = null;
        this._realInfo = null;
        this.requireFileds = ["name","birthday","phone","adress"];
        this.reqFields = ["name","birthday","phone","adress"];
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
    get adress() {return this._adress}
    set adress(v) {this._adress = v}
    //server output, type: RealInfo
    get realInfo() {return this._realInfo}
    set realInfo(v) {this._realInfo = v}
}
class mySpe extends Specialty {
    constructor(){
        super();
    
        //prop type: number//我的某个特产的数量
        this.num = null;
    
        
        
        
    }
}
class SpeList extends Base {
    constructor(){
        super();
        this.action = 'prop.spelist';
    
        this._cityId = null;
        this._specialtys = null;
        this.requireFileds = ["cityId"];
        this.reqFields = ["cityId"];
        this.resFields = ["specialtys"];
    }
    //client input, require, type: number//城市id
    get cityId() {return this._cityId}
    set cityId(v) {this._cityId = v}
    //server output, type: Specialty[]
    get specialtys() {return this._specialtys}
    set specialtys(v) {this._specialtys = v}
}
class Spe extends Base {
    constructor(){
        super();
        this.action = 'prop.spe';
    
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
class exchangeShop extends Base {
    constructor(){
        super();
        this.action = 'integralShop.exchangeshop';
    
        this._id = null;
        this._integral = null;
        this.requireFileds = ["id","integral"];
        this.reqFields = ["id","integral"];
        this.resFields = [];
    }
    //client input, require, type: string
    get id() {return this._id}
    set id(v) {this._id = v}
    //client input, require, type: string
    get integral() {return this._integral}
    set integral(v) {this._integral = v}
}
class IntegralShop extends Base {
    constructor(){
        super();
        this.action = 'integralShop.integralshop';
    
        this._integral = null;
        this._rank = null;
        this._exchangeDetail = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["integral","rank","exchangeDetail"];
    }
    //server output, type: number
    get integral() {return this._integral}
    set integral(v) {this._integral = v}
    //server output, type: number
    get rank() {return this._rank}
    set rank(v) {this._rank = v}
    //server output, type: exchangeShopDetail[]
    get exchangeDetail() {return this._exchangeDetail}
    set exchangeDetail(v) {this._exchangeDetail = v}
}
class LookTicket extends Base {
    constructor(){
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
class SignInfo extends Base {
    constructor(){
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
class ToSign extends Base {
    constructor(){
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
class TravelFootprint extends Base {
    constructor(){
        super();
        this.action = 'player.travelfootprint';
    
        this._playerUid = null;
        this._items = null;
        this._reachrovince = null;
        this._totalArrive = null;
        this._totalArrivePercent = null;
        this._travelPercent = null;
        this.requireFileds = [];
        this.reqFields = ["playerUid"];
        this.resFields = ["items","reachrovince","totalArrive","totalArrivePercent","travelPercent"];
    }
    //client input, optional, type: string
    get playerUid() {return this._playerUid}
    set playerUid(v) {this._playerUid = v}
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
class DetailLiveMessage extends OneBriefMessage {
    constructor(){
        super();
    
        //prop type: boolean
        this.hasNext = null;
    
        //prop type: boolean
        this.hasUp = null;
    
        
        
        
    }
}
class MyPostcards extends Base {
    constructor(){
        super();
        this.action = 'postcard.mypostcards';
    
        this._postcardInfo = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["postcardInfo"];
    }
    //server output, type: ProvincePostcardInfo[]
    get postcardInfo() {return this._postcardInfo}
    set postcardInfo(v) {this._postcardInfo = v}
}
class CityPostcards extends Base {
    constructor(){
        super();
        this.action = 'postcard.citypostcards';
    
        this._province = null;
        this._LM = null;
        this._postcardInfo = null;
        this.requireFileds = ["province"];
        this.reqFields = ["LM","province"];
        this.resFields = ["postcardInfo"];
    }
    //client input, require, type: string
    get province() {return this._province}
    set province(v) {this._province = v}
    //client input, optional, type: number
    get LM() {return this._LM}
    set LM(v) {this._LM = v}
    //server output, type: CityPostcardInfo[]
    get postcardInfo() {return this._postcardInfo}
    set postcardInfo(v) {this._postcardInfo = v}
}
class DetailPostcard extends Base {
    constructor(){
        super();
        this.action = 'postcard.detailpostcard';
    
        this._id = null;
        this._page = null;
        this._messageLength = null;
        this._postid = null;
        this._lastestMessage = null;
        this.requireFileds = ["id"];
        this.reqFields = ["id","page","messageLength"];
        this.resFields = ["postid","lastestMessage"];
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
    //server output, type: string
    get postid() {return this._postid}
    set postid(v) {this._postid = v}
    //server output, type: DetailLiveMessage[]
    get lastestMessage() {return this._lastestMessage}
    set lastestMessage(v) {this._lastestMessage = v}
}
class SendPostcard extends Base {
    constructor(){
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
class TraveledPlaces extends Base {
    constructor(){
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
class CityListPer extends Base {
    constructor(){
        super();
        this.action = 'city.citylistper';
    
        this._data = null;
        this.requireFileds = [];
        this.reqFields = [];
        this.resFields = ["data"];
    }
    //server output, type: Provence[]
    get data() {return this._data}
    set data(v) {this._data = v}
}
class PostList extends Base {
    constructor(){
        super();
        this.action = 'post.postlist';
    
        this._lastPostId = null;
        this._limit = null;
        this._type = null;
        this._posts = null;
        this.requireFileds = ["lastPostId","limit","type"];
        this.reqFields = ["lastPostId","limit","type"];
        this.resFields = ["posts"];
    }
    //client input, require, type: number//上一屏最后post的id
    get lastPostId() {return this._lastPostId}
    set lastPostId(v) {this._lastPostId = v}
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
    constructor(){
        super();
        this.action = 'post.commentpost';
    
        this._postId = null;
        this._content = null;
        this.requireFileds = ["postId","content"];
        this.reqFields = ["postId","content"];
        this.resFields = [];
    }
    //client input, require, type: number//帖子id
    get postId() {return this._postId}
    set postId(v) {this._postId = v}
    //client input, require, type: string//评论内容
    get content() {return this._content}
    set content(v) {this._content = v}
}
class PostComments extends Base {
    constructor(){
        super();
        this.action = 'post.postcomments';
    
        this._postId = null;
        this._lastCmtId = null;
        this._limit = null;
        this._comments = null;
        this.requireFileds = ["postId","lastCmtId","limit"];
        this.reqFields = ["postId","lastCmtId","limit"];
        this.resFields = ["comments"];
    }
    //client input, require, type: number//帖子id
    get postId() {return this._postId}
    set postId(v) {this._postId = v}
    //client input, require, type: number//上一屏最后comment的id
    get lastCmtId() {return this._lastCmtId}
    set lastCmtId(v) {this._lastCmtId = v}
    //client input, require, type: number//本次拉取的条数
    get limit() {return this._limit}
    set limit(v) {this._limit = v}
    //server output, type: Comment[]//该帖子下的评论
    get comments() {return this._comments}
    set comments(v) {this._comments = v}
}
class ThumbComment extends Base {
    constructor(){
        super();
        this.action = 'post.thumbcomment';
    
        this._commentId = null;
        this.requireFileds = ["commentId"];
        this.reqFields = ["commentId"];
        this.resFields = [];
    }
    //client input, require, type: number//评论id
    get commentId() {return this._commentId}
    set commentId(v) {this._commentId = v}
}
class WsSend extends Base {
    constructor(){
        super();
    
        
        
        
    }
}
class GetMessage extends Base {
    constructor(){
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
    constructor(){
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
class WsReceive extends Base {
    constructor(){
        super();
    
        
        
        
    }
}
class RentProp extends Base {
    constructor(){
        super();
        this.action = 'prop.rentprop';
    
        this._rentId = null;
        this._rentItems = null;
        this.requireFileds = ["rentId"];
        this.reqFields = ["rentId"];
        this.resFields = ["rentItems"];
    }
    //client input, require, type: number
    get rentId() {return this._rentId}
    set rentId(v) {this._rentId = v}
    //server output, type: KV[]//已租用的所有道具。
    get rentItems() {return this._rentItems}
    set rentItems(v) {this._rentItems = v}
}
class SellSpe extends Spe {
    constructor(){
        super();
        this.action = 'prop.sellspe';
    
        this._goldNum = null;
        this.requireFileds = ["propId","count"];
        this.reqFields = ["propId","count"];
        this.resFields = ["goldNum"];
    }
    //server output, type: number//返回剩余的金币数
    get goldNum() {return this._goldNum}
    set goldNum(v) {this._goldNum = v}
}
class BuySpe extends Spe {
    constructor(){
        super();
        this.action = 'prop.buyspe';
    
        this._items = null;
        this._goldNum = null;
        this.requireFileds = ["propId","count"];
        this.reqFields = ["propId","count"];
        this.resFields = ["items","goldNum"];
    }
    //server output, type: KV[]
    get items() {return this._items}
    set items(v) {this._items = v}
    //server output, type: number//返回剩余的金币数
    get goldNum() {return this._goldNum}
    set goldNum(v) {this._goldNum = v}
}
class RechargeRankInfo extends RankInfo {
    constructor(){
        super();
        this.action = 'rank.rechargerankinfo';
    
        this._myRecharge = null;
        this.requireFileds = ["rankType","rankSubtype"];
        this.reqFields = ["rankType","rankSubtype","limit"];
        this.resFields = ["myRecharge","selfRank","ranks"];
    }
    //server output, type: number
    get myRecharge() {return this._myRecharge}
    set myRecharge(v) {this._myRecharge = v}
}
class SysMessage extends WsReceive {
    constructor(){
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
class TestSend extends WsSend {
    constructor(){
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
//-------------exports---------------
exports.Season = Season;
exports.PresentTktType = PresentTktType;
exports.Code = Code;
exports.TicketType = TicketType;
exports.RankType = RankType;
exports.RankSubtype = RankSubtype;
exports.PostType = PostType;
exports.MessageType = MessageType;
exports.SelfRank = SelfRank;
exports.oneDayLog = oneDayLog;
exports.CityPer = CityPer;
exports.UserBriefInfo = UserBriefInfo;
exports.otherUserInfo = otherUserInfo;
exports.RealInfo = RealInfo;
exports.TicketInfo = TicketInfo;
exports.Base = Base;
exports.Ws = Ws;
exports.Sight = Sight;
exports.RankItem = RankItem;
exports.ProvencePer = ProvencePer;
exports.Log = Log;
exports.Specialty = Specialty;
exports.ProvincePostcardInfo = ProvincePostcardInfo;
exports.CityPostcardInfo = CityPostcardInfo;
exports.PostcardBriefDetail = PostcardBriefDetail;
exports.OneBriefMessage = OneBriefMessage;
exports.Post = Post;
exports.Comment = Comment;
exports.MessageItem = MessageItem;
exports.exchangeShopDetail = exchangeShopDetail;
exports.UserInfo = UserInfo;
exports.FlyInfo = FlyInfo;
exports.StartGame = StartGame;
exports.IndexInfo = IndexInfo;
exports.Photograph = Photograph;
exports.TravelLog = TravelLog;
exports.PlayerInfo = PlayerInfo;
exports.RankInfo = RankInfo;
exports.getUserLocation = getUserLocation;
exports.GetRealInfo = GetRealInfo;
exports.ModifyRealInfo = ModifyRealInfo;
exports.mySpe = mySpe;
exports.SpeList = SpeList;
exports.Spe = Spe;
exports.exchangeShop = exchangeShop;
exports.IntegralShop = IntegralShop;
exports.LookTicket = LookTicket;
exports.SignInfo = SignInfo;
exports.ToSign = ToSign;
exports.TravelFootprint = TravelFootprint;
exports.DetailLiveMessage = DetailLiveMessage;
exports.MyPostcards = MyPostcards;
exports.CityPostcards = CityPostcards;
exports.DetailPostcard = DetailPostcard;
exports.SendPostcard = SendPostcard;
exports.TraveledPlaces = TraveledPlaces;
exports.CityListPer = CityListPer;
exports.PostList = PostList;
exports.CommentPost = CommentPost;
exports.PostComments = PostComments;
exports.ThumbComment = ThumbComment;
exports.WsSend = WsSend;
exports.GetMessage = GetMessage;
exports.CheckMsgCnt = CheckMsgCnt;
exports.WsReceive = WsReceive;
exports.RentProp = RentProp;
exports.SellSpe = SellSpe;
exports.BuySpe = BuySpe;
exports.RechargeRankInfo = RechargeRankInfo;
exports.SysMessage = SysMessage;
exports.TestSend = TestSend;
