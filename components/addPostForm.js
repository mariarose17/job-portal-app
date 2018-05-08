import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import { Button } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500, blue500, pink900, grey50 } from 'material-ui/styles/colors';
import { postCall } from '../services/api';
import Dialog from 'material-ui/Dialog';
import validator from 'validator';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';



var date = new Date();
const styles = {
    // errorStyle: {
    //   color: orange500,
    // },
    // underlineStyle: {
    //   borderColor: orange500,
    // },
    floatingLabelStyle: {
        color: pink900,
    },
    floatingLabelFocusStyle: {
        color: blue500,
    },
    backgroundColor: pink900,
    labelColor: grey50
};


export default class AddPostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            postedon: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            postedby: '',
            location: '',
            description: '',
            requirements: '',
            titleError: '',
            companyError: '',
            postedbyError: '',
            locationError: '',
            descriptionError: '',
            requirementsError: '',
            openAlert: false,
            alertMsg: ''

        };


        this.handleTiltleChange = this.handleTiltleChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handlePostedByChange = this.handlePostedByChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleRequirementsChange = this.handleRequirementsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.handleOpenAlert = this.handleOpenAlert.bind(this);
        this.clearDataTexts = this.clearDataTexts.bind(this);
    }

    componentDidMount() {
        window.history.forward();

    }
    handleTiltleChange(event) {
        this.setState({ title: event.target.value });
    }
    handleCompanyChange(event) {
        this.setState({ company: event.target.value });
    }

    handlePostedByChange(event) {
        this.setState({ postedby: event.target.value });
    }
    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }
    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleRequirementsChange(event) {
        this.setState({ requirements: event.target.value });
    }
    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleValidations() {
        var errorFlag = 0;

        if (validator.isEmpty(this.state.title)) {
            errorFlag = 1;
            this.setState({
                titleError: "Enter job title"
            })

        }

        if (validator.isEmpty(this.state.postedby)) {
            errorFlag = 1;
            this.setState({
                postedbyError: "Enter posted for data"
            })

        }

        if (validator.isEmpty(this.state.company)) {
            errorFlag = 1;
            this.setState({
                companyError: "Enter Organization name"
            })

        }
        if (validator.isEmpty(this.state.location)) {
            errorFlag = 1;
            this.setState({
                locationError: "Enter job locations"
            })

        }
        if (validator.isEmpty(this.state.description)) {
            errorFlag = 1;
            this.setState({
                descriptionError: "Enter description"
            })


        }

        if (validator.isEmpty(this.state.requirements)) {
            errorFlag = 1;
            this.setState({
                requirementsError: "Enter requirements"
            })

        }


        if (errorFlag == 1)
            return false;
        else
            return true;


    }

    clearErrorTexts() {

        this.setState({
            titleError: '',
            companyError: '',
            postedbyError: '',
            locationError: '',
            descriptionError: '',
            requirementsError: ''
        });

    }

    clearDataTexts() {

        this.setState({
            title: '',
            company: '',
            postedby: '',
            location: '',
            description: '',
            requirements: ''
        });

    }



    handleSubmit(event) {

        this.clearErrorTexts();
        var url = "posts";
        if (this.handleValidations()) {
            postCall(url, this.state).then((response) => {

                console.log(response);
                if (response.status == 200) {
                    //alert("Successful.....");

                    this.setState({

                        openAlert: true,
                        alertMsg: 'Post added successfully...'

                    });
                    //window.setTimeout(window.location.reload(), 10000);
                    //window.location.reload();

                }
                if (response.status != 200) {
                    //alert("Failure.....");
                    this.setState({
                        openAlert: true,
                        alertMsg: 'Post add action failed...'
                    });
                }
            }

            );

        }

    }

    handleOpenAlert() {
        this.setState({ openAlert: true });
    };

    handleCloseAlert() {
        this.setState({
            openAlert: false
        });
        window.location.reload();
    };
    render() {

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
            // <FlatButton
            //     label="Discard"
            //     primary={true}
            //     onClick={this.handleClose}
            // />,
        ];
        const actionsAlert = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleCloseAlert}
            />
        ];
        return (
            <div className="tablePostsDiv">
                <center>
                    <h1>ADD POST</h1>
                </center>


                <Grid>

                    <Row className="show-grid">
                        <Col sm={6}>
                            <TextField
                                hintText="Job Title"
                                floatingLabelText="Job Title"
                                fullWidth={true}
                                onChange={this.handleTiltleChange}
                                id="jobTitle"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                errorText={this.state.titleError}
                            />
                        </Col>
                        <Col sm={6}>
                            <TextField
                                hintText="Organization Name"
                                floatingLabelText="Organization Name"
                                fullWidth={true}
                                onChange={this.handleCompanyChange}
                                id="company"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                errorText={this.state.companyError}
                            />
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col sm={6}>
                            <TextField
                                hintText="Locations"
                                floatingLabelText="Locations"
                                fullWidth={true}
                                onChange={this.handleLocationChange}
                                id="locations"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                errorText={this.state.locationError}
                            />
                        </Col>
                        <Col sm={6}>
                            <TextField
                                hintText="Name (abc@gmail.com)"
                                floatingLabelText="Posted For"
                                fullWidth={true}

                                onChange={this.handlePostedByChange}
                                id="postby"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                errorText={this.state.postedbyError}
                            />
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col sm={12}>
                            <TextField
                                hintText="Requirements"
                                floatingLabelText="Requirements"
                                fullWidth={true}
                                multiLine={true}
                                onChange={this.handleRequirementsChange}
                                id="requirements"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                errorText={this.state.requirementsError}
                            />
                        </Col>

                    </Row>

                    <Row className="show-grid">
                        <Col sm={12}>
                            <TextField
                                hintText="Description"
                                floatingLabelText="Description"
                                fullWidth={true}
                                multiLine={true}
                                onChange={this.handleDescriptionChange}
                                id="description"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                errorText={this.state.descriptionError}
                            />
                        </Col>

                    </Row>

                    <Row className="show-grid">
                        <Col sm={6}>
                        </Col>
                        <Col sm={6}>
                            <RaisedButton
                                label="Submit"
                                className="buttonSubmit"
                                backgroundColor={styles.backgroundColor}
                                labelColor={styles.labelColor}
                                onClick={this.handleSubmit}
                            //secondary={true}
                            // style={style} 
                            />
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


