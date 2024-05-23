import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_TO_ME, REMOVE_POST_FAILURE, REMOVE_POST_OF_ME, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from '../reducers/action';
import shortId from 'shortid';

function addPostApi(){
    return axios.post(`/api/post`)
}
function* addPost(action) {
    try {
    // 그래서 여긴 call 호출
    // const result = yield call(addPostApi)
    yield delay(500);
    const id = shortId.generate();
    yield put ({
        type: ADD_POST_SUCCESS,
        data: {
            id,
            content: action.data,
        },
        // data: result.data
    });
    yield put ({
        type: ADD_POST_TO_ME,
        data: id,
    });} catch (err){
        console.log(err)
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
            }
        )
    }
}
function removePostApi(data){
    return axios.delete(`/api/post/${data.postId}`)
}
function* removePost(action) {
    try {
    yield delay(500);
    yield put ({
        type: REMOVE_POST_SUCCESS,
        data: action.data,
    });
    yield put ({
        type: REMOVE_POST_OF_ME,
        data: action.data,
    });
    }
    catch (err){
        console.log(err)
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data
            }
        )
    }
}
function addCommentApi(){
    return axios.post(`/api/comment/${data.postId}`, data)
}
function* addComment(action) {
    try {
    // 그래서 여긴 call 호출
    // const result = yield call(addPostApi)
    yield delay(500);
    yield put ({
        type: ADD_COMMENT_SUCCESS,
        data: action.data,
        // data: result.data
    })
    }
    catch (err){
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
            }
        )
    }
}
function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

//fork(비동기 함수 호출)와 call(동기 함수 호출)
//fork를 실행하면 다음 작업을 바로 실행하지만 call을 하면 해당 요청의 응답을 기다린 다음에 다음 작업을 실행한다.
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ]);
}