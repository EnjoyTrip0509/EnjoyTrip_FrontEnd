import { apiInstance } from "./index.js";

const api = apiInstance();

export async function addReview(review, success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.post(`/review`, review).then(success).catch(fail);
}