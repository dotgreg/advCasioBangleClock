const saveText = document.getElementById("saveTextBtn")
const selectText = document.getElementById("selectText")
const textarea = document.getElementById("tasks")
const locationInput = document.getElementById("location")
const apiKeyInput = document.getElementById("apikey")
const logsDiv = document.getElementById("logs")
const log = (str) => {
		const time = new Date().getHours() + "h" + new Date().getMinutes() + ":" + new Date().getSeconds()
		str = time + " => " + str
		logsDiv.innerHTML = " - " + str + "<br/>" + logsDiv.innerHTML
		console.log("[LOG] =>", str);
}

/////////////////////////////////////////////
// SYNC TO BANGLE
//
const syncToBangle = (fileName, jsonObj) => {
		if (jsonObj.tasks) {
				// chunk it in arr of 11 chars 
				jsonObj.tasks = jsonObj.tasks.match(/.{1,11}/g).join("\n")
		}
		const content = JSON.stringify(jsonObj)
		log(`starting syncing process2`);
		setTimeout(function() {
				// log(`writing2 "${content}" to ${fileName}`);
				log(`RAM : uploading app with data => "${content}" `);
				// Puck.eval(`require("Storage").writeJSON("${fileName}", ${content})`,function(x) {
				// 		if (x === true) log("BANGLE => Writing success!")
				// 		else log(x);
				// })
				// Puck.eval(`g.clear();g.setColor(255, 255, 0);g.fillRect(0, 0, g.getWidth(), g.getHeight());")`,function(x) {
				const exec = (cmd) => {
						console.log("EXEC => ", cmd);
						Puck.write(`${cmd}\n`,function(x) {
								if (x === true) log("BANGLE => [OK] : write")
								else log(x);
						})
				}
				const rmJump = (str) => {
						return str.replaceAll('\n','').replaceAll('\t','');
				}
				const app = rmJump(window.bangle_app_flash);
				const app2 = window.bangle_app_flash;
				const header = window.bangle_app_flash_header;
				const simple = window.bangle_app_flash_simple;
				const final = `${header}${app}\n\n;`

				const dataStr = `var dataJsonInt = ${content};`
				// WORKING
				exec(`${header}${dataStr}${app2}\n\n;`)
		})
}


const getFromLs = () => {
		textarea.value = localStorage.getItem('tasks');
		locationInput.value = localStorage.getItem('location');
		apiKeyInput.value = localStorage.getItem('apikey');
}
const setLs = () => {
		localStorage.setItem('tasks', textarea.value);
		localStorage.setItem('location', locationInput.value);
		localStorage.setItem('apikey', apiKeyInput.value);
}
const onInputChange = () => {setLs()}
getFromLs()


const toUpload = {
		"tasks":"",
		"weather":[[12,0], [14,1], [22,2], [33,3]]
}

const mainLogic = () => {
		toUpload.tasks = textarea.value
		getWeather(locationInput.value, apiKeyInput.value, arr => {
				toUpload.weather = arr
				log(`object to upload to bangle: ${JSON.stringify(toUpload)}`)
				syncToBangle("advcasio.data.json", toUpload)
		})
}
document.getElementById("btnConnect").addEventListener("click", mainLogic);

/////////////////////////////////////////////
// SAVE TEXT SYSTEM
//

let baseOptionsText

// if click on save, prompt for name and add it to ls
const getLsTexts = () => {
		let db = localStorage.getItem("textsSaved") 
		db = db ? JSON.parse(db) : []
		return db
}
const saveTextToLs = () => {
		let db = getLsTexts()
		const id = prompt("which name?")
		db.push({id, text: textarea.value})

		// console.log(db);
		localStorage.setItem("textsSaved", JSON.stringify(db))

		reloadTextOptionsFromLs()
}

function removeOptions() {
		var i, L = selectText.options.length - 1;
		for(i = L; i >= 0; i--) {
				selectText.remove(i);
		}
}

const removeFirstLineJump = (arr) => {
		// console.log(1, arr[0].text, );
		for(i = 0; i < arr.length; i++) {
				if (arr[0].text[0] === "\n") arr[i].text = arr[i].text.substring(1);
		}
		// console.log(2, arr[0].text);
		return arr
}

const getOptions = () => {
		return [
				{id:"-- saved texts --", text:""},
				...getLsTexts(),
				...removeFirstLineJump(baseOptionsText)
		]
}
// reload select list 
const reloadTextOptionsFromLs = () => {
		removeOptions();
		const optionsText = getOptions()
		for(var i = 0; i < optionsText.length; i++) {
				var o = document.createElement("option");
				o.value = optionsText[i].id
				o.text = optionsText[i].id
				selectText.add(o, null);
		}
}
setTimeout(() => {
		reloadTextOptionsFromLs()
})
// on select list option, fill textarea value
const onTextSelect = () => {
		const optionsText = getOptions()
		for(var i = 0; i < optionsText.length; i++) {
				if (optionsText[i].id === selectText.value) {
						textarea.value = optionsText[i].text;
				}
		}
		setTimeout(() => {
				console.log('lsss');
				setLs()
		})
}

/////////////////////////////////////////////
// WEATHER
//
const getWeather = (location, apikey, cb) => {
		// get coords
		log(`Getting weather for ${location} using api key ${apikey}`);
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`)
				.then(response => response.json())
				.then(data => {
						if (!data.coord) 		log(`ERROR weather api: ${JSON.stringify(data)}`);
						
						const lat = data.coord.lat
						const lon = data.coord.lon
						log(`got weather coords from ${location} : ${lat} ${lon}`)
						// get full data
						fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=c9faf631b1c838fa4d4c0012498e2730&units=metric`)
								.then(response => response.json())
								.then(data => {
										if (!data.daily) 		log(`ERROR weather api: ${JSON.stringify(data)}`);
										let res = []
										for(let i = 0; i < data.daily.length; i++) {
												const d = data.daily[i]
												console.log(d);
												const temp = Math.round(d.temp.day)
												const weatherCode = getWeatherCode(d.weather[0].icon)
												const day = new Date(d.dt * 1000).getDate()
												// give the timestamp at 0am, not 13am
												const timestamp = (d.dt*1000)  - (1000*60*60*13) 
												const month = new Date(d.dt * 1000).getMonth() + 1
												res.push([temp, weatherCode, timestamp])
										}
										log(`got weather conditions ${JSON.stringify(res)}`)
										cb(res);
								});
				});
}

// sun, cloud, rain, thunder, snow
const getWeatherCode = (nameIcon) => {
		const equiv = {
				'01': 'sun',
				'02': 'cloud',
				'03': 'cloud',
				'04': 'cloud',
				'09': 'rain',
				'10': 'rain',
				'11': 'storm',
				'50': 'cloud',
				'13': 'snow',
		}
		const nb = nameIcon.substring(0, 2);
		const nameWeather = equiv[nb]

		const codes = ["sun", "cloud", "rain", "thunder", "snow"]
		let code = codes.indexOf(nameWeather)
		return code;
}

///////////////////////////////
// ASCII DEFAULT 
baseOptionsText = [
		{id: "ascii-skull",
		 text:String.raw`
   ____
 ,'   Y'.
/        \
\ ()  () /
 '. /\\ ,'
8=| "" |=8
  'LLLU'
`},
		{id: "ascii-linux",
		 text:String.raw`
   /---\
   |o_o|
   |:_/|
  //   \\
 (|     |)
 /\_   _/\
 \__)=(__/

`},
		{id: "ascii-computer",
		 text:`
  .----.
  |C>_ |
 _|____|_
| ______-|
\`/.::::.\'
\`--------'
`},
		{id: "ascii-joystick",
		 text:String.raw`
   (  )
    ||
    ||
 __|""|__
/_________\
\_________/~~~.
`},
		{id: "ascii-camera",
		 text:String.raw`
     _
 _n_|_|_,_
|===.-.===|
|  ((_))  |
'==='-'==='
`},
		{id: "ascii-ballon",
		 text:String.raw`
   oooo
 OOOOOOOO
 OOOOOOOO
  oooooo
   \  /
    ##
`},
		{id: "ascii-gameboy",
		 text:String.raw`
 ______
|.----.|
||____||
| +  o'|
|   o  |
|_____/
`},
		{id: "ascii-mouse",
		 text:`
  b.
  88b
  888b.
  88888b
  888888b.
  8888P"
  P" \`8.
      \`8.
`},
		{id: "ascii-pattern-1",
		 text:String.raw`
\/\/\/\/\/
/\/\/\/\/\
\/\/\/\/\/
/\/\/\/\/\
\/\/\/\/\/
/\/\/\/\/\
\/\/\/\/\/
/\/\/\/\/\
`},
		{id: "ascii-pattern-2",
		 text:String.raw`
 X  X  X 
/ \/ \/ \
\ /\ /\ /
 X  X  X 
/ \/ \/ \
\ /\ /\ /
 X  X  X 
/ \/ \/ \
\ /\ /\ /
 X  X  X 
`},

]

