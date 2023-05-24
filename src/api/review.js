import { apiInstance } from "./index.js";

const api = apiInstance();

export async function addReview(review, success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.post(`/review`, review).then(success).catch(fail);
}

export async function findReviewsByContentId(contentId,success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.get(`/review/list/content/${contentId}`).then(success).catch(fail);
}

export async function findReviewsByUserId(userId,success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.get(`/review/list/user/${userId}`).then(success).catch(fail);
}

export async function deleteReview(articleNo,success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.delete(`/review/${articleNo}`).then(success).catch(fail);
}

export async function modifyReview(review,success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.put(`/review`, review).then(success).catch(fail);
}