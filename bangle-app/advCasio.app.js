const storage = require('Storage');

require("Font6x12").add(Graphics);
require("Font6x8").add(Graphics);
require("Font8x12").add(Graphics);
require("Font7x11Numeric7Seg").add(Graphics);

function bigThenSmall(big, small, x, y) {
		g.setFont("7x11Numeric7Seg", 2);
		g.drawString(big, x, y);
		x += g.stringWidth(big);
		g.setFont("8x12");
		g.drawString(small, x, y);
}

function getClockBg() {
		return require("heatshrink").decompress(atob("icVgf/ABv8v4DBx4CB+PH8F+nAGB48fwEHBwXjxwqBuPH//+nAGBBwIjCAwI2D/wGBgIyDI4QGDwAGBHYX/4AGBn4UFEYQpCEYYpCAAMfMhP4FIgABwJ8OEBIA=="));
}


// sun, cloud, rain, thunder
var iconsWeather = [
		require("heatshrink").decompress(atob("i8Ugf/ACcfA434BA/AAwsAv0/8F/BAcDwEHHIpECFI3wn4GC/gOC+PAGoXggEH/+ODQgXBGQv/wAbBBAnguEACIn4gfxI4JXFwJmG/kPBA3jSynw")), require("heatshrink").decompress(atob("i0Ugf/AEXggIGE/0A/kPBAmBCIN/A4Y8CgAICwEHBYoUE/ACCj4sDn4CBC4YyDwBrDCgYA3A")), require("heatshrink").decompress(atob("h8Rgf/AAuBAgf8h4FDCwM/AgPA/gFC/0HgEBBQPwnEfDoWAg4jC/gOCAoQmBAQXjFIV//8f//4IQP4j/+gAIB4EcHII4CAoI+DLQJXF/AA==")), require("heatshrink").decompress(atob("h0Pgf/AA8fAYX+g4EC8EBAgXADAeAgAECgAOC/wrCDQIOBBYfwgAaC/kAn4EB/EAv4aDHAeBIg38"))
];


function getBackgroundImage() {
		return require("heatshrink").decompress(atob("2GwgZC/AH4A/AH4AMn//wAEBvwCBh//8ANCAoP8IF4yB//+gEf//AgYHB/+B/4FDKARZE8EP4AdB/ARB/Ef+ALBNAXxBYPxEYf8CgMfAoRBJEwN/4BBBEwUADoQFCAQQAEnBBDv41BwF4IIsD+E4IIIpBx4CC5YFDNAwABHwJEC3+PIIP/9EAgJBKgP4IIdwGoOAnEfxxBDd4fx7BBE45BMvwED/g7BYooXCIJCtBIIR6BTwQyBII4jBIKKDCgS/BAAJBGQZP5IIYXDIJDFCIK1/HgX/kY7CEAJBJh4sDKwTFDIIg+B/ACBHwX4jkP44aC/hAHFIYAIQYQFCIIwsCBYU/8ZBHYQJBCAQIjBTYQpCIJMBEwP+n4gBg/8RIQXBR4QaJAH4A/AH4A/AFcP/4Al4AWVwBBBv5B9/0Aj5AmIK4XYFPZB/IP5BigZB//BB/AoJB/+EAIP+AgEfIPv8gBB/8BBBIHJBEIAJB+/BABg5B94CDCgEPIPX+IAcAgKD/IPoABwBBBv5B8/hABgZA4II8fIPvgIIJA5II0HIP8An5B+gEPIHRBFv5B/gZA7IIgA9IP5B/IP5B/IP5BigAA/AH4ACXDeBfP5B/IP5B/IP5B/IP5Bg/kAAAU/A4P4A4d/IP5B/IM3+gA4GgIYL4Ef+EHHj5B/IP5BXwEAj5B/IP5B/IP5B/IP5BIABJB/IP5BvACH8gAACn4HB/AHDv5B/IP5Bm/0AHA0BDBfAj4HFwBKCIP5B/IN+AgA4GIP5B/IP5B/IP5B/IIQAJIP5B/IN4AQ/kAAAQ4C/AHDv5AeIP5B/ILAAtIP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP4AdgAA/AH4ACTCngv7U5IP5B/IJV+bwJEE/kB4/8uP/j5Bzg/8h4JEx5B6gJBHuE/IOovGQYfHIP9x/BB/uP/IOv8gIIDj5BQgEPINApEIKHAgBZEABnwn/8v5BRgEACgngv/4gfxIJX+C4JBT8CYQHAKZTIIosRCYIABn5Bn+BBpXgIIEDQY1BBYpBDwDdGAEBBYBZCDh4BrE4ACC/i2BAQRBF/l+g///wsQuEHgFwIKQCBIKXgBAWAIgIsOKwMD+BBnBYcAIKDFUKwJuDIKAvEIMwTBGopEDIJgYBYqXjYqNwg41GIMaDUv4KIIKIsQINv4gEBFZwAVYpLgEgYVFIIrdGIL9+IK3+g8ATxJBeZApxD+EACoxBDBY5Bgv/AIP5BBXInAAYTOGIIoAoIIP4IP5BHgAAB/gDCIgpB/IK/4j5BbABpBV4ApSIIYVTIKnwUI5B3cYYA/AH4Aqa5f+IGcDfpnAIOfwBhUBIK84j+eg/8h///l/4CnDv/4j5rB//xAQPwn4CBIIcfwP/CgPHQAP4ILQ4Bg8cAoMAuEA8EPEYNwnALBg/gJoPgv0A/iDEj/xIIN+g7DCILZuBj+AIII1BRIJBDQYJxCR4ZBFgfx4/jMQPggE/IKS5BWwYaB8ZBH/+OBoN+IJiYCIIbRCYosBRYSJRIIaGBIIK2BDod//DFCJoXghzUBIIpNCEALXCOILFXg/j+K8DGobFDR4KDCCIKDGCIRZCwP/PoKDBBAIAzHAQAHgfwIOjjBfIQAFSQYA0IJHgIO4A/ADI"));
}



// schedule a draw for the next minute
let rocketInterval;
var drawTimeout;
function queueDraw() {
		if (drawTimeout) clearTimeout(drawTimeout);
		drawTimeout = setTimeout(function() {
				drawTimeout = undefined;
				draw();
		}, 60000 - (Date.now() % 60000));
}


function clearIntervals() {
		if (rocketInterval) clearInterval(rocketInterval);
		rocketInterval = undefined;
		if (drawTimeout) clearTimeout(drawTimeout);
		drawTimeout = undefined;
}


////////////////////////////////////////////
// DATA READING
//
function getDataJson(){
		var res = {"tasks":"", "weather":[]};
		try {
				res = storage.readJSON('advCasioData.json');
		} catch(ex) {
				return res;
		}
		return res;
}
var dataJson = getDataJson();

////////////////////////////////////////////
// DRAWING FUNCS
//
function drawWeather(arr) {
		//g.setFont("8x12", 1);
		g.setFont("6x8", 1);
		var p = {l: 8, tText: 40, tIcon:20, decal:25};
		for(var i = 0; i<arr.length;i++) {
				g.drawString(arr[i][0], p.l + p.decal*i + 4, p.tText);
				g.drawImage(iconsWeather[arr[i][1]], p.l + p.decal*i, p.tIcon, { scale: 1 });
		}
}

function drawTasks(str) {
		//g.setFont("8x12", 1);
		g.setFont("6x8", 1);
		var t = 60;
		var l = 0;
		g.drawString(str, l+5, t+0);
		//g.drawString(".meeting", l+5, t+10);
		//g.drawString("15h gisele", l+5, t+20);
}


function drawAlarm() {
		//g.setFont("8x12", 1);
		g.setFont("8x12", 2);
		var t = 97;
		var l = 105;
		g.drawString("2h30", l+5, t+0);
		g.drawImage(getClockBg(), l-20, t+2, { scale: 1 });
}

function drawSteps() {
		//g.setFont("8x12", 1);
		g.setFont("8x12", 2);
		var t = 132;
		var l = 150;
		g.drawString(getSteps(), l+5, t+0);
}


function drawClock() {
		g.setFont("7x11Numeric7Seg", 3);
		g.clearRect(80, 57, 170, 96);
		g.setColor(255, 255, 255);
		var l = 77;
		var t = 57;
		var w = 170;
		var h = 116;
		g.drawRect(l, t, w, h);
		g.fillRect(l, t, w, h);
		g.setColor(0, 0, 0);
		g.drawString(require("locale").time(new Date(), 1), 70, 60);
		
		// day
		//g.setFont("8x12", 1);
		//g.setFont("9x18", 1);
		//g.drawString(require("locale").dow(new Date(), 2).toUpperCase(), 25, 136);
		g.setFont("8x12", 2);
		g.drawString(require("locale").dow(new Date(), 2), 18, 130);
		
		// month
		g.setFont("8x12");
		g.drawString(require("locale").month(new Date(), 2).toUpperCase(), 80, 127);
		
		// day nb
		g.setFont("8x12", 2);
		const time = new Date().getDate();
		g.drawString(time < 10 ? "0" + time : time, 78, 137);
}

function drawBattery() {
		bigThenSmall(E.getBattery(), "%", 140, 23);
}


function getSteps() {
		var steps = 0;
		try{
				if (WIDGETS.wpedom !== undefined) {
						steps = WIDGETS.wpedom.getSteps();
				} else if (WIDGETS.activepedom !== undefined) {
						steps = WIDGETS.activepedom.getSteps();
				} else {
						steps = Bangle.getHealthStatus("day").steps;
				}
		} catch(ex) {
				// In case we failed, we can only show 0 steps.
				return "? k";
		}

		steps = Math.round(steps/1000);
		return steps + "k";
}



function draw() {
		
		queueDraw();

		g.reset();
		g.clear();
		g.setColor(255, 255, 255);
		g.fillRect(0, 0, g.getWidth(), g.getHeight());
		let background = getBackgroundImage();
		g.drawImage(background, 0, 0, { scale: 1 });
		
		
		g.setColor(0, 0, 0);
		g.setFont("6x12");
		//g.drawString("woop Process", 30, 20);
		//g.setFont("8x12");
		//g.drawString("ACTIVATE", 40, 35);
		if(dataJson) drawWeather(dataJson.weather);
		if(dataJson) drawTasks(dataJson.tasks);
		

		g.setFontAlign(0,-1);
		g.setFont("8x12", 2);
		//g.drawString(getTemperature(), 155, 132);
		//g.drawString(Math.round(Bangle.getHealthStatus("last").bpm || 0), 109, 98);
		

		drawSteps();
		g.setFontAlign(-1,-1);
		drawClock();
		drawAlarm();
		//drawRocket();
		drawBattery();

		// Hide widgets
		for (let wd of WIDGETS) {wd.draw=()=>{};wd.area="";}
}

// save batt power
Bangle.on("lcdPower", (on) => {
		if (on) {
				draw();
		} else {
				clearIntervals();
		}
});


Bangle.on("lock", (locked) => {
		clearIntervals();
		draw();
		if (!locked) {
				//rocketInterval = setInterval(drawRocket, rocketSpeed);
		}
});


// Load widgets, but don't show them
Bangle.loadWidgets();
Bangle.setUI("clock");

g.reset();
g.clear();
draw();
