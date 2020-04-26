const globalState = {
    userData: {},
    pageLoading: false
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

        default:
            break
    }

    return state;
}

export default rootReducer;