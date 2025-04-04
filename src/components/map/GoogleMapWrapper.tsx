import React from "react";
import { APIProvider, Map, MapMouseEvent } from "@vis.gl/react-google-maps";
import {
  MarkerPost,
  PendingMarker,
  Marker,
} from "../../api/markers/types";
import MapMarkers from "../markers/MapMarkers";
import { useDarkMode } from "../../styles/theme";
import { MAPS_CONFIG } from "../../config/appConfig";

interface GoogleMapWrapperProps {
  pendingMarker: PendingMarker | null;
  markers: Marker[];
  onMapClick: (e: MapMouseEvent) => void;
  onAddMarker: (marker: MarkerPost) => void;
}

const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({
  pendingMarker,
  markers,
  onMapClick,
  onAddMarker,
}) => {
  const { isDarkMode } = useDarkMode();
  return (
    <APIProvider apiKey={MAPS_CONFIG.API_KEY}>
      <Map
        colorScheme={isDarkMode ? "DARK" : "LIGHT"}
        mapId={MAPS_CONFIG.MAP_ID}
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={MAPS_CONFIG.DEFAULT_CENTER}
        defaultZoom={MAPS_CONFIG.DEFAULT_ZOOM}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={onMapClick}
      >
        <MapMarkers
          markers={markers || []}
          pendingMarker={pendingMarker}
          onAddMarker={onAddMarker}
        />
      </Map>
    </APIProvider>
  );
};

export default GoogleMapWrapper;
