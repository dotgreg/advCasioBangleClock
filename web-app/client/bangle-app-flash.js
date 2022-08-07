window.bangle_app_flash = `var opt = {
  dev: false,
};

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
		// DATA READING
		//
        if (opt.dev) var dataJsonInt = {"tasks":"", "weather":[]};
				function getDataJson(){
						var res = {"tasks":"", "weather":[]};
						res = dataJsonInt;
						return res;
				}

				function setDataJson(resJson){
						dataJsonInt = resJson;
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
								j++;
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
  
        updateTimedLogic();
      
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
function throttle(func1, timeFrame) {
    var now = Date.now();
    if (now - lastTime >= timeFrame) {
        func1();
        lastTime = now;
    }
}


var timeout;
function debounce(func2, wait) {
		
		return function() {
				if (timeout) clearTimeout(timeout);
				//if (opt.dev) console.log("debounce!");
				timeout = setTimeout(function(){
						func2();
				}, wait);
		};
}
var debouncedLcd = debounce(function(){
		Bangle.setLCDBrightness(0);
}, 8000);

/////////////////////////////////////
// NO BTN1 + CUSTOM INTERACTIONS

var accumY = 0;
var treshY = 20;

Bangle.setUI({
		mode : "custom",
		drag : function(e) {
        accumY = accumY+e.dy;
        if (Math.abs(accumY) > treshY) {
          var dir = accumY > 0 ? -1 : 1;
          accumY = 0;
          increment(dir);
        }
		},
		btn : function(n) {
				Bangle.setLCDBrightness(1);
				debouncedLcd();
        //if (one
        onBtn();
		},
});

// TOUCH BTN
Bangle.on('touch', function(button, xy) { 
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
		if (selected.mode === null) {
        cleanSelected();
				if (
						curr.mode + dir < modes.length && 
								curr.mode + dir >= 0
				) curr.mode = curr.mode + dir;
		}
		
		// 1 => ALARM
		else if (selected.mode === 1) {
				if (selected.alarm_hour === null) {
            curr.alarm_hour = curr.alarm_hour + dir;
            if (curr.alarm_hour >= 23) curr.alarm_hour = 0;
            if (curr.alarm_hour < 0) curr.alarm_hour = 23;
				}
				else if (selected.alarm_min === null) {
            curr.alarm_min = curr.alarm_min + (dir*5);
            if (curr.alarm_min >= 60) curr.alarm_min = 0;
            if (curr.alarm_min < 0) curr.alarm_min = 55;
				} else {
          selected.mode = null;
        }
		}
		
		// 2 => COUNTDOWN
		else if (selected.mode === 2) {
				if (selected.countdown === null) {
						if (
								curr.countdown + dir < 200 && 
										curr.countdown + dir >= 0
						) curr.countdown = curr.countdown + (dir*5);
				}
        else {
          selected.mode = null;
        }
		}
  

		var log = {dir:dir, selected:selected, curr:curr};
		forceRedraw();
		if (opt.dev) console.log("SCROLL", log );
}
function ontouch () {
		debouncedLcd();
		// 0 => MODE SELECTION
		if (selected.mode === null) {
				selected.mode = curr.mode;
				cleanSelected();
		}
		
		// 1 => ALARM
		else if (selected.mode === 1 && selected.alarm_hour === null) selected.alarm_hour = curr.alarm_hour;
		else if (selected.mode === 1 && selected.alarm_hour !== null && selected.alarm_min === null) { 
      selected.alarm_min = curr.alarm_min;
      // find the timestamp of the wakeup
      findAlarmTimestamp();
    }
		
		
		// 2 => COUNTDOWN
		else if (selected.mode === 2 && selected.countdown === null) {
				selected.countdown = curr.countdown;
				selected.countdown_timestamp = new Date().getTime() + curr.countdown * 60 * 1000;
		}
		
		// 0 => MODE SELECTION RESET
		else if (selected.mode !== null) {
      selected.mode = null;
    }
		
		var log = {selected:selected, curr:curr};
		
		if (opt.dev) console.log("TOUCH", log );
		forceRedraw();
}

function onBtn() {
  snoozeAlarm();
}

function cleanSelected () {
		selected.alarm_hour = null;
		selected.alarm_min = null;
    selected.alarm_timestamp = null;
		selected.countdown = null;
		selected.countdown_timestamp = null;
} 
var selected = {
		mode: null,
		alarm_hour: null,
		alarm_min: null,
    alarm_timestamp: null,
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
// COUNTDOWN LOGIC

function updateCountdown() {
  if (selected.mode !== 2 || selected.countdown_timestamp === null) return;
  var now = new Date().getTime();
  var diff = Math.round((selected.countdown_timestamp - now) / (1000 * 60));
  if (opt.dev) console.log("COUNTDOWN UPDATE", now, diff);
  if (diff > 0)  selected.countdown = diff ;
  else if (selected.countdown_timestamp !== null) {
      Bangle.buzz(1000, 1);
      if (opt.dev) console.log("COUNTDOWN > END!!@!");
      cleanSelected();
  } 
}

//////////
// ALARM LOGIC

var snoozeStatus = false;
function ringAlarm () {
  if (opt.dev) console.log("ALARM RING");
  var inter = setInterval(function() { 
    if (opt.dev) console.log("ALARM RING > buzz");
    if (snoozeStatus) clearInterval(inter);
    Bangle.buzz(500, 1); 
  }, 2000);
}

function snoozeAlarm() {
  if (!selected.alarm_timestamp) return;
  if (new Date().getTime() < selected.alarm_timestamp) return;
  selected.alarm_timestamp = selected.alarm_timestamp + (5 * 60 *1000);
  if (selected.alarm_min < 55) {
    selected.alarm_min = selected.alarm_min + 5;
  } else {
    selected.alarm_min = 0;
    if (selected.alarm_hour < 23) {
      selected.alarm_hour = selected.alarm_hour + 1;
    } else {
      selected.alarm_hour = 0;
    }
  }
  snoozeStatus = true;
  forceRedraw();
  if (opt.dev) console.log("ALARM SNOOZE", selected);
}

function updateAlarm() {
  if (selected.mode !== 1 || selected.alarm_hour === null || selected.alarm_min === null) return;
  
  var now = new Date().getTime();
  var diff = Math.round((selected.alarm_timestamp - now) / (1000 * 60));
  if (opt.dev) console.log("ALARM UPDATE", now, diff);
  if (diff > 0)  { 
    //selected.alarm = diff ;
  }
  else if (selected.alarm_timestamp !== null) {
      snoozeStatus = false;
      ringAlarm();
  } 
}

function findAlarmTimestamp () {
  var p = {
    cHour : new Date().getHours(),
    cMin : new Date().getMinutes(),
    aHour : selected.alarm_hour,
    aMin : selected.alarm_min,
    isNextDay : false
  };
      
  if (p.aHour >= p.cHour) p.isNextDay = false;
  else if (p.aHour === p.cHour && p.aMin >= p.cMin) p.isNextDay = false;
  else p.isNextDay = true;
  
  var tempDate = new Date();
  if (p.isNextDay) tempDate.setDate(tempDate.getDate() + 1);
  var t = tempDate;
  
  p.aDate = new Date(t.getFullYear(), t.getMonth(), t.getDate(), p.aHour, p.aMin);
  selected.alarm_timestamp = p.aDate.getTime();
  
  if (opt.dev) console.log("ALARM => findAlarmTimestamp", p, selected);
}

//////////
// DISPLAY

function getTimerTime() {
    var modeStatus = curr.mode === selected.mode ? "" : ">";
    var modeStr = curr.mode === 1 ? "A":"C";
    var header = modeStatus+modeStr+" ";
		if (!curr.mode) {
				return "";
		} else if (curr.mode === 1){
        var hStatus = selected.mode !== null && selected.alarm_hour === null && selected.alarm_min === null ? ">" : "";
        var mStatus = selected.mode !== null && selected.alarm_hour !== null && selected.alarm_min === null ? ">" : "";
        var hour = selected.alarm_hour === null ? curr.alarm_hour :  selected.alarm_hour;
        var min = selected.alarm_min === null ? curr.alarm_min :  selected.alarm_min;
        return header+hStatus+hour + ":"+mStatus+ min;
		} else if (curr.mode === 2){
        var countStatus = curr.countdown;
        if (selected.mode === 2 && selected.countdown === null) {
          countStatus = ">"+curr.countdown;
        } else if (selected.mode === 2 && selected.countdown !== null) {
          countStatus = ""+selected.countdown;
        }
        return header+countStatus + "m";
		}
}
function drawTimer() {
    //if (opt.dev) console.log("DRAW TIMER");
		g.setFont("8x12", 2);
		var t = 97;
		var l = 85;
		var time = getTimerTime();
		g.drawString(time, l+5, t+0);
}

function updateTimedLogic () {
  updateCountdown();
  updateAlarm();
}


function forceRedraw() {
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

forceRedraw();

`

window.bangle_app_flash_simple = `g.reset();g.clear();g.setColor(0, 255, 0);g.fillRect(0, 0, g.getWidth(), g.getHeight())`;


const cDate = () => { return Date.now() / 1000 }
window.bangle_app_flash_header = `\u0010reset();\n\u0010print()\n\u0010setTime(${cDate()});E.setTimeZone(2)\n\u0010Modules.addCached(\"Font7x11Numeric7Seg\",function(){exports.add=function(a){a.prototype.setFont7x11Numeric7Seg=function(){this.setFontCustom(atob(\"AAAAAAAAAAAAAAAEAIAQAgAAAAAIAHvQBgDAGAL3gAAAAAAAAAAHvAAA9CGEMIYQvAAAACEMIYQwhe8AB4AIAQAgBA94ADwIQwhhDCEDwAHvQhhDCGEIHgAAAgBACAEAHvAAe9CGEMIYQveAA8CEMIYQwhe8AAABjDGAAAA96EEIIQQge8AB7wIQQghBCB4AD3oAwBgDAEAAAAPAhBCCEEL3gAPehDCGEMIQAAAe9CCEEIIQAAAA\"),32,atob(\"BwAAAAAAAAAAAAAAAAcCAAcHBwcHBwcHBwcFAAAAAAAABwcHBwcH\"),11)}}});\n\u0010Modules.addCached(\"Font6x8\",function(){var a=atob(\"AAAAAPoAwADAAFhw2HDQAGSS/5JMAGCW+LzSDAxSolIMEsAAPEKBAIFCPABIMOAwSAAQEHwQEAABBgAQEBAQAAIAAwwwwAB8ipKifABA/gBChoqSYgCEkrLSjAAYKEj+CADkoqKinAA8UpKSDACAgI6wwABskpKSbABgkpKUeAAiAAEmABAoRAAoKCgoKABEKBAAQIqQYAA8WqW9RDgOOMg4DgD+kpKSbAB8goKCRAD+goJEOAD+kpKCAP6QkIAAfIKCklwA/hAQEP4A/gAMAgIC/AD+EChEggD+AgICAP5AIED+AP7AMAz+AHyCgoJ8AP6QkJBgAHyChoN8AP6QmJRiAGSSkpJMAICA/oCAAPwCAgL8AOAYBhjgAPAOMA7wAMYoECjGAMAgHiDAAI6SosIA/4EAwDAMAwCB/wBAgEAAAQEBAQEBEn6SggQABCoqHgD+IiIcABwiIhQAHCIi/gAcKioYACB+oIAAGCUlPgD+ICAeAL4AAQG+AP4IFCIA/AIAPiAeIB4APiAgHgAcIiIcAD8kJBgAGCQkPwA+ECAgABIqKiQAIPwiADwCAjwAIBgGGCAAOAYIBjgAIhQIFCIAIRkGGCAAJioyIgAQboEA5wCBbhAAQIDAQIAAPFqlpUI8\"),\u001b\nb=atob(\"BAIEBgYGBgIEBAYGAwUCBQYDBgYGBgYGBgYCAwQGBAUGBgYGBgUFBgYCBgYFBgYGBgYGBgYGBgYGBgUDBQMEBgYFBQUFBQUFBQIEBQMGBQUFBQUFBAUGBgYGBQQCBAYG\");exports.add=function(c){c.prototype.setFont6x8=function(){this.setFontCustom(a,32,b,8)}}});\n\u0010\u001b[2dModules.addCached(\"Font6x12\",function(){var a=atob(\"AAAAAAAAfkAAwAAAwAAAEQf8EQf8EQAAGIJEf+JEE4AAMMMQBgCMMMAAM4TEMkB8AEwAgAAAHwIIQEAAQEIIHwAAFQDgBADgFQBABAHwBABAACAMAABABABABAAAAEAAAcBgGAYAAAP4RESEP4EEIEf8AEMMQUQkPEIIREREO4DwEQIQf8eISESER4P4SESEB4YAQcTgcAO4REREO4PEQkQoPwCIAAACCMAABACgEQIIAACQCQCQCQIIEQCgBAAAMAQ0RAOAP4TkUUP0P8RARAP8f8REREO4P4QEQEIIf8QEIIHwf8REREQEf8RARAQAP4QEREJ4f8BABAf8QEf8QEAYAEQEf4f8CgEQYMf8AEAEAEf8MADAMAf8f8GABgf8P4QEQEP4f8RARAOAP4QEQEP6f8RQRIOEOIREREI4QAQAf8QAQAAAf4AEAEf4eABwAMBweAf8AYBgAYf8YMGwBAGwYMYAGAB8GAYAQcRkWEYEf8QEAAYAGABgAcQEf8AAIAQAgAQAIAACACACACgAwAAAAYCkCkB8f8CECEB4B4CECEBIB4CECEf8B4CUCUBwCAP8SAQAB4CFCFD+f8CACAB8CET8AEACABT+AAf8BQCIAEQEf8AED8CAD8CAB8D8CACAB8B4CECEB4D/CECEB4B4CECED/D8BACAAABICkCkAYCAP4CECED4AEAED8DAAwAMAwDAD4AEA4AED4CMBQAgBQCMD4AFAFD+CMCUCkDEBAO4QEQEf8AAQEQEO4BAYAwAYAwA\"),\u001b\nb=atob(\"BAIEBgYGBQMEBAUFAwUCBQQEBAQEBAQEBAQCAwUEBQQEBAQEBAQEBAQDBAQEBQQEBAQEBAQGBQUFBQQDBAMFBAMEBAQEBAQEBAMEBAMFBAQEBAQEBAQFBQUEBAQCBAQ=\");exports.add=function(c){c.prototype.setFont6x12=function(){this.setFontCustom(a,32,b,12)}}});\n\u0010\u001b[4dModules.addCached(\"Font8x12\",function(){var a=atob(\"AAAAAAAAAAfkAAwAAAwAAACQf8CQf8CQAAGIJEf+JEE4AAMMMQBgCMMMAAAYMkTEMkAYBkAAwAgAAAHwIIQEAAQEIIHwAABAFQDgBADgFQBABABAHwBABAAAACAMAABABABABABAAAAEAAAEAYAgDAEAYAAAP4QkRESEP4AAEEIEf8AEAAMMQUQUQkPEAAIIQEREREO4AABwCQEQIQf8AAeISESESER4AAH4KESESEB4AAYAQAQcTgcAAAO4REREREO4AAPAQkQkQoPwAACIAAACCMAABACgEQIIAACQCQCQCQCQAAIIEQCgBAAAMAQAQ0RAOAAAP4QETkUUUUP0AAP8RARARAP8AAf8REREREO4AAP4QEQEQEIIAAf8QEQEIIHwAAf8REREREQEAAf8RARARAQAAAP4QEQEREJ4AAf8BABABAf8AAQEf8QEAAAYAEQEf4QAAAf8BACgEQYMAAf8AEAEAEAEAAf8IAEACAEAIAf8AAf8EACABAf8AAP4QEQEQEP4AAf8RARARAOAAAP4QEQEQGP6AAf8RgRQRIOEAAOIREREREI4AAQAQAf8QAQAAAf4AEAEAEf4AAeABwAMBweAAAf8AIAQAgAQAIf8AAYMGwBAGwYMAAYAGAB8GAYAAAQMQ0REWEYEAAf8QEAAMACABgAQAMAAQEf8AAIAQAgAQAIAAAACACACACACAAgAwAAAAYCkCkCkB8AAf8CECECEB4AAB4CECECEBIAAB4CECECEf8AAB4CUCUCUBwAACAP8SAQAAAB4CFCFCFD+AAf8CACACAB8AACET8AEAAACABT+AAf8AgBQCIAEAAQEf8AEAAD8CACAD8CACAB8AAD8CACACAB8AAB4CECECEB4AAD/CECECEB4AAB4CECECED/AAD8BACACACAAABICkCkCkAYAACAP4CECEAAD4AEAEAED8AADAAwAMAwDAAAD4AEAEA4AEAED4AACMBQAgBQCMAAD4AFAFAFD+AACMCUCkDECEAABAO4QEQEAAf8AAQEQEO4BAAAYAgAQAQAIAwAAAAAAAAAAAAA\"),\u001b\nb=atob(\"BQIEBgYGBwMEBAcGAwYCBwYFBgYGBgYGBgYCAwUGBQYHBgYGBgYGBgYEBgYGCAYGBgYGBgYGBggGBgYDBgMGBgMGBgYGBgUGBgQEBgQIBgYGBgYGBQYGCAYGBgUCBQcF\");exports.add=function(c){c.prototype.setFont8x12=function(){this.setFontCustom(a,32,b,12)}}});\n\u0010\u001b[6d`
