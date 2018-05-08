import React from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import { NavLink } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { getCall } from '../services/api';
import { deleteCall } from '../services/api';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
    teal50,
    grey900,
    green100





} from 'material-ui/styles/colors';



import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';


export default class MySideNav extends React.Component {
    constructor(props) {
        super(props);
        // this.userdata = JSON.parse(localStorage.getItem('UserData'));
        this.state = {
            items: [],
            dropdownOpen: false

        };

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        //window.history.forward();
        // console.log(this.props.isLogin);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout() {
        //console.log("inside delete front");
        deleteCall("logout").then(function (response) {
            if (response.status == 200) {
                //alert('logging out');
                localStorage.clear();
            }
        });

    }

    componentDidMount() {



    }


    render() {
        // console.log(this.props.isLogin);
        if (this.props.isLogin) {
            return (
                <div className="mySide">

                    <SideNav defaultSelected={this.props.select} highlightColor='#fff' highlightBgColor='#9f306d'>
                        <Nav id='list'>
                            {/* <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>     */}
                            <NavIcon>
                                {/* <Avatar>A</Avatar> */}
                                <Avatar
                                    color={grey900}
                                    backgroundColor={green100
                                    }
                                    size={30}
                                // style={style}
                                >
                                    A
                               </Avatar>

                            </NavIcon>
                            <NavText className='admintxt'>

                                Administrator

                            </NavText>
                        </Nav>
                        <Nav id="jobPosts">
                            <NavIcon> <span className="fas fa-columns"></span></NavIcon>
                            <NavText><NavLink className="adminNavLink" tag={Link} to="/managepost">Job Posts</NavLink></NavText>
                         
                        </Nav>

                        <Nav id="addPost">
                            <NavIcon> <span className="fas fa-clipboard"></span></NavIcon>
                            <NavText><NavLink className="adminNavLink" tag={Link} to="/addpost">Add Post</NavLink></NavText>
                         

                        </Nav>
                        <Nav id="addPosts">
                            <NavIcon> <span className="fas fa-upload"></span></NavIcon>
                            <NavText><NavLink className="adminNavLink" tag={Link} to="/addposts">Upload Posts</NavLink></NavText>
                           

                        </Nav>
                        <Nav id="logout">
                            <NavIcon> <span className="fas fa-sign-out-alt"></span></NavIcon>
                            <NavText><NavLink className="adminNavLink" onClick={this.logout} tag={Link} to="/">Logout</NavLink></NavText>
                        </Nav>
                    </SideNav>
                </div>


            );

        }

    }

}
