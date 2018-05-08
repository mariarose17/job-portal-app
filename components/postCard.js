import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500, blue500, pink900, grey50, teal500, grey900 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-bootstrap';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import { postCall } from '../services/api';
import validator from 'validator';
import IconButton from 'material-ui/IconButton';
// import SnackBar from './snackbar';
const styles = {
  chip: {
    margin: 4,
  },
  floatingLabelStyle: {
    color: pink900,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  backgroundColor: pink900,
  labelColor: pink900,
  subtitleColor: pink900,
  backgroundColor1: teal500,
  labelColor1: grey50,
  tooltipStyle: {
    backgroundColor: grey900
  },
};

var data = new FormData();
var fileValid = false;
var uploadValid = false;

export default class PostCard extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      expanded: false,
      open: false,
      file: '',
      fileurl: '',
      name: '',
      email: '',
      phone: '',
      nameError: '',
      emailError: '',
      phoneError: '',
      uploadError: '',
      expError: '',
      skillsError: '',
      _postId: this.props.job._id,
      _resumeId: '',
      exp: '',
      skills: '',
      openAlert: false,
      alertMsg: '',
      togglemsg: 'View More'

    };

    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleExpChange = this.handleExpChange.bind(this);
    this.handleSkillsChange = this.handleSkillsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);


    //console.log(this.props.job);
  }

  handleOpenAlert() {
    this.setState({ openAlert: true });
  };

  handleCloseAlert() {
    this.setState({ openAlert: false });
  };

  handleValidations() {
    var errorFlag = 0;
    if (!validator.isEmail(this.state.email)) {
      errorFlag = 1;
      this.setState({
        emailError: "Invalid email address"
      })

    }



    if (validator.isEmpty(this.state.name)) {
      errorFlag = 1;
      this.setState({
        nameError: "Enter Name"
      })

    }
    if (validator.isEmpty(this.state.phone) || !validator.isLength(this.state.phone, 10) || !validator.isNumeric(this.state.phone)) {
      errorFlag = 1;
      this.setState({
        phoneError: "Enter Valid Moblie Number"
      })

    }
    if (validator.isEmpty(this.state.exp)) {
      errorFlag = 1;
      this.setState({
        expError: "Enter Experiance"
      })


    }

    if (validator.isEmpty(this.state.skills)) {
      errorFlag = 1;
      this.setState({
        skillsError: "Enter key Skills"
      })

    }

    if (!fileValid || !uploadValid) {
      errorFlag = 1;
      this.setState({
        uploadError: "Upload resume"
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
      phoneError: '',
      nameError: '',
      uploadError: '',
      expError: '',
      skillsError: ''
    });

  }


  handleUploadFile(event) {
    var _validFileExtensions = [".pdf", ".doc", ".docx"];

    //let reader = new FileReader();
    let resumefile = event.target.files[0].name;


    //console.log(event.target.files[0]);



    if (resumefile.length > 0) {
      fileValid = false;
      for (var j = 0; j < _validFileExtensions.length; j++) {
        var extension = _validFileExtensions[j];
        if (resumefile.substr(resumefile.length - extension.length, extension.length).toLowerCase() == extension.toLowerCase()) {
          fileValid = true;
          break;
        }
      }

      if (!fileValid) {
        //alert("Sorry, " + resumefile + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
        this.setState({
          openAlert: true,
          alertMsg: "Sorry, " + resumefile + " is invalid file type, allowed extensions are: " + _validFileExtensions.join(", ")
        });
      }
      else {
        //alert('u can..');
        data.delete('file');
        data.append('file', event.target.files[0]);

      }
    }



    // data.delete('file'); 
    // data.append('file', event.target.files[0]);




  }


  handleUpload() {

    var url = "fileUpload";

    if (fileValid) {
      postCall(url, data)
        .then((response) => {
          // console.log(response);
          if (response.status == 200) {
            // alert("Upload Successful.....");
            // console.log("......", this);
            uploadValid = true;
            this.setState({
              _resumeId: response.data._id,
              openAlert: true,
              uploadError: '',
              alertMsg: 'File Uploaded successfully...'
            });

          }
          if (response.status != 200) {
            this.setState({
              openAlert: true,
              alertMsg: 'File Upload Failed...'
            });
          }
        });

    }
    else {
      this.setState({
        openAlert: true,
        alertMsg: 'Invalid file type....'
      });
      //alert('Invalid file type..');
    }

  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  };
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  };
  handlePhoneChange(event) {
    this.setState({
      phone: event.target.value
    });
  };

  handleExpChange(event) {
    this.setState({
      exp: event.target.value
    });
  };

  handleSkillsChange(event) {
    this.setState({
      skills: event.target.value
    });
  };

  handleSubmit(event) {

    this.clearErrorTexts();
    if (this.handleValidations()) {

      var url = "application";
      postCall(url, this.state).then((response) => {
        if (response.status == 200) {
          console.log(response);
          //alert("applicaion submitted successfully...");

          this.setState({

            alertMsg: 'Application submitted successfully...'
          });
          this.handleOpenAlert();
          //localStorage.setItem('open','true');
          //  localStorage.setItem('msg','Applicaion submitted successfully...');

          this.handleClose();
        }
        if (response.status != 200) {
          alert("submission failure....");
        }
      });



    }


  };

  handleExpandChange(expanded) {
    this.setState({ expanded: expanded });
  };

  handleToggle(event, toggle) {

    if (toggle) {
      this.setState({
        togglemsg: 'View Less'
      });
    }
    else {
      this.setState({
        togglemsg: 'View More'
      });
    }
    this.setState({
      expanded: toggle

    });
  };

  handleExpand() {
    this.setState({ expanded: true });
  };

  handleReduce() {
    this.setState({
      expanded: false,
      togglemsg: 'View More'
    });
  };


  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  render() {

    var d = new Date(this.props.job.postedon);

    var posted_on = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        secondary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
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




      <Col sm={6}>
        <p> </p>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title={this.props.job.location}
            subtitle={this.props.job.company}
            subtitleColor={styles.subtitleColor}
            //avatar="images/ok-128.jpg"
            actAsExpander={true}
            showExpandableButton={true}
            className="cardHeader"
          />
          <CardText>

            <IconButton className="iconBtn" tooltip={this.state.togglemsg} tooltipPosition="top-center" tooltipStyles={styles.tooltipStyle}>


              <Toggle
                toggled={this.state.expanded}
                onToggle={this.handleToggle}
                labelPosition="right"
                label={this.props.job.title}
                className="jobTitle"

              />
            </IconButton>



          </CardText>
          <CardMedia
            expandable={true}
          // overlay={<CardTitle title={this.props.job.title} subtitle={this.props.job.company} />}

          >
            {/* <img src="images/nature-600-337.jpg" alt="" /> */}
          </CardMedia>
          <CardTitle title={this.props.job.title} subtitle={`Posted on ${posted_on}  by ${this.props.job.postedby}`} expandable={true} />
          <CardText expandable={true}>
            <h5>Job Description:</h5>
            <p>{this.props.job.description}</p>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. */}
            <p> </p>
            <p> </p>
            <p> </p>
            <h5>Requirements:</h5>
            <p>{this.props.job.requirements}</p>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. */}


          </CardText>
          <CardActions>
            {/* <FlatButton label="View More" onClick={this.handleExpand} /> */}
            {/* <FlatButton label="View Less" onClick={this.handleReduce} /> */}
            {/* <FlatButton label="Apply"
          // labelColor={styles.labelColor}
          primary={true}
          onClick={this.handleOpen} 
          /> */}

            <RaisedButton
              label="Apply"
              className="buttonSubmitApplication"
              backgroundColor={styles.backgroundColor1}
              labelColor={styles.labelColor1}
              // primary={true}
              onClick={this.handleOpen}
            />

          </CardActions>
        </Card>


        <Dialog
          title="Apply for this post"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Row className="show-grid">
            <Col sm={6}>

              <TextField
                hintText="Enter Name"
                floatingLabelText="Name"
                fullWidth={true}
                id="name"
                onChange={this.handleNameChange}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                errorText={this.state.nameError}

              />
            </Col>
            <Col sm={6}>

              <TextField
                hintText="Enter Experiance in years"
                floatingLabelText="Experiance"
                fullWidth={true}
                id="experiance"
                onChange={this.handleExpChange}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                errorText={this.state.expError}

              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col sm={6}>
              <TextField
                hintText="Enter Email"
                floatingLabelText="Email"
                fullWidth={true}
                id="email"
                onChange={this.handleEmailChange}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                errorText={this.state.emailError}

              />
            </Col>
            <Col sm={6}>
              <TextField
                hintText="Enter Key Skills"
                floatingLabelText="Key Skills"
                fullWidth={true}
                multiLine={true}
                id="skills"
                onChange={this.handleSkillsChange}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                errorText={this.state.skillsError}

              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col sm={6}>
              <TextField
                hintText="Enter Phone Number"
                floatingLabelText="Phone Number"
                fullWidth={true}
                id="phone"
                onChange={this.handlePhoneChange}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                errorText={this.state.phoneError}

              />
            </Col>
          </Row>


          <Row className="show-grid">
            <Col sm={6}>

              <h6>Upload Your Resume :</h6>
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
            {/* <FlatButton label="Upload" onClick={this.handleUpload} /> */}

            <RaisedButton
              label="Upload Resume"
              className="buttonSubmitApplication"
              //backgroundColor={styles.backgroundColor}
              //labelColor={styles.labelColor}
              primary={true}
              onClick={this.handleUpload}
            />
          </Row>
        </Dialog>
        <Dialog
          actions={actionsAlert}
          modal={false}
          open={this.state.openAlert}
          onRequestClose={this.handleCloseAlert}
        >
          {this.state.alertMsg}
        </Dialog>
      </Col>



    );
  }
}