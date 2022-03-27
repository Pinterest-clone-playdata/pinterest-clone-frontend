import axios from "axios";
import { getCookie } from "../shared/Cookie";

const instance = axios.create({
    baseURL: "http://localhost:9000/",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("user_login")}`,
    },
});

instance.interceptors.request.use(request => {
    console.log('Request', JSON.stringify(request, null, 2));
    return request;
})

instance.interceptors.response.use(response => {
    console.log('Response', JSON.stringify(response, null, 2));
    return request;
})

export const apis = {
    getPin: (id) => instance.get(`v1/pin/${id}`),
    searchPin: (word) => instance.get(`v1/pin/${word}`),
    getComment: (id) => instance.get(`v1/pin-comment/${id}`),
    addComment: (contents) => instance.post(`v1/pin-comment`, contents),
    editComment: (id, contents) => instance.patch(`v1/pin-comment/${id}`, contents),
    deleteComment: (id) => instance.delete(`v1/pin-comment/${id}`),
    toggleLike: (id) => instance.post(`v1/comment-like/${id}`),
};
