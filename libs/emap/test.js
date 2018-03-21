let stg = Stage.Init('map', 30);

let tileLayer = new Sprite();
let pointLayer = new Sprite();
let lineLayer = new Sprite();
let tipsLayer = new Sprite();

stg.addChild(tileLayer);
stg.addChild(pointLayer);
stg.addChild(tipsLayer);


//init map tiles
let tiles = [t1, t2,t3];
let points = [p1,p2,p3];

let lastP;

tiles.forEach(t => {
	t.on('tap', onTileTap);
	tileLayer.addChild(t);
})

points.forEach(p => {
	pointLayer.addChild(p);
})

function onTileTap(e) {
	// body...
	console.log(e.target.x, e.target.y, e.data);
	if (lastP) {
		//draw line
		let line = new Sprite();
		line.setFillStyle('red');
		line.moveTo(lastP.x, lastP.y);
		line.lineTo(e.target.x, e.target.y);
		lineLayer.addChild(line);
	}

	lastP = {x: e.target.x, y: e.target.y};
	
}