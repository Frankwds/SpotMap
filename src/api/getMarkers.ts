
type Marker = {
    id: number;
    lat: number;
    lng: number;
    title: string;
};

async function getMarkers(): Promise<Marker[]> {
    try {
        const response = await fetch('https://azureweb.spotmap.com/markers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
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
        const response = await fetch(`https://azureweb.spotmap.com/markers/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting marker:', error);
        throw error;
    }
}


export { getMarkers, deleteMarker };