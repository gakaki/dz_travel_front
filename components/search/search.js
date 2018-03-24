// components/search/search.js
const sheet = require('../../sheets.js');
let allCity=[];

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    matchCity: [], //匹配到的city
    inputText: '',
    searchChar: ''
  },

  attached() {
    let readCity = sheet.finds.map(o => {
      return new sheet.Find(o).city.split(',');
    })

    //把所有城市合并在一个数组中
    readCity.forEach((item)=>{
      allCity.push.apply(allCity,item)
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search(e) {
      console.log(e.detail.value)
      //输入框中没有value值时不匹配
      if (e.detail.value) {
        let reg = new RegExp("" + e.detail.value + "")
        let match = []
        for (let i = 0; i < allCity.length; i++) {
          if (reg.test(allCity[i])) {
            let split = allCity[i].split('')
            match.push(split)
          }
        }
        this.setData({
          matchCity: match,
          searchChar: e.detail.value
        })
      }
      else {
        this.setData({
          matchCity: []
        })
      }

    },

    clear() {
      this.setData({
        inputText: '',
        matchCity: [],
        searchChar: ''
      })
    },


    //此处为向父组件抛事件上去，一般为隐藏该组件
    _back() {
      this.setData({
        inputText: '',
        matchCity: [],
        searchChar: ''
      })
      this.triggerEvent("back")
    },


    //此处为选中的搜索结果
    _selected(e) {
      let select = e.currentTarget.dataset.city.join('')
      this.triggerEvent("selected",{select})
    }
  }
})
