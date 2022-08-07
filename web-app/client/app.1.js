const storage = require('Storage');

//require("Storage").optimise();
//require("Storage").eraseAll();
//require("Storage").writeJSON(name, data)

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
		return require("heatshrink").decompress(atob("2GwghC/AH4A/AH4AMl////wAwURiQECgUzmcxBQQCBiYUBBARW+LAcCAgcPBYgFBkAIFG7kQiAKIiIKBgISOAAJBD//zKQfxK4vyAoMQCgn/ERBhBBYR5BAwR1DB4Y2DgYPCGIQRCCQcP+EfGJI0FEgRSCGAQCCX4JXCkAhDn4lI+HyK4YWBFIPzJYJXHAIMSK4cwJ4I3CAYMzA4cfcRMBdwytBK4i6FK4IUCMgYAEGIITBK4cCaAPwgJXB+fzK4sAgYtCK5EfA4pXR+AmBaIZYCK6KcCAwSjDEYXx/8vK5QRCK4kPK6cDkJREBIMBfgIrDK5svUAIQBAwIaCK4w+DK4YGBK7IaBboIuCK4gFCJwYBBiBCCCgQhHHYgGDgArBK5IGDAYMgJ4Xwn53BGgLVDmBXKAAinDLpJXCAAYhHR4YODn/wJIPyTYZXDE4RXD+ECNILIDAIPwj4xIAAYNCR4fyVIYLFA4KEBBAglKAGUCmcykEAiMQBIURBYM/BgIUEgcz+bTKAH4A/AH4A/AHP/AGY1d+BWCh5X/LCpW1K74fgG/5X/AH5X/K9Bg/K63wK/5XWgBX/K6pWBK/5XU+BWBh5J/K6auCK/5XTVwRfFAH5XOKwRX/K6auDh5I/K6SuDWP5XSVwYADWX6vXK/5XQWQpW/K6auDJP5XWV35XT+Cu/K7Ku/K65H/K6hW/K7EPI35XWIv5XWAH5X/K/4A/K/5X/K/4A/K9cAAH4A/AFzz/AHRX/K/5X/AH5X/K/5X/AH5X/K/4A/K/5X/K/4A/K/5X/K/4A/K/5X/AH5X/K/5X/AH5X/K/5X/AH5X/K/4A/K/5X/K/4A/K/5X/K/4A/K/5X/AH5X/K/5X/AH5X/K/5X/AH5X/K/4A/K/5X/K/4A/K/5X/K/4A/K/5X/AH5X/K/5X/AH5X/K/5X/AH5X/K/4A/K/5X/K/4A/K/5X/K/4A/K/5X/AH5X/K/5X/AH5X/K/40VAH4A/AFzLb+EPDm4AdK/5X/K+PwgEAHy5X9HgMAK/5XXH6xX/H65X/K/5X/K98AK7sAgBX3DjBWFO644DSTHwGzJXED4RXaDoLqcK7weWDIQcXK8I6YK77KXK4o8DPbY6ZK7qvDDy6vdR7JXDh60EDyw5BAIRXYSwjMbAgIhUDwJZCHwJX0GwjRWNwIAEHSwBCDSpXFH4pXzDS5XIEARXVSYbQEDaYzCK+6vcKaxXNDypX9HwQkbHS40COSpXKK2A6CHgRXcPIhX0SwpXYVuQ6EgBX/K644YODBXkSDJX/K/5X/DtRX6gA3YOkRWbLDZX4KwYA/AG8F5vdABncKH4AGhpRJAYXNAgPAKP4AF5vMJwoDBAQIKE6BR/AAvc5vO9wAB7oCB9veAoPcAoPcK+kwh8AgcA98An//gH/+sD//wCISgBJ4IABAYpaC9vdK4UP/9AAQNQr/zgHwEYNQFYQAh+EP+FegH+A4QBCMQIKBAAPNK4yxBA4RXCV4YZBE4IjChwCDmApCK8VdmHggHgFYf0SQJXE5nMK4anCAoYHC5pXCaQJXBop+BqAGEK7f/AAQeEKwQrBqCtDAILjBCQfNK4JTCAYZXF7qvD//gV4S2DgEFFIYAECgIACMC8PKoIBB8n1K4ivF5vc5xOCWYZbBAYavHU4RXCr4pEAEMDfoNQGoMEgEwYQPwAoIBBAAPM5ipC7oDCVIIAE7hXCD4SdBiEP+gGBgihCFYIAz5pXBAAnN7oIB7nc5gOBK4QA/K4pNCWgSpCBInNK/4AGhncKIStC7gCBA4QAC4BR/AAysCABZW/AHwA="));
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
// TIMER FUNC
//
var timer_time = 0;
var alreadyListenTouch = false;
function initTouchTimer () {
		if (alreadyListenTouch) return;
		alreadyListenTouch = true;
		
		
		Bangle.on('swipe', function(dirX,dirY) {
				if (canTouch === false) return;
				var njson = getDataJson();
        if (!njson) return;
				
				if (dirX === -1) {
						timer_time = 0;
						delete njson.timer;
						setDataJson(njson);
				}
				else if (dirX === 1) { 
						var now = new Date().getTime();
						njson.timer = now + (timer_time * 1000 * 60);
						Bangle.setLocked(true);
						setDataJson(njson);
						Bangle.buzz(200, 0);
						timer_time = 0;
				}
				else if (dirY === -1) { 
						if (canTouch === false || njson.timer) return;
						timer_time = timer_time + 5;
				}
				else if (dirY === 1) { 
						if (canTouch === false || njson.timer) return;
						timer_time = timer_time - 5;
				}
				draw();
		});
}
setTimeout(() => {
		initTouchTimer ();
});

function getTimerTime() {
		// if timer_time !== -1, take it
		if (timer_time !== 0) {
				return timer_time + "m";
		} else {
				// else, show diff between njsontime and now
				var njson = getDataJson();
        if (!njson) return false;
				var now = new Date().getTime();
				var diff = Math.round((njson.timer - now) / (1000 * 60));
				//console.log(123, njson, diff, now, njson.timer - now);
				if (diff > 0) return diff + "m";
				else if (njson.timer) {
						Bangle.buzz(1000, 1);
						console.log("END OF TIMER");
						delete njson.timer;
						setDataJson(njson);
						return false;
				} else {
						return false;
				}
				// if diff is <0, delete timer from json
		}
}
function drawTimerOLD() {
		//g.drawString(getTimerTime(), 100, 100);
		g.setFont("8x12", 2);
		var t = 97;
		var l = 105;
		var time = getTimerTime();
		if (time || timer_time !== 0) g.drawString(time, l+5, t+0);
		if (time && timer_time === 0) g.drawImage(getClockBg(), l-20, t+2, { scale: 1 });
}


////////////////////////////////////////////
// DATA READING
//
function getDataJson(){
		var res = {"tasks":"", "weather":[]};
		try {
				//res = storage.readJSON('advcasio.data.json');
				//res = JSON.parse(res);
				res = dataJsonInt;
		} catch(ex) {
				//console.log("ERROR READING", ex);
				//return res;
		}
		return res;
}

var dataJsonInt = {"tasks":"", "weather":[]};
function setDataJson(resJson){
		//resJson = JSON.stringify(resJson);
		//console.log("setdatajson", resJson);
		try {
				dataJsonInt = resJson;
				//res = storage.writeJSON('advcasio.data.json', resJson);
		} catch(ex) {
				//console.log("ERROR", ex);
				//return res;
		}
		//return res;
}
var dataJson = getDataJson();

////////////////////////////////////////////
// WEATHER!
//
function drawWeather(arr) {
		g.setFont("6x8", 1);
		var p = {l: 8, tText: 40, tIcon:20, decal:25};
    var today = new Date().getTime();
    var yesterday = today - (1000 * 60 * 60 * 24);
    var testday = today + (1000 * 60 * 60 * 24 * 2);
    //12h auj > 12h hier qui est sup a 0h auj
    //23h59 hier est sup a 0h auj
    var j = 0;
		for(var i = 0; i<arr.length;i++) {
        if (arr[i][2] > yesterday && j < 4) {
						g.drawString(arr[i][0], p.l + p.decal*j + 4, p.tText);
						g.drawImage(iconsWeather[arr[i][1]], p.l + p.decal*j, p.tIcon, { scale: 1 });
						j++
        }
		}
}


////////////////////////////////////////////
// DRAWING FUNCS
//
function drawTasks(str) {
		g.setFont("6x8", 1);
		var t = 57;
		var l = 0;
		g.drawString(str, l+5, t+0);
}

function drawSteps() {
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
		g.drawString(require("locale").time(new Date(), 1), 76, 60);
		
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
		if(dataJson && dataJson.weather) drawWeather(dataJson.weather);
		if(dataJson && dataJson.tasks) drawTasks(dataJson.tasks);
		

		g.setFontAlign(0,-1);
		g.setFont("8x12", 2);

		drawSteps();
		g.setFontAlign(-1,-1);
		drawClock();
		drawBattery();
    drawTimer();
		// Hide widgets
		for (let wd of WIDGETS) {wd.draw=()=>{};wd.area="";}
}

// save batt power, does not seem to work although...
var canTouch = true;
Bangle.on("lcdPower", (on) => {
		if (on) {
				draw();
		} else {
				canTouch = false;
				clearIntervals();
		}
});


Bangle.on("lock", (locked) => {
		clearIntervals();
		draw();
		if (!locked) {
				canTouch = true;
		} else {
				canTouch = false;
    }
});



////////////////////////////////////
// NEW CODE


var lastTime = 0;
function throttle(func, timeFrame) {
    var now = Date.now();
    if (now - lastTime >= timeFrame) {
        func();
        lastTime = now;
    }
}


var timeout;
function debounce(func, wait) {
		
		return function(func, wait) {
				if (timeout) clearTimeout(timeout);
				console.log("debounce!");
				timeout = setTimeout(function(){
						func();
				}, wait);
		};
}
var debouncedLcd = debounce(function(){
		Bangle.setLCDBrightness(0);
}, 3000);

/////////////////////////////////////
// NO BTN1 + CUSTOM INTERACTIONS


Bangle.setUI({
		mode : "custom",
		drag : function(e) {
				throttle(function(){
						if (e.dy < 0) {
								increment(1);
						} else if (e.dy > 0) {
								increment(-1);
						}
				}, 400);
		},
		btn : function(n) {
				//Bangle.buzz(1000, 1);
				//console.log("TOUCH", button);
				Bangle.setLCDBrightness(1);
				debouncedLcd();
		},
});

//Bangle.on('tap', function(data) { 
//  console.log(122, data);
//});

// TOUCH BTN
Bangle.on('touch', function(button, xy) { 
		//Bangle.buzz(1000, 1);
		//console.log("TOUCH", button);
		ontouch();
});


////////////////
// selection mode > 
// scroll choose mode > tap > scroll time1 > tap > scroll time2 > tap
// to disable 
var modes = ["countdown", "alarm", ""];

function increment(dir) {
		debouncedLcd();
		// 0 => MODE SELECTION
		if (!selected.mode) {
				if (
						curr.mode + dir < modes.length && 
								curr.mode + dir >= 0
				) curr.mode = curr.mode + dir;
		}
		
		// 1 => ALARM
		else if (selected.mode === 1) {
				if (!selected.alarm_hour) {
						if (
								curr.alarm_hour + dir < 23 && 
										curr.alarm_hour + dir >= 0
						) curr.alarm_hour = curr.alarm_hour + dir;
				}
				else if (!selected.alarm_min) {
						if (
								curr.alarm_min + dir < 60 && 
										curr.alarm_min + dir >= 0
						) curr.alarm_min = curr.alarm_min + (dir*5);
				}
		}
		
		// 2 => COUNTDOWN
		else if (selected.mode === 2) {
				if (!selected.countdown) {
						if (
								curr.countdown + dir < 200 && 
										curr.countdown + dir >= 0
						) curr.countdown = curr.countdown + (dir*5);
				}
		}
		
		
		//Bangle.buzz(100, 0);
		var log = {dir:dir, selected:selected, curr:curr};
		redraw();
		console.log("SCROLL", log );
}
function ontouch () {
		debouncedLcd();
		// 0 => MODE SELECTION
		if (!selected.mode) {
				selected.mode = curr.mode;
				cleanSelected();
		}
		
		// 1 => ALARM
		else if (selected.mode === 1 && !selected.alarm_hour) selected.alarm_hour = curr.alarm_hour;
		else if (selected.mode === 1 && selected.alarm_hour && !selected.alarm_min) selected.alarm_min = curr.alarm_min;
		
		
		// 2 => COUNTDOWN
		else if (selected.mode === 2 && !selected.countdown) {
				selected.countdown = curr.countdown;
				selected.countdown_timestamp = new Date().getTime() + curr.countdown * 60 * 1000;
		}
		
		// 0 => MODE SELECTION RESET
		else if (selected.mode) selected.mode = null;
		
		var log = {selected:selected, curr:curr};
		
		console.log("TOUCH", log );
		redraw();
}
function cleanSelected () {
		selected.alarm_hour = null;
		selected.alarm_min = null;
		selected.countdown = null;
		selected.countdown_timestamp = null;
} 
var selected = {
		mode: null,
		alarm_hour: null,
		alarm_min: null,
		countdown: null,
		countdown_timestamp: null
};
var curr = {
		mode: 0,
		alarm_hour: 0,
		alarm_min: 0,
		countdown: 0
};

//////////
// DISPLAY

function getTimerTime() {
    var modeStatus = curr.mode === selected.mode ? "" : ">";
    var header = modeStatus+curr.mode+" ";
		if (!curr.mode) {
				return "";
		} else if (curr.mode === 1){
        var hStatus = selected.mode && !selected.alarm_hour && !selected.alarm_min ? ">" : "";
        var mStatus = selected.mode && selected.alarm_hour && !selected.alarm_min ? ">" : "";
        return header+hStatus+curr.alarm_hour + ":"+mStatus+ curr.alarm_min;
		} else if (curr.mode === 2){
        return header+curr.countdown + "m";
		}
}
function drawTimer() {
    console.log("DRAW TIMER");
		g.setFont("8x12", 2);
		var t = 97;
		var l = 105;
		var time = getTimerTime();
		if (time || timer_time !== 0) g.drawString(time, l+5, t+0);
		if (time && timer_time === 0) g.drawImage(getClockBg(), l-20, t+2, { scale: 1 });
}


function redraw() {
		g.reset();
		g.clear();
		draw();
}


// Load widgets, but don't show them
Bangle.loadWidgets();

// DISABLE CLICK TO MENU
//Bangle.setUI("clock");

// POWER SPARING
// 0.52mA - around 30 days if left like this
//Bangle.accelWr(0x18,0x0A);
Bangle.accelWr(0x18,0b11101100);
// 0.7mA lower poll frequency (this handles watchdog so must be run at some point)
Bangle.setPollInterval(1000); 
// force LCD off
//Bangle.setLCDPower(0); 
Bangle.setLCDBrightness(0); 
// force lower Bluetooth connection speed
NRF.setConnectionInterval(100); 

redraw();
