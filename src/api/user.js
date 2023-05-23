import { apiInstance } from "./index.js"

const api = apiInstance();

export async function register(user, success, fail) {
    await api.post(`user/join`, JSON.stringify(user)).then(success).catch(fail);
}

export async function login(user, success, fail) {
    await api.post(`user/login`, JSON.stringify(user)).then(success).catch(fail);
}

export async function tokenRegeneration(user, success, fail) {
    api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
    await api.post(`/user/refresh`, user).then(success).catch(fail);
}

export async function logout(userid, success, fail) {
    await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

export async function checkPassword(userInfo, success, fail) {
    await api.post(`/user/checkpassword`, userInfo).then(success).catch(fail);
}

export async function updateUser(userInfo, success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token"); //axios header에 refresh-token 셋팅
    await api.put(`/user/modify`, userInfo)
        .then(() => getUserInfo(userInfo.id, success, fail))
        .catch(fail);
}

export async function getUserInfo(userId, success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token"); //axios header에 refresh-token 셋팅

    await api.get(`/user/info/${userId}`).then(success).catch(fail);
}

