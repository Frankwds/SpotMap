import React, { useState } from "react";
import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { Marker, MarkerPost } from "../../../api/types";
import PendingMarkerPopup from "../PendingMarkerPopup";
import ExistingMarkerPopup from "../ExistingMarkerPopup";

interface MarkerClusterProps {
  markers: Marker[];
  pendingMarker: { position: { lat: number; lng: number } } | null;
  onAddMarker: (markerData: MarkerPost) => void;
  onRemoveMarker: (id: number) => void;
}

const MarkerCluster: React.FC<MarkerClusterProps> = ({
  markers,
  pendingMarker,
  onAddMarker,
  onRemoveMarker,
}) => {
  const [openInfoWindow, setOpenInfoWindow] = useState<
    number | "pending" | null
  >(null);

  return (
    <>
      {/* Pending Marker (when a user clicks on the map) */}
      {pendingMarker && (
        <>
          <AdvancedMarker
            position={pendingMarker.position}
            clickable={true}
            onClick={() => setOpenInfoWindow("pending")}
          />
          {openInfoWindow === "pending" && (
            <InfoWindow
              position={pendingMarker.position}
              onCloseClick={() => setOpenInfoWindow(null)}
            >
              <PendingMarkerPopup
                position={pendingMarker.position}
                onSave={onAddMarker}
                onClose={() => setOpenInfoWindow(null)}
              />
            </InfoWindow>
          )}
        </>
      )}

      {/* Existing Markers */}
      {markers?.map((marker) => (
        <React.Fragment key={marker.id}>
          <AdvancedMarker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            clickable={true}
            onClick={() => setOpenInfoWindow(marker.id)}
          />
          {openInfoWindow === marker.id && (
            <InfoWindow
              position={{ lat: marker.latitude, lng: marker.longitude }}
              onCloseClick={() => setOpenInfoWindow(null)}
            >
              <ExistingMarkerPopup
                marker={marker}
                onDelete={onRemoveMarker}
                onClose={() => setOpenInfoWindow(null)}
              />
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default MarkerCluster;