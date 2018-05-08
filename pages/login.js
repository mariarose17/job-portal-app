import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
import { postCall } from '../services/api';
import validator from 'validator';
import Navtop from '../components/navtop';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            alertMsg: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        window.history.forward();
    }

    handleValidations() {
        var errorFlag = 0;
        if (!validator.isEmail(this.state.email)) {
            errorFlag = 1;
            this.setState({
                emailError: "Invalid email address"
               
            })

        }



        if (validator.isEmpty(this.state.password)) {
            errorFlag = 1;
            this.setState({
                passwordError: "Enter Password"
            })

        }

        if (errorFlag == 1)
            return false;
        else
            return true;


    }

    clearErrorTexts() {

        this.setState({
            emailError: '',
            passwordError: ''
        });

    }


    handleOpenAlert() {
        this.setState({ openAlert: true });
    };

    handleCloseAlert() {
        this.setState({ openAlert: false });
    };

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleCancel(event) {
        this.props.history.push('/');
    }
    handleSubmit(event) {
        this.clearErrorTexts();
        if (this.handleValidations()) {
            postCall('adminlogin', this.state).then((response) => {
                if (response.status == 200) {
                    //console.log(response);
                    //alert(JSON.stringify(response.headers.auth));
                    this.auth = response.headers.auth;

                    localStorage.setItem('authdata', JSON.stringify(this.auth));
                    //alert(JSON.stringify(this.auth));
                    this.props.history.push({
                        pathname: '/adminPage',
                        state: { isLoggedIn: true }

                    });
                }
                if (response.status != 200) {
                    // alert("Login failure..Invalid login credentials");
                    this.setState({

                        openAlert: true,
                        alertMsg: 'Login failure..Invalid login credentials'
                    });

                }
            }, (err) => {
                // alert("Invalid login credentials...");
                this.setState({

                    openAlert: true,
                    alertMsg: 'Invalid login credentials..'
                });
            });
        }



    }

    render() {
        const actionsAlert = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleCloseAlert}
            />
        ];
        return (
            <div>
                <Navtop />

                <Grid>

                    <Row className="show-grid">
                        <Col sm={3}>
                        </Col>
                        <Col sm={6}>
                            <div class="hddiv">

                                <h1 className="loginHeading">Login</h1>


                                <TextField
                                    hintText="Enter Email"
                                    floatingLabelText="Email"
                                    type="email"
                                    id="email"
                                    onChange={this.handleEmailChange}
                                    fullWidth={true}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    errorText={this.state.emailError}
                                />
                                <TextField
                                    hintText="Enter Password"
                                    floatingLabelText="Password"
                                    type="password"
                                    id="password"
                                    onChange={this.handlePasswordChange}
                                    fullWidth={true}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    errorText={this.state.passwordError}
                                />
                                <Row>
                                    <Col sm={6}>
                                        <Button type="button" className="btnCancel" onClick={this.handleCancel}>Cancel</Button>
                                    </Col>
                                    <Col sm={6}>
                                        <Button className="btnLogin" type="button" color="success" onClick={this.handleSubmit}>Login</Button>
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                        <Col sm={3}>
                        </Col>

                    </Row>


                </Grid>
                <Dialog
                    actions={actionsAlert}
                    modal={false}
                    open={this.state.openAlert}
                    onRequestClose={this.handleCloseAlert}
                >
                    {this.state.alertMsg}
                </Dialog>
            </div>

        );
    }

}


const styles = {
    errorStyle: {
        color: orange500,
    },
    underlineStyle: {
        borderColor: orange500,
    },
    floatingLabelStyle: {
        color: orange500,
    },
    floatingLabelFocusStyle: {
        color: blue500,
    },
};




