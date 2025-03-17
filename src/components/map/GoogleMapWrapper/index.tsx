import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import {
  MarkerPost,
  MapClickEvent,
  PendingMarker,
  Marker,
} from "../../../api/types";
import MarkerCluster from "../../markers/MarkerCluster";
import { useDarkMode } from "../../../styles/theme";

const api_key = process.env.REACT_APP_GOOGLE_API_KEY || "";
const mapId = "64b9cff6747cc800";

interface GoogleMapWrapperProps {
  pendingMarker: PendingMarker | null;
  markers: Marker[];
  onMapClick: (e: MapClickEvent) => void;
  onRemoveMarker: (id: number) => void;
  onAddMarker: (marker: MarkerPost) => void;
  selectedCategories: string[];
}

const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({
  pendingMarker,
  markers,
  onMapClick,
  onRemoveMarker,
  onAddMarker,
  selectedCategories,
}) => {
  const { isDarkMode } = useDarkMode();
  return (
    <APIProvider apiKey={api_key}>
      <Map
        colorScheme={isDarkMode ? "DARK" : "LIGHT"}
        mapId={mapId}
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 63.429, lng: 10.392 }}
        defaultZoom={9}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={onMapClick}
      >
        <MarkerCluster
          markers={markers || []}
          pendingMarker={pendingMarker}
          onAddMarker={onAddMarker}
          onRemoveMarker={onRemoveMarker}
          selectedCategories={selectedCategories}
        />
      </Map>
    </APIProvider>
  );
};

export default GoogleMapWrapper;
