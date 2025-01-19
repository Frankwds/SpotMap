import React, { useState } from 'react';
import './App.css';
import GoogleMaps from './lib/googlemaps/GoogleMaps';
import { AdvancedMarker } from '@vis.gl/react-google-maps';




function App() {

  const [selectedMarker, setSelectedMarker] = useState<typeof AdvancedMarker>();

  function OnMapClick(e: any) {
    console.log('Map clicked', e.detail.latLng);
    setSelectedMarker(() =>
      <AdvancedMarker
        position={{ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }}
        clickable={true}
        onClick={() => console.log('Marker clicked')}
      />
    );
  }

  return (
    <div className="App">
      <GoogleMaps selectedMarker={selectedMarker} onMapClick={OnMapClick} />
    </div>
  );
}

export default App;
