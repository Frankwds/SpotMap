import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { type Marker } from '../../api/types';


const api_key = process.env.REACT_APP_GOOGLE_API_KEY || '';
const mapId = '64b9cff6747cc800';



type props = {
  selectedMarker: typeof AdvancedMarker;
  markers?: Marker[];
  onMapClick: (e: any) => void;
  removeMarker: (id: number) => void;
}

const GoogleMaps = ({ onMapClick, removeMarker, selectedMarker, markers }: props) => (



  <APIProvider apiKey={api_key} >
    <Map
      colorScheme='DARK'
      mapId={mapId}
      style={{ width: '100vw', height: '100vh' }}
      defaultCenter={{ lat: 63.429, lng: 10.392 }}
      defaultZoom={9}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      onClick={onMapClick}
    >
      {selectedMarker}
      {markers?.map((marker) => (
        <AdvancedMarker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          clickable={true}
          onClick={() => removeMarker(marker.id)}
        />
      ))}

    </Map>
  </APIProvider>
);



export default GoogleMaps;