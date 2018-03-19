// components/search/search.js
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
    allCity: ['合肥', '安庆', '蚌埠', '亳州', '巢湖', '池州', '滁州', '阜阳', '淮北', '淮南', '黄山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城', '北京', '上海', '重庆', '天津'],
    matchCity: [],
    inputText: '',
    searchChar: ''
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
        for (let i = 0; i < this.data.allCity.length; i++) {
          if (reg.test(this.data.allCity[i])) {
            let split = this.data.allCity[i].split('')
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
