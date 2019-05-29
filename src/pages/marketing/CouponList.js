import React from 'react'
import { BrowserRouter as Router, Route, Switch,Link,Redirect } from 'react-router-dom'

import Pagination from '../../components/Pagination'
import CouponSearchbar from '../../components/CouponSearchbar'

import '../../components/Default.css'
// import './PromoList.css'
import Coupon from '../../components/Coupon'
import CouponModal from '../../components/CouponModal'


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
      show_modal: false,
      coupon_code_obtained:'',
      redirect:false
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
      

      let data={
        account:localStorage.getItem('mem_account')
      }
      
      const response_records = await fetch('http://localhost:3001/getcouponrecords', {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }),
        body:JSON.stringify(data)
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
      console.log(coupon_records)
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
      }

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

handleClick= async(coupon_data)=>{

  let mem_account = localStorage.getItem('account')
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

  render() {
    // console.log(this.state)
    return (
      <>
      { this.state.show_modal ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
      <CouponModal show_modal={this.state.show_modal}
                    close={this.closeModalHandler} coupon_code_obtained={this.state.coupon_code_obtained?this.state.coupon_code_obtained:''}/>
        <div className="container">
          <div className="row">
            <div className="col-lg-3" >
              
            </div>
            <div className="col-lg-9">
              <nav className="bread_crumb mt-1 mb-3">
                <ul className="d-flex">
                <li>
                    <Link to="/">
                      <i className="fas fa-home" />
                    </Link>
                  </li>
                  <li>
                    <span> &gt; </span><Link to="/Marketing">搶優惠</Link>
                  </li>
                  <li>
                    <span> &gt; </span><a>優惠券</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="row" id="promo_item_list">
          <div className="col-lg-3">
            <CouponSearchbar onSubmit={this.onSubmit} onChange={this.onChange} keyword={this.state.keyword}/>
              <h5 className="fs-24 forest mb-3">搶優惠</h5>
              <div>
              <h6 className="fs-20 grass mb-2">優惠專區</h6>
                <ul className="mb-2">
                  
                  <li className="side_menu_link "><Link className="fs-20" to="/PromoUserList">會員優惠</Link></li>
                  <li className="side_menu_link "><Link className="fs-20" to="/PromoCamptypeList">營地分類優惠</Link></li>
                  <li className="side_menu_link"><Link className="fs-20" to="/PromoPriceList">滿額折扣</Link></li>
                </ul>
                <h6 className="fs-20 grass mb-2">優惠券</h6>
                <ul className="mb-2">
                  
                  <li className="side_menu_link is-actived"><Link className="fs-20 wood" to="/CouponList">優惠券搜尋</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <h4 className="grass fs-32">優惠券</h4>
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

              <Pagination changeCurrentPage={this.changeCurrentPage} totalPages={this.state.totalPages} currentPage={this.state.currentPage}/>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default CouponList
