import React, { Component } from 'react'
import './PromoCampCard.css'

 class PromoCampCard extends Component {
   constructor(props){
     super(props)
     this.state={
      liked:this.props.camp_liked,
      // rating_avg:this.props.campsite_data.rating_avg,
     }
   }


   getRatingsWidth=()=> {
      let starsTotal = 5
      const starPercentage = `${Math.round(this.props.campsite_data.rating_avg *10) / 10}`/starsTotal * 100;
      const starPercentageRounded = `${starPercentage}%`;
      return starPercentageRounded
      // document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
      // document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
    }
    getRating=()=> {
      let starsTotal = 5
      const starRounded = `${Math.round(this.props.campsite_data.rating_avg *10) / 10}`;
      return starRounded
    }

   


   handle_like_btn_click=async()=>{
    if(!this.state.liked){
      let data ={
        account:localStorage.getItem('mem_account')?localStorage.getItem('mem_account'):false,
        camp_id:this.props.campsite_data.camp_id
      }
      const response = await fetch("http://localhost:3001/insertcampliked",{
        method:"POST",
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body:JSON.stringify(data)
      })
     
      if (!response.ok) throw new Error(response.statusText)
    
      
      const responseJsonObject = await response.json()
      if(responseJsonObject.success){
        this.setState({liked:true})
      }

    }else{
      let data ={
        account:localStorage.getItem('mem_account')?localStorage.getItem('mem_account'):false,
        camp_id:this.props.campsite_data.camp_id
      }
      const response = await fetch("http://localhost:3001/deletecampliked",{
        method:"POST",
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body:JSON.stringify(data)
      })

      if (!response.ok) throw new Error(response.statusText)
    
      
      const responseJsonObject = await response.json()
      if(responseJsonObject.success){
        this.setState({liked:false})
      }

    }
   }
  render() {
   
    return (

              <div className=" camp_card mb-2" >
                <div className='campsite_img_wrap d-flex'>
                  <span  className="like_btn" onClick={this.handle_like_btn_click}><i className="fas fa-heart" style={this.state.liked?{color:'#f26666'}:{color:'rgba(0,0,0,0.2)'}}></i></span>
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
                      {/* <li>
                        <div className="stars-outer">
                          <div className="stars-inner" style={{width:this.state.rating_avg?this.getRatingsWidth():'0'}}></div>
                          <span style={{color:"#f2ce63"}}> {this.getRating()}</span>
                        </div>
                      </li> */}
                      <li className="camp_feature">{this.props.campsite_data?this.props.campsite_data.camp_intro:''}</li>
                      {/* <li className="camp_feature">{this.props.camp_feature?this.props.camp_feature.map(feature=><><i className="fas fa-hashtag"></i><span>{feature.camp_type}</span></>):''}</li> */}
                      
                    </ul>
                  </div>
                  <div className='campsite_info_price'>
                    <ul>
                      <li className="fs-20">
                        {this.props.camp_feature?"NT$"+this.props.getMinPriceBeforeDiscount(this.props.camp_feature):''}
                      </li>
                      {/* <li className="price_sec">
                        <del>{this.props.camp_feature?"NT$"+this.props.getMinPriceBeforeDiscount(this.props.camp_feature):''}</del>
                      </li> */}
                      {/* <li className="price_main">
                        {this.props.camp_feature?"NT$"+this.props.getMinPriceAfterDiscount(this.props.camp_feature,this.props.promo_rules):''}
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>     
          
    )
  }
}
export default PromoCampCard