import React, { Fragment } from 'react';
import { Table, Button } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'

function User(props) {
    return (
        <PerfectScrollbar style={{ height: "initial" }}>
            <Table striped bordered hover style={{ overflow: "auto", whiteSpace: "nowrap" }}>
                <thead>
                    <tr>
                        <th style={{ width: "80px" }}>ID</th>
                        <th>Nama Pengguna</th>
                        <th>Ponsel</th>
                        <th>Alamat</th>
                        <th>Role</th>
                        <th>Tanggal Dibuat</th>
                        <th style={{ width: "67px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {!props.data.length ?
                        <Fragment>
                            <tr>
                                <td>#0</td>
                                <td>User could not be found.</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </Fragment> : <Fragment></Fragment>}
                    {props.data.map((u, i) =>
                        <tr style={{ cursor: "pointer" }} key={i}>
                            <td onClick={() => props.show(u.id)}>#{u.id}</td>
                            <td onClick={() => props.show(u.id)}>{u.username}</td>
                            <td onClick={() => props.show(u.id)}>{u.phonenumber}</td>
                            <td onClick={() => props.show(u.id)}>{u.address}</td>
                            <td onClick={() => props.show(u.id)}>{u.role_id}</td>
                            <td onClick={() => props.show(u.id)}>{u.created}</td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="outline-success"
                                    onClick={() => props.show(u.id)}
                                >Edit</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </PerfectScrollbar>
    );
}

User.defaultProps = {
    data: []
};

export default User;