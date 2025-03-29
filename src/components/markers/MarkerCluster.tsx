import React, { useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { MarkerPost, Marker, PendingMarker } from "../../api/types";
import PendingMarkerPopup from "./PendingMarkerPopup";
import ExistingMarkerPopup from "./ExistingMarkerPopup";
import MarkerIcon from "../common/icons/MarkerIcon";
import {InfoWindow} from "../styled/InfoWindow/InfoWindow";


interface MarkerClusterProps {
  markers: Marker[];
  pendingMarker: PendingMarker | null;
  onAddMarker: (markerData: MarkerPost) => void;
  onRemoveMarker: (id: number) => void;
  selectedCategories: string[];
}

const MarkerCluster: React.FC<MarkerClusterProps> = ({
  markers,
  pendingMarker,
  onAddMarker,
  onRemoveMarker,
  selectedCategories,
}) => {
  const [openInfoWindow, setOpenInfoWindow] = useState<
    number | "pending" | null
  >(null);

  // Filter markers based on selected categories
  // If no categories are selected, show all markers
  const filteredMarkers =
    selectedCategories.length > 0
      ? markers.filter((marker) => selectedCategories.includes(marker.type))
      : markers;

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
      {filteredMarkers?.map((marker) => (
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
