import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/companyShare";

export function getCompanyShare() {
    return http.get(apiEndpoint);
}

export function updateCompanyShare(companyShare) {
    return http.put(apiEndpoint, companyShare);
}

export function saveCompanyShare(companyShare) {
    return http.post(apiEndpoint, companyShare);
}
