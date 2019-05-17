import React from 'react';
import Carousel from '../../components/Carousel'
import MarketingPromoSection from '../../components/MarketingPromoSection'
import MarketingCouponSection from '../../components/MarketingCouponSection'
import '../../components/marketing.css'

function Marketing(){
    return(
        <> 
         <Carousel /> 
         <MarketingPromoSection/>
         <MarketingCouponSection/>
        </>
    )
  }
  export default Marketing;