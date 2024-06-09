import { all, fork, takeLatest, put, delay , call} from 'redux-saga/effects';
import axios from 'axios';
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_TO_ME, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LOAD_POSTS_BY_HASHTAG_FAILURE, LOAD_POSTS_BY_HASHTAG_REQUEST, LOAD_POSTS_BY_HASHTAG_SUCCESS, LOAD_POSTS_BY_USER_FAILURE, LOAD_POSTS_BY_USER_REQUEST, LOAD_POSTS_BY_USER_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, REMOVE_IMAGES_FAILURE, REMOVE_IMAGES_REQUEST, REMOVE_IMAGES_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_OF_ME, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, RETWEET_POST_FAILURE, RETWEET_POST_REQUEST, RETWEET_POST_SUCCESS, UNLIKE_POST_FAILURE, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS } from '../reducers/action';
// import shortId from 'shortid';
// import { generageDummyPost } from '../reducers/post';

function loadPostsApi(lastId){
    return axios.get(`/posts?lastId=${lastId || 0}`)
}
function* loadPosts(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(loadPostsApi, action.lastId)
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
            error: err.response.data
            }
        )
    }
}
function loadPostsByHashtagApi(data,lastId){
    return axios.get(`/posts/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`)
}
function* loadPostsByHashtag(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(loadPostsByHashtagApi, action.data,action.lastId)
    // yield delay(500);
    console.log("LOAD_POSTS_SUCCESS 실행");
    yield put ({
        type: LOAD_POSTS_BY_HASHTAG_SUCCESS,
        // data: generageDummyPost(10),
        data: result.data
    });
    } catch (err){
        console.log(err)
        yield put({
            type: LOAD_POSTS_BY_HASHTAG_FAILURE,
            error: err.response.data
            }
        )
    }
}
function loadPostsByUserApi(data,lastId){
    return axios.get(`/posts/user/${data}?lastId=${lastId || 0}`)
}
function* loadPostsByUser(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(loadPostsByUserApi, action.data,action.lastId)
    // yield delay(500);
    console.log("LOAD_POSTS_SUCCESS 실행");
    yield put ({
        type: LOAD_POSTS_BY_USER_SUCCESS,
        // data: generageDummyPost(10),
        data: result.data
    });
    } catch (err){
        console.log(err)
        yield put({
            type: LOAD_POSTS_BY_USER_FAILURE,
            error: err.response.data
            }
        )
    }
}
function loadPostApi(postId){
    return axios.get(`/post/${postId}`)
}
function* loadPost(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(loadPostApi, action.data)
    // yield delay(500);
    console.log("LOAD_POSTS_SUCCESS 실행");
    yield put ({
        type: LOAD_POST_SUCCESS,
        // data: generageDummyPost(10),
        data: result.data
    });
    } catch (err){
        console.log(err)
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response.data
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
            error: err.response.data
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
            error: err.response.data
            }
        )
    }
}
function addPostApi(data){
    return axios.post(`/post`, data);
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
            error: err.response.data
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
            error: err.response.data
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
            error: err.response.data
            }
        )
    }
}
function retweetPostApi(data){
    return axios.post(`/post/${data}/retweet`);
}
function* retweetPost(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(retweetPostApi, action.data);
    // yield delay(500);
    yield put ({
        type: RETWEET_POST_SUCCESS,
        // data: action.data,
        data: result.data,
    })
    }
    catch (err){
        console.log(err);
        yield put({
            type: RETWEET_POST_FAILURE,
            error: err.response.data
            }
        )
    }
}
function uploadImagesApi(data){
    return axios.post(`/post/images`, data);
}
function* uploadImages(action) {
    try {
    // 그래서 여긴 call 호출
    const result = yield call(uploadImagesApi, action.data);
    // yield delay(500);
    yield put ({
        type: UPLOAD_IMAGES_SUCCESS,
        // data: action.data,
        data: result.data,
    })
    }
    catch (err){
        console.log(err);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data
            }
        )
    }
}
// 실제로 삭제할 때를 위한 api 연동
// function removeImageApi(data){
//     return axios.delete(`/post/images`, data);
// }
function* removeImage(action) {
    try {
    // 그래서 여긴 call 호출
    // const result = yield call(removeImagesApi, action.data);
    // yield delay(500);
    yield put ({
        type: REMOVE_IMAGES_SUCCESS,
        data: action.data,
        // data: result.data,
    })
    }
    catch (err){
        console.log(err);
        yield put({
            type: REMOVE_IMAGES_FAILURE,
            data: err.response.data
            }
        )
    }
}
function* watchRetweetPost(){
    yield takeLatest(RETWEET_POST_REQUEST, retweetPost);
}
function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRemoveImage(){
    yield takeLatest(REMOVE_IMAGES_REQUEST, removeImage);
}
function* watchLoadPosts(){
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadPostsByUser(){
    yield takeLatest(LOAD_POSTS_BY_USER_REQUEST, loadPostsByUser);
}
function* watchLoadPostsByHashTag(){
    yield takeLatest(LOAD_POSTS_BY_HASHTAG_REQUEST, loadPostsByHashtag);
}
function* watchLoadPost(){
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
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
        fork(watchRetweetPost),
        fork(watchUploadImages),
        fork(watchRemoveImage),
        fork(watchLoadPosts),
        fork(watchLoadPost),
        fork(watchLoadPostsByUser),
        fork(watchLoadPostsByHashTag),
        fork(watchLikePosts),
        fork(watchUnlikePosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ]);
}