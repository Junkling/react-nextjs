import { all, fork, /*take, takeEvery,*/ takeLatest, put,  delay , call} from 'redux-saga/effects';
import axios from 'axios';
import { 
    FOLLOW_FAILURE, 
    FOLLOW_REQUEST, 
    FOLLOW_SUCCESS, 
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
    return axios.post(`/api/follow`, data)
}
function* follow(action) {
    try {
        // 그래서 여긴 call 호출
        // const result = yield call(loginApi, action.data)
        console.log('saga follow');
        yield delay(500);
        yield put ({
            type: FOLLOW_SUCCESS,
            data: action.data,
            // data: result.data
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
    return axios.post(`/api/unfollow`, data)
}
function* unfollow(action) {
    try {
        // 그래서 여긴 call 호출
        // const result = yield call(loginApi, action.data)
        console.log('saga unfollow');
        yield delay(500);
        yield put ({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
            // data: result.data
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
    console.log(result);
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
function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout);
}
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
    ])
}