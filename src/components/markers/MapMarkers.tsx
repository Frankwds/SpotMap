import React, { useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { MarkerPost, Marker, PendingMarker } from "../../api/markers/types";
import PendingMarkerPopup from "./PendingMarkerPopup";
import ExistingMarkerPopup from "./ExistingMarkerPopup";
import MarkerIcon from "../common/icons/MarkerIcon";
import {InfoWindow} from "../styled/InfoWindow/InfoWindow";


interface MapMarkers {
  markers: Marker[];
  pendingMarker: PendingMarker | null;
  onAddMarker: (markerData: MarkerPost) => void;
}

const MapMarkers: React.FC<MapMarkers> = ({
  markers,
  pendingMarker,
  onAddMarker,
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
            {pendingMarker.type && <MarkerIcon type={pendingMarker.type} />}
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
            <MarkerIcon type={marker.type} />
          </AdvancedMarker>
          {openInfoWindow === marker.id && (
            <InfoWindow
              position={marker.position}
              onCloseClick={() => setOpenInfoWindow(null)}
            >
              <ExistingMarkerPopup
                marker={marker}
                onClose={() => setOpenInfoWindow(null)}
              />
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default MapMarkers;
