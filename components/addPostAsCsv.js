import { CSVLink } from 'react-csv';
import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import { Grid, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { postCall } from '../services/api';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const style = {
    // height: 100,
    // width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

var data = new FormData();
var fileValid;
var uploadValid = false;


export default class AddPostAsCsv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            alertMsg: ''
        }
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    componentDidMount() {
        window.history.forward();
    }

    handleUploadFile(event) {
        var _validFileExtensions = [".csv"];

        let postfile = event.target.files[0].name;

        if (postfile.length > 0) {
            fileValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var extension = _validFileExtensions[j];
                if (postfile.substr(postfile.length - extension.length, extension.length).toLowerCase() == extension.toLowerCase()) {
                    fileValid = true;
                    break;
                }
            }

            if (!fileValid) {
                //alert("Sorry, " + resumefile + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                this.setState({
                    openAlert: true,
                    alertMsg: "Sorry, " + postfile + " is invalid file type, allowed extensions are: " + _validFileExtensions.join(", ")
                });
                //alert("Sorry, " + postfile + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
            }
            else {

                data.delete('file');
                data.append('file', event.target.files[0]);

            }
        }

    }

    handleOpenAlert() {
        this.setState({ openAlert: true });
    };

    handleCloseAlert() {
        this.setState({ openAlert: false });
    };
    handleUpload() {

        var url = "fileUploadPost";

        if (fileValid) {
            postCall(url, data)
                .then((response) => {
                    // console.log(response);
                    if (response.status == 200) {
                        // alert("Upload Successful.....");
                        console.log(response);
                        // uploadValid = true;
                        this.setState({

                            openAlert: true,
                            alertMsg: 'File Uploaded successfully...'
                        });

                    }
                    if (response.status != 200) {
                        // alert("Upload Failed.....");
                        this.setState({
                            openAlert: true,
                            alertMsg: 'File Upload Failed...'
                        });
                    }
                }).catch((e) => {
                    this.setState({
                        openAlert: true,
                        alertMsg: 'File Upload Failed...'
                    });
                });;

        }
        else {
            //alert("Invalid file type......");
            this.setState({
                openAlert: true,
                alertMsg: 'Invalid file type....'
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
                <center>
                    <h5 className="hdAdminPosts">Upload CSV file of job posts</h5>
                </center>

                <Grid>


                    <Row className="show-grid">
                        <Col sm={12}>

                            <Paper style={style} zDepth={2} className="paper" >

                                <Row className="show-grid">
                                    <Col sm={12}>

                                        <h5></h5>
                                    </Col>
                                </Row>
                                <Row className="show-grid">
                                    <Col sm={6}>
                                        <TextField
                                            type="file"
                                            onChange={this.handleUploadFile}
                                            floatingLabelFixed={true}
                                            fullWidth={true}
                                            errorText={this.state.uploadError}

                                        />
                                    </Col>

                                    <RaisedButton
                                        label="Upload Posts"
                                        className="buttonSubmitApplication"
                                        primary={true}
                                        onClick={this.handleUpload}
                                    />
                                </Row>
                            </Paper>
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
