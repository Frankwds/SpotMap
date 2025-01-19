import React from 'react';
import {APIProvider, Map,  AdvancedMarker} from '@vis.gl/react-google-maps';


const api_key= process.env.REACT_APP_GOOGLE_API_KEY || '';
const mapId = '64b9cff6747cc800';

type props = {
  markers: typeof AdvancedMarker[];
  onMapClick: (e: any) => void;
}

 const GoogleMaps = (props: props) => (  
  <APIProvider apiKey={api_key} >
    <Map
      colorScheme = 'DARK'
      mapId = {mapId}
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 63.429, lng: 10.392}}
      defaultZoom={9}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      onClick={props.onMapClick}
       >
     
      {props.markers}

    </Map>
  </APIProvider>
);



export default GoogleMaps;