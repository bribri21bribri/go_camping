import React, { Component } from 'react'
import './CouponSearchbar.css'

 class CouponSearchbar extends Component {
  constructor(props){
    super(props)
    
    
  }
  

  

  render() {
    return (
      <>
      <form className="mb-3" onSubmit={(e)=>{
        console.log(e)
        e.preventDefault()
        return this.props.onSubmit(this.props.keyword)
        }}>
        <div className="search_wrap">
          
            <input className='searchbar_input' onChange={this.props.onChange} type="text"/>
          
         
            <button className="search_btn" type="submit"><i className="fas fa-search"></i></button>
          
        </div>
        </form>
      </>
    )
  }
}

export default CouponSearchbar
