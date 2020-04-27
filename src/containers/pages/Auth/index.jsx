import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { REST } from '../../../config/REST';
import store from '../../../config/redux/store';
import session from '../../../config/session';

function Auth(props) {
    const [data, setData] = useState({ username: '', password: '' });
    const [disabled, setDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!initialized) {
            checkForms();
        }
    });

    const checkForms = () => {
        if (data.username && data.password) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        setInitialized(true);
    }

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

        setIsLoading(true);

        axios.get(`${REST.server.url}api/users`, { params: data })
            .then(res => {
                if (res.data.role_id > 1) return;

                res.data['password'] = data.password;
                setUser(res.data);

                setIsLoading(false);

                redirect();
            }).catch(err => {
                console.log(err.response);
                const errorMessage = err.response.data.message;
                setErrorMessage(errorMessage);
                setIsLoading(false);
            });
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
                <div className="text-danger"
                    style={{
                        position: "absolute",
                        top: "40vh"
                    }}
                >{errorMessage}</div>
                <h2>Log In</h2>
                <input
                    className="ml-4"
                    autoFocus="on"
                    placeholder="Nama pengguna"
                    type="text"
                    id="username"
                    onChange={change} />
                <input
                    placeholder="Kata sandi"
                    type="password"
                    id="password"
                    onChange={change} />
                <button
                    className="ml-4"
                    disabled={disabled | isLoading}
                    type="submit"
                    style={{ width: "100px" }}
                >
                    {isLoading ? 'tunggu..' : 'Masuk'}
                </button>
            </form>
        </Fragment>
    );
}

export default Auth;