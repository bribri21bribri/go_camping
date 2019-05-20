import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/index/Index';
import CampSide from './pages/campSide/CampSide';
import Event from './pages/event/Event';
import Marketing from './pages/marketing/Marketing';
import Food from './pages/food/Food';
import ShareFun from './pages/sharefun/ShareFun';
import Member from './pages/member/Member';
import CouponList from './pages/marketing/CouponList'
import PromoUserList from './pages/marketing/PromoUserList'
import PromoCamptypeList from './pages/marketing/PromoUserList'
import PromoPriceList from './pages/marketing/PromoUserList'
import './App.css';


function App(){
  return(
    <Router>
      <>
        <Header />

        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/CampSide" component={CampSide} />
          <Route path="/Event" component={Event} />
          <Route path="/Marketing" component={Marketing} />
          <Route path="/Food" component={Food} />
          <Route path="/ShareFun" component={ShareFun} />
          <Route path="/Member" component={Member} />
          <Route path="/Marketing/PromoUserList" component={PromoUserList}/>
            <Route path="/Marketing/PromoCamptypeList" component={PromoCamptypeList}/>
            <Route path="/Marketing/PromoPriceList" component={PromoPriceList}/>
            <Route path="/Marketing/CouponList" component={CouponList}/>
        </Switch>

        <Footer />
      </>
    </Router>
  )
}
export default App;
