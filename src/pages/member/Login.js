import React from 'react';
import { Link } from 'react-router-dom';
import '../../components/Default.css';
import './Member.css';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleLogin: props.toggleLogin,
            logined: false,
            memberData: [],
            account: '',
            password: '',
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

            const jsonObject = await response.json() // 會員清單全部抓出來

            await this.setState({ memberData: jsonObject })
        } catch (e) {
            console.log(e)
        }
    }

    // 輸入帳號密碼時，有onChange的事件處理器(EventListener)
    onInputChange = (event) => {
        const { target } = event; // 抓到該<input>標籤，與const target = event.target相同
        // console.log(`target - ${target}, type[${target.type}], id[${target.id}], name[${target.name}], value[${target.value}]`);
        // target的使用方法，東西都是從該<input>標籤來的

        switch (target.type) { // 接受打字中
            case 'text':
            case 'password':
                this.setState({ [target.name]: target.value }); // 讓State對應的key放入input的name和值(ex account: test)
                break;
            default:
                console.log(`Accept Unhandleable Type[${target.type}]`);
        }
    }

    // 按下登入按鈕時，有onClick的事件處理器(EventListener)
    onSubmitClick = async (event) => {
        // 將存在state裡已經輸入的帳號密碼儲存在localStorage裡
        await localStorage.setItem("account", this.state.account);
        await localStorage.setItem("password", this.state.password);
    }

    // 送出登入表單時，有onSubmit的事件處理器(EventListener)
    onLoginPageSubmit = async (event) => {
        event.preventDefault(); // 避免標籤元素預設的行為或功能(ex <input type="submit">就會送出，可是可能其他input有誤所以要alert)

        // 將儲存的localStorage帳號密碼拿出來
        const localStorageAccount = await localStorage.getItem("account");
        const localStoragePassword = await localStorage.getItem("password");

        // 如果存在localStorage的帳號密碼和memberData其中一筆會員資料相同，將memberData換成該筆資料
        const findMemberAccount = this.state.memberData.find((data) => data.mem_account === localStorageAccount);
        const findMemberPassword = this.state.memberData.find((data) => data.mem_password === localStoragePassword);

        if (findMemberAccount) { // (1) 判斷是不是有此帳號
            // 有此帳號
            if (findMemberPassword) { // (2) 判斷是否帳號密碼正確
                // 密碼正確
                let pickMember = this.state.memberData.filter((data) => data.mem_account === localStorageAccount); // 過濾掉不需要用掉的其他會員資料
                await this.setState({ memberData: pickMember }); // 讓memberData變成只有一筆

                await localStorage.removeItem("account");
                await localStorage.removeItem("password");
                await localStorage.setItem("mem_id", this.state.memberData[0].id);
                await localStorage.setItem("mem_account", this.state.memberData[0].mem_account);
                await localStorage.setItem("mem_password", this.state.memberData[0].mem_password);
                await localStorage.setItem("mem_avatar", this.state.memberData[0].mem_avatar);
                await localStorage.setItem("mem_name", this.state.memberData[0].mem_name);
                await localStorage.setItem("mem_nickname", this.state.memberData[0].mem_nickname);
                await localStorage.setItem("mem_gender", this.state.memberData[0].mem_gender);
                await localStorage.setItem("mem_birthday", this.state.memberData[0].mem_birthday);
                await localStorage.setItem("mem_mobile", this.state.memberData[0].mem_mobile);
                await localStorage.setItem("mem_email", this.state.memberData[0].mem_email);
                await localStorage.setItem("mem_address", this.state.memberData[0].mem_address);
                await localStorage.setItem("memLevel_id", this.state.memberData[0].memLevel_id);
                await localStorage.setItem("mem_intro", this.state.memberData[0].mem_intro);
                await localStorage.setItem("mem_status", this.state.memberData[0].mem_status);
                await localStorage.setItem("mem_signUpDate", this.state.memberData[0].mem_signUpDate);

                await this.props.toggleLogin() // 讓父元件(App)的登入狀態變true
                // console.log('登入頁抓到會員資料的帳號:' + this.state.memberData[0].mem_account)

                await this.setState({ logined: true }) // 跳轉到前一來源頁
            } else {
                // 密碼錯誤
                alert('密碼錯誤!')
            }
        } else {
            // 無此帳號
            alert('查無此帳號!')
        }
    }

    renderLoginPage = () => {
        return (
            <div className="container-fluid login_cover d-flex align-items-center justify-content-center">
                <main className="">
                    <p className="sunshine">可以先暫時使用(帳號tigger/密碼admin)登入</p>
                    <div className="card">
                        <div className="card-body py-4">
                            <form onSubmit={this.onLoginPageSubmit}>
                                <h5 className="card-title text-center grass fs-24 mb-3">會員登入</h5>
                                <div className="form-group row d-flex align-items-center border rounded p-1">
                                    <div className="mx-2">
                                        <i className="fas fa-user-alt"></i>
                                    </div>
                                    <input type="text" id="account" name="account" className="flex-grow-1 border-0" placeholder="帳號名稱" onChange={this.onInputChange} />
                                </div>
                                <div className="form-group row d-flex align-items-center border rounded p-1">
                                    <div className="mx-2">
                                        <i className="fas fa-lock"></i>
                                    </div>
                                    <input type="password" id="password" name="password" className="flex-grow-1 border-0" placeholder="密碼" onChange={this.onInputChange} />
                                </div>
                                {/* <div className="d-flex justify-content-between mb-3">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">記住我的帳號</label>
                                    </div>
                                    <Link className="forgetPassword" to="">忘記密碼?</Link>
                                </div> */}
                                <div className="row">
                                    <button type="submit" className="btn btn-grass col-12 fs-20 mb-3" onClick={this.onSubmitClick}>登入</button>
                                </div>
                                <p className="text-center mb-3">
                                    還不是會員嗎?&nbsp;
                                    <Link className="ground register" to="/Register">立即免費註冊</Link>
                                </p>
                                <hr />
                                <div className="text-center">
                                    <Link className="mb-0 camp_boss" to="#">營地主登入</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    render() {
        return (
            <>
                {/* 是否已登入 ? 已登入(回到上一頁) : 未登入(登入表格) */}
                { this.state.logined ? (window.history.go(-1)) : (this.renderLoginPage()) }
            </>
        )
    }
}
export default Login