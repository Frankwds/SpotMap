import React from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';


const api_key= process.env.REACT_APP_GOOGLE_API_KEY || '';

 const GoogleMaps = () => (
  <APIProvider apiKey={api_key}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
);

export default GoogleMaps;