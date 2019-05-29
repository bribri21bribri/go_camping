import React from 'react';
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class MemberProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            badge: '',
            name: '',
        }
    }

    componentWillMount() {
        const memLevel_id = localStorage.getItem("memLevel_id")
        const mem_name = localStorage.getItem("mem_name")

        switch (memLevel_id) {
            case '露營新手':
                this.setState({
                    badge: <div className="level_badge bg-ground mr-1 d-flex align-items-center justify-content-center">
                        <i className="fas fa-campground"></i>
                    </div>
                })
                break;
            case '業餘露營家':
                this.setState({
                    badge: <div className="level_badge bg-forest mr-1 d-flex align-items-center justify-content-center">
                        <i className="fas fa-tree"></i>
                    </div>
                })
                break;
            case '露營達人':
                this.setState({
                    badge: <div className="level_badge bg-sunshine mr-1 d-flex align-items-center justify-content-center">
                        <i className="fas fa-crown"></i>
                    </div>
                })
                break;
            default:
                this.setState({
                    badge: <div className="level_badge bg-ground mr-1 d-flex align-items-center justify-content-center">
                        <i className="fas fa-campground"></i>
                    </div>
                })
        }

        if(mem_name){
            this.setState({
                name: <span className="fs-18">&nbsp;&nbsp;/ {mem_name}</span>
            })
        } else {
            this.setState({
                name: <span className="fs-18" style={{ color: "#CCCCCC"}}>&nbsp;&nbsp;/ 請編輯會員姓名</span>
            })
        }
    }


    render() {
        const mem_account = localStorage.getItem("mem_account")
        const mem_email = localStorage.getItem("mem_email")
        const mem_avatar = localStorage.getItem("mem_avatar")
        const memLevel_id = localStorage.getItem("memLevel_id")

        return (
            <div className="profile px-4 py-3 my-3">
                <div className="d-flex row">
                    <div className="col-sm-2 d-flex align-items-center">
                        <figure className="avatar m-0">
                            {/* <Image src="../../images/toothless.jpg" /> */}
                            <Image src={"../../" + mem_avatar} />
                        </figure>
                    </div>
                    <div className="col-sm-10">
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <p className="fs-24 mb-2">{mem_account}{this.state.name}</p>
                                <div>
                                    <NavLink className="btn btn-outline-grass" to="/Member/MyInfoEditor">
                                        編輯個人資料 <i className="fas fa-user-edit"></i>
                                    </NavLink>
                                </div>
                            </div>

                            {/* <p className="fs-14 mb-2">追蹤者 1024&nbsp;&nbsp;關注中 768</p> */}
                            
                            <div className="d-flex align-items-center mb-2">
                                {this.state.badge}
                                <p className="p-0 m-0 fs-20">{memLevel_id}</p>
                            </div>
                            <p className="">{mem_email}</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default MemberProfile