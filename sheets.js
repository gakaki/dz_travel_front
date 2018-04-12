let _data = {}

import _dt0 from './data0.js';
Object.assign(_data, _dt0);




class City {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }

    // 城市
    get city(){ return this.cfg.city; }

    // 出售明信片
    get postcard(){ return this.cfg.postcard; }

    // 坐标
    get coordinate(){ return this.cfg.coordinate; }


    static Get(id){ return id in _data.city ? new City(_data.city[id]) : null; }
}

class Parameter {
    constructor(d) {
    this.cfg = d;
    }

    // 属性
    get id(){ return this.cfg.id; }

    // 具体变量
    get value(){ return this.cfg.value; }


    static get GOLDPRICE() { return 1 };

    static get COMMONTICKETPRICE() { return 2 };

    static get DOUBLETICKETPRICE() { return 3 };

    static get RANDOMTICKETPRICE() { return 4 };

    static get BUSYSEASON() { return 5 };

    static get SCENICSPOTNUMBER() { return 6 };

    static get TOURNUMBER() { return 7 };

    static get PHOTOGRAGH() { return 8 };

    static get TIMEPARAMETER() { return 9 };

    static get TOURCONSUME() { return 10 };

    static get WAITTIME() { return 11 };

    static get SHAREGOLD() { return 12 };

    static get NEWUSERGOLD() { return 13 };

    static get BAGLIMIT() { return 14 };

    static get SCENICSPOTPOINT() { return 15 };

    static get POSTCARDPOINT() { return 16 };

    static get SCENICPHOTO() { return 17 };

    static get CITYPHOTO() { return 18 };

    static get MAXMESSAGE() { return 19 };

    static get POSTCARDWORDLIMIT() { return 20 };

    static get COMMENTWORDLIMIT() { return 21 };

    static get USERGOLD() { return 22 };

    static get RANKNUMBER() { return 23 };

    static get COUNTLIMIT() { return 24 };

    static get FIRSTCITY() { return 25 };

    static get POSTCARDCOMPLETION() { return 26 };

    static get EVENTCOMPLETION() { return 27 };

    static get SCENICSPOTCOMPLETION() { return 28 };

    static get MINSCORE() { return 29 };

    static get MAXSCORE() { return 30 };

    static get THUMBUPGOLD() { return 31 };

    static get THUMLIMIT() { return 32 };

    static get CHANGELINE() { return 33 };

    static get REFRESHSHOP() { return 34 };

    static get LOCALSALE() { return 35 };

    static get NEWUSERROUTE() { return 36 };

    static get SCOREREWARD() { return 37 };

    static Get(id){ return id in _data.parameter ? new Parameter(_data.parameter[id]) : null; }
}

class Login {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }

    // 奖励金币
    get gold(){ return this.cfg.gold; }


    static Get(id){ return id in _data.login ? new Login(_data.login[id]) : null; }
}

class Share {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }

    // 分享标题
    get title(){ return this.cfg.title; }

    // 链接
    get link(){ return this.cfg.link; }

    // 图片
    get image(){ return this.cfg.image; }

    // 
    get type(){ return this.cfg.type; }


    static Get(id){ return id in _data.share ? new Share(_data.share[id]) : null; }
}

class Shop {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }

    // 道具名称
    get propsname(){ return this.cfg.propsname; }

    // 道具描述
    get rechargedescription(){ return this.cfg.rechargedescription; }

    // 图标
    get image(){ return this.cfg.image; }

    // 售价
    get price(){ return this.cfg.price; }

    // 种类
    get type(){ return this.cfg.type; }

    // 道具数值
    get value(){ return this.cfg.value; }


    static Get(id){ return id in _data.shop ? new Shop(_data.shop[id]) : null; }
}

class Rank {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }

    // 排名
    get ranking(){ return this.cfg.ranking; }

    // 达人榜奖励
    get doyenreward(){ return this.cfg.doyenreward; }

    // 足迹榜奖励
    get trackreward(){ return this.cfg.trackreward; }


    static Get(id){ return id in _data.rank ? new Rank(_data.rank[id]) : null; }
}

class Find {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }

    // 省份首字母
    get pword(){ return this.cfg.pword; }

    // 省份
    get province(){ return this.cfg.province; }

    // 城市
    get city(){ return this.cfg.city; }

    // 城市id
    get cityid(){ return this.cfg.cityid; }


    static Get(id){ return id in _data.find ? new Find(_data.find[id]) : null; }
}

class Item {
    constructor(d) {
    this.cfg = d;
    }

    // ID
    get id(){ return this.cfg.id; }

    // 名称
    get name(){ return this.cfg.name; }

    // 描述
    get description(){ return this.cfg.description; }


    static get GOLD() { return 1 };

    static get POINT() { return 2 };

    static Get(id){ return id in _data.item ? new Item(_data.item[id]) : null; }
}

class Maskword {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }


    static Get(id){ return id in _data.maskword ? new Maskword(_data.maskword[id]) : null; }
}

class Pay {
    constructor(d) {
    this.cfg = d;
    }

    // ID
    get id(){ return this.cfg.id; }

    // 充值
    get pay(){ return this.cfg.pay; }

    // 获得金币
    get gold(){ return this.cfg.gold; }


    static Get(id){ return id in _data.pay ? new Pay(_data.pay[id]) : null; }
}

class Message {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }


    static get POSTCARDMESSAGE() { return 1 };

    static get SYSTEMMESSAGE() { return 2 };

    static get LIKESMESSAGE() { return 3 };

    static get RANKMESSAGE() { return 4 };

    static get SHAREMESSAGE() { return 5 };

    static get INVITEMESSAGE() { return 6 };

    static Get(id){ return id in _data.message ? new Message(_data.message[id]) : null; }
}

class Weather {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }

    // 图标
    get icon(){ return this.cfg.icon; }


    static Get(id){ return id in _data.weather ? new Weather(_data.weather[id]) : null; }
}

class Help {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }

    // 帮助内容
    get help(){ return this.cfg.help; }


    static Get(id){ return id in _data.help ? new Help(_data.help[id]) : null; }
}

class Chatsys {
    constructor(d) {
    this.cfg = d;
    }

    // id
    get id(){ return this.cfg.id; }

    // 内容
    get message(){ return this.cfg.message; }


    static Get(id){ return id in _data.chatsys ? new Chatsys(_data.chatsys[id]) : null; }
}

class Newuser {
    constructor(d) {
    this.cfg = d;
    }

    // ID
    get id(){ return this.cfg.id; }

    // 缩短百分比
    get shorten(){ return this.cfg.shorten; }


    static Get(id){ return id in _data.newuser ? new Newuser(_data.newuser[id]) : null; }
}


exports.citys = Object.values(_data.city);
exports.parameters = Object.values(_data.parameter);
exports.logins = Object.values(_data.login);
exports.shares = Object.values(_data.share);
exports.shops = Object.values(_data.shop);
exports.ranks = Object.values(_data.rank);
exports.finds = Object.values(_data.find);
exports.items = Object.values(_data.item);
exports.maskwords = Object.values(_data.maskword);
exports.pays = Object.values(_data.pay);
exports.messages = Object.values(_data.message);
exports.weathers = Object.values(_data.weather);
exports.helps = Object.values(_data.help);
exports.chatsyss = Object.values(_data.chatsys);
exports.newusers = Object.values(_data.newuser);


exports.City = City;
exports.Parameter = Parameter;
exports.Login = Login;
exports.Share = Share;
exports.Shop = Shop;
exports.Rank = Rank;
exports.Find = Find;
exports.Item = Item;
exports.Maskword = Maskword;
exports.Pay = Pay;
exports.Message = Message;
exports.Weather = Weather;
exports.Help = Help;
exports.Chatsys = Chatsys;
exports.Newuser = Newuser;
