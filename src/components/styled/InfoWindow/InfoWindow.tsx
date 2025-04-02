import React, { useEffect } from "react";
import { InfoWindow as GoogleInfoWindow } from "@vis.gl/react-google-maps";
import { theme } from "../../../styles/theme";

interface Props {
  position: google.maps.LatLngLiteral;
  onCloseClick?: () => void;
  children?: React.ReactNode;
}

export const InfoWindow = (props: Props) => {
  // Insert styles into document head - will apply to Google Maps elements
  useEffect(() => {
    const styleElement = document.createElement('style');
    const backgroundColor =  theme.palette.background.paper
    
    styleElement.textContent = `
      .gm-style-iw {
        background-color: ${backgroundColor} !important;
      }
      
      .gm-style .gm-style-iw-tc::after {
        background-color: ${backgroundColor} !important;
      }
      
      .gm-style .gm-style-iw-d::-webkit-scrollbar-track,
      .gm-style .gm-style-iw-d::-webkit-scrollbar-track-piece {
        background-color: ${backgroundColor} !important;
      }

      .gm-ui-hover-effect span {
        background-color: ${theme.palette.text.primary} !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [theme.palette.background.paper, theme.palette.text.primary]);
  
  // Wrap children in Box to style content inside InfoWindow
  return (
    <GoogleInfoWindow {...props}/>
  );
};