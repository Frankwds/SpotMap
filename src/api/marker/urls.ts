import { API_CONFIG } from "../../config/appConfig";

const MARKERS_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.MARKERS_PATH}`;

export const updateMarkerUrl = (id: number) => `${MARKERS_URL}/${id}`; 