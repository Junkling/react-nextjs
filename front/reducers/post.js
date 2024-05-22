
export const initialState = {
    mainPosts: [{
        id:1,
        User: {
            id: 1,
            nickname: '준혁',
        },
        title: '제목1',
        content: '#첫번째 게시글 #해시태그 #사진',
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
    postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
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
        case ADD_POST:
            return{
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,

            };
        default: return state;
    }
}

export default reducer;