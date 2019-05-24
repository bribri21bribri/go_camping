import React from 'react'
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom'

import Pagination from '../../components/Pagination'
import CouponSearchbar from '../../components/CouponSearchbar'
import '../../components/marketing.css'
import '../../components/Default.css'
import './PromoList.css'
import Coupon from '../../components/Coupon'


class CouponList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coupons: [],
      coupon_records:[],
      keyword:'',
      loading: false,
      currentPage:1,
      totalPages:0,
    }
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true })
      let currentPage = this.state.currentPage
      let keyword = this.state.keyword

      let url = 'http://localhost:3001/getcoupons/'+currentPage
      url = keyword?'http://localhost:3001/getcoupons/'+currentPage+keyword:'http://localhost:3001/getcoupons/'+currentPage

      let url_count = 'http://localhost:3001/getcouponscount/'
      url_count = keyword?'http://localhost:3001/getcouponscount/'+keyword:'http://localhost:3001/getcouponscount/'


      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      // console.log(response)

      const response_count = await fetch(url_count, {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      const response_records = await fetch('http://localhost:3001/getcouponrecords', {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      
      
      if (!response.ok) throw new Error(response.statusText)
      if (!response_count.ok) throw new Error(response_count.statusText)
      if (!response_records.ok) throw new Error(response_records.statusText)

     

      
      const responseJsonObject = await response.json()
      const response_count_JsonObject = await response_count.json()
      const response_records_JsonObject = await response_records.json()

     
      let coupons = responseJsonObject.coupons
      let totalPages = Math.ceil(response_count_JsonObject.totalCount/10)
      let coupon_records = response_records_JsonObject.records
      // console.log(responseJsonObject)
      await this.setState({ coupons: coupons,totalPages:totalPages,coupon_records:coupon_records })
     
      this.setState({ loading: false })
    } catch (e) {
    } finally {
    }

  }

    changeCurrentPage = async (currentPage) => {
      try {
        await this.setState({ loading: true,currentPage:currentPage })
        let keyword = this.state.keyword
        let url = 'http://localhost:3001/getcoupons/'+currentPage
        url = keyword?'http://localhost:3001/getcoupons/'+currentPage+'/'+keyword:'http://localhost:3001/getcoupons/'+currentPage
        const response = await fetch(url, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
        
  
        if (!response.ok) throw new Error(response.statusText)
        
  
        
        const responseJsonObject = await response.json()
       
        let coupons = responseJsonObject.coupons
        
  
        await this.setState({ coupons: coupons })
        
        this.setState({ loading: false })
      } catch (e) {
      } finally {
      }
    // this.setState({ currentPage: numPage });
    // try {
    //   await this.setState({ loading: true })

    //   const CouponsResponse = await fetch('http://localhost:3001/getCouponsPage/'+this.state.currentPage, {
    //     method: 'GET',
    //     headers: new Headers({
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     }),
    //   })
    

    //   if (!CouponsResponse.ok) throw new Error(CouponsResponse.statusText)

      
    //   const couponsJsonObject = await CouponsResponse.json()
      

    //   await this.setState({ coupons: couponsJsonObject})
    //   // console.log(this.state.coupons[0].coupon_name)
    //   this.setState({ loading: false })
    // } catch (e) {
    // } 
  };

  onSubmit= async (keyword)=>{
    try {
      await this.setState({ loading: true })
      let currentPage = 1
      // let keyword = this.state.keyword
      let url = 'http://localhost:3001/getcoupons/'+currentPage
      url = keyword?'http://localhost:3001/getcoupons/'+currentPage+'/'+keyword:'http://localhost:3001/getcoupons/'+currentPage

      let url_count = 'http://localhost:3001/getcouponscount/'
      url_count = keyword?'http://localhost:3001/getcouponscount/'+keyword:'http://localhost:3001/getcouponscount/'

      const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const response_count = await fetch(url_count, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      

      if (!response.ok) throw new Error(response.statusText)
      if (!response_count.ok) throw new Error(response_count.statusText)
      

      
      const responseJsonObject = await response.json()
      const response_count_JsonObject = await response_count.json()

     
      let coupons = responseJsonObject.coupons
      let totalPages = Math.ceil(response_count_JsonObject.totalCount/10)

      await this.setState({ coupons: coupons,totalPages:totalPages })
      
      this.setState({ loading: false })
    } catch (e) {
    } finally {
    }
    
  }

  onChange=(e)=>{
    let keyword = e.target.value
    this.setState({keyword:keyword})
  }

  render() {
    // console.log(this.state)
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3" >
              <CouponSearchbar onSubmit={this.onSubmit} onChange={this.onChange} keyword={this.state.keyword}/>
            </div>
            <div className="col-md-9">
              <nav className="bread_crumb mt-1 mb-3">
                <ul className="d-flex">
                  <li>
                    <a>
                      <i className="fas fa-home" />
                    </a>
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
            </div>
          </div>

          <div className="row" id="promo_item_list">
          <div className="col-md-3">
              <h5 className="fs-24 forest mb-3">搶優惠</h5>
              <div>
              <h6 className="fs-20 grass mb-2">優惠專區</h6>
                <ul className="mb-2">
                  
                  <li className="side_menu_link "><Link className="wood fs-20" to="/PromoUserList">會員優惠</Link></li>
                  <li className="side_menu_link "><Link className="fs-20" to="/PromoCamptypeList">營地分類優惠</Link></li>
                  <li className="side_menu_link"><Link className="fs-20" to="/PromoPriceList">滿額折扣</Link></li>
                </ul>
                <h6 className="fs-20 grass mb-2">優惠券</h6>
                <ul className="mb-2">
                  
                  <li className="side_menu_link is-actived"><Link className="fs-20 wood" to="/CouponList">優惠券搜尋</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <h4 className="grass fs-32">優惠券</h4>
              {this.state.coupons.map(coupon => {
                let disabled = false
                let already_get = this.state.coupon_records.filter(record=>record.coupon_genre_id == coupon.coupon_genre_id)
                console.log(already_get)
                if(already_get.length>0){
                  disabled = true
                }
                return this.state.loading ? (
                  <></>
                ) : (
                  <Coupon coupon_data={coupon} disabled={disabled}/>
                )
              })}

              <Pagination changeCurrentPage={this.changeCurrentPage} totalPages={this.state.totalPages} currentPage={this.state.currentPage}/>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default CouponList
