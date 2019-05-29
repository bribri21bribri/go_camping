import React from 'react';
import { Nav, Image, Tab, Button } from 'react-bootstrap';

const MemberFoodOrder = props => (
    <main className="col-sm-10 my-2">
        <Tab.Container defaultActiveKey="pending">
            <Nav variant="tabs" defaultActiveKey="pending">
                <Nav.Item>
                    <Nav.Link eventKey="pending" href="#">尚未付款</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="paid">待出貨</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="finished">已完成</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="cancelled">已取消</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content>
                <Tab.Pane eventKey="pending">
                    <div className="d-flex row border p-sm-3 mt-3">
                        <div className="col-sm-2 d-flex align-items-center p-sm-0">
                            <figure className="order_avatar m-0">
                                <Image src="../../images/toothless.jpg" />
                            </figure>
                        </div>
                        <div className="col-sm-10 d-flex justify-content-between">
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-light mb-sm-1">品牌名稱：桂冠</span>
                                <span className="fw-light mb-sm-1">商品名稱：火鍋料套組</span>
                                <span className="fw-light mb-sm-1">單價：$999</span>
                                <span className="fw-light mb-sm-1">數量：1</span>
                                <span className="fw-light">訂單編號：9903470231</span>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className="text-right">
                                    <Button className="btn btn-grass" href="#">查看細節</Button>
                                </div>
                                <span className="text-right fs-18 fw-light">總金額 NT$999</span>
                            </div>
                        </div>
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="paid">
                    <div>
                        <p className="text-center my-3 p-3 fs-20 fw-light border">尚無訂單</p>
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

export default MemberFoodOrder