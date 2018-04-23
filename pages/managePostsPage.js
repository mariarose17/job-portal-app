import React from 'react';
import Topnav from '../components/topnav';
import MySideNav from '../components/sidenav';
import ManagePostForm from '../components/managePostForm';
export default class ManagePost extends React.Component {
    render() {
        return (
            <div>
                {/* <Topnav /> */}
                <MySideNav />
                <ManagePostForm />
            </div>
        );
    }
}