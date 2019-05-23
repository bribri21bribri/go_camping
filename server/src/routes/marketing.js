const express = require('express')
const mysql = require('mysql')
const session = require('express-session')

const app = express();
const db = mysql.createConnection({
  host:'localhost',
  user:'bri',
  password:'admin',
  database:'camp_test'
})



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let router = express.Router()



module.exports = router