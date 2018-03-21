class Pool {
	static _pool = new Map();
	static create(clz) {
		let key,cls;
		if (clz.constructor.name == 'Function') {
			key = clz.name;
			cls = clz;
		}
		else {
			cls = clz.constructor;
			key = cls.name;
		}
		if (!key) {
			key = clz.toString();
		}
		if (!key) {
			throw new Error('Pool.create need a class or an instance object, but got an undefined!!')
		}
		if (this._pool.has(key)) {
			let arr = this._pool.get(key);
			if (arr.length) {
				return arr.pop();
			}
			else {
			    return new cls();
            }
		}
		else {
		    return new cls();
        }
	}

	static recycle(obj) {
        if (!obj.constructor) {
            return;
        }
        if (obj.constructor.name == 'Function') {
            return;
        }

        let key = obj.constructor.name;
        let arr;
        if (this._pool.has(key)) {
            arr = this._pool.get(key);
            arr.push(obj)
        }
    }

    static clear() {
	    this._pool.clear();
    }
}
//全局变量
class Global{
    static ctx = null;// global canvas context
    static root = null;// stage root instance

    static clear() {
        this.ctx = null;
        this.root = null;
    }
}

class IDispose {
    dispose(){}
}

class IPool extends IDispose{
    constructor(){
        super();
        this.reset();
    }
    reset() {
        this._ipool = true;
        //child class override
    };
    dispose() {
        this.reset();
        Pool.recycle(this);
    }
}

class Event extends IPool{
	constructor(type) {
	    super();
	    this.reset();
	    this.type = type || 'event';//default

	}


	stopProgration() {
        this.propagationStopped = true;
	}

	reset() {
		this.target = null;
		this.currentTarget = null;
		this.data = null;
		this.bubble = true;
		this.type = null;
		this.propagationStopped = false;
		super.reset();
	}
}
class EvtNode extends IPool{
    constructor() {
        super();

    }
    get id() {
        if (!this._id) {
            this._id = EvtNode.getId(this.ctx, this.cb);
        }
    }
    reset() {
        this.cb = null;
        this.ctx = null;
        this._id = null;
    }
    static getId(ctx, cb) {
        let ctxName = ctx ? ctx.name || ctx.constructor.name : 'null';
        let cbName = cb.name || cb.toString();
        return ctxName + '_' + cbName;
    }
}
class Emmiter extends IPool {
    constructor() {
        super();
        this._evt_map = new Map();
    }
    reset() {
        this._evt_map.clear();
        this.parent = null;
        super.reset();
    }
    has(eventType) {
        return this._evt_map.has(eventType);
    }
    on(eventType, cb, ctx) {
        let key = EvtNode.getId(ctx, cb);
        let has = this.has(eventType);
        let cbs = has ? this._evt_map.get(eventType) : new Map();
        !has && this._evt_map.set(eventType, cbs);

        if (cbs.has(key)) {
            console.log('重复的监听');
            return;
        }
        else {
            let node = Pool.create(EvtNode);
            node.ctx = ctx;
            node.cb = cb;
            node._id = key;
            cbs.set(key,node);
        }

    }
    off(eventType, cb, ctx) {
        if (this.has(eventType)) {
            let cbs = this._evt_map.get(eventType);
            let key = EvtNode.getId(ctx, cb);
            if (cbs.has(key)) {
                cbs.delete(key);
            }

        }
    }
    offAll(eventType) {
        if (this.has(eventType)) {
            this._evt_map.delete(eventType);
        }
    }
    emit(eventType, data, bubble = true) {

        let evt = Pool.create(Event);
        evt.type = eventType;
        evt.target = this;
        evt.bubble = bubble;
        evt.data = data;

        this._emit(evt, bubble);

    }

    _emit(event, bubbling = false) {
        if (bubbling) {
            event.currentTarget = this;
        }
        //call cb
        if (this.has(event.type)) {
            let cbs = this._evt_map.get(event.type);
            cbs.forEach(node => {
                node.ctx ? node.cb.call(node.ctx, event) : node.cb(event);
            })

        }
        //bubbles up
        if (bubbling && !event.propagationStopped && this.parent && this.parent instanceof Emmiter) {
            this.parent._emit(event, true);
        }

    }
}

//记录shape绘制操作，在Sprite内部render里序列化到ctx
class Graphics extends IPool{

}

class Sprite extends Emmiter {
    constructor() {
        super();
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this._width = 0;
        this._height = 0;
        this._visible = true;
        this._graphics = null;
        this.ctx = Global.ctx;
        this.root = Global.root;
        this.children = [];
        this.invalid();
        super.reset();
    }

    get graphics() {
        this._graphics = this._graphics || new Graphics();
        return this._graphics;
    }

    get visible() {
        return this._visible;
    }
    set visible(v) {
        if (v == this._visible) {
            return;
        }
        this._visible = v;
        // tag need render
        this.invalid()
    }

    get width() {
        return this._width;
    }
    set width(v) {
        if (v == this._width) {
            return;
        }
        this._width = v;
        this.invalid();
    }

    get height() {
        return this._height;
    }
    set height(v) {
        if (v == this._height) {
            return;
        }
        this._height = v;
        this.invalid();
    }

    invalid(){
        this._invalid = true;
        if (this.parent) {
            this.parent._invalid = true;// not call parent.invalid()
        }
    }

    addChild(child) {
        return this.addChildAt(child, this.children.length);
    }

    addChildAt(child, idx) {
        if (!child instanceof Sprite) {
            throw new Error('child must be a Sprite, when call "addChild" or "addChildAt"');
        }

        let oldIdx = this.children.indexOf(child);
        if (oldIdx > -1) {
            //already in children list, then swap it to the given idx
            this.children.splice(oldIdx, 1);
        }
        this.children.splice(idx, 0, child);
        this.invalid();
    }

    _render() {
        if (!this._invalid) {
            return;
        }
        if (!this.visible) {
            return;
        }

        //begin render self and children, spread first, then depth
        //self render
        if (this._graphics) {
            //graphics always in under layer
            //graphics's action was done outside by coder, and serialize to ctx here
            this._graphics.serialize();
            this.ctx.restore();

        }
        if (this._img) {
            // imgs in upper layer
            this.ctx.restore();
            if (this._width && this._height) {
                this.ctx.drawImage(this.img, 0, 0, this._width, this._height);
            }
            else {

                this.ctx.drawImage(this.img, 0, 0);
            }
        }
        this.ctx.draw();

        //children render
        this.children.length && this.children.forEach(c => {
            v._render();
        })

    }

    dispose() {
        if (this.children.length) {
            this.children.forEach(c => {
                c.dispose();
            })
        }
        super.dispose();
    }


}

class Image extends Sprite {

}

class Stage extends Sprite {

    constructor() {
        super();
    }


    reset() {
        this._frameRate = 30;
        this._clearFrmTm();
        this._frmTm = null;
        super.reset();
    }

    get frameRate() {
        return this._frameRate;
    }

    set frameRate(v) {
        if (v == this._frameRate){
            return;
        }
        this._frameRate = v;

        this._clearFrmTm();
        this._frmTm = setInterval(()=>{
            this.enterFrame();
        })

    }

    _clearFrmTm() {
        if (this._frmTm) {
            clearInterval(this._frmTm);
            this._frmTm = null;
        }
    }

    enterFrame() {
        //enter_frame event
        this.emit(Event.ENTER_FRAME);

        //render
        this._render();
    }

    dispose() {
        this._clearFrmTm();
        super.dispose();
    }

    /**
     * 初始化
     * @param canvasId 即wxml里要操纵的canvas的id
     * @param page 包含canvas的页面实例,需要在该，一般传入this即可
     * @param frameRate 帧频，默认30
     * **/
    static init(canvasId, page, frameRate=30) {
        let ctx = wx.createCanvasContext(canvasId);

        if (Global.ctx != ctx) {
            let stg = new Stage();
            Global.root = stg;
            stg.root = stg;
            stg.frameRate = frameRate;

            Global.ctx = ctx;

            //record ctx's blank state
            ctx.save();
        }
        else {
            console.log('canvasId duplicate')
        }

    }

    //清除并清理
    static clear() {
        Global.clear();
        Pool.clear();
    }


}