import React, { Component } from 'react'
import './PromoCampCard.css'

 class PromoCampCard extends Component {
  render() {
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="row" >

              <div className="col-md-6 camp_card" >
                <div className='campsite_img_wrap d-flex'>
                  <div className="img_main">
                    <img src="assets/img/campsite1.jpg" alt=""/>
                  </div>
                  <div className="img_sec_wrap">
                    <div className="img_sec">
                      <img src="assets/img/campsite1.jpg" alt=""/>
                    </div>
                    <div className="img_sec">
                      <img src="assets/img/campsite1.jpg" alt=""/>
                    </div>
                  </div>
                </div>
                <div className='campsite_info d-flex'>
                  <div className="campsite_info_main">
                    <ul>
                      <li>locatiion</li>
                      <li>campname</li>
                      <li>star</li>
                      <li>hashtag</li>
                      <li>campass</li>
                    </ul>
                  </div>
                  <div className='campsite_info_price'>
                    <ul>
                      <li>
                        price sec
                      </li>
                      <li>
                        price main
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6" style={{border:'1px solid red'}}>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PromoCampCard