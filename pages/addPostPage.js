import React from 'react';
import Topnav from '../components/topnav';
import MySideNav from '../components/sidenav';
import AddPostForm from '../components/addPostForm';
export default class AddPost extends React.Component {
    render() {
        return (
            <div>
                {/* <Topnav /> */}
                <MySideNav />
                <AddPostForm />
            </div>
        );
    }
}