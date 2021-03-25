import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/company";

function compositionUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getCompositions() {
    return http.get(apiEndpoint);
}

export function getCompositionsUser() {
return http.get(apiEndpoint + "/user")
}

export function getComposition(compositionId) {
    return http.get(compositionUrl(compositionId));
}

export function saveComposition(composition) {
    if (composition.id) {
        return http.put(apiEndpoint, composition);
    }
    return http.post(apiEndpoint, composition);
}

export function deleteComposition(compositionId) {
    return http.delete(compositionUrl(compositionId));
}