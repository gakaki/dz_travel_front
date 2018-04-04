// components/cmap/cmap.js
import { City, citys } from '../../sheets.js'
import { Base, TraveledPlaces } from '../../api.js'

let tapStamp;
const DOUBLE_TAP_INTERVAL = 600;
//大地图左上角点的经纬度
const geoTopLeft = { j: 80.6, w: 55.8 };
//大地图右下角点的经纬度
const geoBtmRht = { j: 129.6, w: 4.5 };
const geoWd = geoBtmRht.j - geoTopLeft.j;
const geoHt = geoTopLeft.w - geoBtmRht.w;

const lineArcD = Math.PI / 5;//航线弧线弧度
const lineArcDMin = Math.PI / 6;//最小弧度
const arcDt = 250;//航线弧度修正参考
const stepDg = 1 / 180 * Math.PI;//步进度数

const mapAssetsRoot = 'https://gengxin.odao.com/update/h5/travel/province/';
const mapBg = mapAssetsRoot + 'china.png';
const mapWidth = 714;
const mapHeight = 828;
const provinces = [
  { name: '新疆', img: 'xinjiang', x: 3, y: 74, imgWd: 283, imgHt: 214, txtX: 150, txtY: 80 },
  { name: '内蒙', img: 'neimeng', x: 297, y: 12, imgWd: 313, imgHt: 268, txtX: 100, txtY: 210 },
  { name: '甘肃', img: 'gansu', x: 232, y: 190, imgWd: 206, imgHt: 168, txtX: 30, txtY: 30 },
  { name: '黑龙江', img: 'heilongjiang', x: 552, y: 6, imgWd: 157, imgHt: 141, txtX: 80, txtY: 80 },
  { name: '吉林', img: 'jilin', x: 578, y: 117, imgWd: 116, imgHt: 81, txtX: 35, txtY: 30 },
  { name: '辽宁', img: 'liaoning', x: 558, y: 161, imgWd: 82, imgHt: 81, txtX: 30, txtY: 30 },
  { name: '河北', img: 'hebei', x: 497, y: 187, imgWd: 76, imgHt: 108, txtX: 10, txtY: 65 },
  { name: '北京', img: 'beijing', x: 519, y: 213, imgWd: 25, imgHt: 27, txtX: 6, txtY: 4 },
  { name: '天津', img: 'tianjin', x: 536, y: 225, imgWd: 15, imgHt: 27, txtX: 8, txtY: 6 },
  { name: '山西', img: 'shanxi', x: 459, y: 222, imgWd: 51, imgHt: 102, txtX: 8, txtY: 50 },
  { name: '陕西', img: 'shanxii', x: 395, y: 242, imgWd: 76, imgHt: 128, txtX: 30, txtY: 75 },
  { name: '宁夏', img: 'ningxia', x: 381, y: 246, imgWd: 44, imgHt: 70, txtX: 8, txtY: 10 },
  { name: '青海', img: 'qinghai', x: 185, y: 242, imgWd: 178, imgHt: 126, txtX: 50, txtY: 70 },
  { name: '西藏', img: 'xizang', x: 31, y: 270, imgWd: 276, imgHt: 169, txtX: 100, txtY: 80 },
  { name: '山东', img: 'shandong', x: 519, y: 256, imgWd: 95, imgHt: 62, txtX: 20, txtY: 20 },
  { name: '河南', img: 'henan', x: 460, y: 292, imgWd: 85, imgHt: 78, txtX: 30, txtY: 25 },
  { name: '四川', img: 'sichuan', x: 285, y: 326, imgWd: 154, imgHt: 134, txtX: 50, txtY: 60 },
  { name: '江苏', img: 'jiangsu', x: 539, y: 302, imgWd: 82, imgHt: 67, txtX: 20, txtY: 30 },
  { name: '安徽', img: 'anhui', x: 522, y: 314, imgWd: 69, imgHt: 81, txtX: 20, txtY: 36 },
  { name: '上海', img: 'shanghai', x: 609, y: 351, imgWd: 13, imgHt: 17, txtX: 6, txtY: 6 },
  { name: '浙江', img: 'zhejiang', x: 573, y: 363, imgWd: 56, imgHt: 63, txtX: 10, txtY: 20 },
  { name: '湖北', img: 'hubei', x: 437, y: 344, imgWd: 109, imgHt: 67, txtX: 36, txtY: 26 },
  { name: '重庆', img: 'chongqing', x: 394, y: 362, imgWd: 67, imgHt: 64, txtX: 20, txtY: 26 },
  { name: '江西', img: 'jiangxi', x: 513, y: 386, imgWd: 69, imgHt: 95, txtX: 22, txtY: 36 },
  { name: '湖南', img: 'hunan', x: 444, y: 393, imgWd: 79, imgHt: 88, txtX: 26, txtY: 30 },
  { name: '贵州', img: 'guizhou', x: 370, y: 410, imgWd: 85, imgHt: 74, txtX: 30, txtY: 25 },
  { name: '云南', img: 'yunnan', x: 279, y: 408, imgWd: 129, imgHt: 131, txtX: 40, txtY: 80 },
  { name: '广西', img: 'guangxi', x: 382, y: 452, imgWd: 112, imgHt: 83, txtX: 40, txtY: 36 },
  { name: '福建', img: 'fujian', x: 549, y: 412, imgWd: 63, imgHt: 78, txtX: 16, txtY: 20 },
  { name: '广东', img: 'guangdong', x: 460, y: 464, imgWd: 113, imgHt: 89, txtX: 36, txtY: 33 },
  { name: '香港', img: 'xianggang', x: 524, y: 512, imgWd: 6, imgHt: 5, txtX: 0, txtY: 0 },
  { name: '台湾', img: 'taiwan', x: 614, y: 454, imgWd: 24, imgHt: 57, txtX: 6, txtY: 16 },
  { name: '海南', img: 'hainan', x: 444, y: 554, imgWd: 37, imgHt: 33, txtX: 6, txtY: 10 }
].map(o => {
  o.img ? mapAssetsRoot + o + '.png' : ''
  return o;
});

const xyCitys = citys.map(c => {
  let o = {};
  o.name = c.city;
  o.hideName = true;
  let xy = jwToxy(c.coordinate[0], c.coordinate[1]);
  o.x = xy.x;
  o.y = xy.y;
  o.imgWd = 8;//根据美术资源尺寸
  o.imgHt = 8;
  o.img = '../../assets/province/light.png';
  return o;
})


function jwToxy(j, w) {
  let dj = Math.abs(geoTopLeft.j - j);
  let dw = Math.abs(geoTopLeft.w - w);
  let x = mapWidth * dj / geoWd;
  let y = mapHeight * dw / geoHt;

  //修正偏移，因为经纬度实际上类似于极坐标，而非简单的直角坐标
  let offx = dw * 0.75;
  let offy = -dj * 0.78;
  x+= offx;
  y+= offy;
 
  return { x, y };
}

Component({
  /**
   * 组件的属性列表，双击可切换内层的缩放，缩放系数由scaleRate来定
   */
  properties: {
    conWd: {
      //最外层宽度
      type: Number,
      value: 750
    },
    conHt: {
      //最外层高度
      type: Number,
      value: 1000
    },
    innerWd: {
      //内层宽度
      type: Number,
      value: 750
    },
    innerHt: {
      //内层高度
      type: Number,
      value: 1000
    },
    scaleRate: {
      //放大状态的缩放系数
      type: Number,
      value: 1.5
    },

    mapBg: {
      //内层背景图
      type: String,
      value: mapBg
    },
    mapZ: {
      //内层背景的z-index，调高后可将背景图盖在其他元素的上层
      type: Number,
      value: 0
    },
    uid: {
      //该地图足迹的用户uid
      type: String,
      value: null,
      observer: 'updatePlayer'
    },
    
    players: {
      //要显示的用户
      type: Object,
      value: [],
      observer: 'showLocation'
    },
    
    airlines: {
      //要显示的飞行路线
      type: Object,
      value: [],
      observer: 'updateAirline'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    provinces: [],
    citys: [],
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    double: false,//是否放大到两倍显示
    scale: 1,//缩放倍数
    scrollLeft: 0,//滚动位置x
    scrollTop: 0,//滚动位置y
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {

    },
    touchMove(e) {

    },
    touchEnd(e) {

    },
    touchTap(e) {
      // check if triggered double tap
      let now = Date.now();
      if (tapStamp && now - tapStamp < DOUBLE_TAP_INTERVAL) {
        this.doubleTap();
      }
      tapStamp = now;
    },
    doubleTap() {
      let double = !this.data.double;
      let scale = double ? this.data.scaleRate : 1;
      this.setData({ double, scale });
      console.log(double, 'double')
    },
    tapEle(e) {
      console.log('tap element')
    },
    updatePlayer() {
      if (!this.data.uid)
        return;
      
      return;//server not ok
      let req = new TraveledPlaces();
      req.playerUid = this.data.uid;

      req.fetch().then(()=> {
        provinces.every(o => {
          o.light = req.provinces.indexOf(o.name) != -1;
          return true;
        });
        let citys = xyCitys.filter(c => {
          c.light = true//req.citys.indexOf(c.name) != -1;

          return c.light;
        })

        this.setData({ provinces, citys: citys });
      })
    },

    showLocation() {
      console.log(this.data.players)
      let location = this.data.players;
      if (!location){
        return; 
      }
      let player = location.map(o => {
        let l = {};
        let city = City.Get(o.location);
        let locaXY;
        locaXY = jwToxy(city.coordinate[0], city.coordinate[1]);
        l.x = locaXY.x;
        l.y = locaXY.y;
        l.img = o.img;
        l.imgWd = 30;
        l.imgHt = 30;
        return l;
      })
      console.log(player)
      this.setData({player})
    },

    updateAirline() {
      let airlines = this.data.airlines;
      if (!airlines) {
        return;
      }
      let scale = this.data.scale;
      let planes = [];
      let lines = airlines.map(a => {
        let o = {};
        let p = {};
        //外面传入的from和to是始/达 城市的配表id
        let city = City.Get(a.from);
        o.from = jwToxy(city.coordinate[0], city.coordinate[1]);
        Object.assign(p, o.from);

        city = City.Get(a.to);
        o.to = jwToxy(city.coordinate[0], city.coordinate[1]);

        // //判断左弧、右弧
        let dx = o.to.x - o.from.x;
        let dy = o.to.y - o.from.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx)
        let rotation = angle * 180 / Math.PI;
        let arc = dist / arcDt * lineArcD / 2;
        arc = Math.max(arc, lineArcDMin);

        

        let halfDist = dist / 2;
        let halfP = {x: o.from.x + dx / 2, y: o.from.y + dy /2};
        let halfPI = Math.PI / 2;
        

        //判断弧形方向
        //因为坐标原点在图的左上角，所以出发、到达点的各自angle都大于0
        let anF = Math.atan2(o.from.y, o.from.x);
        let anT = Math.atan2(o.to.y , o.to.x);
        //弧半径
        let r = halfDist / Math.sin(arc);
        let dt = halfDist / Math.tan(arc);
        let ht = r - dt;



        let anC = angle + halfPI;
        o.arcBtm = false;
        if (anT < anF) {
          anC += Math.PI;
          o.arcBtm = true;
        }
        let cx = halfP.x + dt * Math.cos(anC);
        let cy = halfP.y + dt * Math.sin(anC);

        

        o.ht = ht;
        o.dist = dist;
        o.rotation = rotation;
      

        

        p.anCenter = {x:cx, y:cy};
        p.r = r;
        p.an = Math.atan2(o.from.y - cy, o.from.x - cx) ;
        p.anTo = Math.atan2(o.to.y - cy, o.to.x - cx);
        let rd = p.anTo - p.an;

        p.anStep = rd > 0 ? stepDg : -stepDg;


        planes.push(p);
        return o;
      })

      
      //显示路线\飞机
      this.setData({ lines, planes });

      //飞行动画
      
      this.data.planeTm = setInterval(()=> {
        let allFinished = true;
        planes.forEach(p => {
          if ((p.anStep > 0 && p.an < p.anTo) || (p.anStep < 0 && p.an > p.anTo)) {
            p.an += p.anStep;
            allFinished = false;

            let center = p.anCenter;
            p.x = p.r * Math.cos(p.an) * scale + center.x * scale;
            p.y = p.r * Math.sin(p.an) * scale+ center.y * scale;
            p.rotation = (p.an - Math.PI / 2 )* 180 / Math.PI;
            if (p.anStep > 0) {
              p.rotation += 180;
            }

          }
        });

        this.setData({planes})

        if (allFinished) {
          this.clearPlaneTm();
          this.arrived();
        }
      }, 33);

    },
    clearPlaneTm() {
      let tm = this.data.planeTm;
      tm && clearInterval(tm);
      this.data.planeTm = null;
    },
    arrived() {
      this.triggerEvent('arrived')
    }


  },

  attached() {
    setTimeout(()=> {
      if (this.data.uid === null) {
        //如果未传入uid，则使用当前用户的uid
        this.data.uid = Base.GetUID();
        this.updatePlayer()//server not implement yet
        console.log('aaaaaaaaaaaaaaaa', this.data.uid)
      }
    }, 1500)
  },
  detached() {
    this.clearPlaneTm();
  }

})
