import React, { Component } from 'react'
import Pagination from '../../components/Pagination'

class PromoUserList extends Component {
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
              <section id="discription_block" class="mb-4">
                <h4>優惠專區</h4>
                <div>
                <div className="promo_discription_img"></div>
                <div className="promo_discription_content">
                  <div>
                  <p><sapn>time: </sapn>time</p>
                  <p><sapn>time: </sapn>time</p>
                  <p><sapn>time: </sapn></p>
                  <ul>
                    <li>level1</li>
                    <li>level2</li>
                    <li>level3</li>
                  </ul>
                  </div>
                </div>
                </div>
              </section>
              

              {/* <Pagination changeCurrentPage={this.changeCurrentPage} totalPages={8} currentPage={this.state.currentPage}/> */}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default PromoUserList