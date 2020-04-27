import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { REST } from '../../../config/REST';
import session from '../../../config/session';
import AddUser from '../../organism/Modals/AddUser';
import UpdateUser from '../../organism/Modals/UpdateUser';
import store from '../../../config/redux/store';

function User(props) {

    const [users, setUsers] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [details, setDetails] = useState({});
    const [modalShowDetails, setModalShowDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!initialized) {
            getData();
        }
    });

    const getData = () => {
        store.dispatch({ type: 'SET_LOADING', data: true });

        const s = {
            username: session.get('username'),
            password: session.get('password'),
            all: 1
        };
        axios.get(`${REST.server.url}api/users`, { params: s })
            .then(res => {
                setUsers(res.data);

                store.dispatch({ type: 'SET_LOADING', data: false });
            }).catch(err => console.log(err));

        setInitialized(true);
    }

    const add = user => {
        setIsLoading(true);

        axios.post(`${REST.server.url}api/users`, user)
            .then(res => {
                let newData = [...users];
                newData[newData.length + 1] = res.data.user;

                setUsers(newData);

                setIsLoading(false);
                setModalShow(false);
            }).catch(err => {
                console.error(err.response);
                setIsLoading(false);
            });
    }

    const show = id => {
        axios.get(`${REST.server.url}api/users?id=${id}`)
            .then(res => {
                setDetails(res.data);
                setModalShowDetails(true);
            }).catch(err => console.error(err));
    }

    const update = user => {
        setIsLoading(true);
        // for authentication: admin or member
        user['username'] = session.get('username');
        user['password'] = session.get('password');
        // for condition: update or post
        user['update'] = 1;
        axios.post(`${REST.server.url}api/users`, user)
            .then(res => {
                setIsLoading(false);

                getData();
            }).catch(err => {
                console.error(err);
                const errorMessage = err.response.data.message;

                alert(errorMessage);

                setIsLoading(false);
            });
    }

    const deleteUser = id => {
        if (!window.confirm('Apakah kamu yakin ingin menghapus user #' + id)) return;
        setIsLoading(true);

        const s = {
            username: session.get('username'),
            password: session.get('password'),
            id,
            delete: 1
        };
        axios.get(`${REST.server.url}api/users`, { params: s })
            .then(res => {
                setIsLoading(false);

                const data = users.filter(u => Number(u.id) !== Number(res.data.id));
                setUsers(data);

                setIsLoading(false);
                setModalShowDetails(false);
            }).catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }

    return (
        <Row className="-p_ mx-auto">
            <Col md={10}>
                <h1 className="page-heading">Pengguna</h1>

                <h2>Tabel User</h2>
                <Button variant="primary" className="mb-3" onClick={() => setModalShow(true)}>
                    Tambah Data
                </Button>

                <AddUser
                    onSubmit={add} show={modalShow} onHide={() => setModalShow(false)} />

                <UpdateUser
                    data={details}
                    onSubmit={update}
                    show={modalShowDetails}
                    onHide={() => setModalShowDetails(false)}
                    isloading={isLoading.toString()}
                >
                    <Button
                        variant="outline-danger"
                        disabled={isLoading}
                        onClick={() => deleteUser(details.id)}
                    >Hapus</Button>
                </UpdateUser>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: "80px" }}>ID</th>
                            <th>Nama Pengguna</th>
                            <th>Ponsel</th>
                            <th>Alamat</th>
                            <th>Role</th>
                            <th>Tanggal Daftar</th>
                            <th style={{ width: "40px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) =>
                            <tr style={{ cursor: "pointer" }} key={i}>
                                <td onClick={() => show(u.id)}>#{u.id}</td>
                                <td onClick={() => show(u.id)}>{u.username}</td>
                                <td onClick={() => show(u.id)}>{u.phonenumber}</td>
                                <td onClick={() => show(u.id)}>{u.address}</td>
                                <td onClick={() => show(u.id)}>{u.role_id}</td>
                                <td onClick={() => show(u.id)}>{u.created}</td>
                                <td>
                                    <Button
                                        size="sm"
                                        variant="outline-success"
                                        onClick={() => show(u.id)}
                                    >Edit</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

export default User;