import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import { actionCreators as pinActionCreator } from "./pin";
const DET_COMMENTS = "DET_COMMENTS";
const GET_COMMENTS = "GET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const TOGGLE_LIKE = "TOGGLE_LIKE";
const getPinAPI = pinActionCreator.getPinAPI;

const getComment = createAction(GET_COMMENTS, (comments) => ({ comments}));
const getDomment = createAction(DET_COMMENTS, (list) => ({ list}));
const addComment = createAction(ADD_COMMENT, (comments, userName, id) => ({
    comments,
    userName,
    id,
}));
const editComment = createAction(EDIT_COMMENT, (comment, commentId) => ({
    comment,
    commentId,
}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
    commentId,
}));
const toggleLike = createAction(TOGGLE_LIKE, (commentId, commentLike) => ({
    commentId,
    commentLike,
}));

// const initialState = {
//     comments: [
//         {
//             id: 1,
//             content: "임시 댓글",
//             likeNum: 0,
//             user: "임시 유저",
//             pin: 1,
//         },
//         {
//             id: 2,
//             content: "임시 댓글 2",
//             likeNum: 0,
//             user: "임시 유저 2",
//             pin: 1,
//         },
//     ],
//     list: [],
// };

const initialState = {
    comments: [],
    list: [],
};


const getCommentAPI = (id) => {
    return (dispatch, getState, { history }) => {
        // apis.getComment(id)
        axios({
            method: "GET",
            url: `http://localhost:9000/v1/pin-comment/${id}/comment`,
            data: { id },
            headers: {
                "content-type": "application/json;charset=UTF-8",
                accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                authorization: `Bearer ${getCookie("user_login")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                const comments = res.data.data;
                const list = [];
                for (let i=0;i<comments.length;i++)
                {
                    list[i]=comments[i].username;
                }
                console.log(list)
                dispatch(getDomment(list));
                dispatch(getComment(comments));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

const addCommentAPI = (comments) => {
    return (dispatch, getState, { history }) => {
        // apis.addComment(comments)
        axios({
            method: "POST",
            url: `http://localhost:9000/v1/pin-comment/comment`,
            data: comments,
            headers: {
                "content-type": "application/json;charset=UTF-8",
                accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                authorization: `Bearer ${getCookie("user_login")}`,
            },
        })
            .then((res) => {
                // console.log("comment posted")
                // console.log(res);
                const userName = res.data.data[0].username;
                const commentId = res.data.data[0].commentId;
                dispatch(addComment(comments, userName, commentId));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

const editCommentAPI = (id, comments) => {
    console.log("API");
    console.log(comments);
    return (dispatch, getState, { history }) => {
        // apis.editComment(id, comments)
        axios({
            method: "PATCH",
            url: `http://localhost:9000/v1/pin-comment/${comments.pinId}/comment/${id}`,
            data: comments,
            headers: {
                "content-type": "application/json;charset=UTF-8",
                accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                authorization: `Bearer ${getCookie("user_login")}`,
            },
        })
            .then((res) => {
                const newcomment = {
                    content: res.data.data[0].content,
                    pinId: res.data.data[0].pinId
                };
                // console.log("newcomment")
                // console.log(newcomment);
                dispatch(editComment(newcomment, id));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

const deleteCommentAPI = (id) => {
    return (dispatch, getState, { history }) => {
        // apis.deleteComment(id)
        axios({
            method: "DELETE",
            url: `http://localhost:9000/v1/pin-comment/comment/${id}`,
            data: {},
            headers: {
                "content-type": "application/json;charset=UTF-8",
                accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                authorization: `Bearer ${getCookie("user_login")}`,
            },
        })
            .then((res) => {
                dispatch(deleteComment(id));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

const toggleLikeAPI = (id) => {
    console.log("toggle API");
    console.log(id);
    return (dispatch, getState, { history }) => {
        // apis.toggleLike(id)
        axios({
            method: "POST",
            url: `http://localhost:9000/v1/comment-like/${id}`,
            data: {},
            headers: {
                "content-type": "application/json;charset=UTF-8",
                accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                authorization: `Bearer ${getCookie("user_login")}`,
            },
        })
            .then((res) => {
                console.log(res);
                let commentLike = res.data.data[0];
                console.log(commentLike);
                dispatch(toggleLike(id, commentLike));
            })
            .then((err) => {
                console.log(err);
            });
    };
};

export default handleActions(
    {
        [GET_COMMENTS]: (state, action) =>
            produce(state, (draft) => {
                draft.comments = action.payload.comments;
               
            }),
            [DET_COMMENTS]: (state, action) =>
            produce(state, (draft) => {
                draft.list = action.payload.list;
               
            }),
        [ADD_COMMENT]: (state, action) =>
            produce(state, (draft) => {
                const commentObj = {
                    ...action.payload.comments,
                    commentId: action.payload.id,
                    likeNum: 0,
                    username: action.payload.userName,
                };
                // console.log(draft);
                // console.log(draft.comments);
                // console.log(draft.comments.data);
                draft.comments.push(commentObj);
                draft.list.push(commentObj.user);
            }),
        [EDIT_COMMENT]: (state, action) =>
            produce(state, (draft) => {
                let commentIdx = draft.comments.findIndex(
                    (comment) => comment.commentId == action.payload.commentId
                );
                // draft.comments[commentIdx] = {
                //     ...draft.comments[commentIdx],
                //     ...action.payload.comment,
                // };
                // username
                // pinId
                // commentId
                // content
                // console.log("edit draft");
                // console.log(draft.comments);
                // console.log(draft.comment);
                // console.log(commentIdx);
                // console.log(draft.comments[commentIdx]);
                // console.log(action.payload.comment);
                draft.comments[commentIdx].content = action.payload.comment.content;
            }),
        [DELETE_COMMENT]: (state, action) =>
            produce(state, (draft) => {
                draft.comments = draft.comments.filter((comment, id) => {
                    if (comment.commentId !== action.payload.commentId) {
                        return [...draft.comments, comment];
                    }
                });
            }),
        [TOGGLE_LIKE]: (state, action) =>
            produce(state, (draft) => {
                let commentIdx = draft.comments.findIndex(
                    (comment) => comment.commentId === action.payload.commentId
                );
                console.log(commentIdx);
                console.log(action.payload);
                for (let i in draft.comments) {
                    console.log(i);
                    for (let j in draft.comments[i]) {
                        console.log(j + " " + draft.comments[i][j]);
                    }
                }
                draft.comments[commentIdx].likeNum = action.payload.commentLike;
            }),
    },
    initialState
);

const actionCreators = {
    getCommentAPI,
    addCommentAPI,
    editCommentAPI,
    deleteCommentAPI,
    toggleLikeAPI,
    getDomment,
};

export { actionCreators };
