import React, { Component } from 'react'
import './PromoCampCard.css'

 class PromoCampCard extends Component {
   constructor(props){
     super(props)
     this.state={

     }
   }

   getMinPriceBeforeDiscount = () =>{
    let minPrice = this.props.camp_feature.reduce((prev, curr)=>{
      return prev.camp_pricew < curr.camp_pricew? prev.camp_pricew: curr.camp_pricew
    })
    return minPrice
   }
   getMinPriceAfterDiscount = () =>{
    let minPriceBefore = this.props.camp_feature.reduce((prev, curr)=>{
      return prev.camp_pricew < curr.camp_pricew? prev.camp_pricew: curr.camp_pricew
    })
    let minPriceAfterArray = this.props.promo_rules.map(promo_rule=>{
      if(promo_rule.discount_type=='percentage'){
        console.log(promo_rule.discount_unit)
        return minPriceBefore*('0.'+promo_rule.discount_unit)
      }else{
        console.log(promo_rule.discount_unit)
        return minPriceBefore-promo_rule.discount_unit
      }
    })
    let minPriceAfterDiscount = minPriceAfterArray.reduce((prev, curr)=>{
      return prev < curr?prev:curr;
    })
    return minPriceAfterDiscount
   }
  render() {
   
    return (

      
            

              <div className=" camp_card mb-2" >
                <div className='campsite_img_wrap d-flex'>
                  <a href="" className="like_btn"><i className="fas fa-heart"></i></a>
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
                      <li className="camp_loca"><i className="fas fa-map-marker-alt"></i>{this.props.campsite_data?this.props.campsite_data.city:''},{this.props.campsite_data?this.props.campsite_data.dist:''}</li>
                      <li className="camp_name">{this.props.campsite_data?this.props.campsite_data.camp_name:''}</li>
                      <li><i className="fas fa-star"></i></li>
                      <li className="camp_feature">{this.props.camp_feature?this.props.camp_feature.map(feature=><><i className="fas fa-hashtag"></i><span>{feature.camp_type}</span></>):''}</li>
                      <li><i className="far fa-compass"></i></li>
                    </ul>
                  </div>
                  <div className='campsite_info_price'>
                    <ul>
                      <li className="price_sec">
                        <del>{this.props.camp_feature?"NT$"+this.getMinPriceBeforeDiscount():''}</del>
                      </li>
                      <li className="price_main">
                        {this.props.camp_feature?"NT$"+this.getMinPriceAfterDiscount():''}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              
            
          
    )
  }
}
export default PromoCampCard