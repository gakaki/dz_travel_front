// components/cmap/cmap.js
import { City, citys } from '../../sheets.js'

let tapStamp;
const DOUBLE_TAP_INTERVAL = 600;
//大地图左上角点的经纬度
const geoTopLeft = { j: 82, w: 55 };
//大地图右下角点的经纬度
const geoBtmRht = { j: 128, w: 1.5 };
const geoWd = geoBtmRht.j - geoTopLeft.j;
const geoHt = geoTopLeft.w - geoBtmRht.w;

const mapAssetsRoot = '../../assets/province/';
const mapBg = mapAssetsRoot + 'china.png';
const mapWidth = 714;
const mapHeight = 828;
const provinces = [
  { name: '新疆', statusImgs: ['', 'xinjiang'], x: 3, y: 74, imgWd: 283, imgHt: 214, txtX: 150, txtY: 80 },
  { name: '内蒙', statusImgs: ['', 'neimeng'], x: 297, y: 12, imgWd: 313, imgHt: 268, txtX: 100, txtY: 210 },
  { name: '甘肃', statusImgs: ['', 'gansu'], x: 232, y: 190, imgWd: 206, imgHt: 168, txtX: 30, txtY: 30 },
  { name: '黑龙江', statusImgs: ['', 'heilongjiang'], x: 552, y: 6, imgWd: 157, imgHt: 141, txtX: 80, txtY: 80 },
  { name: '吉林', statusImgs: ['', 'jilin'], x: 578, y: 117, imgWd: 116, imgHt: 81, txtX: 35, txtY: 30 },
  { name: '辽宁', statusImgs: ['', 'liaoning'], x: 558, y: 161, imgWd: 82, imgHt: 81, txtX: 30, txtY: 30 },
  { name: '河北', statusImgs: ['', 'hebei'], x: 497, y: 187, imgWd: 76, imgHt: 108, txtX: 10, txtY: 65 },
  { name: '北京', statusImgs: ['', 'beijing'], x: 519, y: 213, imgWd: 25, imgHt: 27, txtX: 6, txtY: 4 },
  { name: '天津', statusImgs: ['', 'tianjin'], x: 536, y: 225, imgWd: 15, imgHt: 27, txtX: 8, txtY: 6 },
  { name: '山西', statusImgs: ['', 'shanxi'], x: 459, y: 222, imgWd: 51, imgHt: 102, txtX: 8, txtY: 50 },
  { name: '陕西', statusImgs: ['', 'shanxii'], x: 395, y: 242, imgWd: 76, imgHt: 128, txtX: 30, txtY: 75 },
  { name: '宁夏', statusImgs: ['', 'ningxia'], x: 381, y: 246, imgWd: 44, imgHt: 70, txtX: 8, txtY: 10 },
  { name: '青海', statusImgs: ['', 'qinghai'], x: 185, y: 242, imgWd: 178, imgHt: 126, txtX: 50, txtY: 70 },
  { name: '西藏', statusImgs: ['', 'xizang'], x: 31, y: 270, imgWd: 276, imgHt: 169, txtX: 100, txtY: 80 },
  { name: '山东', statusImgs: ['', 'shandong'], x: 519, y: 256, imgWd: 95, imgHt: 62, txtX: 20, txtY: 20 },
  { name: '河南', statusImgs: ['', 'henan'], x: 460, y: 292, imgWd: 85, imgHt: 78, txtX: 30, txtY: 25 },
  { name: '四川', statusImgs: ['', 'sichuan'], x: 285, y: 326, imgWd: 154, imgHt: 134, txtX: 50, txtY: 60 },
  { name: '江苏', statusImgs: ['', 'jiangsu'], x: 539, y: 302, imgWd: 82, imgHt: 67, txtX: 20, txtY: 30 },
  { name: '安徽', statusImgs: ['', 'anhui'], x: 522, y: 314, imgWd: 69, imgHt: 81, txtX: 20, txtY: 36 },
  { name: '上海', statusImgs: ['', 'shanghai'], x: 609, y: 351, imgWd: 13, imgHt: 17, txtX: 6, txtY: 6 },
  { name: '浙江', statusImgs: ['', 'zhejiang'], x: 573, y: 363, imgWd: 56, imgHt: 63, txtX: 10, txtY: 20 },
  { name: '湖北', statusImgs: ['', 'hubei'], x: 437, y: 344, imgWd: 109, imgHt: 67, txtX: 36, txtY: 26 },
  { name: '重庆', statusImgs: ['', 'chongqing'], x: 394, y: 362, imgWd: 67, imgHt: 64, txtX: 20, txtY: 26 },
  { name: '江西', statusImgs: ['', 'jiangxi'], x: 513, y: 386, imgWd: 69, imgHt: 95, txtX: 22, txtY: 36 },
  { name: '湖南', statusImgs: ['', 'hunan'], x: 444, y: 393, imgWd: 79, imgHt: 88, txtX: 26, txtY: 30 },
  { name: '贵州', statusImgs: ['', 'guizhou'], x: 370, y: 410, imgWd: 85, imgHt: 74, txtX: 30, txtY: 25 },
  { name: '云南', statusImgs: ['', 'yunnan'], x: 279, y: 408, imgWd: 129, imgHt: 131, txtX: 40, txtY: 80 },
  { name: '广西', statusImgs: ['', 'guangxi'], x: 382, y: 452, imgWd: 112, imgHt: 83, txtX: 40, txtY: 36 },
  { name: '福建', statusImgs: ['', 'fujian'], x: 549, y: 412, imgWd: 63, imgHt: 78, txtX: 16, txtY: 20 },
  { name: '广东', statusImgs: ['', 'guangdong'], x: 460, y: 464, imgWd: 113, imgHt: 89, txtX: 36, txtY: 33 },
  { name: '香港', statusImgs: ['', 'xianggang'], x: 524, y: 512, imgWd: 6, imgHt: 5, txtX: 36, txtY: 33 },
  { name: '台湾', statusImgs: ['', 'taiwan'], x: 614, y: 454, imgWd: 24, imgHt: 57, txtX: 6, txtY: 16 },
  { name: '海南', statusImgs: ['', 'hainan'], x: 444, y: 554, imgWd: 37, imgHt: 33, txtX: 6, txtY: 10 }
].map(o => {
  o.statusImgs = o.statusImgs.map(m => {
    return m ? mapAssetsRoot + m + '.png' : '';
  })
  return o;
});

const xyCitys = citys.map(c => {
  let o = {};
  o.name = c.city;
  // o.hideName = true;
  let xy = jwToxy(c.coordinate[0], c.coordinate[1]);
  o.x = xy.x;
  o.y = xy.y;
  o.imgWd = 6;//根据美术资源尺寸
  o.imgHt = 6;
  o.statusImgs = ['', '../../assets/index/gold.png'];
  return o;
})


function jwToxy(j, w) {
  let dj = Math.abs(geoTopLeft.j - j);
  let dw = Math.abs(geoTopLeft.w - w);

  let x = mapWidth * dj / geoWd;
  let y = mapHeight * dw / geoHt;
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
      value: ''
    },
    mapZ: {
      //内层背景的z-index，调高后可将背景图盖在其他元素的上层
      type: Number,
      value: 0
    },
    lightProvinces: {
      //要点亮的省
      type: Object,
      value: []

    },
    lightCitys: {
      //要点亮的城市
      type: Object,
      value: [],
      observer: 'updateLightArea'
    },
    players: {
      //要显示的用户
      type: Object,
      value: [{ name: '新疆', statusImgs: ['', 'xinjiang'], x: 220, y: 90, imgWd: 30, imgHt: 30, txtX: 150, txtY: 80 }]
    },
    planes: {
      //要显示的飞机
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
    updateLightArea() {
      setTimeout(() => {
        provinces.every(o => {
          o.light = true// this.data.lightProvinces.indexOf(o.name) != -1;
          return true;
        });

        let citys = xyCitys.filter(c => {
          console.log(c.name)
          c.light = this.data.lightCitys.indexOf(c.name) != -1;
          c.hideName = !c.light;
          if (c.name) {
            console.log(c.name)
          }
          return c.light;
        })
          console.log(citys, this.data.lightCitys, xyCitys.length)

        this.setData({ provinces, citys: citys, mapBg });
      }, 10);
    }


  },


})
