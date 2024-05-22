import { all, fork, /*take, takeEvery,*/ takeLatest, put,  delay } from 'redux-saga/effects';
import axios from 'axios';
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../reducers/action';
import signup from '../pages/signup';

function loginApi(data){
    return axios.post(`/api/login`, data)
}
function* login(action) {
    try {
        // 그래서 여긴 call 호출
        // const result = yield call(loginApi, action.data)
        console.log('saga login');
        yield delay(500);
        yield put ({
            type: LOG_IN_SUCCESS,
            data: action.data,
            // data: result.data
        });
    } catch (err){
        yield put({
            type: LOG_IN_FAILURE,
            data: err.response.data
            }
        );
    }
}

function logoutApi(data){
    return axios.post(`/api/logout`,data)
}
function* logout(action) {
    try {
    // 그래서 여긴 call 호출
    // const result = yield call(logoutApi, action.data)
    yield delay(500);
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
    return axios.post(`/api/signup`,data)
}
function* signUp(action) {
    try {
    // 그래서 여긴 call 호출
    // const result = yield call(signUpApi, action.data)
    yield delay(500);
    yield put ({
        type: SIGN_UP_SUCCESS,
        // data: action.data,
        // data: result.data
    })
    }
    catch (err){
        yield put({
            type: SIGN_UP_FAILURE,
            data: err.response.data
            }
        )
    }
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
        fork(watchLogin),
        fork(watchLogout),
    ])
}