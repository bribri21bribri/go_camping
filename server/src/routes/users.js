const express = require('express')
const mysql = require('mysql')
// const session = require('express-session')



const db = mysql.createConnection({
  host:'localhost',
  user:'bri',
  password:'admin',
  database:'camp_test'
})


const router = express.Router()
// router.use(express.urlencoded({ extended: false }));
// router.use(express.json());
// router.use(session({
//   saveUninitialized: false,
//   resave: false,
//   secret: 'sdgdsf ;ldkfg;ld',
//   cookie: {
//       maxAge: 600000
//   }
// }));


//login






module.exports = router

