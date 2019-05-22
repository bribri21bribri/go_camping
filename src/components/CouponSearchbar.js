import React, { Component } from 'react'
import './CouponSearchbar.css'

 class CouponSearchbar extends Component {
  constructor(props){
    super(props)
    this.state={
      keyword:''
    }
    
  }
  onChange=(e)=>{
    let keyword = e.target.value
    this.setState({keyword:keyword})
  }

  

  render() {
    return (
      <>
      <form onSubmit={(e)=>{
        console.log(e)
        e.preventDefault()
        return this.props.onSubmit(this.state.keyword)
        }}>
        <div className="d-flex">
          <div>
            <input onChange={this.onChange} type="text"/>
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
