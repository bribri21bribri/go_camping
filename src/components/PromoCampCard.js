import React, { Component } from 'react'
import './PromoCampCard.css'

 class PromoCampCard extends Component {
   constructor(props){
     super(props)
     this.state={

     }
   }
  render() {
    
    return (
      
            

              <div className=" camp_card mb-2" >
                <div className='campsite_img_wrap d-flex'>
                  <a href="" className="like_btn"><i class="fas fa-heart"></i></a>
                  <div className="img_main">
                    <img src={this.props.campsite_data?'assets/img/'+this.props.campsite_data.camp_img:''} alt=""/>
                  </div>
                  <div className="img_sec_wrap">
                    <div className="img_sec">
                      <img src={this.props.campsite_data?'assets/img/'+this.props.campsite_data.camp_img:''} alt=""/>
                    </div>
                    <div className="img_sec">
                      <img src={this.props.campsite_data?'assets/img/'+this.props.campsite_data.camp_img:''} alt=""/>
                    </div>
                  </div>
                </div>
                <div className='campsite_info d-flex'>
                  <div className="campsite_info_main">
                    <ul>
                      <li><i class="fas fa-map-marker-alt"></i>{this.props.campsite_data?this.props.campsite_data.city:''},{this.props.campsite_data?this.props.campsite_data.dist:''}</li>
                      <li>{this.props.campsite_data?this.props.campsite_data.camp_name:''}</li>
                      <li><i class="fas fa-star"></i></li>
                      <li><i class="fas fa-hashtag"></i></li>
                      <li><i class="far fa-compass"></i></li>
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

              
            
          
    )
  }
}
export default PromoCampCard