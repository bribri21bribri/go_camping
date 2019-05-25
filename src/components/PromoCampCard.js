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
                    <img src={this.props.camp_img?'assets/img/'+this.props.camp_img[0].camp_image:''} alt=""/>
                  </div>
                  <div className="img_sec_wrap">
                    <div className="img_sec">
                      <img src={this.props.camp_img?'assets/img/'+this.props.camp_img[1].camp_image:''} alt=""/>
                    </div>
                    <div className="img_sec">
                      <img src={this.props.camp_img?'assets/img/'+this.props.camp_img[2].camp_image:''} alt=""/>
                    </div>
                  </div>
                </div>
                <div className='campsite_info d-flex'>
                  <div className="campsite_info_main">
                    <ul>
                      <li className="camp_loca"><i class="fas fa-map-marker-alt"></i>{this.props.campsite_data?this.props.campsite_data.city:''},{this.props.campsite_data?this.props.campsite_data.dist:''}</li>
                      <li className="camp_name">{this.props.campsite_data?this.props.campsite_data.camp_name:''}</li>
                      <li><i class="fas fa-star"></i></li>
                      <li className="camp_feature">{this.props.camp_feature?this.props.camp_feature.map(feature=><><i class="fas fa-hashtag"></i><span>{feature.campFeature_name}</span></>):''}</li>
                      <li><i class="far fa-compass"></i></li>
                    </ul>
                  </div>
                  <div className='campsite_info_price'>
                    <ul>
                      <li className="price_sec">
                        <del>{this.props.campsite_data?"NT$"+this.props.campsite_data.campPrice_weekday:''}</del>
                      </li>
                      <li className="price_main">
                        {this.props.campsite_data?"NT$"+this.props.campsite_data.campPrice_weekday:''}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              
            
          
    )
  }
}
export default PromoCampCard