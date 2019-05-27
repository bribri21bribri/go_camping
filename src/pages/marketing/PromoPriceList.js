import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import PromoCampCard from '../../components/PromoCampCard'

class PromoPriceList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campsites: [],
      camp_img:[],
      camp_feature:[],
      loading: false,
      currentPage:1,
      totalPages:0,
      promo:[],
      mem_level:''
    }
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true })

      const response = await fetch('http://localhost:3001/getPromoPriceCamp/'+this.state.currentPage, {
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
  
  trans_requirement=requirement=>{
    switch(requirement){
      case 1:
        return '露營新手'
        break
      case 2:
        return '業餘露營家'
        break
      case 3:
        return '露營達人'
    }
  }

  changeCurrentPage = async (currentPage) => {
    try {
      await this.setState({ loading: true,currentPage:currentPage })
      let url = 'http://localhost:3001/getPromoPriceCamp/'+currentPage
      
      const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      

      if (!response.ok) throw new Error(response.statusText)
      

      
      const responseJsonObject = await response.json()
     
      let campsites = responseJsonObject
      

      await this.setState({ campsites: campsites })
      
      this.setState({ loading: false })
    } catch (e) {
    } finally {
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
                    <a>滿額折扣</a>
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
                  
                  <li className="side_menu_link"><Link className="wood fs-20" to="/PromoUserList">會員優惠</Link></li>
                  <li className="side_menu_link "><Link className="fs-20" to="/PromoCamptypeList">營地分類優惠</Link></li>
                  <li className="side_menu_link  is-actived"><Link className="fs-20" to="/PromoPriceList">滿額折扣</Link></li>
                </ul>
                <h6 className="fs-20 grass mb-2">優惠券</h6>
                <ul className="mb-2">
                  
                  <li className="side_menu_link"><Link className="fs-20" to="/CouponList">優惠券搜尋</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <h4 className="grass fs-32">滿額折扣</h4>
              <div className="mb-4 discription_block">
                
                <div>
                <div className="promo_discription_img" style={{backgroundImage: "url(" + 'assets/img/campsite3.jpg' + ")"}}><h4>滿額折扣</h4></div>
                <div className="promo_discription_content">
                  <div>
                    <ul>
                      <li></li>
                      <li></li>
                      <li>
                        <ul>
                        {this.state.promo.map(p => {
                          return this.state.loading ? (
                            <></>
                          ) : (
                            <li>{this.trans_requirement(p.requirement)}:{p.discription}</li>
                          )
                        })}
                          
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                </div>
              </div>

              <div className="promo_camsite_list">
                <div className="camp_card_wrap">
                {this.state.campsites.map(campsite => {
                return this.state.loading ? (
                  <></>
                ) : (
                  <PromoCampCard campsite_data={campsite} camp_img={this.state.camp_img.filter(img=> img.camp_id ==  campsite.camp_id)} camp_feature={this.state.camp_feature.filter(feature=>feature.camp_id == campsite.camp_id)}/>
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
export default PromoPriceList