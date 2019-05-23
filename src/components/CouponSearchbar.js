import React, { Component } from 'react'
import './CouponSearchbar.css'

 class CouponSearchbar extends Component {
  constructor(props){
    super(props)
    
    
  }
  

  

  render() {
    return (
      <>
      <form onSubmit={(e)=>{
        console.log(e)
        e.preventDefault()
        return this.props.onSubmit(this.props.keyword)
        }}>
        <div className="d-flex">
          <div>
            <input onChange={this.props.onChange} type="text"/>
          </div>
          <div>
            <button className="search_btn" type="submit"><i className="fas fa-search"></i></button>
          </div>
        </div>
        </form>
      </>
    )
  }
}

export default CouponSearchbar
