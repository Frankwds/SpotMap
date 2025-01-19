import React, { useState } from 'react';
import './App.css';
import GoogleMaps from './lib/googlemaps/GoogleMaps';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import useMarkers from './hooks/useMarkers';




function App() {

  const [selectedMarker, setSelectedMarker] = useState<typeof AdvancedMarker>();
  const { markers, addMarker, removeMarker } = useMarkers();

  function OnMapClick(e: any) {
    setSelectedMarker(() =>
      <AdvancedMarker
        position={{ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }}
        clickable={true}
        onClick={() => addMarker({ latitude: e.detail.latLng.lat, longitude: e.detail.latLng.lng, name: 'New Marker' })}
      />
    );
  }

  return (
    <div className="App">
      <GoogleMaps selectedMarker={selectedMarker} markers={markers} onMapClick={OnMapClick} removeMarker={removeMarker} />
    </div>
  );
}

export default App;
