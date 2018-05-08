import React from 'react';

import Topnav from '../components/topnav';
import Navtop from '../components/navtop';
import PostCard from '../components/postCard';
import { getCall } from '../services/api';
import { Grid, Row, Col } from 'react-bootstrap';
import LazyLoad from 'react-lazy-load';
import FlatPagination from 'material-ui-flat-pagination';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            jobs: [],
            len: 0
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
                var data = response.data;
                this.setState({
                    posts: response.data,
                    jobs: JSON.stringify(response.data),
                    len: data.length
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


                {/* <InfiniteScroll
                    dataLength={this.len} //This is important field to render the next data
                    // next={fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    // below props only if you need pull down functionality                  
                   > */}

                <LazyLoad

                    onContentVisible={() => console.log('look na I have been lazyloaded!')}
                >
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
                </LazyLoad>
                {/* </InfiniteScroll> */}

            </div>
        );


    }
}