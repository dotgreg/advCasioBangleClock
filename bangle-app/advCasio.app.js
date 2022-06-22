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
		return require("heatshrink").decompress(atob("2GwgZC/AH4A/AH4ALgP///wAoN+AQMP//ggE4gF///8IN44B//+gEf//AgYHB/+B/4FDKAQADn/gh/AKAP4CIP4j/wBYIOB//xBYPxEYf8h4RBAoRBIEYICB4BBBCgPygAdCFgJNBII048hBFHAJBFBAQLDx4sBx4mBAoWAIJAmBFIP/x4aBLwP8aIJBJgP4NYIaBuI1BwE4DQRBCd4ZBG45BPAAI7CYopBPuB6BTwQyBII4CBIKkOg49CIJ8P//9EwIUCIJTFCIK1/HgQABHAJiCIJYsCIIbFCIIg+BIIQ+CTYXHDQX/IJI+EAAqDCJQhBEFgQLCn/jwE/IIpfBIISPBEYLdCFIX8IA5rDAAIgBZAYXCOgQaJAH4A/AH4A/AFcP/4Al4AWVwBBBv5B9/0Aj5AmIK4XYFPZB/IP5BigZB//BB/AoJB/+EAIP+AgEfIPv8gBB/8BBBIHJBEIAJB+/BABg5B94CDCgEPIPX+IAcAgKD/IPoABwBBBv5B8/hABgZA4II8fIPvgIIJA5II0HIP8An5B+gEPIHRBFv5B/gZA7IIgA9IP5B/IP5B/IP5BigAA/AH4ACfH740IP5B/IP5B/IP5B/ABH8gAACn4HB/AHDv5B/IP5Bm/0AHA0BDRkf+EHHjpB/IP5BZwEAj5B/IP5B/IP5B/IP5BIDRRB/IP5BuACH8gAACn4HB/AHDv5B/IP5Bm/0AHA0BDRkfA4uAJQRB/IP5BvwEAHAxB/IP5B/IP5B/IP5BCDRRB/IP5BuACH8gAACHAX4A4d/IDhB/IP5BaAFZB/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/IP5B/AD8AAH4A/AASYU8F/CqeBf85B/IP5BHvzeBIgn8gPH/lx/8fIOcH/kPBImPIPUBII9wn5B1F4yDD45B/uP4IP9x/5B1/kBBAcfIKEAh5BoFIhBQ4EALIgAM+E//l/IKMAgAUE8F//ED+JBK/wXBIKfgTCA4BTKZBFFiITBAAM/IM/wINK8BBAgaDGoILFIIeAbowAgILALIQcPANYnAAQX8WwICCIIv8v0H//+FiFwg8AuBBSAQJBS8AICwBEBFhxWBgfwIM4LDgBBQYqhWBNwZBQF4hBmCYI1FIgZBMDALFS8bFRuEHGoxBjQal/BRBBRFiBBt/EAgIrOACrFJcAkDCopBFboxBfvxBW/0HgCeJILzIFOIfwgAVGIIYLHIMF/4BB/IIK5E4ADCZwxBFAFBBB/BB/II8AAAP8AYREFIP5BX/EfILYANIKvAFKRBDCqZBU+ChHIO7jDAH4A/AFTXL/xAzgb9M4BBz+AMKgJBXvEf/0H/kP//8v/AU4d//EfNYP/+ILCn//HwJBCj+B/4UB46AB/BBZnAsBIIIFBgFwgHgh4jBuE4jkAg/gJoPgv0A/+AIInx/8DEALDCILfwn8fwBBBGoKJBIIaDBOISPDKwJBDgZBB8ZBB8EAn5BSXIK2DDQPjII44CgF+IKPHEATFGgKLCRKJBDQwJBBWwQdCv/4YoRNC8EOIIYUCgZNCEALXCOILFXg/j+JfBXgI1DYoaPBQYXxQYw1DLIWB/59BEYIIBAGY4CAA7RCAGjgBAA6SDAGhBI8BB3AH4AZA"));
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
    
    if (dirX === -1) {
      timer_time = 0;
      delete njson.timer;
      setDataJson(njson);
    }
    else if (dirX === 1) { 

      var njson = getDataJson();
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
function drawTimer() {
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
				res = storage.readJSON('advCasioData.json');
		} catch(ex) {
				return res;
		}
		return res;
}
function setDataJson(resJson){
		try {
				res = storage.writeJSON('advCasioData.json', resJson);
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
		//g.drawString("woop Process", 30, 20);
		//g.setFont("8x12");
		//g.drawString("ACTIVATE", 40, 35);
		if(dataJson && dataJson.weather) drawWeather(dataJson.weather);
		if(dataJson && dataJson.tasks) drawTasks(dataJson.tasks);
		

		g.setFontAlign(0,-1);
		g.setFont("8x12", 2);
		//g.drawString(getTemperature(), 155, 132);
		//g.drawString(Math.round(Bangle.getHealthStatus("last").bpm || 0), 109, 98);
		

		drawSteps();
		g.setFontAlign(-1,-1);
		drawClock();
		//drawAlarm();
		//drawRocket();
		drawBattery();
  
    
    drawTimer();

		// Hide widgets
  
		for (let wd of WIDGETS) {wd.draw=()=>{};wd.area="";}
}


                                        
// save batt power
var canTouch = true;
Bangle.on("lcdPower", (on) => {
    console.log(22, on, canTouch);
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
      console.log(33, locked, canTouch);
				//rocketInterval = setInterval(drawRocket, rocketSpeed);
		} else {
      canTouch = false;
      console.log(33, locked, canTouch);
    }
});


// Load widgets, but don't show them
Bangle.loadWidgets();
Bangle.setUI("clock");

g.reset();
g.clear();
draw();
