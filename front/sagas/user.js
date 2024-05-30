import { all, fork, /*take, takeEvery,*/ takeLatest, put,  delay , call} from 'redux-saga/effects';
import axios from 'axios';
import { 
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
    LOAD_FOLLOWINGS_REQUEST, 
    LOAD_FOLLOWINGS_SUCCESS, 
    LOG_IN_FAILURE, 
    LOG_IN_REQUEST, 
    LOG_IN_SUCCESS, 
    LOG_OUT_FAILURE, 
    LOG_OUT_REQUEST, 
    LOG_OUT_SUCCESS, 
    SIGN_UP_FAILURE, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS, 
    UNFOLLOW_FAILURE, 
    UNFOLLOW_REQUEST, 
    UNFOLLOW_SUCCESS } from '../reducers/action';
import signup from '../pages/signup';

function followApi(data){
    return axios.patch(`/user/follow/${data}`)
}
function* follow(action) {
    try {
        // 그래서 여긴 call 호출
        const result = yield call(followApi, action.data)
        // yield delay(500);
        yield put ({
            type: FOLLOW_SUCCESS,
            // data: action.data,
            data: result.data
        });
    } catch (err){
        yield put({
            type: FOLLOW_FAILURE,
            data: err.response.data
            }
        );
    }
}

function unfollowApi(data){
    return axios.delete(`/user/follow/${data}`)
}
function* unfollow(action) {
    try {
        // 그래서 여긴 call 호출
        const result = yield call(unfollowApi, action.data)
        // yield delay(500);
        yield put ({
            type: UNFOLLOW_SUCCESS,
            // data: action.data,
            data: result.data
        });
    } catch (err){
        yield put({
            type: UNFOLLOW_FAILURE,
            data: err.response.data
            }
        );
    }
}

function loginApi(data){
    return axios.post(`/user/login`, data)
}
function* login(action) {
    try {
        // 그래서 여긴 call 호출
        const result = yield call(loginApi, action.data);
        // yield delay(500);
        yield put ({
            type: LOG_IN_SUCCESS,
            // data: action.data,
            data: result.data,
        });
    } catch (err){
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
            }
        );
    }
}
function changNicknameApi(data){
    return axios.patch(`/user/nickname`, {nickname: data})
}
function* changNickname(action) {
    try {
        // 그래서 여긴 call 호출
        const result = yield call(changNicknameApi, action.data);
        // yield delay(500);
        yield put ({
            type: CHANGE_NICKNAME_SUCCESS,
            // data: action.data,
            data: result.data,
        });
    } catch (err){
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data
            }
        );
    }
}

function logoutApi(){
    return axios.post(`/user/logout`)
}
function* logout() {
    try {
    // 그래서 여긴 call 호출
    yield call(logoutApi)
    // yield delay(500);
    yield put ({
        type: LOG_OUT_SUCCESS,
        // data: action.data,
        // data: result.data
    })
    }
    catch (err){
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data
            }
        )
    }
}

function signUpApi(data){
    return axios.post(`/user`,data)
}
function* signUp(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(signUpApi, action.data)
    // yield delay(500);
    yield put ({
        type: SIGN_UP_SUCCESS,
        // data: action.data,
        data: result.data
    })
    }
    catch (err){
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
            }
        )
    }
}

function loadFollowersApi(){
    return axios.get(`/user/followers`)
}
function* loadFollowers(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(loadFollowersApi)
    // yield delay(500);
    yield put ({
        type: LOAD_FOLLOWERS_SUCCESS,
        // data: action.data,
        data: result.data
    })
    }
    catch (err){
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data
            }
        )
    }
}
function loadFollowingsApi(){
    return axios.get(`/user/followings`)
}
function* loadFollowings(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(loadFollowingsApi)
    // yield delay(500);
    yield put ({
        type: LOAD_FOLLOWINGS_SUCCESS,
        // data: action.data,
        data: result.data
    })
    }
    catch (err){
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data
            }
        )
    }
}
function getInfoApi(){
    return axios.get(`/user`)
}
function* getInfo(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(getInfoApi, action.data)
    // yield delay(500);
    yield put ({
        type: GET_MY_INFO_SUCCESS,
        // data: action.data,
        data: result.data
    })
    }
    catch (err){
        yield put({
            type: GET_MY_INFO_FAILURE,
            error: err.response.data
            }
        )
    }
}
function* watchLoadFollowings(){
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchLoadFollowers(){
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchChangeNickname(){
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changNickname);
}
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout);
}
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchGetUserInfo(){
    yield takeLatest(GET_MY_INFO_REQUEST, getInfo);
}

export default function* userSaga() {
    yield all([
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchChangeNickname),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchGetUserInfo),
    ])
}