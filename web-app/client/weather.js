console.log("hello world weather");
const getWeather = (location, apikey) => {
		// get coords
		fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`)
				.then(response => response.json())
				.then(data => {
						console.log(data.coord)
						const lat = data.coord.lat
						const lon = data.coord.lon
						// get full data
						fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=c9faf631b1c838fa4d4c0012498e2730&units=metric`)
								.then(response => response.json())
								.then(data => {
										console.log(data);
										let res = []
										for(let i = 0; i < data.daily.length; i++) {
												const d = data.daily[i]
												console.log(d, d.temp);
												const temp = Math.round(d.temp.day)
												const weatherCode = getWeatherCode(d.weather[0].icon)
												res.push([temp, weatherCode])
										}
										console.log(res);
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

		const codes = ["", "sun", "cloud", "rain", "thunder", "snow"]
		let code = codes.indexOf(nameWeather)
		console.log(nameIcon, nb, nameWeather, code);

    return code;
}

getWeather("paris, france", "c9faf631b1c838fa4d4c0012498e2730")
