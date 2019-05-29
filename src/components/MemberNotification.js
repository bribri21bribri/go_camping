import React from 'react';

const MemberNotification = props => (
    <main className="col-sm-10 my-2">
        <form>
            <p className="fw-bold fs-20 grass">電子郵件設定</p>
            <div className="form-group row">
                <div className="col-sm-12">
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">訂單通知（包含：訂單更新、即將到來的旅程）</label>
                    </div>
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="customCheck2" />
                        <label className="custom-control-label" htmlFor="customCheck2">促銷活動通知（包含：每週促銷優惠活動、每月熱門營地排行）</label>
                    </div>
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="customCheck3" />
                        <label className="custom-control-label" htmlFor="customCheck3">個人優惠通知（包含：折價券通知、最愛營地促銷通知）</label>
                    </div>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-grass">儲存</button>
                </div>
            </div>
        </form>
    </main>
)

export default MemberNotification