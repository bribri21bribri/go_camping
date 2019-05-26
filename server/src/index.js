const express = require("express");
const fs = require('fs');
const mysql = require('mysql')
const cors = require('cors');
const session = require('express-session');
const bluebird = require('bluebird')


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

bluebird.promisifyAll(db)


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
  let query = db.query(sql, (err, camps) => {
    if(err) throw err;
    let total = camps.length
    console.log(total)
    res.send({total:total,mem_level:req.session.user?req.session.user.memLevel_id:false})
});
})

app.get('/getPromoUserCamp/:page', (req, res) => {
  let results = {}
  let start = (req.params.page-1)*6
  let perPage = 6
  let sql = "SELECT p.promo_type, cl.camp_id, cl.camp_name, cl.city, cl.dist, cp.campPrice_weekday FROM promo_apply as p LEFT OUTER JOIN campsite_list as cl on p.camp_id = cl.camp_id LEFT OUTER JOIN campsite_price as cp on cp.camp_id = cl.camp_id WHERE promo_type = 'promo_user' LIMIT "+start+','+perPage;
  let query = db.query(sql, (err, campsites) => {
      if(err) throw err;
      console.log(campsites)
      res.json(campsites)
  });
});

app.get('/getPromoPriceCampCount',(req,res)=>{
  let sql = 'SELECT * FROM promo_apply as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id  WHERE promo_type = "promo_price"'
  let query = db.query(sql, (err, camps) => {
    if(err) throw err;
    let total = camps.length
    console.log(total)
    res.send({total:total,mem_level:req.session.user?req.session.user.memLevel_id:false})
});
})

app.get('/getPromoPriceCamp/:page', (req, res) => {
  let results = {}
  let start = (req.params.page-1)*6
  let perPage = 6
  let sql = "SELECT p.promo_type, cl.camp_id, cl.camp_name, cl.city, cl.dist, cp.campPrice_weekday FROM promo_apply as p LEFT OUTER JOIN campsite_list as cl on p.camp_id = cl.camp_id LEFT OUTER JOIN campsite_price as cp on cp.camp_id = cl.camp_id WHERE promo_type = 'promo_price' LIMIT "+start+','+perPage;
  let query = db.query(sql, (err, campsites) => {
      if(err) throw err;
      console.log(campsites)
      res.json(campsites)
  });
});

app.get('/getCampsiteFeature',(req,res)=>{
  
  let sql = "SELECT cf.camp_id,cf.campFeature_name FROM campsite_feature as cf"
  let query = db.query(sql,(err,camp_features)=>{
    if(err) throw err

    res.json(camp_features)
  })
})

app.get('/getCampsiteImage',(req,res)=>{
  
  let sql = "SELECT cp.camp_id, cp.camp_image FROM campsite_image as cp"
  let query = db.query(sql,(err,camp_images)=>{
    if(err) throw err

    res.json(camp_images)
  })
})

app.get('/getPromoUser', (req, res) => {
  let sql = 'SELECT * FROM promo_user'
  let query = db.query(sql, (err, PromoUser) => {
      if(err) throw err;
      console.log(PromoUser)
      res.json(PromoUser)
  });
});

app.get('/getPromoPrice', (req, res) => {
  let sql = 'SELECT * FROM promo_price'
  let query = db.query(sql, (err, PromoPrice) => {
      if(err) throw err;
      console.log(PromoPrice)
      res.json(PromoPrice)
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
  // console.log(req.body)
  if(req.body.mem_account){
    // let mem_account = req.session.user.mem_account
    // let sql = "INSERT INTO `coupon_gain`(`coupon_genre_id`,`mem_account`) VALUES(?,?)"
    // let code_length = 6
    // let rand_str = ""
    // let str = "abcdefghijklmnopqrstuvwxyz0123456789"
    // let str_length = str.length
    // for(let i =0; i< code_length;i++){
    //   rand_str+=str.charAt(Math.floor(Math.random()*str_length))
    // }
    let mem_account = req.body.mem_account
    let coupon_genre = req.body.coupon_genre
    

    db.beginTransaction(function(err) {
      if (err) { throw err; }
      db.query("SET @update_id := 0", function (error, results, fields) {
        if (error) {
          return db.rollback(function() {
            throw error;
          });
        }
     
        
     
        db.query("UPDATE `coupon_gain` SET `coupon_genre_id`="+coupon_genre+", `mem_account`='"+mem_account+"',gain_record_id = (SELECT @update_id := gain_record_id) WHERE mem_account='' LIMIT 1", function (error, results, fields) {
          if (error) {
            return db.rollback(function() {
              throw error;
            });
          }
          
          db.query("SELECT cg.coupon_code FROM coupon_gain as cg WHERE gain_record_id = @update_id", function (error, results, fields) {
            if (error) {
              return db.rollback(function() {
                throw error;
              });
            }
            db.commit(function(err) {
              if (err) {
                return db.rollback(function() {
                  throw err;
                });
              }
              res.json(results)
            });
          });
        });
      });
    });

    }else{
      res.json(results)
    }
})

app.listen(3001, () => {
  console.log("server running");
});
