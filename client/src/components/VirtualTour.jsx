import React from 'react';
import { Pannellum } from "pannellum-react";

const VirtualTour = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Pannellum
        width="100%"
        height="100%"
        image="https://pannellum.org/images/alma.jpg"
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        onLoad={() => {
          console.log("Panorama loaded successfully");
        }}
      >
        {/* Contoh Hotspot: Titik info di dalam gambar */}
        <Pannellum.Hotspot
          type="info"
          pitch={11}
          yaw={-167}
          text="Info Titik: Ini adalah patung"
          URL="https://pannellum.org/images/alma.jpg"
        />
      </Pannellum>
    </div>
  );
};

export default VirtualTour;