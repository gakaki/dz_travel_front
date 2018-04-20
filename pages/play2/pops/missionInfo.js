// pages/play2/pops/missionInfo.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        selfTask: {
            type: Object//api.TourTask
        },
        friendTask: {
            type: Object//api.TourTask
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        single: false,//单人模式
        selfSpot: '',
        selfTour: '',
        selfPhoto: '',
        friendTour: '',
        friendPhoto: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {},
    attached() {
        let single = !this.data.friendTask;
        let selfSpot = this.data.selfTask.spot[0] + '/' + this.data.selfTask.spot[1];
        let selfTour = this.data.selfTask.tour[0] + '/' + this.data.selfTask.tour[1];
        let selfPhoto = this.data.selfTask.photo[0] + '/' + this.data.selfTask.photo[1];
        let friendTour = this.data.friendTask.tour[0] + '/' + this.data.friendTask.tour[1];
        let friendPhoto = this.data.friendTask.photo[0] + '/' + this.data.friendTask.photo[1];
        this.setData({single, selfSpot, selfTour, selfPhoto, friendTour, friendPhoto});
    }
})
