import { API_CONFIG } from "../../config/appConfig";

const MARKERS_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.MARKERS_PATH}`;

export const getAllMarkersUrl = () => MARKERS_URL;
export const getMyMarkersUrl = () => `${MARKERS_URL}/user`;
export const getUserMarkersUrl = (userId: string) => `${MARKERS_URL}/user/${userId}`;
export const getMarkerByIdUrl = (id: number) => `${MARKERS_URL}/${id}`;
export const postMarkerUrl = () => MARKERS_URL;
export const deleteMarkerUrl = (id: number) => `${MARKERS_URL}/${id}`; 