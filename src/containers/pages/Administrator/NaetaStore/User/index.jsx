import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { REST } from '../../../../../config/REST';
import session from '../../../../../config/session';
import AddUser from '../../../../organism/Modals/AddUser';
import UpdateUser from '../../../../organism/Modals/UpdateUser';
import store from '../../../../../config/redux/store';
import Table from '../../../../organism/Tables/User';
import UserBlock from '../../../../organism/UserBlock';

function User(props) {

    const [users, setUsers] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [details, setDetails] = useState({});
    const [modalShowDetails, setModalShowDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [newMembers, setNewMembers] = useState([]);

    useEffect(() => {
        if (!initialized) {
            init();
        }
    });

    const init = () => {
        setLoading(true);
        getData();
    }

    const setLoading = (bool) => {
        store.dispatch({ type: 'SET_LOADING', data: bool });
        setPageLoading(bool);
    }

    const getData = () => {
        const s = {
            username: session.get('username'),
            password: session.get('password'),
            all: 1
        };
        axios.get(`${REST.server.naetastore}api/users`, { params: s })
            .then(res => {
                setUsers(res.data);

                setNewMembers(parseNewMember(res.data));

                store.dispatch({ type: 'SET_LOADING', data: false });
                setPageLoading(false);
            }).catch(err => {
                console.log(err);
                setPageLoading(false);
            });

        setInitialized(true);
    }

    const parseNewMember = data => {
        data = data.sort((b, a) => a.id > b.id ? 1 : -1);
        data = data.slice(0, 3);
        return data;
    }

    const add = user => {
        setIsLoading(true);

        axios.post(`${REST.server.naetastore}api/users`, user)
            .then(res => {
                const newData = users.concat(res.data.user);

                setUsers(newData);
                setNewMembers(parseNewMember(newData));

                setIsLoading(false);
                setModalShow(false);
            }).catch(err => {
                console.error(err.response);
                setIsLoading(false);
            });
    }

    const show = id => {
        axios.get(`${REST.server.naetastore}api/users?id=${id}`)
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
        axios.post(`${REST.server.naetastore}api/users`, user)
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
        axios.get(`${REST.server.naetastore}api/users`, { params: s })
            .then(res => {
                setIsLoading(false);

                const data = users.filter(u => Number(u.id) !== Number(res.data.id));
                setUsers(data);

                setNewMembers(parseNewMember(data));

                setIsLoading(false);
                setModalShowDetails(false);
            }).catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }

    if (!pageLoading) {
        return (
            <Row className="-p_ mx-auto">
                <Col md={10}>
                    <h1 className="page-heading">Pengguna</h1>
                    <h4 className="mb-4">
                        {newMembers.length} pengguna baru
                    </h4>

                    <UserBlock data={newMembers} />

                    <h3 className="mt-3">Daftar Pengguna</h3>
                    <p>
                        Pengguna dengan atau tidak mendaftar melalui aplikasi mobile dapat login di tempat lain.{'\r\n'}
                        Termasuk website ini tapi hanya ada beberapa akses.
                    </p>

                    <Button
                        className="my-3"
                        size="sm"
                        variant="outline-primary"
                        onClick={() => setModalShow(true)}
                    >+ Pengguna</Button>

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
                            size="sm"
                            variant="outline-danger"
                            disabled={isLoading}
                            onClick={() => deleteUser(details.id)}
                        >Hapus</Button>
                    </UpdateUser>

                    <Table data={users} show={show} />
                </Col>
            </Row>
        );
    } else {
        return (<></>);
    }

}

export default User;