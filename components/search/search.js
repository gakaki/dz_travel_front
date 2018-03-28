// components/search/search.js
const sheet = require('../../sheets.js');
let allCity=[], cityId=[]//城市id;

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
    searchChar: '',
    cityId: []
  },

  attached() {
    let readCity = sheet.finds.map(o => {
      let obj = {};
      obj.cities = new sheet.Find(o).city;
      obj.cityid = new sheet.Find(o).cityid;
      return obj;
    })

    console.log(readCity)
    //把所有城市合并在一个数组中
    readCity.forEach((item)=>{
      allCity.push.apply(allCity,item.cities);
      cityId.push.apply(cityId, item.cityid)
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search(e) {
      console.log(e.detail.value)
      let value = e.detail.value
      //输入框中没有value值时不匹配
      if (value) {
        //每当value值变化时必须先清除matchCity在赋值渲染到渲染层，否则会出现value值长度减少时原来匹配到的个数出现无法渲染的情况。极有可能是微信的bug
        this.setData({
          matchCity: [],
          cityId: []
        })
        let reg = new RegExp('' + value + '')
        let match = []
        let id = []
        for (let i = 0; i < allCity.length; i++) {
          if (reg.test(allCity[i])) {
            console.log(i)
            let ind = allCity[i].indexOf(value)
            let split = allCity[i].split(value)
            
            let newSplit = split.filter((item) => {
              return item
            })
            console.log(newSplit)
            if(ind==0){
              newSplit.splice(0, 0, value)
            }
            else{
              newSplit.splice(1, 0, value)
            }
            console.log(newSplit,'拼好的')
            match.push(newSplit)
            id.push(cityId[i])
          }
        }
        this.setData({
          matchCity: match,
          searchChar: value,
          cityId: id
        })
      }
      else {
        this.setData({
          matchCity: [],
          cityId: []
        })
      }

    },

    clear() {
      this.setData({
        inputText: '',
        matchCity: [],
        searchChar: '',
        cityId: []
      })
    },


    //此处为向父组件抛事件上去，一般为隐藏该组件
    _back() {
      this.setData({
        inputText: '',
        matchCity: [],
        searchChar: '',
        cityId: []
      })
      this.triggerEvent("back")
    },


    //此处为选中的搜索结果
    _selected(e) {
      let select = e.currentTarget.dataset.city.join('')
      let id = e.currentTarget.dataset.id
      this.triggerEvent("selected",{select,id})
    }
  }
})
