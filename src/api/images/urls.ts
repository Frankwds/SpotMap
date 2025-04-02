import { API_CONFIG } from "../../config/appConfig";

export const getImageUrl = (markerId: number, imageUrl: string) => {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.MARKERS_PATH}/${markerId}/images/${imageUrl}`;
}

export const postImageUrl = (markerId: number) => {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.MARKERS_PATH}/${markerId}/images`;
}

export const deleteImageUrl = (markerId: number, urlEndcodedImageUrl: string) => {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.MARKERS_PATH}/${markerId}/images?imageUrl=${urlEndcodedImageUrl}`;
}