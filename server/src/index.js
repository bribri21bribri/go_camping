const express = require("express");
const fs = require('fs');
const mysql = require('mysql')
const cors = require('cors');

const db = mysql.createConnection({
  host:'localhost',
  user:'bri',
  password:'admin',
  database:'camp_test'
})

db.connect((err) => {
  if(err){
    console.log(err)
      // throw err;
  }
  console.log('MySql Connected...');
});


const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://192.168.27.11:3000', undefined, 'http://localhost:3000'];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        console.log('origin: '+origin);
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({
    success: true
  });
});

//Routers
app.get('/getRandomCoupon', (req, res) => {
  let sql = 'SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id ORDER BY RAND() LIMIT 1';
  let query = db.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.json(results)
  });
});

app.listen(3001, () => {
  console.log("server running");
});
