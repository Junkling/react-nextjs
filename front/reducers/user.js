import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "./action";

export const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    loginError: null,

    isLoggingOut: false,
    isLoggedOut: false,
    logoutError: null,

    isSigningUp: false,
    isSignedUp: false,
    SignUpError: null,
    
    user: null,
    signUpData:{},
    loginData:{},
}
const dummyUser = (data) => ({
    ...data, 
    nickname:'junkling',
    id: 1,
    Posts:[],
    Followings:[],
    Followers:[],
})
export const loginAction = (data) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(loginRequestAction());
        axios.post('/api/login').then((res)=>{
            dispatch(loginSuccessAction(res.data));
        })
        .catch((err)=>{
            dispatch(loginFailureAction(err))
        })
        // type: 'LOG_IN',
        // data
    }
}

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data
    }
}
export const loginSuccessAction = (data) => {
    return {
        type: LOG_IN_SUCCESS,
        data
    }
}
export const loginFailureAction = (data) => {
    return {
        type: LOG_IN_FAILURE,
        data
    }
}
export const logoutRequestAction = (data) => {
    return {
        type: LOG_OUT_REQUEST,
        data
    }
}
export const logoutSuccessAction = (data) => {
    return {
        type: LOG_OUT_SUCCESS,
        data
    }
}
export const loginoutureAction = (data) => {
    return {
        type: LOG_OUT_FAILURE,
        data
    }
}

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case LOG_IN_REQUEST:
            console.log('reducer login');
            return{
                ...state,
                isLoggingIn: true,
                isLoggedIn: false,
                loginError:null,
            };
        case LOG_IN_SUCCESS:
            return{
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                // user: action.user,
                user: dummyUser(action.data)
            };
        case LOG_IN_FAILURE:
            return{
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
                loginError: action.error,
            };
        case LOG_OUT_REQUEST:
            return{
                ...state,
                isLoggingOut: true,
                isLoggedOut: false,
                logoutError: null,
            };
        case LOG_OUT_SUCCESS:
            return{
                ...state,
                isLoggingOut: false,
                isLoggedOut: true,
                user: null,
            };
        case LOG_OUT_FAILURE:
            return{
                ...state,
                isLoggingOut: false,
                isLoggedOut: false,
                logoutError: action.error,
            };
        case SIGN_UP_REQUEST:
            return{
                ...state,
                isSigningUp: true,
                isSignedUp: false,
                signUpError: null,
            };
        case SIGN_UP_SUCCESS:
            return{
                ...state,
                isSigningUp: false,
                isSignedUp: true,
                user: null,
            };
        case SIGN_UP_FAILURE:
            return{
                ...state,
                isSigningOut: false,
                isSignedOut: false,
                signUpError: action.error,
            };
        default: return state;
    }
}

export default reducer;