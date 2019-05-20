import React, { Component } from 'react'
import './Coupon.css'
class Coupon extends Component {
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

      const response = await fetch('http://localhost:3001/getRandomCoupon', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      //await setTimeout(() => this.setState({ loading: false }), 5 * 1000)

      if (!response.ok) throw new Error(response.statusText)

      const jsonObject = await response.json()
      console.log(jsonObject)
      await this.setState({ coupons: jsonObject })
      console.log(this.state.coupons[0].coupon_name)
      setTimeout(()=>{this.setState({ loading: false })},3000)
    } catch (e) {
    } finally {
      
       
      
    }
  }

  render() {

    console.log(this.state.coupons)
    return (
      
      <div className=' flex-column d-flex flex-md-row'>
      {this.state.loading ?(
             <div className="coupon mb-2">
             loading
             </div>
           ):(
            <>
            <div className="coupon mb-2">
              <div className="coupon_img_wrap   col-lg-4">
                <img src={this.state.coupons.length?'assets/img/'+this.state.coupons[0].camp_img:''} alt=""/>
              </div>
              <div className="coupon_info  col-lg-8">
              <div className="coupon_info_main" >
                  <ul className="d-flex">
                    <li className="fw-bold fs-24">{this.state.coupons.length?this.state.coupons[0].coupon_name:''}</li> 
                    <li className="fs-20"><i className="far fa-clock"></i>{this.state.coupons.length?this.state.coupons[0].coupon_expire:''}</li>
                    <li className="fw-bold fs-24">{this.state.coupons.length?this.state.coupons[0].camp_name:''}</li>
                    <li className="fs-20">{this.state.coupons.length?this.state.coupons[0].discription:''}</li>
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
        )
           }
      </div>
    
    )
  }
}
export default Coupon

