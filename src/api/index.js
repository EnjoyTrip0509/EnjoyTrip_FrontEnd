import axios from "axios";

export function apiInstance() {
    const instance = axios.create({
        baseURL: "http://localhost:8088/enjoytrip",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    })

    return instance;
}