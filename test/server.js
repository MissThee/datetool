const express = require('express')
const path = require('path')
let port=3000
let app=express();
app.use(express.static(path.join(__dirname,'../')));
app.listen(port,()=>{
    console.log('test http://localhost:'+port+'/test')
});