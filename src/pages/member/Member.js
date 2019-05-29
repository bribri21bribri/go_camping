import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// 切割頁面
import Bread from '../../components/MemberBread';
import Profile from '../../components/MemberProfile';
import Aside from '../../components/MemberAside';
import Notification from '../../components/MemberNotification';
import InfoEditor from '../../components/MemberInfoEditor';
import CampingOrder from '../../components/MemberCampingOrder';
import FoodOrder from '../../components/MemberFoodOrder';
import EventOrder from '../../components/MemberEventOrder';
import Coupon from '../../components/MemberCoupon';
import PostEditor from '../../components/MemberPostEditor';
import Level from '../../components/MemberLevel';
// CSS
import '../../components/Default.css'
import './Member.css'

class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            logined: false,
            memberData: [],
        }
    }

    componentWillMount() {
        const mem_account = localStorage.getItem("mem_account")

        if (mem_account) {
            this.setState({ logined: true })
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:5555/members', {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
            })

            if (!response.ok) throw new Error(response.statusText)

            const jsonObject = await response.json()
            // console.log(jsonObject) // 會員清單全部抓出來

            await this.setState({ memberData: jsonObject })

            const localStorageAccount = await localStorage.getItem("mem_account");
            const findMemberAccount = this.state.memberData.find((data) => data.mem_account === localStorageAccount);
            if (findMemberAccount) {
                let pickMember = this.state.memberData.filter((data) => data.mem_account === localStorageAccount);
                await this.setState({ memberData: pickMember });
            }
        } catch (e) {
            console.log(e)
        }
    }

    renderLoginPage = () => {
        return (
            <Redirect to="/Login" />
        )
    }

    renderMemberCenter = () => {
        return (
            <Router>
                <div className="container">
                    <section className="my-2">
                        <Bread />
                        <Profile />
                        <div className="row">
                            <Aside />
                            <Route exact path="/Member" component={CampingOrder} />
                            <Route exact path="/Member/MyInfoEditor" render={(props) => <InfoEditor memberData={this.state.memberData} {...props} />} />
                            <Route exact path="/Member/MyFoodOrder" component={FoodOrder} />
                            <Route exact path="/Member/MyEventOrder" component={EventOrder} />
                            <Route exact path="/Member/MyCoupon" component={Coupon} />
                            {/* <Route exact path="/Member/MyFavorite" component={Favorite} /> */}
                            <Route exact path="/Member/MyPostEditor" component={PostEditor} />
                            {/* <Route exact path="/Member/MyPostList" component={PostList} /> */}
                            {/* <Route exact path="/Member/MyFavoritePost" component={FavoritePost} /> */}
                            <Route exact path="/Member/MemberLevel" component={Level} />
                        </div>
                    </section>
                </div>
            </Router>
        )
    }

    render() {
        return (
            <>
                {this.state.logined ? (this.renderMemberCenter()) : (this.renderLoginPage())}
            </>
        )
    }
}

export default Member