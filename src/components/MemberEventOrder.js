import React from 'react';
import { Nav, Tab, Button } from 'react-bootstrap';

const MemberEventOrder = props => (
    <main className="col-sm-10 my-2">
        <Tab.Container defaultActiveKey="coming" className="">
            <Nav variant="tabs" defaultActiveKey="coming">
                <Nav.Item>
                    <Nav.Link eventKey="coming" href="#">即將到來</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="finished">已完成</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="cancelled">已取消</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content>
                <Tab.Pane eventKey="coming">
                    <div className="d-flex justify-content-between border p-sm-3 mt-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-light mr-sm-3">2019/08/08</span>
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-light mb-sm-1">活動名稱：和爸爸一起露營呷霸霸</span>
                                <span className="fw-light mb-sm-1">活動營地：石梯坪露營區</span>
                                <span className="fw-light mb-sm-1">活動日期：2019/08/01 ~ 2019/08/15</span>
                                <span className="fw-light mb-sm-1">
                                    付款方式：信用卡<small className="grass">(已付款)</small>
                                </span>
                                <span className="fw-light">訂單編號：138942660</span>
                            </div>
                        </div>
                        <div className="d-flex flex-column justify-content-between">
                            <div className="text-right">
                                <Button className="btn btn-grass" href="#">活動細節</Button>
                            </div>
                            <span className="text-right fs-18 fw-light">總金額 NT$1,900</span>
                        </div>
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="finished">
                    <div>
                        <p className="text-center my-3 p-3 fs-20 fw-light border">尚無訂單</p>
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="cancelled">
                    <div>
                        <p className="text-center my-3 p-3 fs-20 fw-light border">尚無訂單</p>
                    </div>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    </main>
)

export default MemberEventOrder