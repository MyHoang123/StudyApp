const path = require('path')
const express = require('express')
const apiroute = require('./routes/apiindex')
const db = require('./configs/connect')
// connect database
db.conn;
// 
const app = express()
const port = 8080;

app.use(express.urlencoded())
app.use(express.json())
// // apiRoutes
apiroute(app)
// Routes
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})