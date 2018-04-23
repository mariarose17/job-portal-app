import React from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import { NavLink } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { getCall } from '../services/api';
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

    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout() {
        localStorage.clear();
    }

    componentDidMount() {



    }


    render() {
        return (
            <div className="mySide">

                <SideNav defaultSelected="jobPosts" highlightColor='#fff' highlightBgColor='#9f306d'>
                    <Nav id='list'>
                        {/* <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>     */}
                        <NavIcon>
                            <Avatar>A</Avatar>
                            {/* <ListItem
                                disabled={true}
                                leftAvatar={<Avatar>A</Avatar>}
                            >
                                Letter Avatar
                            </ListItem> */}


                            {/* <Image className="proimage" src="" /> */}
                        </NavIcon>
                        <NavText>

                            Administrator

                        </NavText>
                    </Nav>
                    <Nav id="jobPosts">
                        <NavIcon> <span className="fas fa-columns"></span></NavIcon>
                        <NavText><NavLink className="adminNavLink" tag={Link} to="/managepost">Job Posts</NavLink></NavText>
                        {/* <NavText> Dashboard </NavText> */}

                    </Nav>

                    <Nav id="addPost">
                        <NavIcon> <span className="fas fa-columns"></span></NavIcon>
                        <NavText><NavLink className="adminNavLink" tag={Link} to="/addpost">Add Post</NavLink></NavText>
                        {/* <NavText> Dashboard </NavText> */}

                    </Nav>
                    <Nav id="logout">
                        <NavIcon> <span className="fas fa-cog"></span></NavIcon>
                        <NavText><NavLink className="adminNavLink" tag={Link} to="/">Logout</NavLink></NavText>
                    </Nav>
                </SideNav>
            </div>


        );
    }

}
