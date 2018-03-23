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
    
    static THUMBS = 1;
    
    static FOOT = 2;
    
    static SCORE = 3;
    
}
<<<<<<< HEAD
class PostType{
    
    static JINGDIAN = 1;
    
    static TECHAN = 2;
    
}
//------------classes--------------
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
=======
class RankSubtype{
    
    static COUNTRY = 1;
    
    static FRIEND = 2;
    
}
class PostType{
    
    static JINGDIAN = 1;
    
    static TECHAN = 2;
    
}
//------------classes--------------
class RankItem  {
    constructor(){
    
    
        //prop type: number
        this.rank = null;
    
        //prop type: UserInfo
        this.userInfo = null;
    
        
        
    }
}
class selfRank  {
    constructor(){
    
    
        //prop type: number
        this.rank = null;
    
        //prop type: UserInfo
        this.userInfo = null;
>>>>>>> 21f81160bd19bb1ae3afcef794df88c5fe925ede
    
        
        
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
    
        //prop type: userInfo
        this.userInfo = null;
    
        
        
    }
}
class Provence  {
    constructor(){
    
    
        //prop type: 
        this.proLetter = null;
    
        //prop type: 
        this.provence = null;
    
        //prop type: 
        this.citys = null;
    
        
        
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
<<<<<<< HEAD
class UserBriefInfo  {
    constructor(){
    
    
        //prop type: string
        this.uid = null;
    
        //prop type: string
        this.nickName = null;
    
        //prop type: string
        this.avatarUrl = null;
=======
class Post  {
    constructor(){
    
    
        //prop type: number//帖子id
        this.postId = null;
    
        //prop type: PostType//帖子类型：景点or特产
        this.type = null;
    
        //prop type: string//帖子内容，为景点或特产的介绍
        this.content = null;
    
        //prop type: number//创建时间
        this.time = null;
    
        //prop type: string//景点或特产图片url
        this.img = null;
>>>>>>> 21f81160bd19bb1ae3afcef794df88c5fe925ede
    
        
        
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
<<<<<<< HEAD
class City  {
    constructor(){
    
    
        //prop type: 
        this.cityname = null;
    
        //prop type: 
        this.cityper = null;
    
        
        
    }
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
=======
>>>>>>> 21f81160bd19bb1ae3afcef794df88c5fe925ede
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
<<<<<<< HEAD
=======
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
class ThumbComment extends Base {
    constructor(){
        super();
        this.action = 'post.thumbcomment';
    
        this.reqFields = [];
        this.resFields = [];
    }
}
class UserInfo extends UserBriefInfo {
    constructor(){
        super();
    
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
>>>>>>> 21f81160bd19bb1ae3afcef794df88c5fe925ede
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
    //server output, type: selfRank
    get selfRank() {return this._selfRank}
    set selfRank(v) {this._selfRank = v}
    //server output, type: RankItem[]
    get ranks() {return this._ranks}
    set ranks(v) {this._ranks = v}
}
class PostList extends Base {
    constructor(){
        super();
        this.action = 'post.postlist';
    
        this._posts = null;
        this.reqFields = [];
        this.resFields = ["posts"];
    }
    //server output, type: Post[]//服务器返回帖子列表
    get posts() {return this._posts}
    set posts(v) {this._posts = v}
}
class CommentPost extends Base {
    constructor(){
        super();
        this.action = 'post.commentpost';
    
        this.reqFields = [];
        this.resFields = [];
    }
}
class PostComments extends Base {
    constructor(){
        super();
        this.action = 'post.postcomments';
    
        this._comments = null;
        this.reqFields = [];
        this.resFields = ["comments"];
    }
    //server output, type: Comment[]//该帖子下的评论
    get comments() {return this._comments}
    set comments(v) {this._comments = v}
}
<<<<<<< HEAD
class ThumbComment extends Base {
    constructor(){
        super();
        this.action = 'post.thumbcomment';
    
        this.reqFields = [];
        this.resFields = [];
    }
}
class UserInfo extends UserBriefInfo {
    constructor(){
        super();
    
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
class cityList extends Base {
    constructor(){
        super();
        this.action = 'city.citylist';
    
        this._provence = null;
        this.reqFields = [];
        this.resFields = ["provence"];
    }
    //server output, type: Provence[]
    get provence() {return this._provence}
    set provence(v) {this._provence = v}
}
=======
>>>>>>> 21f81160bd19bb1ae3afcef794df88c5fe925ede
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
<<<<<<< HEAD
exports.PostType = PostType;
exports.Post = Post;
exports.RankItem = RankItem;
exports.Provence = Provence;
exports.Base = Base;
exports.UserBriefInfo = UserBriefInfo;
exports.Comment = Comment;
exports.City = City;
exports.PlayerInfo = PlayerInfo;
exports.IndexInfo = IndexInfo;
=======
exports.RankSubtype = RankSubtype;
exports.PostType = PostType;
exports.RankItem = RankItem;
exports.selfRank = selfRank;
exports.UserBriefInfo = UserBriefInfo;
exports.Base = Base;
exports.Post = Post;
exports.Comment = Comment;
exports.IndexInfo = IndexInfo;
exports.PlayerInfo = PlayerInfo;
exports.ThumbComment = ThumbComment;
exports.UserInfo = UserInfo;
>>>>>>> 21f81160bd19bb1ae3afcef794df88c5fe925ede
exports.RankInfo = RankInfo;
exports.PostList = PostList;
exports.CommentPost = CommentPost;
exports.PostComments = PostComments;
<<<<<<< HEAD
exports.ThumbComment = ThumbComment;
exports.UserInfo = UserInfo;
exports.cityList = cityList;
=======
>>>>>>> 21f81160bd19bb1ae3afcef794df88c5fe925ede
exports.RechargeRankInfo = RechargeRankInfo;
