import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange500, blue500, pink900, grey50, red500 } from 'material-ui/styles/colors';
//import { postCall } from '../services/api';
import { getCall } from '../services/api';
import { putCall } from '../services/api';
import { patchCall } from '../services/api';
// import Dialog from 'material-ui/Dialog';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import validator from 'validator';
import ApplicantsList from './applicantsList'




import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,

} from 'material-ui/Table';



const styles = {

    floatingLabelStyle: {
        color: deepOrange500,
    },
    floatingLabelFocusStyle: {
        color: blue500,
    },
    backgroundColor: pink900,
    labelColor: grey50,
    deleteColor: {
        color: red500
    },
    input: {
        color: pink900
    }
};


var date = new Date();
export default class ManagePostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            applicants: [],
            height: '550px',
            open: false,
            openView: false,
            openDelete: false,
            title: '',
            company: '',
            postedon: '',
            postedby: '',
            location: '',
            description: '',
            requirements: '',
            _postId: '',
            count: '',
            titleError: '',
            companyError: '',
            postedbyError: '',
            locationError: '',
            descriptionError: '',
            requirementsError: '',
            openAlert: false,
            alertMsg: ''
            // page: 0,
            // rowsPerPage: 5,

        }



        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTiltleChange = this.handleTiltleChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handlePostedByChange = this.handlePostedByChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleRequirementsChange = this.handleRequirementsChange.bind(this);
        this.handleCloseView = this.handleCloseView.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this)
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.handleViewUpdate = this.handleViewUpdate.bind(this);


        // this.handleChangePage = this.handleChangePage.bind(this);
        // this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    componentDidMount() {

        var url = "adminHome";
        getCall(url).then((response) => {
            console.log(response.data);
            if (response.status == 200) {
                // alert("got data...");
                console.log(response);

                this.setState({
                    posts: response.data,

                })


            }


        });
        window.history.forward();

    }
    handleOpenAlert() {
        this.setState({ openAlert: true });
    };

    handleCloseAlert() {
        this.setState({ openAlert: false });
    };

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


    // handleChangePage(event, page) {
    //     this.setState({ page });
    // };

    // handleChangeRowsPerPage(event) {
    //     this.setState({ rowsPerPage: event.target.value });
    // };

    handleViewUpdate(event) {

        this.setState({
            openView: false,
            open: true
        });
    }

    handleUpdate(event) {

        var url = "updatepost";
        if (this.handleValidations()) {
            putCall(url, this.state).then((response) => {

                console.log(response);
                if (response.status == 200) {
                    //alert("Update Successful.....");
                    this.handleClose();
                    // this.handleOpen();
                    this.setState({

                        alertMsg: 'Job post updated successfully...'
                    });
                    this.handleOpenAlert();
                    this.componentDidMount();
                    // window.location.reload();


                }
                if (response.status != 200) {
                    alert("Update Failure.....");
                    this.setState({

                        alertMsg: 'Job post update failed...',
                        openAlert: true
                    });
                }
            }

            );
        }


    }

    handleDelete(event) {


        var url = "deletepost";
        patchCall(url, this.state).then((response) => {

            console.log(response);
            if (response.status == 200) {
                // alert("Successful.....");
                this.handleCloseDelete();
                this.setState({

                    alertMsg: 'Job post deleted...',
                    openAlert: true
                });
                // this.handleOpen();
                this.componentDidMount();
                //window.location.reload();

            }
            if (response.status != 200) {
                // alert("Failure.....");
                this.setState({

                    alertMsg: 'Job post not deleted...',
                    openAlert: true
                });
            }
        }

        );

    }


    handleOpen(row, column, event) {

        if (column == 4) {
            this.setState({
                openView: true,

            });

        }
        if (column == 5) {
            this.setState({
                open: true,

            });

        }
        if (column == 6) {
            this.setState({
                openDelete: true,

            });

        }



        getCall('applicants/' + this.state.posts[row]._id).then((response) => {
            this.setState({
                count: response.data.length,
                applicants: response.data
            });

        });

        this.setState({
            title: this.state.posts[row].title,
            company: this.state.posts[row].company,
            postedon: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            postedby: this.state.posts[row].postedby,
            location: this.state.posts[row].location,
            description: this.state.posts[row].description,
            requirements: this.state.posts[row].requirements,
            _postId: this.state.posts[row]._id,
        });


    };

    handleClose() {
        this.setState({ open: false });
    };

    handleCloseView() {
        this.setState({ openView: false });
    };

    handleCloseDelete() {
        this.setState({ openDelete: false });
    };

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

    render() {
        // const { rowsPerPage, page } = this.state;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,

            <FlatButton
                label="Update"
                secondary={true}
                keyboardFocused={true}
                onClick={this.handleUpdate}
            />,
        ];

        const actionsView = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseView}
            />,
            <FlatButton
                label="Edit"
                secondary={true}
                keyboardFocused={true}
                onClick={this.handleViewUpdate}
            />,

        ];
        const actionsDelete = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseDelete}
            />,
            <FlatButton
                label="Delete"
                //primary={true}
                onClick={this.handleDelete}
                labelStyle={styles.deleteColor}
            />,
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
                    <h5 className="hdAdminPosts">JOB POSTS</h5>
                </center>
                <Table
                    height={this.state.height}
                    fixedHeader={true}
                    onCellClick={this.handleOpen}
                // onRowSelection={this.handleOpen}

                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}

                    >

                        <TableRow>
                            {/* <TableHeaderColumn tooltip="Serial No">#</TableHeaderColumn> */}
                            <TableHeaderColumn tooltip="Job Title">Job Title</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Company">Company</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Posted On">Posted On</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Posted For">Posted For</TableHeaderColumn>
                            <TableHeaderColumn tooltip="View Details">View</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Edit">Edit</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Delete">Delete</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}

                        showRowHover={true}
                        stripedRows={false}
                    >
                        {/* data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                        {this.state.posts.map((post, index) => (
                            // date = new Date(post.postedon); 


                            <TableRow key={index}>
                                {/* <TableRowColumn>{index}</TableRowColumn> */}
                                <TableRowColumn>{post.title}</TableRowColumn>
                                <TableRowColumn>{post.company}</TableRowColumn>
                                <TableRowColumn>{
                                    // post.postedon
                                    new Date(post.postedon).toLocaleDateString('en-US')
                                }</TableRowColumn>
                                <TableRowColumn>{post.postedby}</TableRowColumn>
                                <TableRowColumn tooltip="View Details">

                                    <i className="fas fa-eye" aria-hidden="true"></i>

                                </TableRowColumn>
                                <TableRowColumn><i className="far fa-edit"></i></TableRowColumn>
                                <TableRowColumn><i className="fas fa-trash-alt"></i></TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                {/* <TablePagination
                    component="div"
                    count={this.state.posts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                /> */}


                <Dialog
                    title="Edit Post"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <Badge
                        badgeContent={this.state.count}
                        secondary={true}
                        badgeStyle={{ top: 12, right: 12 }}
                    >
                        <IconButton tooltip="No. of applicants" touch={true} tooltipPosition="bottom-center">
                            {/* <NotificationsIcon /> */}
                            <i className="fa fa-users" aria-hidden="true"></i>
                        </IconButton>
                    </Badge>
                    <Grid>

                        <Row className="show-grid">
                            <Col sm={6}>
                                <TextField
                                    hintText="Job Title"
                                    floatingLabelText="Job Title"
                                    fullWidth={true}
                                    onChange={this.handleTiltleChange}
                                    id="jobTitle"
                                    value={this.state.title}
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
                                    value={this.state.company}
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
                                    value={this.state.location}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    errorText={this.state.locationError}
                                />
                            </Col>
                            <Col sm={6}>
                                <TextField
                                    hintText="Name (abc@gmail.com)"
                                    floatingLabelText="Post By"
                                    fullWidth={true}
                                    value={this.state.postedby}
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
                                    value={this.state.requirements}
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
                                    value={this.state.description}
                                    onChange={this.handleDescriptionChange}

                                    id="description"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    errorText={this.state.descriptionError}
                                />
                            </Col>

                        </Row>



                    </Grid>
                </Dialog>



                <Dialog
                    title="Post Details"
                    actions={actionsView}
                    modal={false}
                    open={this.state.openView}
                    onRequestClose={this.handleCloseView}
                    autoScrollBodyContent={true}
                >
                    <Badge
                        badgeContent={this.state.count}
                        secondary={true}
                        badgeStyle={{ top: 12, right: 12 }}
                    >
                        <IconButton tooltip="No. of applicants" touch={true} tooltipPosition="bottom-center">
                            {/* <NotificationsIcon /> */}
                            <i className="fa fa-users" aria-hidden="true"></i>
                        </IconButton>
                    </Badge>
                    <Grid>

                        <Row className="show-grid">
                            <Col sm={6}>
                                <TextField
                                    disabled={true}
                                    hintText="Job Title"
                                    floatingLabelText="Job Title"
                                    fullWidth={true}
                                    onChange={this.handleTiltleChange}
                                    id="jobTitle"
                                    value={this.state.title}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                // className={styles.input}

                                />
                            </Col>
                            <Col sm={6}>
                                <TextField
                                    disabled={true}
                                    hintText="Organization Name"
                                    floatingLabelText="Organization Name"
                                    fullWidth={true}
                                    value={this.state.company}
                                    onChange={this.handleCompanyChange}
                                    id="company"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                                />
                            </Col>
                        </Row>

                        <Row className="show-grid">
                            <Col sm={6}>
                                <TextField
                                    disabled={true}
                                    hintText="Locations"
                                    floatingLabelText="Locations"
                                    fullWidth={true}
                                    onChange={this.handleLocationChange}
                                    id="locations"
                                    value={this.state.location}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                                />
                            </Col>
                            <Col sm={6}>
                                <TextField
                                    disabled={true}
                                    hintText="Name (abc@gmail.com)"
                                    floatingLabelText="Post By"
                                    fullWidth={true}
                                    value={this.state.postedby}
                                    onChange={this.handlePostedByChange}
                                    id="postby"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                                />
                            </Col>
                        </Row>

                        <Row className="show-grid">
                            <Col sm={12}>
                                <TextField
                                    disabled={true}
                                    hintText="Requirements"
                                    floatingLabelText="Requirements"
                                    fullWidth={true}
                                    multiLine={true}
                                    onChange={this.handleRequirementsChange}
                                    value={this.state.requirements}
                                    id="requirements"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                                />
                            </Col>

                        </Row>

                        <Row className="show-grid">
                            <Col sm={12}>
                                <TextField
                                    disabled={true}
                                    hintText="Description"
                                    floatingLabelText="Description"
                                    fullWidth={true}
                                    multiLine={true}
                                    value={this.state.description}
                                    onChange={this.handleDescriptionChange}

                                    id="description"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                                />
                            </Col>

                        </Row>



                    </Grid>
                    <ApplicantsList list={this.state.applicants} />
                </Dialog>

                <Dialog
                    actions={actionsDelete}
                    modal={false}
                    open={this.state.openDelete}
                    onRequestClose={this.handleCloseDelete}
                >
                    Are you sure you want to delete this post?
                </Dialog>
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