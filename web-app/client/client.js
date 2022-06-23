console.log("woop");
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
		log(`starting syncing process`);
		setTimeout(function() {
				log(`writing "${content}" to ${fileName}`);
				Puck.eval(`require("Storage").writeJSON("${fileName}", ${content})`,function(x) {
						if (x === true) log("BANGLE => Writing success!")
						else log(x);
				})
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
				log(`FINAL OBJ TO UPLOAD: ${JSON.stringify(toUpload)}`)
				syncToBangle("advCasioData.json", toUpload)
		})
}
document.getElementById("btnConnect").addEventListener("click", mainLogic);
// document.getElementById("tasks").
// lets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchy

/////////////////////////////////////////////
// WEATHER
//
const getWeather = (location, apikey, cb) => {
		// get coords
		log(`Getting weather for ${location} using api key ${apiKey}`);
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

