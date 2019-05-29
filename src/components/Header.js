import React from 'react';
import { BrowserRouter as Link, NavLink } from 'react-router-dom'
import logo from '../logo.svg';
import './Header.css';
import { FaUserAlt, FaSearch } from "react-icons/fa";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.selectCampSide = this.selectCampSide.bind(this);
        this.selectEvent = this.selectEvent.bind(this);
        this.selectMarketing = this.selectMarketing.bind(this);
        this.selectFood = this.selectFood.bind(this);
        this.selectShareFun = this.selectShareFun.bind(this);
        this.state = {
            CampSide: '',
            Event: '',
            Marketing: '',
            Food: '',
            ShareFun: '',
            logined: false,
            isAuthenticated: props.isAuthenticated,
            isntAuthenticated: props.isntAuthenticated,
        }
    }

    selectCampSide(event) {
        this.setState({
            CampSide: 'show',
            Event: '',
            Marketing: '',
            Food: '',
            ShareFun: ''
        })
    }
    selectEvent(event) {
        this.setState({
            CampSide: '',
            Event: 'show',
            Marketing: '',
            Food: '',
            ShareFun: ''
        })
    }
    selectMarketing(event) {
        this.setState({
            CampSide: '',
            Event: '',
            Marketing: 'show',
            Food: '',
            ShareFun: ''
        })
    }
    selectFood(event) {
        this.setState({
            CampSide: '',
            Event: '',
            Marketing: '',
            Food: 'show',
            ShareFun: ''
        })
    }
    selectShareFun(event) {
        this.setState({
            CampSide: '',
            Event: '',
            Marketing: '',
            Food: '',
            ShareFun: 'show'
        })
    }

    componentWillMount() {  // 一進入網站(render前)就判斷是否登入
        const mem_account = localStorage.getItem("mem_account")
        if (mem_account) {
            this.setState({ logined: true })
        }
    }

    componentWillReceiveProps(nextProps) { // componentWillReceiveProps方法中第一個參數代表即將傳入的新的Props
        if (nextProps.isAuthenticated !== this.props.isAuthenticated) { // 新傳進來的props不等於第一次render的props
            if (nextProps.isAuthenticated) { // 如果從父元件新傳進來的props表示已登入，改變這個元件的狀態
                this.setState({ logined: true })
            }
        }
        if (nextProps.isntAuthenticated !== this.props.isntAuthenticated) {
            if (nextProps.isntAuthenticated) { // 如果從父元件新傳進來的props表示已登出，改變這個元件的狀態
                this.setState({ logined: false })
            }
        }
    }

    renderMemberAvatar = () => {
        const mem_avatar = localStorage.getItem("mem_avatar")

        return (
            <li className="d-flex align-items-center">
                <NavLink exact className="nav-link py-1" to="/Member">
                    <figure className="header_avatar m-0">
                        <img src={"../../" + mem_avatar} alt="" />
                    </figure>
                </NavLink>
                <button className="btn bg_fff p-0 logout">
                    <NavLink className="nav-link main_color" to="/Logout">登出</NavLink>
                </button>
            </li>
        )
    }

    renderLoginButton = () => {
        return (
            <li className="login">
                <button className="btn bg_fff p-0">
                    <NavLink className="nav-link main_color" to="/Login"><FaUserAlt />&nbsp;登入/註冊</NavLink>
                </button>
            </li>
        )
    }
    render() {
        return (
            <>
                <nav className="main_color">
                    <ul className="list-unstyled row justify-content-between align-items-center">
                        <li className="align-items-center">
                            <NavLink className="navbar-brand logo_box" to="/"><img src={logo} alt="" /> </NavLink>
                        </li>
                        <li className="row justify-content-between maxWidth" style={{ flexGrow: '2' }}>
                            <form className="form-inline searchBar">
                                <input className="form-control" type="search" placeholder="找營地…" aria-label="Search" />
                                <button className="btn color_fff bg-grass fs-18 border-0" type="submit"><FaSearch /></button>
                            </form>
                            {/* <i className="fas fa-bars bars"></i> */}
                            <ul className="list-unstyled row nav_menu fw-bold">
                                <li className="times text-left pl-4"><i className="fas fa-times"></i></li>
                                <li className="times_logo"><Link className=" navbar-brand logo_box" to="#"><img src={logo} alt="" /></Link></li>
                                <li className={"nav-item position-relative " + this.state.CampSide}>
                                    <NavLink className="nav-link main_color" to="/CampSide" onClick={this.selectCampSide}>找營地</NavLink>
                                </li>
                                <li className={"nav-item position-relative " + this.state.Event}>
                                    <NavLink className="nav-link main_color" to="/Event" onClick={this.selectEvent}>選主題</NavLink>
                                </li>
                                <li className={"nav-item position-relative " + this.state.Marketing}>
                                    <NavLink className="nav-link main_color" to="/Marketing" onClick={this.selectMarketing}>搶優惠</NavLink>
                                </li>
                                <li className={"nav-item position-relative " + this.state.Food}>
                                    <NavLink className="nav-link main_color" to="/Food" onClick={this.selectFood}>買食材</NavLink>
                                </li>
                                <li className={"nav-item position-relative " + this.state.ShareFun}>
                                    <NavLink className="nav-link main_color" to="/ShareFun" onClick={this.selectShareFun}>分享樂</NavLink>
                                </li>
                            </ul>

                        </li>

                        {/* 登入沒 ? 是(會員頭像+登出按鈕) : 否(登入/註冊按鈕) */}
                        {this.state.logined ? (this.renderMemberAvatar()) : (this.renderLoginButton())}
                    </ul>
                </nav>
            </>
        )
    }
}

export default Header;