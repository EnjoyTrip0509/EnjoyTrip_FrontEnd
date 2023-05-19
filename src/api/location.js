import { apiInstance } from "./index.js"

const api = apiInstance();

export async function getSido(success, fail) {
    await api.get(`address/sido`).then(success).catch(fail);
}

export async function getGugun(sidoCode, success, fail) {
    await api.get(`address/sido/${sidoCode}`).then(success).catch(fail);
}