import React from 'react';
import Carousel from '../../components/Carousel'
import '../../components/marketing.css'
import '../../components/Default.css'

import Coupon from '../../components/Coupon'

function Marketing(){
    return(
        <> 
         <Carousel /> 
         <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h5>搶優惠</h5>
          <div>
            <ul>
              <li><h6>優惠專區</h6></li>
              <li>user</li>
              <li>camptype</li>
              <li>price</li>
            </ul>
            <ul>
              <li><h6>優惠券</h6></li>
              <li>優惠券搜尋</li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <nav className="bread_crumb mt-1 mb-3">
            <ul className="d-flex">
              <li>
                <a><i className="fas fa-home"></i></a>
              </li>
              <li>
                <a>搶優惠</a>
              </li>
              <li>
                <a>優惠專區</a>
              </li>
              <li>
                <a>會員優惠</a>
              </li>
            </ul>
          </nav>
          
        <section id="promo_item_list">
            <h4 className="grass fs-32">優惠券</h4>
            <Coupon /> 
            <Coupon /> 
            <Coupon /> 
        </section>
            </div>
        </div>
        </div>
        </>
    )
  }
  export default Marketing;