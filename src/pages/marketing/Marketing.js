import React from 'react';
import Carousel from '../../components/Carousel'
import './marketing.css'
import '../../components/Default.css'
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom'

import Coupon from '../../components/Coupon'

class Marketing extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      coupons:[],
      loading:false
    }
  }
  
  async componentDidMount() {
    try {
      await this.setState({ loading: true })

      const response = await fetch('http://localhost:3001/getCouponsLimit/3', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      //await setTimeout(() => this.setState({ loading: false }), 5 * 1000)

      if (!response.ok) throw new Error(response.statusText)
      console.log(response)
      const jsonObject = await response.json()
      console.log(jsonObject)
      await this.setState({ coupons: jsonObject })
      // console.log(this.state.coupons[0].coupon_name)
     this.setState({ loading: false })
    } catch (e) {
    } finally {
      
       
      
    }
  }



    render(){
      console.log(this.state.coupons)
      return(
        <> 
         <Carousel /> 
         <section id="marketing_promo_section" className="mb-5">
            <div className="container">
              <div className="row">
                <h4 className="grass fs-32">優惠專區</h4>
              </div>
              <div className=" promo_links">
                <div className=" promo_link_wrap"><Link to="/PromoUserList"><span>會員優惠</span><img src="assets/img/campsite1.jpg" alt=""/></Link></div>
                <div className=" promo_link_wrap"><Link to="/PromoCamptypeList"><span>營地分類優惠</span><img src="assets/img/campsite1.jpg" alt=""/></Link></div>
                <div className=" promo_link_wrap"><Link to="/PromoPriceList"><span>滿額折扣</span><img src="assets/img/campsite1.jpg" alt=""/></Link></div>
              </div>
            </div>
         </section>
        
          
        <section id="marketing_coupon_section" className="mb-5">
            <div className="container">
              <div className="row">
                <h4 className="grass fs-32">優惠券</h4>
                <Link className="couponlist_link_btn" to="/CouponList">看更多</Link>
              </div>
              <div className="row">
               {
                 this.state.coupons.map(coupon=>{
                   return this.state.loading?<></>:(<Coupon coupon_data={coupon} /> )
                 })
               }
              </div>
            </div>
        </section>
            
        
        
        </>
    )
    }
  }
  export default Marketing;