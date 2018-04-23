
import React from 'react';
import Topnav from '../components/topnav';
import MySideNav from '../components/sidenav';
import ManagePostForm from '../components/managePostForm';
export default class AdminPanel extends React.Component {
    render() {
        return (
            <div>
                
                <MySideNav />
                <ManagePostForm />
            </div>
        );
    }
}