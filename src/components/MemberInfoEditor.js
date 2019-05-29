import React from 'react';
import { Redirect } from 'react-router-dom';
import TwCitySelector from 'tw-city-selector';

class MemberInfoEditor extends React.Component {
    constructor() {
        super()
        this.state = {
            submitted: false,
            // 預設存放區
            id: '',
            account: '',
            password: '',
            avatar_pictures: '',
            name: '',
            nickname: '',
            gender: '',
            birthday: '',
            mobile: '',
            email: '',
            address: '',
            introduction: '',
            level: '',
            status: '',
            signUpDate: '',
            password_check: '',
            // 改變存放區
            zipcode: '',
            county: '',
            district: '',
            remainAddress: '',
            file: '',
            imagePreviewUrl: '',
        }
    }

    async componentWillMount() {
        await this.setState({
            id: localStorage.getItem("mem_id"),
            account: localStorage.getItem("mem_account"),
            password: localStorage.getItem("mem_password"),
            avatar_pictures: localStorage.getItem("mem_avatar"),
            name: localStorage.getItem("mem_name"),
            nickname: localStorage.getItem("mem_nickname"),
            gender: localStorage.getItem("mem_gender"),
            birthday: localStorage.getItem("mem_birthday"),
            mobile: localStorage.getItem("mem_mobile"),
            email: localStorage.getItem("mem_email"),
            address: localStorage.getItem("mem_address"),
            introduction: localStorage.getItem("mem_intro"),
            level: localStorage.getItem("memLevel_id"),
            status: localStorage.getItem("mem_status"),
            signUpDate: localStorage.getItem("mem_signUpDate"),
        })
    }

    componentDidMount() {
        new TwCitySelector({
            el: '.address_api',
            elCounty: '.county', // 在 el 裡查找 element
            // countyFieldName: 'county',
            elDistrict: '.district', // 在 el 裡查找 element
            // districtFieldName: 'district',
            elZipcode: '.zipcode', // 在 el 裡查找 element
            // zipcodeFieldName: 'zipcode', // input區域裡的zipcode name也要改成address[]才能夠接上
            hasZipcode: true
        });
    }

    // 存照片名稱到json檔裡
    onAvatarChange = (event) => {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        switch (file.type) {
            case 'image/png':
            case 'image/jpeg':
                reader.onloadend = () => {
                    this.setState({
                        file: file,
                        imagePreviewUrl: reader.result
                    });
                    this.setState({ avatar_pictures: 'avatar_pictures/' + this.state.file.name })
                }

                reader.readAsDataURL(file)
                break;
            default:
                alert('檔案格式不符!')
        }
    }

    onInputChange = async (event) => {
        switch (event.target.id) {
            case 'password':
            case 'password_check':
            case 'name':
            case 'nickname':
            case 'gender':
            case 'birthday':
            case 'mobile':
            case 'email':
            case 'introduction':
                this.setState({ [event.target.name]: event.target.value })
                // console.log('修改中- ' + `${event.target.name}` + ': ' + `${event.target.value}`)
                break;
            case 'zipcode':
            case 'county':
            case 'district':
            case 'remainAddress':
                await this.setState({ [event.target.id]: event.target.value })
                await this.setState({ address: this.state.zipcode + this.state.county + this.state.district + this.state.remainAddress })
                // console.log('修改中- '+ event.target.id+': '+event.target.value)
                // await console.log(this.state.zipcode)
                break;
            default:
                console.log(`Accept Unhandleable Type[${event.target.type}]`);
        }
    }

    onInfoEditorSubmit = async (event) => {
        event.preventDefault();

        if (this.state.password_check === this.state.password) {
            // 傳送大頭貼到 node server
            let fd = await new FormData();
            fd.append('avatar', this.state.file);
            await fetch('http://localhost:5000/try-upload', {
                method: 'POST',
                body: fd
            })
                .then(response => response.json())
                .then(obj => {
                    // console.log(obj);
                    if (obj) {
                        this.setState({ avatar_pictures: obj })
                        // console.log(this.state.avatar_pictures)
                    }
                })

            // 傳送其餘資料表到 json server
            await fetch('http://localhost:5555/members/' + this.state.id, {
                method: 'PUT',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    "mem_account": this.state.account,
                    "mem_password": this.state.password,
                    "mem_avatar": this.state.avatar_pictures,
                    "mem_name": this.state.name,
                    "mem_nickname": this.state.nickname,
                    "mem_gender": this.state.gender,
                    "mem_birthday": this.state.birthday,
                    "mem_mobile": this.state.mobile,
                    "mem_email": this.state.email,
                    "mem_address": this.state.address,
                    "memLevel_id": this.state.level,
                    "mem_status": this.state.status,
                    "mem_intro": this.state.introduction,
                    "mem_signUpDate": this.state.signUpDate
                })
            })

            await localStorage.setItem("mem_id", this.state.id);
            await localStorage.setItem("mem_account", this.state.account);
            await localStorage.setItem("mem_password", this.state.password);
            await localStorage.setItem("mem_avatar", this.state.avatar_pictures);
            await localStorage.setItem("mem_name", this.state.name);
            await localStorage.setItem("mem_nickname", this.state.nickname);
            await localStorage.setItem("mem_gender", this.state.gender);
            await localStorage.setItem("mem_birthday", this.state.birthday);
            await localStorage.setItem("mem_mobile", this.state.mobile);
            await localStorage.setItem("mem_email", this.state.email);
            await localStorage.setItem("mem_address", this.state.address);
            await localStorage.setItem("memLevel_id", this.state.level);
            await localStorage.setItem("mem_intro", this.state.introduction);
            await localStorage.setItem("mem_status", this.state.status);
            await localStorage.setItem("mem_signUpDate", this.state.signUpDate);
            await alert('已修改完成')
            await window.history.go(-1)
            await this.setState({ submitted: true })
        } else {
            alert('與上列密碼不符');
        }
    }

    renderEditorForm = () => {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="" />);
        } else {
            $imagePreview = (<img src={"../../" + this.state.avatar_pictures} alt="" />);
        }

        return (
            <main className="col-sm-10 my-2">
                <form name="form1" onSubmit={this.onInfoEditorSubmit}>
                    <p>
                        <span className="fw-bold fs-20 grass">編輯個人資料&nbsp;</span>
                        <span className="fs-14 watermelon">*為必填欄位</span>
                    </p>
                    <p className="fw-bold fs-18">　帳號資訊</p>
                    <div className="form-group row">
                        <label htmlFor="account" className="col-sm-2 col-form-label px-0 text-right rwd-text">
                            <span className="asterisk">* </span>帳號名稱
                        </label>
                        <input type="text" className="form-control-plaintext col-sm-9" id="account" name="account" required defaultValue={this.state.account} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label px-0 text-right rwd-text">
                            <span className="asterisk">* </span>Email
                        </label>
                        <input type="email" id="email" name="email" className="form-control col-sm-9 mx-3" required defaultValue={this.state.email} onChange={this.onInputChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="passowrd" className="col-sm-2 col-form-label px-0 text-right rwd-text">
                            <span className="asterisk">* </span>密碼
                        </label>
                        <input type="password" id="password" name="password" className="form-control col-sm-9 mx-3" required defaultValue={this.state.password} onChange={this.onInputChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password_check" className="col-sm-2 col-form-label px-0 text-right rwd-text">
                            <span className="asterisk">* </span>確認密碼
                        </label>
                        <input type="password" id="password_check" name="password_check" className="form-control col-sm-9 mx-3" onChange={this.onInputChange} required />
                    </div>

                    <p className="fw-bold fs-18">　個人資訊</p>
                    <div className="form-group row">
                        <label htmlFor="avatar" className="col-sm-2 col-form-label px-0 text-right rwd-text">大頭貼</label>
                        <div className="col-sm-9 d-flex align-items-start">
                            {/* <input type="hidden" id="avatar_pictures" name="avatar_pictures" className="form-control" /> */}
                            <figure className="avatar m-0">
                                {/* <Image src="../../images/toothless.jpg" /> */}
                                {/* <img src={"../../" + this.state.avatar_pictures} alt="" /> */}
                                {$imagePreview}
                            </figure>
                            <div className="mx-2">
                                <label className="btn btn-outline-grass" >
                                    <input type="file" id="avatar" name="avatar" style={{ display: "none" }} accept="image/*" onChange={this.onAvatarChange} />
                                    <i className="fas fa-camera"></i> 選擇相片
                                </label>
                                {/* <span className="avatar_upload asterisk d-block">格式不符(副檔名須為.jpg/.png/.jpeg)</span> */}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label px-0 text-right rwd-text">
                            <span className="asterisk">* </span>真實姓名
                        </label>
                        <input type="text" id="name" name="name" className="form-control col-sm-9 mx-3" minLength="2" required defaultValue={this.state.name} onChange={this.onInputChange} />
                        {/* <small class="form-text text-muted col-sm-2 p-0">將用於訂購人資料</small> */}
                    </div>
                    <div className="form-group row">
                        <label htmlFor="nickname" className="col-sm-2 col-form-label px-0 text-right rwd-text">暱稱</label>
                        <input type="text" id="nickname" name="nickname" className="form-control col-sm-9 mx-3" defaultValue={this.state.nickname} onChange={this.onInputChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="gender" className="col-sm-2 col-form-label px-0 text-right rwd-text">性別</label>
                        <select id="gender" name="gender" className="form-control col-sm-3 mx-3" defaultValue={this.state.gender} onChange={this.onInputChange}>
                            <option value="male" >男 Male</option>
                            <option value="female" >女 Female</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="birthday" className="col-sm-2 col-form-label px-0 text-right rwd-text">生日</label>
                        <input type="date" id="birthday" name="birthday" className="form-control col-sm-3 mx-3" defaultValue={this.state.birthday} onChange={this.onInputChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="mobile" className="col-sm-2 col-form-label px-0 text-right rwd-text">
                            <span className="asterisk">* </span>手機
                        </label>
                        <input type="tel" id="mobile" name="mobile" className="form-control col-sm-7 mx-3" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" required defaultValue={this.state.mobile} onChange={this.onInputChange} />
                        <small className="form-text col-sm-2 forest">格式 09XX-XXX-XXX</small>
                    </div>
                    <div role="tw-city-selector" data-has-zipcode>
                        <div className="form-group address_api row">
                            <label htmlFor="address" className="col-sm-2 col-form-label px-0 text-right rwd-text">地址</label>
                            <input id="zipcode" name="zipcode" className="form-control zipcode" style={{ display: "none" }} placeholder="郵遞區號" size="5" autoComplete="off" onChange={this.onInputChange} />
                            <select id="county" name="county" className="form-control ml-sm-3 col-sm-2 county" onChange={this.onInputChange}></select>
                            <select id="district" name="district" className="form-control col-sm-2 district" onChange={this.onInputChange}></select>
                            <input type="text" id="remainAddress" name="address" className="form-control col-sm-5" defaultValue={this.state.address} onChange={this.onInputChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="introduction" className="col-sm-2 col-form-label px-0 text-right rwd-text">自我介紹</label>
                        <textarea id="introduction" name="introduction" className="form-control col-sm-9 mx-3" rows="1" maxLength="25" defaultValue={this.state.introduction} onChange={this.onInputChange}></textarea>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-grass">儲存</button>
                        </div>
                    </div>
                </form>
            </main>
        )
    }

    renderMemberCenter = () => {
        return (
            <>
                <Redirect to="/Member" />
            </>
        )
    }

    render() {
        return (
            <>
                {this.state.submitted ? (this.renderMemberCenter()) : (this.renderEditorForm())}
            </>
        )
    }
}

export default MemberInfoEditor