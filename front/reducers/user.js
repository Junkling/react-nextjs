import produce from "immer";
import { 
    ADD_POST_TO_ME, 
    CHANGE_NICKNAME_FAILURE, 
    CHANGE_NICKNAME_REQUEST, 
    CHANGE_NICKNAME_SUCCESS, 
    FOLLOW_FAILURE, 
    FOLLOW_REQUEST, 
    FOLLOW_SUCCESS, 
    GET_MY_INFO_FAILURE, 
    GET_MY_INFO_REQUEST, 
    GET_MY_INFO_SUCCESS, 
    LOAD_FOLLOWERS_FAILURE, 
    LOAD_FOLLOWERS_REQUEST, 
    LOAD_FOLLOWERS_SUCCESS, 
    LOAD_FOLLOWINGS_FAILURE, 
    LOAD_FOLLOWINGS_REQUEST, 
    LOAD_FOLLOWINGS_SUCCESS, 
    LOG_IN_FAILURE, 
    LOG_IN_REQUEST, 
    LOG_IN_SUCCESS, 
    LOG_OUT_FAILURE, 
    LOG_OUT_REQUEST, 
    LOG_OUT_SUCCESS, 
    REMOVE_POST_OF_ME, 
    SIGN_UP_FAILURE, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS, 
    UNFOLLOW_FAILURE, 
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS } from "./action";

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

    isGettingInfo: false,
    isGotInfo: false,
    getInfoError: null,

    followLoading: false,
    followFinish: false,
    followError: null,

    unfollowLoading: false,
    unfollowFinish: false,
    unfollowError: null,

    loadFollowings: false,
    loadFollowingsFinish: false,
    loadFollowingsError: null,

    loadFollowers: false,
    loadFollowersFinish: false,
    loadFollowersError: null,
    
    isChangingNickname : false,
    isChangedNickname : false,
    changeNicknameError :null,

    user: null,
    signUpData:{},
    loginData:{},
}
// const dummyUser = (data) => ({
//     ...data, 
//     nickname:'junkling',
//     id: 1,
//     Posts:[{id:1}],
//     Followings:[{nickname: '익명1'},{nickname: '익명2'},{nickname: '익명3'}],
//     Followers:[{nickname: '익명1'},{nickname: '익명2'},{nickname: '익명3'}],
// })
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
                // 백엔드 연결 전
                // draft.user= dummyUser(action.data);
                draft.user= action.data;
                break;
            case LOG_IN_FAILURE:
                draft.isLoggingIn= false;
                draft.isLoggedIn= false;
                draft.loginError= action.error;
                break;
            case FOLLOW_REQUEST:
                draft.followLoading= true;
                draft.followFinish= false;
                draft.followError=null;
                break;
            case FOLLOW_SUCCESS:
                draft.followLoading= false;
                draft.followFinish= true;
                draft.user.Followings.push({id : action.data.UserId});
                break;
            case FOLLOW_FAILURE:
                draft.followLoading= false;
                draft.followFinish= false;
                draft.followError= action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading= true;
                draft.unfollowFinish= false;
                draft.unfollowError=null;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading= false;
                draft.unfollowFinish= true;
                draft.user.Followings = draft.user.Followings.filter((v)=> v.id !== action.data.UserId);
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading= false;
                draft.unfollowFinish= false;
                draft.unfollowError= action.error;
                break;
            case LOAD_FOLLOWERS_REQUEST:
                draft.loadFollowers= true;
                draft.loadFollowersFinish= false;
                draft.loadFollowersError=null;
                break;
            case LOAD_FOLLOWERS_SUCCESS:
                draft.loadFollowers= false;
                draft.loadFollowersFinish= true;
                draft.user.Followers = action.data;
                break;
            case LOAD_FOLLOWERS_FAILURE:
                draft.loadFollowers= false;
                draft.loadFollowersFinish= false;
                draft.loadFollowersError= action.error;
                break;
            case LOAD_FOLLOWINGS_REQUEST:
                draft.loadFollowings= true;
                draft.loadFollowingsFinish= false;
                draft.loadFollowingsError=null;
                break;
            case LOAD_FOLLOWINGS_SUCCESS:
                draft.loadFollowings= false;
                draft.loadFollowingsFinish= true;
                draft.user.Followings = action.data;
                break;
            case LOAD_FOLLOWINGS_FAILURE:
                draft.loadFollowings= false;
                draft.loadFollowingsFinish= false;
                draft.loadFollowingsError= action.error;
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
            case GET_MY_INFO_REQUEST:
                draft.isGettingInfo= true;
                draft.isGotInfo= false;
                draft.getInfoError= null;
                break;
            case GET_MY_INFO_SUCCESS:
                draft.isGettingInfo= false;
                draft.isGotInfo= true;
                draft.user= action.data;
                break;
            case GET_MY_INFO_FAILURE:
                draft.isGettingInfo= false;
                draft.isGotInfo= false;
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
                draft.user.nickname = action.data.nickname;
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