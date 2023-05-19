import { apiInstance } from "./index.js"

const api = apiInstance();

export async function searchAttractions(location, success, fail) {
    await api.post('attraction/search', location).then(success).catch(fail);
}