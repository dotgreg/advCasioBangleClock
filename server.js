const express = require('express')
// http://localhost:5000/api?action=mini&nb=5&lat=48&lon=2.3
var fs = require('fs');
var path = require('path');
const app = express()
const port = process.env.PORT || 5005;

// app.get('/', function(req, res) {
// 		res.sendFile(path.join(__dirname, './client/index.html'));
// });
getLocationCoords("Paris, France")
app.use('/', express.static('./client'))
app.get('/api', (req, res) => {
    const q = {
        token: req.query.token,
        action: req.query.action,
        nb: req.query.nb,
        lat: req.query.lat,
        lon: req.query.lon,
        args: req.query.args
    }
})
app.listen(port, () => {
    console.log("Example app listening at http://localhost", port)
})









/////////////////////////////////////////
// WEATHER RELATED

// sun, cloud, rain, thunder, snow
const getWeatherCode = (nameIcon) => {
    const equiv = {
        '01': 'sun',
        '02': 'cloud',
        '03': 'cloud',
        '04': 'cloud',
        '09': 'water',
        '10': 'water',
        '11': 'storm',
        '50': 'cloud',
        '13': 'snow',
    }
    const nb = nameIcon.substring(0, 2);
    const nameWeather = equiv[nb]

		const codes = ["", "sun", "cloud", "rain", "thunder", "snow"]
		let code = codes.indexOf(nameWeather)

    return code;
}


// const url = `http://api.openweathermap.org/data/2.5/onecall?q={location}&appid=c9faf631b1c838fa4d4c0012498e2730&units=metric`;

const fetchData = (url, onData) => {
    const http = require('http')
    http.get(url, (hres) => {
        let data = '';
        hres.on('data', (chunk) => {
            data += chunk;
        });
        hres.on('end', () => {
            const dataObj = JSON.parse(data);
            onData(dataObj);
        })
    }).on('error', (err) => {
        console.log(err.message);
    })
}

const getLocationCoords = (location, onData) => {
		fetchData(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c9faf631b1c838fa4d4c0012498e2730&units=metric`, data => {
				console.log(2, data)
		})
}

const getWeatherData = (location, onData) => {
    const http = require('http')
    const url = `http://api.openweathermap.org/data/2.5/onecall?q={location}&appid=c9faf631b1c838fa4d4c0012498e2730&units=metric`;
    http.get(url, (hres) => {
        let data = '';
        hres.on('data', (chunk) => {
            data += chunk;
        });
        hres.on('end', () => {
            const dataObj = JSON.parse(data);
            // console.log(dataObj);
            onData(dataObj);
        })
    }).on('error', (err) => {
        console.log(err.message);
    })

}
