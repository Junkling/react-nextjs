
export const initialState = {
    mainPosts: [{
        id:1,
        User: {
            id: 1,
            nickname: '준혁',
        },
        title: '제목1',
        content: '내용1',
        Image:[
            {src: 'C:\Users\ddoly\Downloads\김지원.jpg'},
            {src: 'C:\Users\ddoly\Downloads\기본 이미지.jpg'},
            {src: 'C:\Users\ddoly\Downloads\프로필 2.png'},
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