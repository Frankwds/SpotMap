import React from "react";
import { APIProvider, Map, MapMouseEvent } from "@vis.gl/react-google-maps";
import {
  MarkerPost,
  PendingMarker,
  Marker,
} from "../../api/markers/types";
import MarkerCluster from "../markers/MarkerCluster";
import { useDarkMode } from "../../styles/theme";
import { MAPS_CONFIG } from "../../config/appConfig";

interface GoogleMapWrapperProps {
  pendingMarker: PendingMarker | null;
  markers: Marker[];
  onMapClick: (e: MapMouseEvent) => void;
  onAddMarker: (marker: MarkerPost) => void;
  selectedCategories: string[];
}

const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({
  pendingMarker,
  markers,
  onMapClick,
  onAddMarker,
  selectedCategories,
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
        <MarkerCluster
          markers={markers || []}
          pendingMarker={pendingMarker}
          onAddMarker={onAddMarker}
          selectedCategories={selectedCategories}
        />
      </Map>
    </APIProvider>
  );
};

export default GoogleMapWrapper;
