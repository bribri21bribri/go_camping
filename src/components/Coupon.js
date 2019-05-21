import React, { Component } from 'react'
import './Coupon.css'
function Coupon (props){
  
    // console.log(props.coupon_data)
    return (
      
      <div className=' flex-column d-flex flex-md-row'>
      
            <>
            <div className="coupon mb-2">
              <div className="coupon_img_wrap   col-lg-4">
                <img src={props.coupon_data?'assets/img/'+props.coupon_data.camp_img:''} alt=""/>
              </div>
              <div className="coupon_info  col-lg-8">
              <div className="coupon_info_main" >
                  <ul className="d-flex">
                    <li className="fw-bold fs-24">{props.coupon_data?props.coupon_data.coupon_name:''}</li> 
                    <li className="fs-20"><i className="far fa-clock"></i>{props.coupon_data?props.coupon_data.coupon_expire:''}</li>
                    <li className="fw-bold fs-24">{props.coupon_data?props.coupon_data.camp_name:''}</li>
                    <li className="fs-20">{props.coupon_data?props.coupon_data.discription:''}</li>
                    <li className="campsite_link"><a className="fs-20 fw-medium" href="">前往相關營地</a></li>
                  </ul>
                </div>
                <div className="coupon_info_sec">
                  <span className="discount">85折</span>
                  <button className="get_coupon_btn forest fs-20 fw-bold">我要領取</button>
                </div>
              </div>
            </div>
            </>
        
      </div>
    
    )
  }

export default Coupon

