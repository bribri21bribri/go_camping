import React from 'react';

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            account:''
        }
    }
    onChange=(e)=>{
        let account = e.target.value
        this.setState({account:account})
      }
 
    onSubmit= async (account)=>{
        localStorage.setItem('account',account)
        account = account?account:''
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({account}),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
         
          if (!response.ok) throw new Error(response.statusText)
          
          const responseJsonObject = await response.text()
          // console.log(responseJsonObject)
        //   let coupons = searchResponseJsonObject.coupons
        //   await this.setState({ coupons:coupons ,totalPages:totalPages })
      }

    render(){
        return(
            <>
            <div className="container">
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    return this.onSubmit(this.state.account)}
                    }>
                    <input type="text" onChange={this.onChange}/>
                    <button type="submit">submit</button>
                </form>
            </div>
                
            </>
        )
    }
  }
  export default Index;