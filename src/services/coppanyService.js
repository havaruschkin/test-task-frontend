import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/company";

export function getCompanies() {
    return http.get(apiEndpoint);
}
