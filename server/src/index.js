const express = require("express");
const fs = require('fs');
const mysql = require('mysql')
const cors = require('cors');
const session = require('express-session');


const app = express();

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
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'secret',
  cookie: {
      maxAge: 3*60*60*1000
  }
}));
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


//Routers


// app.use('/users',require('./routes/users'))
// app.use('/marketing',require('./routes/marketing'))


app.get("/", (req, res) => {
  res.json({
    success: true
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


app.get('/getcoupons/:page/:keyword?', (req, res) => {
  //TODO: 過濾已過期coupon
  let results={coupons:[]}
  let start = (req.params.page-1)*10
  let perPage = 10
  let sql = "SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id  LIMIT "+start+" , "+perPage;
  sql = req.params.keyword? "SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id "+"WHERE coupon_name LIKE '%"+req.params.keyword+"%' OR camp_name LIKE '%"+req.params.keyword+"%'"+" LIMIT "+start+" , "+perPage:"SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id  LIMIT "+start+" , "+perPage;

  
  
  let query = db.query(sql, (err, coupons) => {
      if(err) throw err;
      
      results.coupons=coupons
      // console.log(coupons)
      res.json(results)
  });
});

app.get('/getcouponscount/:keyword?', (req, res) => {
  //TODO: 過濾已過期coupon
  let results={totalCount:0}
  let sql = "SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id";
  sql = req.params.keyword? "SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id "+"WHERE coupon_name LIKE '%"+req.params.keyword+"%' OR camp_name LIKE '%"+req.params.keyword+"%'":"SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id  ";

  
  
  let query = db.query(sql, (err, totalCount) => {
      if(err) throw err;
      
      results.totalCount=totalCount.length
      res.json(results)
  });
});
//測試用
app.post('/login',(req,res)=>{
  const {account} = req.body
  console.log(account)
  let sql = 'SELECT * FROM member_list'
  let query = db.query(sql,(err,members)=>{
    if(err) throw err
    const user = members.find(member=>member.mem_account===account)
    if(user){
      req.session.regenerate(function(err) {
        if(err){
        return res.json({ret_code: 2, ret_msg: '登入失敗'});        
        }
        req.session.user  =  user
        res.json({ret_code: 0, ret_msg: '登入成功',session:req.session});              
        });
        }else{
        res.json({ret_code: 1, ret_msg: '賬號或密碼錯誤'});
        }  
        
  })

})
//測試用END

app.get('/getcouponrecords', (req, res) => {
  let results={
    is_login:false,
    records:[],
  }
  if(req.session.user){
    let mem_account = req.session.user.mem_account
    let sql = "SELECT * FROM coupon_gain WHERE mem_account = '"+mem_account+"'"
    // console.log(sql)
    let query = db.query(sql, (err, records) => {
        if(err) throw err;
        results.records = records
        results.is_login = true
        // console.log(results)
        res.json(results)
    });
    // console.log(query)
    }else{
      res.json(results)
    }
});

app.post('/obtaincoupon',(req,res)=>{
  let results={
    is_login:false,
    records:[],
  }
  if(req.session.user){
    let mem_account = req.session.user.mem_account
    // let sql = "INSERT INTO `coupon_gain`(`coupon_genre_id`,`mem_account`) VALUES(?,?)"

    let code_length = 6
    let rand_str = ""
    let str = "abcdefghijklmnopqrstuvwxyz0123456789"
    let str_length = str.length
    for(let i =0; i< code_length;i++){
      rand_str+=str.charAt(Math.floor(Math.random()*str_length))
    }

    let check_code = async(rand_str)=>{
      let records = await db.queryAsync("SELECT * FROM coupon_gain")
      console.log(records)
      return 'a'
    }

    
    
  //   let query = db.query("SELECT * FROM coupon_gain", (err, records) => {
  //     if(err) throw err;
      
  //     records.forEach(record => {
        
  //     });
      
  // });
    
    
    
    }else{
      res.json(results)
    }
})

app.listen(3001, () => {
  console.log("server running");
});
