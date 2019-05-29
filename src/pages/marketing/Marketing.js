import React from 'react';
import Carousel from '../../components/Carousel'
import './marketing.css'
import '../../components/Default.css'
import { BrowserRouter as Router, Route, Switch,Link,Redirect } from 'react-router-dom'
import CouponModal from '../../components/CouponModal'
import Coupon from '../../components/Coupon'

class Marketing extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      coupons:[],
      loading:false,
      coupon_records:[],
      show_modal: false
    }
  }
  
  async componentDidMount() {
    try {
      await this.setState({ loading: true })

      const response = await fetch('http://localhost:3001/getCouponsLimit/3', {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body:JSON.stringify({mem_account:localStorage.getItem('account')})
      })

      //await setTimeout(() => this.setState({ loading: false }), 5 * 1000)

      if (!response.ok) throw new Error(response.statusText)
      console.log(response)
      const jsonObject = await response.json()
      console.log(jsonObject)
      await this.setState({ coupons: jsonObject.coupons,coupon_records:jsonObject.coupon_records?jsonObject.coupon_records:[] })
      // console.log(this.state.coupons[0].coupon_name)
     this.setState({ loading: false })
    } catch (e) {
    } finally {
      
       
      
    }
  }

  handleClick= async(coupon_data)=>{
    // console.log(coupon_data)
    let mem_account = localStorage.getItem('mem_account')
    let coupon_genre = coupon_data.coupon_genre_id
    if(mem_account){
      let data = {
        mem_account:mem_account,
        coupon_genre:coupon_genre
      }
      const response = await fetch('http://localhost:3001/obtaincoupon', {
          method: 'POST',
          credentials: 'include',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
          body:JSON.stringify(data)
        })
        console.log(response)
        if (!response.ok) throw new Error(response.statusText)
    
        const responseJsonObject = await response.json()
    
        console.log(responseJsonObject)
        await this.setState({coupon_code_obtained:responseJsonObject[0].coupon_code?responseJsonObject[0].coupon_code:'',show_modal:true,coupon_records:[responseJsonObject[0],...this.state.coupon_records]})
  
    }else{
      this.props.history.push('/Login')
    }
  }

    openModalHandler = () => {
      this.setState({
          show_modal: true
      });
    }

    closeModalHandler = () => {
        this.setState({
            show_modal: false
        });
    }





    render(){
      
      return(
        <> 
        { this.state.show_modal ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
        <CouponModal show_modal={this.state.show_modal}
                      close={this.closeModalHandler} coupon_code_obtained={this.state.coupon_code_obtained?this.state.coupon_code_obtained:''}/>

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
               {/* {
                 this.state.coupons.map(coupon=>{
                   return this.state.loading?<></>:(<Coupon coupon_data={coupon} disabled={disabled} handleClick={()=>this.handleClick(coupon)} /> )
                 })
               } */}
               {this.state.coupons.map(coupon => {
                let disabled = false
                let already_get = this.state.coupon_records.filter(record=>record.coupon_genre_id == coupon.coupon_genre_id)
                
                if(already_get.length>0){
                  disabled = true
                }
                return this.state.loading ? (
                  <></>
                ) : (
                  <Coupon coupon_data={coupon} disabled={disabled} handleClick={()=>this.handleClick(coupon)}/>
                )
              })}
              </div>
            </div>
        </section>
            
        
        
        </>
    )
    }
  }
  export default Marketing;