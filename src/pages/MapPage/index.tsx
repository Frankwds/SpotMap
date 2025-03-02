import React, { useState } from "react";
import useMarkers from "../../hooks/useMarkers";
import GoogleMapWrapper from "../../components/map/GoogleMapWrapper";

interface MapClickEvent {
  detail: {
    latLng: {
      lat: number;
      lng: number;
    };
  };
}

const MapPage: React.FC = () => {
  const [pendingMarker, setPendingMarker] = useState<{
    position: { lat: number; lng: number };
  } | null>(null);
  const { markers, addMarker, removeMarker } = useMarkers();

  function onMapClick(e: MapClickEvent) {
    setPendingMarker({
      position: { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng },
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