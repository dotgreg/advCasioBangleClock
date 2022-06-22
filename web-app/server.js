const express = require('express')
// http://localhost:5000/api?action=mini&nb=5&lat=48&lon=2.3
var fs = require('fs');
var path = require('path');
const app = express()
const port = process.env.PORT || 5005;

// app.get('/', function(req, res) {
// 		res.sendFile(path.join(__dirname, './client/index.html'));
// });
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
