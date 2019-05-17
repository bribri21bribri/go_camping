import React, { Component } from 'react'

export class PromoSection extends Component {
  render() {
    return (
      <section id="promo_section" className="mb-5" style={{border:'solid #ccc 1px'}}>
        <div className="container">
          <h4>優惠專區</h4>
          <div className="row">
            <div className="col-md-4 section_item" style={{border:'solid #ccc 1px'}}>user</div>
            <div className="col-md-4 section_item" style={{border:'solid #ccc 1px'}}>camptype</div>
            <div className="col-md-4 section_item" style={{border:'solid #ccc 1px'}}>price</div>
          </div>
        </div>
      </section>
    )
  }
}

export default PromoSection
