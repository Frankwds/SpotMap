import { Marker, MarkerPost } from "./types";

// http://localhost:5208
async function getMarkers(): Promise<Marker[]> {
    try {
        const response = await fetch('https://spotmapapi.azurewebsites.net/markers');
        if (!response.ok) {
            throw new Error('Response get was not ok');
        }
        const data: Marker[] = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching markers:', error);
        throw error;
    }
}

async function deleteMarker(id: number): Promise<void> {
    try {
        const response = await fetch(`https://spotmapapi.azurewebsites.net/markers/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Response delete was not ok');
        }
    } catch (error) {
        console.error('Error deleting marker:', error);
        throw error;
    }
}

async function postMarker(marker: MarkerPost): Promise<Marker> {
    try {
        const response = await fetch('https://spotmapapi.azurewebsites.net/markers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(marker),
        });
        if (!response.ok) {
            throw new Error('Response add was not ok');
        }
        const data: Marker = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding marker:', error);
        throw error;
    }
}

export { getMarkers, deleteMarker, postMarker };