import React from 'react';
import { NavLink } from 'react-router-dom';

const MemberAside = props => (
    <aside className="col-sm-2">
        <ul className="p-0 my-2 list-unstyled">
            {/* 訂單管理 */}
            <li className="d-flex my-1 mb-2 d-flex align-items-center">
                <div className="level_badge bg-ground mr-1 d-flex align-items-center justify-content-center">
                    <i className="far fa-file-alt"></i>
                </div>
                <p className="p-0 m-0">
                    <span className="fs-20 fw-bold">訂單管理</span>
                </p>
            </li>
            <li className="d-flex my-2">
                <div className="box mr-1"></div>
                <NavLink className="p-0" activeClassName="activeAside" exact to="/Member">
                    <span className="fw-light">營地訂單</span>
                </NavLink>
            </li>
            <li className="d-flex my-2">
                <div className="box mr-1"></div>
                <NavLink className="p-0" activeClassName="activeAside" to="/Member/MyFoodOrder">
                    <span className="fw-light">食材訂單</span>
                </NavLink>
            </li>
            <li className="d-flex my-2">
                <div className="box mr-1"></div>
                <NavLink className="p-0" activeClassName="activeAside" to="/Member/MyEventOrder">
                    <span className="fw-light">活動訂單</span>
                </NavLink>
            </li>
            {/* 我的折價券 */}
            <li className="d-flex my-2 d-flex align-items-center">
                <div className="level_badge bg-sunshine mr-1 d-flex align-items-center justify-content-center">
                    <i className="fas fa-bullhorn"></i>
                </div>
                <NavLink className="p-0" activeClassName="activeAside" to="/Member/MyCoupon">
                    <span className="fs-18 fw-bold">我的折價券</span>
                </NavLink>
            </li>
            {/* 我的最愛 */}
            <li className="d-flex my-2 d-flex align-items-center">
                <div className="level_badge bg-watermelon mr-1 d-flex align-items-center justify-content-center">
                    <i className="fas fa-heart"></i>
                </div>
                <NavLink className="p-0" activeClassName="activeAside" to="/Member/MyFavorite">
                    <span className="fs-18 fw-bold">我的最愛</span>
                </NavLink>
            </li>
            {/* 文章管理 */}
            <li className="d-flex my-2 d-flex align-items-center">
                <div className="level_badge bg-forest mr-1 d-flex align-items-center justify-content-center">
                    <i className="fas fa-pen-nib"></i>
                </div>
                <p className="p-0 m-0">
                    <span className="fs-18 fw-bold">文章管理</span>
                </p>
            </li>
            <li className="d-flex my-2">
                <div className="box mr-1"></div>
                <NavLink className="p-0" activeClassName="activeAside" to="/Member/MyPostEditor">
                    <span className="fw-light">新增文章</span>
                </NavLink>
            </li>
            <li className="d-flex my-2">
                <div className="box mr-1"></div>
                <NavLink className="p-0" activeClassName="activeAside" to="/Member/MyPostList">
                    <span className="fw-light">文章列表</span>
                </NavLink>
            </li>
            <li className="d-flex my-2">
                <div className="box mr-1"></div>
                <NavLink className="p-0" activeClassName="activeAside" to="/Member/MyFavoritePost">
                    <span className="fw-light">收藏文章</span>
                </NavLink>
            </li>
            {/* 會員等級 */}
            <li className="d-flex my-2 d-flex align-items-center">
                <div className="level_badge bg-diamond mr-1 d-flex align-items-center justify-content-center">
                    <i className="far fa-gem"></i>
                </div>
                <NavLink className="p-0" activeClassName="activeAside" to="/Member/MemberLevel">
                    <span className="fs-18 fw-bold">會員等級</span>
                </NavLink>
            </li>
        </ul>
    </aside>
)

export default MemberAside