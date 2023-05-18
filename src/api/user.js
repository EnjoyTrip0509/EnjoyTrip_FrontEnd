import { apiInstance } from "./index.js"

const api = apiInstance();

export async function register(user, success, fail) {
    await api.post(`user/join`, JSON.stringify(user)).then(success).catch(fail);
}