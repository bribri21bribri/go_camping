const express = require("express");
const fs = require('fs');
const mysql = require('mysql')
const cors = require('cors');
const session = require('express-session');


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
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'sdgdsf ;ldkfg;ld',
  cookie: {
      maxAge: 600000
  }
}));

//Routers
app.get("/", (req, res) => {
  res.json({
    success: true
  });
});
//login
app.get('/login',(req,res)=>{
  console.log(req.body)
})



app.get('/getCouponCount',(req,res)=>{
  let sql = 'SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id  '
  let query = db.query(sql, (err, coupons) => {
    if(err) throw err;
    let total = coupons.length
    // console.log(total)
    res.send({total:total})
});
})

app.get('/getCouponsPage/:page', (req, res) => {
  let results = {}
  let start = (req.params.page-1)*10
  let perPage = 10
  let sql = 'SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id LIMIT '+start+','+perPage;
  let query = db.query(sql, (err, coupons) => {
      if(err) throw err;
      res.json(coupons)
  });
});

app.get('/getCouponsLimit/:limit', (req, res) => {
  // console.log(req.params)
  let sql = 'SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id LIMIT '+req.params.limit;
  let query = db.query(sql, (err, results) => {
      if(err) throw err;
      // console.log(results);
      res.json(results)
  });
});


app.get('/getPromoUserCampCount',(req,res)=>{
  let sql = 'SELECT * FROM promo_apply as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id  WHERE promo_type = "promo_user"'
  let query = db.query(sql, (err, coupons) => {
    if(err) throw err;
    let total = coupons.length
    console.log(total)
    res.send({total:total})
});
})

app.get('/getPromoUserCamp/:page', (req, res) => {
  let results = {}
  let start = (req.params.page-1)*6
  let perPage = 6
  let sql = 'SELECT * FROM promo_apply as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id LEFT OUTER JOIN campsite_feature as q on o.camp_id = q.camp_id WHERE promo_type = "promo_user" LIMIT '+start+','+perPage;
  let query = db.query(sql, (err, campsites) => {
      if(err) throw err;
      console.log(campsites)
      res.json(campsites)
  });
});

app.get('/getPromoUser', (req, res) => {
  let sql = 'SELECT * FROM promo_user'
  let query = db.query(sql, (err, PromoUser) => {
      if(err) throw err;
      console.log(PromoUser)
      res.json(PromoUser)
  });
});

app.get('/searchcoupon/:keyword/:page', (req, res) => {
  console.log(req.params)
  let results={coupons:[],totalCount:0}
  let start = (req.params.page-1)*10
  let perPage = 10
  let sql = "SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id WHERE coupon_name LIKE '%"+req.params.keyword+"%' OR camp_name LIKE '%"+req.params.keyword+"%' LIMIT "+start+" , "+perPage;
  let query = db.query(sql, (err, coupons) => {
      if(err) throw err;
      
      results.coupons=coupons
      results.totalCount = coupons.length
      res.json(results)
  });
});

app.listen(3001, () => {
  console.log("server running");
});
