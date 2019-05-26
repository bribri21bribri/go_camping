import React, { Component } from 'react'
import './Coupon.css'


class Coupon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      disabled: false,
    }
  }

  // componentDidUpdate(oldProps) {
  //   const newProps = this.props
  //   if(oldProps.field !== newProps.field) {
  //     this.setState({})
  //   }
  // }
  

  render() {
    return (
      <div className=" flex-column d-flex flex-md-row">
        <>
          <div className="coupon mb-2">
            <div className="coupon_img_wrap   col-lg-4">
              <img
                src={
                  this.props.coupon_data
                    ? 'assets/img/' + this.props.coupon_data.camp_img
                    : ''
                }
                alt=""
              />
            </div>
            <div className="coupon_info  col-lg-8">
              <div className="coupon_info_main">
                <ul className="d-flex">
                  <li className="fw-bold fs-24">
                    {this.props.coupon_data
                      ? this.props.coupon_data.coupon_name
                      : ''}
                  </li>
                  <li className="fs-20">
                    <i className="far fa-clock" />
                    {this.props.coupon_data
                      ? this.props.coupon_data.coupon_expire
                      : ''}
                  </li>
                  <li className="fw-bold fs-24">
                    {this.props.coupon_data
                      ? this.props.coupon_data.camp_name
                      : ''}
                  </li>
                  <li className="fs-20">
                    {this.props.coupon_data
                      ? this.props.coupon_data.discription
                      : ''}
                  </li>
                  <li className="campsite_link">
                    <a className="fs-20 fw-medium" href="">
                      前往相關營地
                    </a>
                  </li>
                </ul>
              </div>
              <div className="coupon_info_sec">
                <span className={this.props.disabled?"discount_disabled":"discount"}>
                {
                  this.props.coupon_data
                      ? this.props.coupon_data.discount_unit
                      : ''
                      }
                      {
                        this.props.coupon_data
                      ? this.props.coupon_data.discount_type=='percentage'?"折":"元"
                      : ''
                      }
                </span>
                <button onClick={this.props.handleClick} disabled={this.props.disabled} className={this.props.disabled?"get_coupon_btn_disabled":"get_coupon_btn"}>
                  {this.props.disabled? "已領取":"我要領取"}
                </button>
              </div>
            </div>
          </div>
        </>
      </div>

      // console.log(this.props.coupon_data)
    )
  }
}

export default Coupon
