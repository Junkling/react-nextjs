import produce from "immer";
import { ADD_POST_TO_ME, CHANGE_NICKNAME_FAILURE, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, REMOVE_POST_OF_ME, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "./action";

export const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    loginError: null,

    isLoggingOut: false,
    isLoggedOut: false,
    logoutError: null,

    isSigningUp: false,
    isSignedUp: false,
    signUpError: null,

    isSigningOut: false,
    isSignedOut: false,
    signOutError: null,
    
    isChangingNickname : false,
    isChangedNickname : false,
    changeNicknameError :null,

    user: null,
    signUpData:{},
    loginData:{},
}
const dummyUser = (data) => ({
    ...data, 
    nickname:'junkling',
    id: 1,
    Posts:[{id:1}],
    Followings:[{nickname: '익명1'},{nickname: '익명2'},{nickname: '익명3'}],
    Followers:[{nickname: '익명1'},{nickname: '익명2'},{nickname: '익명3'}],
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
export const changeNicknameRequestAction = (data) => {
    return {
        type: CHANGE_NICKNAME_REQUEST,
        data
    }
}
export const changeNicknameSuccessAction = (data) => {
    return {
        type: CHANGE_NICKNAME_SUCCESS,
        data
    }
}
export const changeNicknameFailureAction = (data) => {
    return {
        type: CHANGE_NICKNAME_FAILURE,
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
    return produce(state, (draft)=> {
        switch (action.type){
            case LOG_IN_REQUEST:
                    draft.isLoggingIn= true;
                    draft.isLoggedIn= false;
                    draft.loginError=null;
                    break;
            case LOG_IN_SUCCESS:
                    draft.isLoggingIn= false;
                    draft.isLoggedIn= true;
                    draft.user= dummyUser(action.data);
                    break;
            case LOG_IN_FAILURE:
                    draft.isLoggingIn= false;
                    draft.isLoggedIn= false;
                    draft.loginError= action.error;
                    break;
            case LOG_OUT_REQUEST:
                    draft.isLoggingOut= true;
                    draft.isLoggedOut= false;
                    draft.logoutError= null;
                    break;
            case LOG_OUT_SUCCESS:
                    draft.isLoggingOut= false;
                    draft.isLoggedOut= true;
                    draft.user= null;
                    break;
            case LOG_OUT_FAILURE:
                    draft.isLoggingOut= false;
                    draft.isLoggedOut= false;
                    draft.logoutError= action.error;
                    break;
            case SIGN_UP_REQUEST:
                    draft.isSigningUp= true;
                    draft.isSignedUp= false;
                    draft.signUpError= null;
                    break;
            case SIGN_UP_SUCCESS:
                   draft.isSigningUp= false;
                   draft.isSignedUp= true;
                   draft.user= null;
                    break;
            case SIGN_UP_FAILURE:
                    draft.isSigningUp= false;
                    draft.isSignedUp= false;
                    draft.signUpError= action.error;
                    break;
            case CHANGE_NICKNAME_REQUEST:
                    draft.isChangingNickname= true;
                    draft.isChangedNickname= false;
                    draft.changeNicknameError= null;
                    break;
            case CHANGE_NICKNAME_SUCCESS:
                    draft.isChangingNickname= false;
                    draft.isChangedNickname= true;
                    break;
            case CHANGE_NICKNAME_FAILURE:
                    draft.isChangingNickname= false;
                    draft.isChangedNickname= false;
                    draft.changeNicknameError= action.error;
                    break;
            case ADD_POST_TO_ME:
                    draft.user.Posts.unshift({id: action.data});
                    break;
            case REMOVE_POST_OF_ME:
                    draft.user.Posts = draft.user.Posts.filter((i) => i.id === action.data);
                    break;
            default: break;
        }
    })
//     switch (action.type){
//         case LOG_IN_REQUEST:
//             console.log('reducer login');
//             return{
//                 ...state,
//                 isLoggingIn: true,
//                 isLoggedIn: false,
//                 loginError:null,
//             };
//         case LOG_IN_SUCCESS:
//             return{
//                 ...state,
//                 isLoggingIn: false,
//                 isLoggedIn: true,
//                 // user: action.user,
//                 user: dummyUser(action.data)
//             };
//         case LOG_IN_FAILURE:
//             return{
//                 ...state,
//                 isLoggingIn: false,
//                 isLoggedIn: false,
//                 loginError: action.error,
//             };
//         case LOG_OUT_REQUEST:
//             return{
//                 ...state,
//                 isLoggingOut: true,
//                 isLoggedOut: false,
//                 logoutError: null,
//             };
//         case LOG_OUT_SUCCESS:
//             return{
//                 ...state,
//                 isLoggingOut: false,
//                 isLoggedOut: true,
//                 user: null,
//             };
//         case LOG_OUT_FAILURE:
//             return{
//                 ...state,
//                 isLoggingOut: false,
//                 isLoggedOut: false,
//                 logoutError: action.error,
//             };
//         case SIGN_UP_REQUEST:
//             return{
//                 ...state,
//                 isSigningUp: true,
//                 isSignedUp: false,
//                 signUpError: null,
//             };
//         case SIGN_UP_SUCCESS:
//             return{
//                 ...state,
//                 isSigningUp: false,
//                 isSignedUp: true,
//                 user: null,
//             };
//         case SIGN_UP_FAILURE:
//             return{
//                 ...state,
//                 isSigningOut: false,
//                 isSignedOut: false,
//                 signUpError: action.error,
//             };
//         case CHANGE_NICKNAME_REQUEST:
//             return{
//                 ...state,
//                 isChangingNickname: true,
//                 isChangedNickname: false,
//                 changeNicknameError: null,
//             };
//         case CHANGE_NICKNAME_SUCCESS:
//             return{
//                 ...state,
//                 isChangingNickname: false,
//                 isChangedNickname: true,
//             };
//         case CHANGE_NICKNAME_FAILURE:
//             return{
//                 ...state,
//                 isChangingNickname: false,
//                 isChangedNickname: false,
//                 changeNicknameError: action.error,
//             };
//         case ADD_POST_TO_ME:
//             return{
//                 ...state,
//                 user: {
//                     ...state.user,
//                     Posts: [{id: action.data}, ...state.user.Posts],
//                 }
//             };
//         case REMOVE_POST_OF_ME:
//             return{
//                 ...state,
//                 user: {
//                     ...state.user,
//                     Posts: state.user.Posts.filter((i) => i.id === action.data),
//                 }
//             };
//         default: return state;
//     }
}

export default reducer;