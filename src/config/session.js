const set = (userdata) => {
    const s = window.sessionStorage;
    s.setItem('ns_username', userdata.username);
    s.setItem('ns_password', userdata.password);
    s.setItem('ns_avatar', userdata.avatar);
    return true;
}

const get = (key) => {
    const s = window.sessionStorage;
    return s.getItem('ns_' + key);
}

const unset = () => {
    const s = window.sessionStorage;
    s.removeItem('ns_username');
    s.removeItem('ns_password');
    s.removeItem('ns_avatar');
    return true;
}

const session = {
    set,
    get,
    unset
};

export default session;