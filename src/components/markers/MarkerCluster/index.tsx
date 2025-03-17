import React, { useState } from "react";
import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { MarkerPost, Marker, PendingMarker } from "../../../api/types";
import PendingMarkerPopup from "../PendingMarkerPopup";
import ExistingMarkerPopup from "../ExistingMarkerPopup";

interface MarkerClusterProps {
  markers: Marker[];
  pendingMarker: PendingMarker | null;
  onAddMarker: (markerData: MarkerPost) => void;
  onRemoveMarker: (id: number) => void;
}

const KitesurfIcon = () => (
  <img src="/icons/kitesurf.svg" alt="Kitesurf marker" width="36" height="36" />
);

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
          >
            <KitesurfIcon />
          </AdvancedMarker>
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
            position={marker.position}
            clickable={true}
            onClick={() => setOpenInfoWindow(marker.id)}
          >
            <KitesurfIcon />
          </AdvancedMarker>
          {openInfoWindow === marker.id && (
            <InfoWindow
              position={marker.position}
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