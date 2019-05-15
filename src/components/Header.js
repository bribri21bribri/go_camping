import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom'
import logo from '../logo.svg';
import './Header.css';
import { FaUserAlt, FaSearch } from "react-icons/fa";

function Header(){
    return(
        <>
            <nav className="main_color">
                <ul className="list-unstyled row justify-content-between align-items-center">
                    <li className="d-flex align-items-center">
                        <NavLink className="navbar-brand logo_box" to="/"><img src={logo} alt=""/> </NavLink>
                        <form className="form-inline searchBar">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn my-2 my-sm-0" type="submit"><FaSearch/></button>
                        </form>
                    </li>
                    <li className="">
                        <i className="fas fa-bars bars"></i>
                        <ul className="list-unstyled row nav_menu">
                            <li className="times text-left pl-4"><i className="fas fa-times"></i></li>
                            <li className="times_logo"><Link className=" navbar-brand logo_box" to="#"><img src={logo} alt=""/></Link></li>
                            <li className="nav-item position-relative">
                                <NavLink className="nav-link main_color" to="/CampSide">找營地</NavLink>
                            </li>
                            <li className="nav-item show position-relative">
                                <NavLink className="nav-link sec_color" to="/Event">選主題</NavLink>
                            </li>
                            <li className="nav-item position-relative">
                                <NavLink className="nav-link main_color" to="/Marketing">搶優惠</NavLink>
                            </li>
                            <li className="nav-item position-relative">
                                <NavLink className="nav-link main_color" to="/Food">買食材</NavLink>
                            </li>
                            <li className="nav-item position-relative">
                                <NavLink className="nav-link main_color" to="/ShareFun">分享樂</NavLink>
                            </li>
                        </ul>

                    </li>

                    <li className="login">
                        <button className="btn my-2 my-sm-0 main_color btn_border_main" type="submit"><FaUserAlt/> <span >LOGIN</span>
                        </button>
                    </li>

                </ul>
            </nav>
        </>
    )
  }
  export default Header;