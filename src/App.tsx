import React, {useState} from 'react';
import './App.css';
import GoogleMaps from './lib/googlemaps/GoogleMaps';
import { AdvancedMarker } from '@vis.gl/react-google-maps';




function App() {

  const [markers, setMarkers] = useState([
    <AdvancedMarker
      position={{ lat: 63.429, lng: 10.392 }}
      clickable={true}
      onClick={() => console.log('Marker clicked')}
    />,
    <AdvancedMarker
      position={{ lat: 63.529, lng: 10.292 }}
      clickable={true}
      onClick={() => console.log('Marker clicked')}
    />
  ]);

  function OnMapClick(e: any) {
    console.log('Map clicked', e.detail.latLng);
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      <AdvancedMarker
        position={{ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }}
        clickable={true}
        onClick={() => console.log('Marker clicked')}
      />
    ]);
  }

  return (
    <div className="App">
      <GoogleMaps markers={markers} onMapClick={OnMapClick}/>
    </div>
  );
}

export default App;
