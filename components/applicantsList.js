import React, { Component } from 'react';

import axios from 'axios';
import Divider from 'material-ui/Divider';
import { deepOrange500, blue500, pink900, grey50, red500 } from 'material-ui/styles/colors';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,

} from 'material-ui/Table';



export default class ApplicantsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // height: '550px'
        }
    }
    render() {
        return (
            <div>

                <Divider />
                <center>
                    <h5 className="listHd">List of Applicants for this job post</h5>
                </center>
                <Table
                    // height={this.state.height}
                    fixedHeader={true}


                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}

                    >

                        <TableRow>
                            {/* <TableHeaderColumn tooltip="Serial No">#</TableHeaderColumn> */}
                            <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Phone">Phone</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Experiance">Experiance</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Key Skills">Key Skills</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}

                        showRowHover={true}
                        stripedRows={false}
                    >
                        {/* data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                        {this.props.list.map((person, index) => (



                            <TableRow key={index}>
                                {/* <TableRowColumn>{index}</TableRowColumn> */}
                                <TableRowColumn>{person.name}</TableRowColumn>
                                <TableRowColumn>{person.email}</TableRowColumn>
                                <TableRowColumn>{person.phone}</TableRowColumn>
                                <TableRowColumn>{person.exp}</TableRowColumn>
                                <TableRowColumn>{person.skills}</TableRowColumn>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>
        );

    }
}