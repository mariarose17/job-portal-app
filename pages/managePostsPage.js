import React from 'react';
import Topnav from '../components/topnav';
import MySideNav from '../components/sidenav';
import ManagePostForm from '../components/managePostForm';
export default class ManagePost extends React.Component {
    componentWillMount() {
        this.isLogin = localStorage.getItem('isLogin');
    }
    render() {
        return (
            <div>
                {/* <Topnav /> */}
                <MySideNav isLogin={this.isLogin} select='jobPosts'/>
                <ManagePostForm />
            </div>
        );
    }
}