// components/cmap/cmap.js
import {City, citys} from '../../sheets.js'

let tapStamp;
const DOUBLE_TAP_INTERVAL = 600;
//大地图左上角点的经纬度
const geoTopLeft = {j:73.2, w:53.5};
//大地图右下角点的经纬度
const geoBtmRht = {j: 135, w: 3};
const geoWd = geoBtmRht.j - geoTopLeft.j;
const geoHt = geoTopLeft.w - geoBtmRht.w;

const mapAssetsRoot = '../../assets/province/';
const mapBg = mapAssetsRoot + 'china.png';
const mapWidth = 714;
const mapHeight = 828;
const provinces = [
    {name:'新疆',statusImgs:['','xinjiang'], x: 2, y: 73, imgWd:285, imgHt:216, txtX:150, txtY:80},
    {name:'内蒙',statusImgs:['','neimeng'], x: 295, y: 11, imgWd:313, imgHt:269, txtX:100, txtY:210},
    {name:'甘肃',statusImgs:['','gansu'], x: 232, y: 189, imgWd:206, imgHt:168, txtX:30, txtY:30},
    {name:'黑龙江',statusImgs:['','heilongjiang'], x: 549, y: 6, imgWd:158, imgHt:142, txtX:80, txtY:80},
    {name:'吉林',statusImgs:['','jilin'], x: 576, y: 117, imgWd:117, imgHt:82, txtX:35, txtY:30},
    {name:'辽宁',statusImgs:['','liaoning'], x: 557, y: 161, imgWd:82, imgHt:80, txtX:30, txtY:30},
    {name:'河北',statusImgs:['','hebei'], x: 496, y: 187, imgWd:77, imgHt:108, txtX:10, txtY:65},
    {name:'北京',statusImgs:['','beijing'], x: 517, y: 213, imgWd:27, imgHt:29, txtX:6, txtY:4},
    {name:'天津',statusImgs:['','tianjin'], x: 534, y: 225, imgWd:16, imgHt:28, txtX:8, txtY:6},
    {name:'山西',statusImgs:['','shanxii'], x: 459, y: 221, imgWd:51, imgHt:102, txtX:8, txtY:50},
    {name:'陕西',statusImgs:['','shanxi'], x: 394, y: 241, imgWd:76, imgHt:128, txtX:30, txtY:75},
    {name:'宁夏',statusImgs:['','ningxia'], x: 381, y: 246, imgWd:44, imgHt:71, txtX:8, txtY:10},
    {name:'青海',statusImgs:['','qinghai'], x: 184, y: 241, imgWd:178, imgHt:126, txtX:50, txtY:70},
    {name:'西藏',statusImgs:['','xizang'], x: 32, y: 269, imgWd:275, imgHt:170, txtX:100, txtY:80},
    {name:'山东',statusImgs:['','shandong'], x: 518, y: 255, imgWd:95, imgHt:62, txtX:20, txtY:20},
    {name:'河南',statusImgs:['','henan'], x: 459, y: 290, imgWd:85, imgHt:79, txtX:30, txtY:25},
    {name:'四川',statusImgs:['','sichuan'], x: 285, y: 325, imgWd:153, imgHt:135, txtX:50, txtY:60},
    {name:'江苏',statusImgs:['','jiangsu'], x: 539, y: 302, imgWd:83, imgHt:67, txtX:20, txtY:30},
    {name:'安徽',statusImgs:['','anhui'], x: 522, y: 314, imgWd:70, imgHt:82, txtX:20, txtY:36},
    {name:'上海',statusImgs:['','shanghai'], x: 609, y: 351, imgWd:15, imgHt:17, txtX:6, txtY:6},
    {name:'浙江',statusImgs:['','zhejiang'], x: 573, y: 363, imgWd:58, imgHt:64, txtX:10, txtY:20},
    {name:'湖北',statusImgs:['','hubei'], x: 437, y: 344, imgWd:110, imgHt:68, txtX:36, txtY:26},
    {name:'重庆',statusImgs:['','chongqing'], x: 393, y: 360, imgWd:68, imgHt:64, txtX:20, txtY:26},
    {name:'江西',statusImgs:['','jiangxi'], x: 513, y: 386, imgWd:69, imgHt:95, txtX:22, txtY:36},
    {name:'湖南',statusImgs:['','hunan'], x: 444, y: 393, imgWd:80, imgHt:88, txtX:26, txtY:30},
    {name:'贵州',statusImgs:['','guizhou'], x: 370, y: 409, imgWd:85, imgHt:74, txtX:30, txtY:25},
    {name:'云南',statusImgs:['','yunnan'], x: 279, y: 407, imgWd:130, imgHt:131, txtX:40, txtY:80},
    {name:'广西',statusImgs:['','guangxi'], x: 382, y: 452, imgWd:113, imgHt:83, txtX:40, txtY:36},
    {name:'福建',statusImgs:['','fujian'], x: 548, y: 412, imgWd:64, imgHt:79, txtX:16, txtY:20},
    {name:'广东',statusImgs:['','guangdong'], x: 459, y: 464, imgWd:113, imgHt:90, txtX:36, txtY:33},
    {name:'台湾',statusImgs:['','taiwan'], x: 610, y: 453, imgWd:26, imgHt:58, txtX:6, txtY:16},
    {name:'海南',statusImgs:['','hainan'], x: 444, y: 552, imgWd:38, imgHt:33, txtX:6, txtY:10},
].map(o => {
    o.statusImgs = o.statusImgs.map(m => {
        return mapAssetsRoot + m + '.png';
    })
    return o;
});

const xyCitys = citys.map(c => {
  let o = {};
  o.name = c.name;
  o.hideName = true;
  let xy = jwToxy(c.coordinate[0], c.coordinate[1]);
  o.x = xy.x;
  o.y = xy.y;
  o.imgWd = 6;//根据美术资源尺寸
  o.imgHt = 6;
  o.statusImgs = ['', '../../assets/index/gold.png'];
})


function jwToxy(j, w) {
    let dj = Math.abs(geoTopLeft.j - j);
    let dw = Math.abs(geoTopLeft.w - w);

    let x = mapWidth * dj / geoWd;
    let y = mapHeight * dw / geoHt;
    return {x, y};
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mapBg: {
      type:String,
        value:''
    },
      mapZ:{
      type: Number,
          value: 0
      },
    lightProvinces: {
      type: Object,
      value: []

    },
    lightCitys: {
      type: Object,
      value: [],
        observer: 'updateLightArea'
    },
    players: {
      type: Object,
      value: []
    },
    planes: {
      type: Object,
      value: []
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
      mapBg: mapBg,
    double:false,//是否放大到两倍显示
    scrollLeft:0,//滚动位置x
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
      this.setData({double});
      console.log(double, 'double')
    },
    tapEle(e) {
      console.log('tap element')
    },
      updateLightArea() {
        setTimeout(()=> {
            provinces.every(o => {
                o.light = this.lightProvinces.indexOf(o.name) != -1;
                return true;
            });

            xyCitys.every(c => {
                c.light = this.lightCitys.indexOf(c.name) != -1;
                return true;
            })

            this.setData({provinces, citys:xyCitys});
        }, 10);
      }


  },
  

})
