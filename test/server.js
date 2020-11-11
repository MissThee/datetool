const express = require('express')
const path = require('path')
const open = require("open");
let port = 3000
let app = express();
app.use(express.static(path.join(__dirname, '../')));
app.listen(port, () => {
    let url='http://localhost:' + port + '/test';
    console.log(url)
    open(url)
});