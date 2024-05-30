import { all, fork, takeLatest, put, delay , call} from 'redux-saga/effects';
import axios from 'axios';
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_TO_ME, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_OF_ME, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, UNLIKE_POST_FAILURE, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS } from '../reducers/action';
// import shortId from 'shortid';
// import { generageDummyPost } from '../reducers/post';

function loadPostsApi(){
    return axios.get(`/posts`)
}
function* loadPosts(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(loadPostsApi)
    // yield delay(500);
    console.log("LOAD_POSTS_SUCCESS 실행");
    yield put ({
        type: LOAD_POSTS_SUCCESS,
        // data: generageDummyPost(10),
        data: result.data
    });
    } catch (err){
        console.log(err)
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: err.response.data
            }
        )
    }
}
function likePostApi(data){
    return axios.patch(`/post/${data}/like`)
}
function* likePost(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(likePostApi, action.data)
    // yield delay(500);
    yield put ({
        type: LIKE_POST_SUCCESS,
        // data: generageDummyPost(10),
        data: result.data
    });
    } catch (err){
        console.log(err)
        yield put({
            type: LIKE_POST_FAILURE,
            data: err.response.data
            }
        )
    }
}
function unlikePostApi(data){
    return axios.delete(`/post/${data}/like`)
}
function* unlikePost(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(unlikePostApi,action.data)
    // yield delay(500);
    yield put ({
        type: UNLIKE_POST_SUCCESS,
        // data: generageDummyPost(10),
        data: result.data
    });
    } catch (err){
        console.log(err)
        yield put({
            type: UNLIKE_POST_FAILURE,
            data: err.response.data
            }
        )
    }
}
function addPostApi(data){
    return axios.post(`/post`,{content: data});
}
function* addPost(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(addPostApi, action.data)
    // yield delay(500);
    // const id = shortId.generate();
    yield put ({
        type: ADD_POST_SUCCESS,
        data: result.data,
        // data: {
        //     id,
        //     content: action.data,
        // },
    });
    yield put ({
        type: ADD_POST_TO_ME,
        data: result.data.id,
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
    return axios.delete(`/post/${data}`)
}
function* removePost(action) {
    try {
    // yield delay(500);
    const result = yield call(removePostApi,action.data);
    yield put ({
        type: REMOVE_POST_SUCCESS,
        data: result.data,
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
function addCommentApi(data){
    return axios.post(`/post/${data.postId}/comment`, data);
}
function* addComment(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(addCommentApi, action.data);
    // yield delay(500);
    yield put ({
        type: ADD_COMMENT_SUCCESS,
        // data: action.data,
        data: result.data,
    })
    }
    catch (err){
        console.log(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
            }
        )
    }
}
function* watchLoadPosts(){
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLikePosts(){
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePosts(){
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
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
        fork(watchLoadPosts),
        fork(watchLikePosts),
        fork(watchUnlikePosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ]);
}