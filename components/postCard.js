import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500, blue500, pink900, grey50,teal500 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-bootstrap';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import { postCall } from '../services/api';
import validator from 'validator';
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
  subtitleColor:pink900,
  backgroundColor1: teal500,
  labelColor1: grey50
};

var data = new FormData();
export default class PostCard extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      expanded: false,
      open:false,
      file:'',
      fileurl:'',
      name:'',
      email:'',
      phone:'',
      nameError:'',
      emailError:'',
      phoneError:'',
      uploadError:'',
      _postId:this.props.job._id,
      _resumeId:''
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
    this.handleSubmit = this.handleSubmit.bind(this);

   

    console.log(this.props.job);
  }


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
    if (validator.isEmpty(this.state.phone)) {
      errorFlag = 1;
      this.setState({
          phoneError: "Enter Phone Number"
      })

  }
//   if (validator.isEmpty(this.state.file)) {
//     errorFlag = 1;
//     this.setState({
//         uploadError: "Upload Resume"
//     })

// }

    if (errorFlag == 1)
        return false;
    else
        return true;


}

clearErrorTexts() {

    this.setState({
        emailError: '',
        phoneError: '',
        nameError:'',
        uploadError:''
    });

}


  handleUploadFile(event) {
    

    let reader = new FileReader();
    let resumefile = event.target.files[0];


    console.log(event.target.files[0]);
    data.delete('file'); 
    data.append('file', event.target.files[0]);
    console.log(data);
   
}


handleUpload() {

    var url = "fileUpload";
    postCall(url, data)
        .then((response) => {
            console.log(response);
            if (response.status == 200) {
                alert("Upload Successful.....");
                console.log("......", this);
                this.setState({
                  _resumeId:response.data._id
                });

            }
            else {
                alert("Upload Failure.....");
            }
        });

}

handleNameChange(event){
  this.setState({
    name:event.target.value
  });
};
handleEmailChange(event){
  this.setState({
    email:event.target.value
  });
};
handlePhoneChange(event){
  this.setState({
    phone:event.target.value
  });
};
handleSubmit(event){

  this.clearErrorTexts();
  if(this.handleValidations()){

    var url="application";
    postCall(url,this.state).then((response)=>{
   if(response.status==200){
     console.log(response);
   alert("applicaion submitted successfully...");
   
   this.handleClose();
   }
   if(response.status!=200){
     alert("submission failure....");
   }
    });
   
   
  
}


};

  handleExpandChange(expanded) {
    this.setState({ expanded: expanded });
  };

  handleToggle(event, toggle) {
    this.setState({ expanded: toggle });
  };

  handleExpand() {
    this.setState({ expanded: true });
  };

  handleReduce() {
    this.setState({ expanded: false });
  };


  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {

   var d=new Date(this.props.job.postedon);

    var posted_on=d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
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
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label={this.props.job.title}
            className="jobTitle"
          />
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          <p> </p>
          <p> </p>
          <p> </p>
          <h5>Requirements:</h5>
          <p>{this.props.job.requirements}</p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          

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
      </Col>
     
      
     
    );
  }
}