const set = (userdata) => {
    sessionStorage.setItem('userData', JSON.stringify(userdata));
    return true;
}

const get = (key) => {
    const s = JSON.parse(window.sessionStorage.getItem('userData'));
    if (key === undefined) {
        return s;
    }
    if (!s) { return false }
    return s[key];
}

const unset = () => {
    window.sessionStorage.removeItem('userData');
    return true;
}

const session = {
    set,
    get,
    unset
};

export default session;