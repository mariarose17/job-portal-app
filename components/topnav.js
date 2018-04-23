import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

export default class Topnav extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar expand="md">
                    <NavbarBrand className="navbrand" href="/">Admin Panel</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>

                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Add Post
                  </DropdownItem>
                  <DropdownItem divider />
                                    <DropdownItem>
                                       View Post
                  </DropdownItem>
                 
                                   
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <NavItem>
                                <NavLink className="loginlink" tag={Link} to="/">Logout</NavLink>

                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

