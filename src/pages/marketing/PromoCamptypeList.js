import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import PromoCampCard from '../../components/PromoCampCard'

class PromoCamptypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campsites: [],
      loading: false,
      currentPage:1,
      totalPages:0,
      promo:[]
    }
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true })

      const response = await fetch('http://localhost:3001/getPromoCamptypeCamp/'+this.state.currentPage, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })


      if (!response.ok) throw new Error(response.statusText)

      
      const responseJsonObject = await response.json()


      console.log(responseJsonObject)
      let totalPages = Math.ceil(responseJsonObject.total/6)


      
      await this.setState({ campsites: responseJsonObject.campsites,totalPages:totalPages,promo: responseJsonObject.promo_rules,camp_img:responseJsonObject.camp_images,camp_feature:responseJsonObject.camp_features })

      this.setState({ loading: false })
    } catch (e) {
    } finally {
    }

  }

  changeCurrentPage = async (currentPage) => {
    try {
      await this.setState({ loading: true,currentPage:currentPage })
      let url = 'http://localhost:3001/getPromoCamptypeCamp/'+currentPage
      
      const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      

      if (!response.ok) throw new Error(response.statusText)
      

      
      const responseJsonObject = await response.json()
     
      let totalPages = Math.ceil(responseJsonObject.total/6)
      
      

      await this.setState({ campsites: responseJsonObject.campsites,totalPages:totalPages,promo: responseJsonObject.promo_rules,camp_img:responseJsonObject.camp_images,camp_feature:responseJsonObject.camp_features })
      
      this.setState({ loading: false })
    } catch (e) {
    } finally {
    }

};
  
  getMinPriceBeforeDiscount = (camp_feature) =>{
    let minPrice = camp_feature.reduce((prev, curr)=>{
      return prev.camp_pricew < curr.camp_pricew? prev.camp_pricew: curr.camp_pricew
    })
    return minPrice
   }
  //  getMinPriceAfterDiscount = (camp_feature, promo_rules) =>{
  //   let minPriceBefore = camp_feature.reduce((prev, curr)=>{
  //     return prev.camp_pricew < curr.camp_pricew? prev.camp_pricew: curr.camp_pricew
  //   })
  //   let minPriceAfterArray = promo_rules.map(promo_rule=>{
  //     if(promo_rule.discount_type=='percentage'){
  //       console.log(promo_rule.discount_unit)
  //       return minPriceBefore*('0.'+promo_rule.discount_unit)
  //     }else{
  //       console.log(promo_rule.discount_unit)
  //       return minPriceBefore-promo_rule.discount_unit
  //     }
  //   })
  //   let minPriceAfterDiscount = minPriceAfterArray.reduce((prev, curr)=>{
  //     return prev < curr?prev:curr;
  //   })
  //   return minPriceAfterDiscount
  //  }

   toDateString=(d)=>{
    d = new Date(d+'').toLocaleDateString().split('/')
   let s = d[0]+"年"+d[1]+"月"+d[2]+"日"
   return s
 }
  


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
                  <Link to="/">
                      <i className="fas fa-home" />
                    </Link>
                  </li>
                  <li>
                    <span> &gt; </span><Link to="/Marketing">搶優惠</Link>
                  </li>
                  
                  <li>
                    <span> &gt; </span><Link>會員優惠</Link>
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
                  
                  <li className="side_menu_link "><Link className=" fs-20" to="/PromoUserList">會員優惠</Link></li>
                  <li className="side_menu_link is-actived"><Link className="wood fs-20" to="/PromoCamptypeList">營地分類優惠</Link></li>
                  <li className="side_menu_link"><Link className="fs-20" to="/PromoPriceList">滿額折扣</Link></li>
                </ul>
                <h6 className="fs-20 grass mb-2">優惠券</h6>
                <ul className="mb-2">
                  
                  <li className="side_menu_link"><Link className="fs-20" to="/CouponList">優惠券搜尋</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <h4 className="grass fs-32">營地分類優惠</h4>
              <div className="mb-4 discription_block">
                
                <div>
                <div className="promo_discription_img" style={{backgroundImage: "url(" + 'assets/img/campsite3.jpg' + ")"}}><h4>營地分類優惠</h4></div>
                <div className="promo_discription_content">
                {
                    this.state.promo.map(p=>{
                      return this.state.loading? (
                        <></>
                      ):(
                        <ul>
                          <li><span>優惠名稱: </span>{p.promo_name}</li>
                          <li>
                            <ul style={{textIndent : '36px'}}>
                              <li><span>優惠說明: </span>{p.discription}</li>
                              <li><span>優惠期間: </span>{this.toDateString(p.start)}至{this.toDateString(p.end)}</li>
                            </ul>
                          </li>
                        </ul>
                      )
                    })
                  }
                  {/* <div>
                    <ul>
                      <li></li>
                      <li></li>
                      <li>
                        <ul>
                        {this.state.promo.map(p => {
                          return this.state.loading ? (
                            <></>
                          ) : (
                            <li></li>
                          )
                        })}
                          
                        </ul>
                      </li>
                    </ul>
                  </div> */}
                </div>
                </div>
              </div>

              <div className="promo_camsite_list">
                <div className="camp_card_wrap">
                {this.state.campsites.map(campsite => {
                return this.state.loading ? (
                  <></>
                ) : (
                  <PromoCampCard key={campsite.camp_id} campsite_data={campsite} camp_img={this.state.camp_img.filter(img=> img.camp_id ==  campsite.camp_id)} camp_feature={this.state.camp_feature.filter(feature=>feature.camp_id == campsite.camp_id)} promo_rules={this.state.promo} getMinPriceBeforeDiscount={this.getMinPriceBeforeDiscount} />
                )
              })}
                </div>

              </div>
              

              <Pagination changeCurrentPage={this.changeCurrentPage} totalPages={this.state.totalPages} currentPage={this.state.currentPage}/>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default PromoCamptypeList