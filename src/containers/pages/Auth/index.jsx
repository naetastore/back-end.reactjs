import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { REST } from '../../../config/REST';
import store from '../../../config/redux/store';
import session from '../../../config/session';

function Auth(props) {
    const [data, setData] = useState({ username: '', password: '' });
    const [disabled, setDisabled] = useState(true);

    const change = e => {
        let newData = { ...data };
        newData[e.target.id] = e.target.value;

        setData(newData);

        if (newData.username && newData.password) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const submit = event => {
        event.preventDefault();

        axios.get(`${REST.server.url}api/users`, { params: data })
            .then(res => {
                if (res.data.role_id > 1) return;

                res.data['password'] = data.password;
                setUser(res.data);

                redirect();
            }).catch(err => console.log(err.response));
    }

    const setUser = data => {
        session.set(data);
        store.dispatch({ type: 'SET_USERDATA', data });
    }

    const redirect = () => {
        let search = props.location.search;
        if (!search) {
            props.history.push('/_rdn/home');
        } else {
            search = search.replace('?', '');
            props.history.push(search);
        }
    }

    return (
        <Fragment>
            <form onSubmit={submit} className="middle-scr">
                <input autoFocus="on" placeholder="Nama pengguna" type="text" id="username" onChange={change} />
                <input placeholder="Kata sandi" type="password" id="password" onChange={change} />
                <button disabled={disabled} type="submit">submit</button>
            </form>
        </Fragment>
    );
}

export default Auth;