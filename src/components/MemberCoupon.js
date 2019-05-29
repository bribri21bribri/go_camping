import React from 'react';
import { Nav, Image, Tab } from 'react-bootstrap';
import CouponGain from '../components/CouponGain'
class MemberCoupon extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentPage:1,
            coupon_records:[],
            totalPages:0
        }
    }

    async componentDidMount() {
        try {
          await this.setState({ loading: true })
          let currentPage = this.state.currentPage
    
          let url = 'http://localhost:3001/coupongainrecords/'+currentPage
    
          let data={
            account:localStorage.getItem('mem_account')
          }
          const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
            body:JSON.stringify(data)
          })
          
          if (!response.ok) throw new Error(response.statusText)
          
          const responseJsonObject = await response.json()
          console.log(responseJsonObject)
         
          
          let totalPages = Math.ceil(responseJsonObject.total/10)
          let coupon_records = responseJsonObject.coupon_records
          console.log(coupon_records)
          // console.log(responseJsonObject)
          await this.setState({ coupon_records: coupon_records,totalPages:totalPages})
         
          this.setState({ loading: false })
        } catch (e) {
        } finally {
        }
    
      }

    render(){
        return (
        <main className="col-sm-10 my-2">
            <Tab.Container defaultActiveKey="valid" className="">
                <Nav variant="tabs" defaultActiveKey="valid">
                    <Nav.Item>
                        <Nav.Link eventKey="valid" href="#">可使用</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="used">已兌換</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="expired">已過期</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="valid">
                        {/* <div className="d-flex row border p-sm-3 mt-3">
                            <div className="col-sm-2 d-flex align-items-center p-sm-0">
                                <figure className="order_avatar m-0">
                                    <Image src="../../images/toothless.jpg" />
                                </figure>
                            </div>
                            <div className="col-sm-10 d-flex justify-content-between">
                                <div className="d-flex flex-column justify-content-center">
                                    <span className="mb-sm-1">COUPON名稱</span>
                                    <span className="fw-light mb-sm-1 ground"><i className="far fa-clock"></i> 適用期間：4月25日 ~ 4月27日</span>
                                    <span className="fw-light mb-sm-3">楓之谷露營區<br></br>訂單滿10000元結帳現打85折</span>
                                    <span className="fw-light fs-14">>>>前往營地相關頁面</span>
                                </div>
                                <div className="d-flex flex-column justify-content-end">
                                    <span className="text-right fs-24 p-2 forest">85折</span>
                                    <span className="fs-20 fw-light p-2 forest coupon_code">ZC4184</span>
                                    
                                </div>
                            </div>
                        </div> */}
                        {
                            this.state.coupon_records.filter(record=>record.coupon_valid==1).map(record=>{
                                return <CouponGain record={record}/>
                            })
                        }
                    </Tab.Pane>
                        <Tab.Pane eventKey="used">

                        </Tab.Pane>
                        <Tab.Pane eventKey="expired">

                        </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </main>
    )
    }
}
        
export default MemberCoupon