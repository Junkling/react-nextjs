import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LOAD_POSTS_BY_HASHTAG_FAILURE, LOAD_POSTS_BY_HASHTAG_REQUEST, LOAD_POSTS_BY_HASHTAG_SUCCESS, LOAD_POSTS_BY_USER_FAILURE, LOAD_POSTS_BY_USER_REQUEST, LOAD_POSTS_BY_USER_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, REMOVE_IMAGES_REQUEST, REMOVE_IMAGES_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, RETWEET_POST_FAILURE, RETWEET_POST_REQUEST, RETWEET_POST_SUCCESS, UNLIKE_POST_FAILURE, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS } from "./action";
import shortId from "shortid";
import produce from 'immer';
// import faker from "faker";

export const initialState = {
    mainPosts: [],
    imagePath:[],
    singlePost: null,

    hasNextPosts: true,

    postLoading: false,
    postLoaded: false,
    postLoadError: null,

    singlePostLoading: false,
    singlePostLoaded: false,
    singlePostLoadError: null,

    postAdding: false,
    postAdded: false,
    postAddError: null,

    postRemoving: false,
    postRemoved: false,
    postRemoveError: null,

    likePostLoading: false,
    likePostFinish: false,
    likePostError: null,

    uploadImagesLoading: false,
    uploadImagesFinish: false,
    uploadImagesError: null,

    removeImagesLoading: false,
    removeImagesFinish: false,
    removeImagesError: null,

    unlikePostLoading: false,
    unlikePostFinish: false,
    unlikePostError: null,

    retweetPostLoading: false,
    retweetPostFinish: false,
    retweetPostError: null,

    commentAdding: false,
    commentAdded: false,
    commentAddError: null,
}
// export const generageDummyPost = (num) => Array(num).fill().map((v, i) => ({
//     id: shortId.generate(),
//     User: {
//         id: shortId.generate(),
//         nickname: faker.name.findName()
//     },
//     content: faker.lorem.paragraph(),
//     Image:[
//         {
//             src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150122_297%2Fzikil337_1421903875708eed71_PNG%2F20150115_130309.png&type=sc960_832',
//         }
//     ],
//     Comments: [
//         {User: {
//             id: shortId.generate(),
//             nickname: faker.name.findName()
//         },
//         content: faker.lorem.sentence(),}
//     ],
// }));

// export const loadPosts =(data) => {
//     return{
//         type: LOAD_POSTS_REQUEST,
//         data,
//     }
// }

// initialState.mainPosts = initialState.mainPosts.concat(
//     loadPosts()
// );

export const addPost =(data) => {
    return{
        type: ADD_POST_REQUEST,
        data,
    }
}
export const addComment =(data) => {
    return{
        type: ADD_COMMENT_REQUEST,
        data,
    }
}

// const dummyPost = (data) => ({
//     id: data.id,
//     title: '준혁님의 게시글',
//     content: data.content,
//     User: {
//         id: 1,
//         nickname: '준혁',
//     },
//     Image: [],
//     Comments: [],
// })
// const dummyComment = (data) => ({
//     id: shortId.generate(),
//     User: {
//         id: 1,
//         nickname: '익명 사용자',
//     },
//     content: data
// })

const reducer = (state = initialState, action) => produce(state, (draft)=>{
    switch (action.type){
        case LOAD_POSTS_REQUEST:
        case LOAD_POSTS_BY_USER_REQUEST:
        case LOAD_POSTS_BY_HASHTAG_REQUEST:
            draft.postLoading= true;
            draft.postLoaded= false;
            draft.postLoadError= null;
            break;
        case LOAD_POSTS_SUCCESS:
        case LOAD_POSTS_BY_HASHTAG_SUCCESS:
        case LOAD_POSTS_BY_USER_SUCCESS:
            // draft.mainPosts.unshift(action.data);
            draft.postLoading= false;
            draft.postLoaded= true;
            draft.mainPosts = draft.mainPosts.concat(action.data);
            draft.hasNextPosts = action.data.length === 5;
            break
        case LOAD_POSTS_FAILURE:
        case LOAD_POSTS_BY_HASHTAG_FAILURE:
        case LOAD_POSTS_BY_USER_FAILURE:
            draft.postLoading= false;
            draft.postLoadError= action.error;
            break;
        case LOAD_POST_REQUEST:
            draft.singlePostLoading= true;
            draft.singlePostLoaded= false;
            draft.singlePostLoadError= null;
            break;
        case LOAD_POST_SUCCESS:
            // draft.mainPosts.unshift(action.data);
            draft.singlePostLoading= false;
            draft.singlePostLoaded= true;
            draft.singlePost = action.data;
            break
        case LOAD_POST_FAILURE:
            draft.singlePostLoading= false;
            draft.singlePostLoadError= action.error;
            break;
        case LIKE_POST_REQUEST:
            draft.likePostLoading= true;
            draft.likePostFinish= false;
            draft.likePostError= null;
            break;
        case LIKE_POST_SUCCESS:{
            const post = draft.mainPosts.find((v)=> v.id === action.data.PostId);
            post.Hearters.push({id: action.data.UserId});
            draft.likePostLoading= false;
            draft.likePostFinish= true;
            break}
        case LIKE_POST_FAILURE:
            draft.likePostError= action.error;
            draft.likePostLoading= false;
            break;
        case RETWEET_POST_REQUEST:
            draft.retweetPostLoading= true;
            draft.retweetPostFinish= false;
            draft.retweetPostError= null;
            break;
        case RETWEET_POST_SUCCESS:{
            draft.retweetPostLoading= false;
            draft.retweetPostFinish= true;
            draft.mainPosts.unshift(action.data);
            break}
        case RETWEET_POST_FAILURE:
            draft.retweetPostError= action.error;
            draft.retweetPostLoading= false;
            break;
        case UPLOAD_IMAGES_REQUEST:
            draft.uploadImagesLoading= true;
            draft.uploadImagesFinish= false;
            draft.uploadImagesError= null;
            break;
        case UPLOAD_IMAGES_SUCCESS:{
            draft.imagePath= action.data;
            draft.uploadImagesLoading= false;
            draft.uploadImagesFinish= true;
            break}
        case UPLOAD_IMAGES_FAILURE:
            draft.uploadImagesError= action.error;
            draft.uploadImagesLoading= false;
            break;
        case REMOVE_IMAGES_REQUEST:
            draft.removeImagesLoading= true;
            draft.removeImagesFinish= false;
            draft.removeImagesError= null;
            break;
        case REMOVE_IMAGES_SUCCESS:{
            draft.imagePath= draft.imagePath.filter((item,index)=> index !== action.data);
            draft.removeImagesLoading= false;
            draft.removeImagesFinish= true;
            break}
        case REMOVE_POST_FAILURE:
            draft.removeImagesError= action.error;
            draft.removeImagesLoading= false;
            break;
        case UNLIKE_POST_REQUEST:
            draft.unlikePostLoading= true;
            draft.unlikePostFinish= false;
            draft.unlikePostError= null;
            break;
        case UNLIKE_POST_SUCCESS:{
            const post = draft.mainPosts.find((v)=> v.id === action.data.PostId);
            post.Hearters = post.Hearters.filter((v) => v.id !== action.data.UserId);
            draft.unlikePostLoading= false;
            draft.unlikePostFinish= true;
            break}
        case UNLIKE_POST_FAILURE:
            draft.unlikePostLoading= false;
            draft.unlikePostError= action.error;
            break;    
        case ADD_POST_REQUEST:
            draft.postAdding= true;
            draft.postAdded= false;
            draft.postAddError= null;
            break;
        case ADD_POST_SUCCESS:
            draft.mainPosts.unshift(action.data);
            draft.postAdding= false;
            draft.postAdded= true;
            draft.imagePath = [];
            break
        case ADD_POST_FAILURE:
            draft.postAdding= false;
            draft.postAddError= action.error;
            break;
        case REMOVE_POST_REQUEST:
            draft.postRemoving= true;
            draft.postRemoved= false;
            draft.postRemoveError= null;
            break;
        case REMOVE_POST_SUCCESS:
            draft.postRemoving= false;
            draft.postRemoved= true;
            draft.mainPosts= draft.mainPosts.filter((i) => i.id !== action.data.PostId);
            break;
        case REMOVE_POST_FAILURE:
            draft.postRemoving= false;
            draft.postRemoveError= action.error
            break;
        case ADD_COMMENT_REQUEST:
            draft.commentAdding= true; 
            draft.commentAdded= false; 
            draft.commentAddError= null;
            break;
        case ADD_COMMENT_SUCCESS:{
            const findPost = draft.mainPosts.find((i) => i.id === action.data.PostId);
            findPost.Comments.unshift(action.data);
            draft.commentAdding= false;
            draft.commentAdded= true;
            break;
        }
        case ADD_COMMENT_FAILURE:
            draft.commentAdding= false;
            draft.commentAddError= action.error;
            break;
        default: break;
    }
});
    // switch (action.type){
    //     case ADD_POST_REQUEST:
    //         return{
    //             ...state,
    //             postAdding: true,
    //             postAdded: false,
    //             postAddError: null,
    //         };
    //     case ADD_POST_SUCCESS:
    //         return{
    //             ...state,
    //             mainPosts: [dummyPost(action.data), ...state.mainPosts],
    //             postAdding: false,
    //             postAdded: true,
    //         };
    //     case ADD_POST_FAILURE:
    //         return{
    //             ...state,
    //             postAdding: false,
    //             postAddError: action.error,
    //         };
    //     case REMOVE_POST_REQUEST:
    //         return{
    //             ...state,
    //             postRemoving: true,
    //             postRemoved: false,
    //             postRemoveError: null,
    //         };
    //     case REMOVE_POST_SUCCESS:
    //         return{
    //             ...state,
    //             mainPosts: state.mainPosts.filter((i) => i.id !== action.data),
    //             postRemoving: false,
    //             postRemoved: true,
    //         };
    //     case REMOVE_POST_FAILURE:
    //         return{
    //             ...state,
    //             postRemoving: false,
    //             postRemoveError: action.error,
    //         };
    //     case ADD_COMMENT_REQUEST:
    //         return{
    //             ...state,
    //             commentAdding: true, 
    //             commentAdded: false, 
    //             commentAddError: null, 
    //         };
    //     case ADD_COMMENT_SUCCESS:{
    //         const postIndex = state.mainPosts.findIndex((v)=>v.id === action.data.postId)
    //         const findPost = state.mainPosts[postIndex];
    //         findPost.Comments = [dummyComment(action.data.content),...findPost.Comments];
    //         const addedMainPosts = [...state.mainPosts];
    //         addedMainPosts[postIndex] = findPost;
    //         return{
    //             ...state,
    //             addedMainPosts,
    //             commentAdding: false,
    //             commentAdded: true,
    //         };
    //     }
    //     case ADD_COMMENT_FAILURE:
    //         return{
    //             ...state,
    //             commentAdding: false,
    //             commentAddError: action.error,
    //         };
    //     default: return state;
    // }

export default reducer;