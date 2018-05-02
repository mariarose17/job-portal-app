import React from 'react';

import Topnav from '../components/topnav';
import Navtop from '../components/navtop';
import PostCard from '../components/postCard';
import { getCall } from '../services/api';
import { Grid, Row, Col } from 'react-bootstrap';

import FlatPagination from 'material-ui-flat-pagination';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            jobs: [],
            // offset: 0
        }

        // this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        // console.log("did mount");
        var url = "";
        // var url = urldemo.concat(this.offset);
        console.log(url);
        getCall(url).then((response) => {
            // console.log(response.data);
            if (response.status == 200) {
                // alert("got data...");
                //console.log(response);

                this.setState({
                    posts: response.data,
                    jobs: JSON.stringify(response.data)
                })


            }


        });

    }

    // handleClick(offset) {
    //     this.setState({ offset });
    //     console.log(this.state.offset);
    //     this.componentDidMount();
    // }

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
                    {/* <FlatPagination
                        offset={this.state.offset}
                        limit={1}
                        total={100}
                        onClick={(e, offset) => this.handleClick(offset)}
                    /> */}
                </Grid>

            </div>
        );


    }
}