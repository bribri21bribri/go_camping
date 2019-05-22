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
      loading: false,
      currentPage:1,
      totalPages:0,
    }
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true })

      const CouponsResponse = await fetch('http://localhost:3001/getCouponsPage/'+this.state.currentPage, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const totalResponse = await fetch('http://localhost:3001/getCouponCount',{
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      //await setTimeout(() => this.setState({ loading: false }), 5 * 1000)

      if (!CouponsResponse.ok) throw new Error(CouponsResponse.statusText)
      if (!totalResponse.ok) throw new Error(totalResponse.statusText)

      
      const couponsJsonObject = await CouponsResponse.json()
      const totalJsonObject = await totalResponse.json()
      let totalPages = Math.ceil(totalJsonObject.total/10)
      

      await this.setState({ coupons: couponsJsonObject,totalPages:totalPages })
      // console.log(this.state.coupons[0].coupon_name)
      this.setState({ loading: false })
    } catch (e) {
    } finally {
    }

  }

    changeCurrentPage = async (numPage) => {
    this.setState({ currentPage: numPage });
    try {
      await this.setState({ loading: true })

      const CouponsResponse = await fetch('http://localhost:3001/getCouponsPage/'+this.state.currentPage, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
    

      if (!CouponsResponse.ok) throw new Error(CouponsResponse.statusText)

      
      const couponsJsonObject = await CouponsResponse.json()
      

      await this.setState({ coupons: couponsJsonObject})
      // console.log(this.state.coupons[0].coupon_name)
      this.setState({ loading: false })
    } catch (e) {
    } 
  };

  onSubmit= async (keyword)=>{
    
    keyword = keyword?keyword:''
    const searchResponse = await fetch('http://localhost:3001/searchcoupon/'+keyword+'/'+this.state.currentPage, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
     
      if (!searchResponse.ok) throw new Error(searchResponse.statusText)
      
      const searchResponseJsonObject = await searchResponse.json()
      let coupons = searchResponseJsonObject.coupons
      let totalPages =searchResponseJsonObject.totalCount/10
      await this.setState({ coupons:coupons ,totalPages:totalPages })
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3" >
              <CouponSearchbar onSubmit={this.onSubmit}/>
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
                return this.state.loading ? (
                  <></>
                ) : (
                  <Coupon coupon_data={coupon} />
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
