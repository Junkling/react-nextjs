import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from "./action";
import shortId from "shortid";
import produce from 'immer';
import faker from "faker";

export const initialState = {
    mainPosts: [{
        id:1,
        User: {
            id: 1,
            nickname: '준혁',
        },
        title: '제목1',
        content: '첫번째 게시글 #해시태그 #김지원 #기본프로필들',
        Image:[
            {
                id: shortId.generate(),
                src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MDRfMTAx%2FMDAxNzE0ODAwMDUzMDU3.LFN6-TDpKQtfA98_h66LEwjZIjC5sJmuwTLAIt4YVXMg.RJW1zevKKKT7-rkTDCr0NQ5b_aMd367fpMj2VUan_uAg.JPEG%2F%25B1%25E8%25C1%25F6%25BF%25F8_%25C6%25D2%25B9%25CC%25C6%25C35.jpg&type=sc960_832'
            },{
                id: shortId.generate(),
                src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150807_176%2Fe2voo_1438935101901YtpDh_PNG%2F%25B9%25AB%25C1%25A6-1.png&type=sc960_832'
            },{
                id: shortId.generate(),
                src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150122_297%2Fzikil337_1421903875708eed71_PNG%2F20150115_130309.png&type=sc960_832'
            },
        ],
        Comments: [{
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: '익명의 사자',
            },
            content: '너무 예뻐요'
        },
        {
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: '익명의 토끼',
            },
            content: '추천하고 갑니다.'
        }]
    }],
    imagePath:[],

    hasNextPosts: true,

    postLoading: false,
    postLoaded: false,
    postLoadError: null,

    postAdding: false,
    postAdded: false,
    postAddError: null,

    postRemoving: false,
    postRemoved: false,
    postRemoveError: null,

    commentAdding: false,
    commentAdded: false,
    commentAddError: null,
}
export const generageDummyPost = (num) => Array(num).fill().map((v, i) => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.name.findName()
    },
    content: faker.lorem.paragraph(),
    Image:[
        {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150122_297%2Fzikil337_1421903875708eed71_PNG%2F20150115_130309.png&type=sc960_832',
        }
    ],
    Comments: [
        {User: {
            id: shortId.generate(),
            nickname: faker.name.findName()
        },
        content: faker.lorem.sentence(),}
    ],
}));

initialState.mainPosts = initialState.mainPosts.concat(
    generageDummyPost(10)
);

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

const dummyPost = (data) => ({
    id: data.id,
    title: '준혁님의 게시글',
    content: data.content,
    User: {
        id: 1,
        nickname: '준혁',
    },
    Image: [],
    Comments: [],
})
const dummyComment = (data) => ({
    id: shortId.generate(),
    User: {
        id: 1,
        nickname: '익명 사용자',
    },
    content: data
})

const reducer = (state = initialState, action) => produce(state, (draft)=>{
    switch (action.type){
        case LOAD_POSTS_REQUEST:
            draft.postLoading= true;
            draft.postLoaded= false;
            draft.postLoadError= null;
            break;
        case LOAD_POSTS_SUCCESS:
            // draft.mainPosts.unshift(action.data);
            draft.postLoading= false;
            draft.postLoaded= true;
            draft.mainPosts = draft.mainPosts.concat(action.data);
            draft.hasNextPosts = draft.mainPosts.length < 50;
            break
        case LOAD_POSTS_FAILURE:
            draft.postLoading= false;
            draft.postLoadError= action.error;
            break;
        case ADD_POST_REQUEST:
            draft.postAdding= true;
            draft.postAdded= false;
            draft.postAddError= null;
            break;
        case ADD_POST_SUCCESS:
            draft.mainPosts.unshift(dummyPost(action.data));
            draft.postAdding= false;
            draft.postAdded= true;
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
            draft.mainPosts.unshift(draft.mainPosts.filter((i) => i.id !== action.data));
            draft.postRemoving= false;
            draft.postRemoved= true;
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
            const findPost = draft.mainPosts.find((i) => i.id === action.data.postId);
            findPost.Comments.unshift(dummyComment(action.data.content));
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