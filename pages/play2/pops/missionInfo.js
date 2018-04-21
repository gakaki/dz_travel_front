// pages/play2/pops/missionInfo.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        task: {
            type: Object//api.TourTask//{spot, tour, photo, parterTour, parterPhoto}
        },
        single: {
            type: Boolean,
            value: true
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
        friendPhoto: '',

        selfSpotFull: false,
        selfTourFull: false,
        selfPhotoFull: false,
        friendTourFull: false,
        friendPhotoFull: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {},
    attached() {
        // this.data.task.parterTour = [3,3]
        // this.data.task.parterPhoto = [3,3]//test
        let single = this.data.single;
        let selfSpot = this.data.task.spot[0] + '/' + this.data.task.spot[1];
        let selfTour = this.data.task.tour[0] + '/' + this.data.task.tour[1];
        let selfPhoto = this.data.task.photo[0] + '/' + this.data.task.photo[1];
        let friendTour = this.data.task.parterTour[0] + '/' + this.data.task.parterTour[1];

        let friendPhoto = this.data.task.parterPhoto[0] + '/' + this.data.task.parterPhoto[1];
        let selfSpotFull = this.data.task.spot[0] == this.data.task.spot[1];
        let selfTourFull = this.data.task.tour[0] == this.data.task.tour[1];
        let selfPhotoFull = this.data.task.photo[0] == this.data.task.photo[1];
        let friendTourFull = this.data.task.parterTour[0] == this.data.task.parterTour[1];
        let friendPhotoFull = this.data.task.parterPhoto[0] == this.data.task.parterPhoto[1];

        this.setData({
            single,
            selfSpot,
            selfTour,
            selfPhoto,
            friendTour,
            friendPhoto,
            selfSpotFull,
            selfTourFull,
            selfPhotoFull,
            friendTourFull,
            friendPhotoFull,
        });
    }
})
