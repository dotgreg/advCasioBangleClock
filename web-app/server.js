const express = require('express')
var fs = require('fs');
var path = require('path');
const app = express()
const port = process.env.PORT || 5005;
app.use('/', express.static('./client'))
app.listen(port, () => {
    console.log("Example app listening at http://localhost", port)
})
