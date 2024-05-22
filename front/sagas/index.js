import { all, fork, /*take, takeEvery, takeLatest, call, put, delay,*/ throttle } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';
// import axios from 'axios';

//fork(비동기 함수 호출)와 call(동기 함수 호출)
//fork를 실행하면 다음 작업을 바로 실행하지만 call을 하면 해당 요청의 응답을 기다린 다음에 다음 작업을 실행한다.
export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
}