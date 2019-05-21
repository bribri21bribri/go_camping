import React from 'react'
import Pagination from '../../components/Pagination'
import '../../components/marketing.css'
import '../../components/Default.css'
import Coupon from '../../components/Coupon'


class CouponList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coupons: [],
      loading: false,
      currentPage:6,
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

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
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
              <h5>搶優惠</h5>
              <div>
                <ul>
                  <li>
                    <h6>優惠專區</h6>
                  </li>
                  <li>user</li>
                  <li>camptype</li>
                  <li>price</li>
                </ul>
                <ul>
                  <li>
                    <h6>優惠券</h6>
                  </li>
                  <li>優惠券搜尋</li>
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

              <Pagination changeCurrentPage={this.changeCurrentPage} totalPages={8} currentPage={this.state.currentPage}/>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default CouponList
