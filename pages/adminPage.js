
import React from 'react';
import Topnav from '../components/topnav';
import MySideNav from '../components/sidenav';
import ManagePostForm from '../components/managePostForm';
export default class AdminPanel extends React.Component {
    componentDidMount(){
        localStorage.setItem('isLogin',true);
    }
    render() {
        console.log(this.props.location.state.isLoggedIn);
        return (
            <div>
                
                <MySideNav isLogin={this.props.location.state.isLoggedIn}/>
                <ManagePostForm />
            </div>
        );
    }
}