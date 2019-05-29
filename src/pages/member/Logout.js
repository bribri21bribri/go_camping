import React from 'react'
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            toggleLogout: props.toggleLogout,
        }
    }

    componentWillMount(){
        localStorage.clear();
        this.props.toggleLogout();
    }

    render(){
        return(
            <Redirect exact to="/" />
        )
    }
}

export default Logout