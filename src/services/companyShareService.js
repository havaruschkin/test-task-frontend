import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/companyShare";

export function getCompanyShare() {
    return http.get(apiEndpoint);
}
