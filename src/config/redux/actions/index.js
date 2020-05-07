import store from '../store';
import { api } from '../../../services/api';

const setGlobals = async () => {
    store.dispatch({ type: 'SET_LOADING', data: true });
    try {
        const response = await api.get('generals');
        store.dispatch({ type: 'SET_GLOBALS', data: response.data });
        store.dispatch({ type: 'SET_LOADING', data: false });
        return true;
    } catch (err) {
        console.error(err);
        store.dispatch({ type: 'SET_LOADING', data: false });
        return false;
    }
}
const setCategories = async () => {
    store.dispatch({ type: 'SET_LOADING', data: true });
    try {
        const response = await api.get('categories');
        store.dispatch({ type: 'SET_CATEGORIES', data: response.data });
        store.dispatch({ type: 'SET_LOADING', data: false });
        return true;
    } catch (err) {
        console.error(err);
        store.dispatch({ type: 'SET_LOADING', data: false });
        return false;
    }
}
const setPosts = async () => {
    store.dispatch({ type: 'SET_LOADING', data: true });
    try {
        const response = await api.get('posts');
        store.dispatch({ type: 'SET_POSTS', data: response.data });
        store.dispatch({ type: 'SET_LOADING', data: false });
        return true;
    } catch (err) {
        console.error(err);
        store.dispatch({ type: 'SET_LOADING', data: false });
        return false;
    }
}

export const reduxActions = {
    setGlobals,
    setCategories,
    setPosts
}