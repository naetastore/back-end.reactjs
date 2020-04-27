import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddGeneral from '../../organism/Modals/AddGeneral';
import axios from 'axios';
import { REST } from '../../../config/REST';
import store from '../../../config/redux/store';
import session from '../../../config/session';
import UpdateGeneral from '../../organism/Modals/UpdateGeneral';

function General(props) {

    const [modalShow, setModalShow] = useState(false);
    const [generals, setGenerals] = useState([]);
    const [initialized, setInitialized] = useState(false);
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

        axios.get(`${REST.server.url}api/general`)
            .then(res => {
                store.dispatch({ type: 'SET_LOADING', data: false });

                setGenerals(res.data.general);
            }).catch(err => console.error(err));

        setInitialized(true);
    }

    const add = global => {
        const fd = new FormData();
        fd.append('username', session.get('username'));
        fd.append('password', session.get('password'));
        fd.append('name', global.name);
        fd.append('description', global.description);
        fd.append('image', global.image);
        axios.post(`${REST.server.url}api/general`, fd)
            .then(res => {
                let newData = [...generals];

                newData[newData.length + 1] = res.data.general;
                setGenerals(newData);

                setModalShow(false);
            }).catch(err => console.error(err));
    }

    const show = id => {
        axios.get(`${REST.server.url}api/general?id=${id}`)
            .then(res => {
                setDetails(res.data.general);
                setModalShowDetails(true);
            }).catch(err => console.error(err));
    }

    const update = global => {
        setIsLoading(true);

        const fd = new FormData();
        fd.append('username', session.get('username'));
        fd.append('password', session.get('password'));
        fd.append('name', global.name);
        fd.append('description', global.description);
        fd.append('image', global.image);
        fd.append('id', global.id);
        axios.post(`${REST.server.url}api/general`, fd)
            .then(res => {
                setIsLoading(false);

                getData();
            }).catch(err => console.error(err));
    }

    const deleteGeneral = () => {
        setIsLoading(true);

        const s = {
            username: session.get('username'),
            password: session.get('password'),
            id: details.id,
            delete: 1
        };
        axios.get(`${REST.server.url}api/general`, { params: s })
            .then(res => {
                setIsLoading(false);

                const data = generals.filter(g => Number(g.id) !== Number(res.data.id));
                setGenerals(data);

                setModalShowDetails(false);
            }).catch(err => console.error(err));
    }

    return (
        <>
            <Button variant="primary" className="mb-3" onClick={() => setModalShow(true)}>
                Tambah Data
            </Button>

            <AddGeneral
                onSubmit={add} show={modalShow} onHide={() => setModalShow(false)} />

            <UpdateGeneral
                data={details}
                onSubmit={update}
                show={modalShowDetails}
                onHide={() => setModalShowDetails(false)}
                isloading={isLoading.toString()}
            >
                <Button variant="danger" disabled={isLoading} onClick={deleteGeneral}>Hapus</Button>
            </UpdateGeneral>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: "80px" }}>ID</th>
                        <th>Nama</th>
                        <th>Description</th>
                        <th>Start Price</th>
                        <th>High Price</th>
                    </tr>
                </thead>
                <tbody>
                    {generals.map((g, i) =>
                        <tr style={{ cursor: "pointer" }} key={i} onClick={() => show(g.id)}>
                            <td>#{g.id}</td>
                            <td>{g.name}</td>
                            <td>{g.description}</td>
                            <td>{g.start_price}</td>
                            <td>{g.high_price}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default General;