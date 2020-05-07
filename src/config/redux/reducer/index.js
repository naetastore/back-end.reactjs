const globalState = {
    userData: {},
    pageLoading: false,
    progressLoaded: 0,
    globals: [],
    categories: [],
    posts: []
}

const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        case 'SET_USERDATA':
            return {
                ...state,
                userData: action.data
            }
        case 'SET_LOADING':
            return {
                ...state,
                pageLoading: action.data
            }
        case 'SET_PROGRESS':
            return {
                ...state,
                progressLoaded: action.data
            }
        case 'SET_GLOBALS':
            return {
                ...state,
                globals: action.data
            }
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.data
            }
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.data
            }

        default:
            break
    }

    return state;
}

export default rootReducer;