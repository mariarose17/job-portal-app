import React from 'react';
import Topnav from '../components/topnav';
import MySideNav from '../components/sidenav';
import AddPostForm from '../components/addPostForm';
export default class AddPost extends React.Component {
    componentWillMount(){
        this.isLogin=localStorage.getItem('isLogin');
    }
    render() {
        return (
            <div>
                {/* <Topnav /> */}
                <MySideNav isLogin={this.isLogin}/>
                <AddPostForm />
            </div>
        );
    }
}