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
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';



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
    // errorStyle: {
    //   color: orange500,
    // },
    // underlineStyle: {
    //   borderColor: orange500,
    // },
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
    }
};


var date = new Date();
export default class ManagePostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            height: '550px',
            open: false,
            title: '',
            company: '',
            postedon: '',
            postedby: '',
            location: '',
            description: '',
            requirements: '',
            _postId: '',
            count: ''
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
        // this.handleChangePage = this.handleChangePage.bind(this);
        // this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    componentDidMount() {

        var url = "";
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

    // handleChangePage(event, page) {
    //     this.setState({ page });
    // };

    // handleChangeRowsPerPage(event) {
    //     this.setState({ rowsPerPage: event.target.value });
    // };

    handleUpdate(event) {


        var url = "updatepost";
        putCall(url, this.state).then((response) => {

            console.log(response);
            if (response.status == 200) {
                alert("Successful.....");
                this.handleClose();
                // this.handleOpen();
                window.location.reload();

            }
            else {
                alert("Failure.....");
            }
        }

        );

    }

    handleDelete(event) {


        var url = "deletepost";
        patchCall(url, this.state).then((response) => {

            console.log(response);
            if (response.status == 200) {
                alert("Successful.....");
                this.handleClose();
                // this.handleOpen();
                window.location.reload();

            }
            else {
                alert("Failure.....");
            }
        }

        );

    }


    handleOpen(key) {


        this.setState({ open: true });


        getCall(this.state.posts[key]._id).then((response) => {
            this.setState({
                count: response.data.count
            });
            console.log("count..." + response.data.count);

        });
        console.log(this.state.posts[key]);
        this.setState({
            title: this.state.posts[key].title,
            company: this.state.posts[key].company,
            postedon: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            postedby: this.state.posts[key].postedby,
            location: this.state.posts[key].location,
            description: this.state.posts[key].description,
            requirements: this.state.posts[key].requirements,
            _postId: this.state.posts[key]._id,
        });

        getCall(this.state.posts[key]._id).then((response) => {

        });
    };

    handleClose() {
        this.setState({ open: false });
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
                label="Delete"
                //primary={true}
                onClick={this.handleDelete}
                labelStyle={styles.deleteColor}
            />,
            <FlatButton
                label="Update"
                secondary={true}
                keyboardFocused={true}
                onClick={this.handleUpdate}
            />,
        ];
        return (
            <div className="tablePostsDiv">
                <Table
                    height={this.state.height}
                    fixedHeader={true}
                    //onCellClick={this.handleOpen}
                    onRowSelection={this.handleOpen}

                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={true}

                    >

                        <TableRow>
                            <TableHeaderColumn tooltip="Serial No">#</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Job Title">Job Title</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Company">Company</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Posted On">PostedOn</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Posted By">PostedBy</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={true}

                        showRowHover={true}
                        stripedRows={false}
                    >
                        {/* data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                        {this.state.posts.map((post, index) => (



                            <TableRow key={index}>
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{post.title}</TableRowColumn>
                                <TableRowColumn>{post.company}</TableRowColumn>
                                <TableRowColumn>{post.posted_on}</TableRowColumn>
                                <TableRowColumn>{post.postedby}</TableRowColumn>
                                {/* <TableRowColumn><i className="far fa-edit"></i></TableRowColumn>

                                <TableRowColumn><i className="fas fa-trash-alt"></i></TableRowColumn> */}
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
                    title="Edit / Delete Post"
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

                                />
                            </Col>

                        </Row>



                    </Grid>
                </Dialog>
            </div>

        );
    }
}