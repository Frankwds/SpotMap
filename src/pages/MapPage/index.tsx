import React, { useState } from "react";
import useMarkers from "../../hooks/useMarkers";
import GoogleMapWrapper from "../../components/map/GoogleMapWrapper";
import { MapClickEvent, PendingMarker } from "../../api/types";

const MapPage: React.FC = () => {
  const [pendingMarker, setPendingMarker] = useState<PendingMarker | null>(null);
  const { 
    markers, 
    addMarker, 
    removeMarker 
  } = useMarkers();

  function onMapClick(e: MapClickEvent) {
    setPendingMarker({
      position: e.detail.latLng,
    });
  }

  return (
    <div className="MapPage">
      <GoogleMapWrapper
        pendingMarker={pendingMarker}
        markers={markers || []}
        onMapClick={onMapClick}
        onRemoveMarker={removeMarker}
        onAddMarker={(markerData) => {
          addMarker(markerData);
          setPendingMarker(null);
        }}
      />
    </div>
  );
};

export default MapPage;