import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from "./action";

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
            {src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MDRfMTAx%2FMDAxNzE0ODAwMDUzMDU3.LFN6-TDpKQtfA98_h66LEwjZIjC5sJmuwTLAIt4YVXMg.RJW1zevKKKT7-rkTDCr0NQ5b_aMd367fpMj2VUan_uAg.JPEG%2F%25B1%25E8%25C1%25F6%25BF%25F8_%25C6%25D2%25B9%25CC%25C6%25C35.jpg&type=sc960_832'},
            {src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150807_176%2Fe2voo_1438935101901YtpDh_PNG%2F%25B9%25AB%25C1%25A6-1.png&type=sc960_832'},
            {src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150122_297%2Fzikil337_1421903875708eed71_PNG%2F20150115_130309.png&type=sc960_832'},
        ],
        Comments: [{
            User: {
                nickname: '익명의 사자',
            },
            content: '너무 예뻐요'
        },
        {
            User: {
                nickname: '익명의 토끼',
            },
            content: '추천하고 갑니다.'
        }]
    }],
    imagePath:[],
    postAdding: false,
    postAdded: false,
    postAddError: null,

    commentAdding: false,
    commentAdded: false,
    commentAddError: null,
}

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

const dummyPost = {
    id:2,
    title: '더미 제목',
    content: '더미 데이터 추가',
    User: {
        id: 1,
        nickname: '준혁',
    },
    Image: [],
    Comments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST_REQUEST:
            return{
                ...state,
                postAdding: true,
                postAdded: false,
                postAddError: null,
            };
        case ADD_POST_SUCCESS:
            return{
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdding: false,
                postAdded: true,
            };
        case ADD_POST_FAILURE:
            return{
                ...state,
                postAdding: false,
                postAddError: action.error,
            };
        case ADD_COMMENT_REQUEST:
            return{
                ...state,
                commentAdding: true, 
                commentAdded: false, 
                commentAddError: null, 
            };
        case ADD_COMMENT_SUCCESS:
            return{
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                commentAdding: false,
                commentAdded: true,
            };
        case ADD_COMMENT_FAILURE:
            return{
                ...state,
                commentAdding: false,
                commentAddError: action.error,
            };
        default: return state;
    }
}

export default reducer;