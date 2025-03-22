import React from "react";

interface MarkerIconProps {
  type: string;
}

const MarkerIcon: React.FC<MarkerIconProps> = ({ type }) => {
  const iconType = type || "kitesurf"; // Default to kitesurf if no type
  return (
    <img
      src={`/icons/${iconType}.svg`}
      alt={`${iconType} marker`}
      width="36"
      height="36"
    />
  );
};

export default MarkerIcon;
