import React from 'react';
import MySideNav from '../components/sidenav';
import AddPostAsCsv from '../components/addPostAsCsv';

export default class AddPostCsv extends React.Component {
    componentWillMount() {
        this.isLogin = localStorage.getItem('isLogin');
    }
    render() {
        return (
            <div>
                <MySideNav isLogin={this.isLogin} select='addPosts'/>
                <AddPostAsCsv />
            </div>
        );
    }
}