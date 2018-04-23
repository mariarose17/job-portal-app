import React from 'react';

import Topnav from '../components/topnav';
import Navtop from '../components/navtop';
import PostCard from '../components/postCard';
import { getCall } from '../services/api';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            jobs: []

        }

        // this.getdata = this.getdata.bind(this);
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
                    jobs: JSON.stringify(response.data)
                })


            }


        });

    }

   
    render() {

        

        return (
            <div>
                <Navtop />

                <Grid>

                     <Row>
                      
                            {this.state.posts.map((post, index) => (


                               <PostCard job={post} />
                            ))}
                        
                    </Row>
                </Grid>
            </div>
        );

        // return (
        //     <div>
        //         <Navtop />
        //         {getdata}

        //         {/* <PostCard posts={this.state.posts}/> */}
        //     </div>
        // );
    }
}