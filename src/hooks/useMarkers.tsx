import { useState, useEffect } from 'react';
import { getMarkers, deleteMarker } from '../api/getMarkers';

type Marker = {
    id: number;
    lat: number;
    lng: number;
    title: string;
};

const useMarkers = () => {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const data = await getMarkers();
                setMarkers(data);
            } catch (err) {
                setError('Failed to fetch markers');
            } finally {
                setLoading(false);
            }
        };

        fetchMarkers();
    }, []);


    const removeMarker = async (id: number) => {
        try {
            await deleteMarker(id);
            setMarkers((prevMarkers) => prevMarkers.filter(marker => marker.id !== id));
        } catch (err) {
            setError('Failed to delete marker');
        }
    };

    return { markers, loading, error, removeMarker };
};


export default useMarkers;