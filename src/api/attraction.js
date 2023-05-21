import { apiInstance } from "./index.js"

const api = apiInstance();

export async function searchAttractions(location, success, fail) {
    await api.post('attraction/search', location).then(success).catch(fail);
}

export async function getAttractionDetail(contentId, success, fail) {
    await api.get(`attraction/${contentId}`).then(success). catch (fail);
}