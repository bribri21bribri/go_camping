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



app.get('/getCouponsLimit/:limit', (req, res) => {
  // console.log(req.params)
  let sql = 'SELECT * FROM coupon_genre as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id LIMIT '+req.params.limit;
  let query = db.query(sql, (err, results) => {
      if(err) throw err;
      // console.log(results);
      res.json(results)
  });
});


//"SELECT p.promo_type, cl.camp_id, cl.camp_name, cl.city, cl.dist, ct.camp_pricew, ct.camp_type FROM promo_apply as p LEFT OUTER JOIN campsite_list as cl on p.camp_id = cl.camp_id LEFT OUTER JOIN campsite_type as ct on ct.camp_id = cl.camp_id WHERE promo_type = 'promo_user' LIMIT "+start+','+perPage;

//SELECT AVG(`rating`) FROM `campsite_rating` WHERE camp_id=12

app.get('/getPromoUserCamp/:page', (req, res) => {
  let results = {}
  let start = (req.params.page-1)*6
  let perPage = 6
  let sql = "SELECT p.promo_type, cl.camp_id, cl.camp_name, cl.city, cl.dist, cr.rating_avg FROM promo_apply as p LEFT OUTER JOIN campsite_list as cl on p.camp_id = cl.camp_id LEFT OUTER JOIN (SELECT camp_id, AVG(`rating`) as rating_avg FROM campsite_rating GROUP BY camp_id) as cr on cl.camp_id = cr.camp_id WHERE promo_type = 'promo_user' LIMIT "+start+','+perPage;
  db.beginTransaction(function(err){
    if(err) {throw err}

    let query = db.query(sql, (err, campsites) => {
      if (err) {
        return db.rollback(function() {
          throw err;
        });
      }
      // console.log(campsites)
      results.campsites =campsites
      // console.log(campsites)
      let camp_ids = []

      for(let campsite of campsites){
        camp_ids.push(campsite.camp_id)
      }
      // console.log(camp_ids)


      sql = 'SELECT * FROM promo_apply as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id  WHERE promo_type = "promo_user"'
      query = db.query(sql, (err, camps) => {
        if (err) {
          return db.rollback(function() {
            throw err;
          });
        }
        let total = camps.length
        // console.log(total)
        results.total = total
        
        sql = "SELECT cp.camp_id, cp.camp_image FROM campsite_image as cp WHERE  "
        let index=1
        
        for(let camp_id of camp_ids){
          if(index!=camp_ids.length){
            sql+= ('camp_id = '+camp_id+ ' OR ')
          }else{
            sql+= ('camp_id = '+camp_id)
          }
          index++
        }
        query = db.query(sql,(err,camp_images)=>{
          if (err) {
            return db.rollback(function() {
              throw err;
            });
          }

          results.camp_images = camp_images

          // sql = "SELECT cf.camp_id,cf.campFeature_name FROM campsite_feature as cf"
          sql = "SELECT ct.camp_id,ct.camp_type, ct.camp_pricew, ct.camp_priceh FROM campsite_type as ct WHERE "
          index = 1
          for(let camp_id of camp_ids){
            if(index!=camp_ids.length){
              sql+= ('camp_id = '+camp_id+ ' OR ')
            }else{
              sql+= ('camp_id = '+camp_id)
            }
            index++
          }
          console.log(sql)
          query = db.query(sql,(err,camp_features)=>{
            if (err) {
              return db.rollback(function() {
                throw err;
              });
            }

            results.camp_features =camp_features

            sql = 'SELECT * FROM promo_user'
            query = db.query(sql, (err, promo_rules) => {
              if (err) {
                return db.rollback(function() {
                  throw err;
                });
              }
                // console.log(promo_rules)
                results.promo_rules = promo_rules

                db.commit(function(err) {
                  if (err) {
                    return db.rollback(function() {
                      throw err;
                    });
                  }
                  res.json(results)
                });
            });
          })

        })

    });
  });
  })
});








app.get('/getPromoPriceCamp/:page', (req, res) => {
  let results = {}
  let start = (req.params.page-1)*6
  let perPage = 6
  let sql = "SELECT p.promo_type, cl.camp_id, cl.camp_name, cl.city, cl.dist, cr.rating_avg FROM promo_apply as p LEFT OUTER JOIN campsite_list as cl on p.camp_id = cl.camp_id LEFT OUTER JOIN (SELECT camp_id, AVG(`rating`) as rating_avg FROM campsite_rating GROUP BY camp_id) as cr on cl.camp_id = cr.camp_id WHERE promo_type = 'promo_price' LIMIT "+start+','+perPage;
  db.beginTransaction(function(err){
    if(err) {throw err}
    console.log(sql)
    let query = db.query(sql, (err, campsites) => {
      if (err) {
        return db.rollback(function() {
          throw err;
        });
      }
      // console.log(campsites)
      results.campsites =campsites

      let camp_ids = []
      for(let campsite of campsites){
        camp_ids.push(campsite.camp_id)
      }


      sql = 'SELECT * FROM promo_apply as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id  WHERE promo_type = "promo_price"'
      query = db.query(sql, (err, camps) => {
        if (err) {
          return db.rollback(function() {
            throw err;
          });
        }
        let total = camps.length
        // console.log(total)
        results.total = total
        
        sql = "SELECT cp.camp_id, cp.camp_image FROM campsite_image as cp WHERE "
        let index=1
        
        for(let camp_id of camp_ids){
          if(index!=camp_ids.length){
            sql+= ('camp_id = '+camp_id+ ' OR ')
          }else{
            sql+= ('camp_id = '+camp_id)
          }
          index++
        }
        query = db.query(sql,(err,camp_images)=>{
          if (err) {
            return db.rollback(function() {
              throw err;
            });
          }

          results.camp_images = camp_images

          sql = "SELECT ct.camp_id,ct.camp_type, ct.camp_pricew, ct.camp_priceh FROM campsite_type as ct WHERE "
          index = 1
          for(let camp_id of camp_ids){
            if(index!=camp_ids.length){
              sql+= ('camp_id = '+camp_id+ ' OR ')
            }else{
              sql+= ('camp_id = '+camp_id)
            }
            index++
          }
          query = db.query(sql,(err,camp_features)=>{
            if (err) {
              return db.rollback(function() {
                throw err;
              });
            }

            results.camp_features =camp_features

            sql = 'SELECT * FROM promo_price'
            query = db.query(sql, (err, promo_rules) => {
              if (err) {
                return db.rollback(function() {
                  throw err;
                });
              }
                // console.log(promo_rules)
                results.promo_rules = promo_rules

                db.commit(function(err) {
                  if (err) {
                    return db.rollback(function() {
                      throw err;
                    });
                  }
                  res.json(results)
                });
            });
          })

        })
    });
  });
  })
});





app.get('/getPromoCamptypeCamp/:page', (req, res) => {
  let results = {}
  let start = (req.params.page-1)*6
  let perPage = 6
  let sql = "SELECT p.promo_type, cl.camp_id, cl.camp_name, cl.city, cl.dist, cr.rating_avg FROM promo_apply as p LEFT OUTER JOIN campsite_list as cl on p.camp_id = cl.camp_id LEFT OUTER JOIN (SELECT camp_id, AVG(`rating`) as rating_avg FROM campsite_rating GROUP BY camp_id) as cr on cl.camp_id = cr.camp_id WHERE promo_type = 'promo_campType' LIMIT "+start+','+perPage;
  db.beginTransaction(function(err){
    if(err) {throw err}

    let query = db.query(sql, (err, campsites) => {
      if (err) {
        return db.rollback(function() {
          throw err;
        });
      }
      // console.log(campsites)
      results.campsites =campsites

      let camp_ids = []

      for(let campsite of campsites){
        camp_ids.push(campsite.camp_id)
      }

      sql = 'SELECT * FROM promo_apply as o LEFT OUTER JOIN campsite_list as p on o.camp_id = p.camp_id  WHERE promo_type = "promo_campType"'
      query = db.query(sql, (err, camps) => {
        if (err) {
          return db.rollback(function() {
            throw err;
          });
        }
        let total = camps.length
        // console.log(total)
        results.total = total
        
        sql = "SELECT cp.camp_id, cp.camp_image FROM campsite_image as cp WHERE "
        let index=1
        
        for(let camp_id of camp_ids){
          if(index!=camp_ids.length){
            sql+= ('camp_id = '+camp_id+ ' OR ')
          }else{
            sql+= ('camp_id = '+camp_id)
          }
          index++
        }
        query = db.query(sql,(err,camp_images)=>{
          if (err) {
            return db.rollback(function() {
              throw err;
            });
          }

          results.camp_images = camp_images

          sql = "SELECT ct.camp_id,ct.camp_type, ct.camp_pricew, ct.camp_priceh FROM campsite_type as ct WHERE "
          index = 1
          for(let camp_id of camp_ids){
            if(index!=camp_ids.length){
              sql+= ('camp_id = '+camp_id+ ' OR ')
            }else{
              sql+= ('camp_id = '+camp_id)
            }
            index++
          }
          query = db.query(sql,(err,camp_features)=>{
            if (err) {
              return db.rollback(function() {
                throw err;
              });
            }

            results.camp_features =camp_features

            sql = 'SELECT * FROM promo_campType'
            query = db.query(sql, (err, promo_rules) => {
              if (err) {
                return db.rollback(function() {
                  throw err;
                });
              }
                // console.log(promo_rules)
                results.promo_rules = promo_rules

                db.commit(function(err) {
                  if (err) {
                    return db.rollback(function() {
                      throw err;
                    });
                  }
                  res.json(results)
                });
            });
          })

        })
    });
  });
  })
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

app.post('/getcouponrecords', (req, res) => {
  // console.log(req)
  let results={
    is_login:false,
    records:[],
  }
  if(req.body.account){
    let account = req.body.account
    let sql = "SELECT * FROM coupon_gain WHERE mem_account = '"+account+"'"
    console.log(sql)
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
          
          db.query("SELECT * FROM coupon_gain as cg WHERE gain_record_id = @update_id", function (error, results, fields) {
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
      //TODO:導向登入頁面
      res.redirect('');
    }
})

app.post('/insertcampliked', (req, res) => {
  results={
    success:false
  }
  if(req.body.account){
    let mem_account = req.body.account
    let camp_id = req.body.camp_id
    
    let sql = "INSERT INTO `campsite_liked` SET `camp_id`= "+camp_id+" , `account`= '"+mem_account+"' , `liked`=true"
    console.log(sql)
    let query = db.query(sql, (err, records) => {
        if(err) throw err;
        results.success = true
        res.json(results)
    });
    //TODO: 轉向燈入夜面
    }else{
      res.redirect('')
    }
});

app.post('/deletecampliked', (req, res) => {
  results={
    success:false
  }
  if(req.body.account){
    let mem_account = req.body.account
    let camp_id = req.body.camp_id
    
    let sql = "DELETE FROM `campsite_liked` WHERE `camp_id`= "+camp_id+" AND `account`= '"+mem_account+"' "
    console.log(sql)
    let query = db.query(sql, (err, records) => {
        if(err) throw err;
        results.success = true
        res.json(results)
    });
    //TODO: 轉向燈入夜面
    }else{
      res.redirect('')
    }
});

app.listen(3001, () => {
  console.log("server running");
});
