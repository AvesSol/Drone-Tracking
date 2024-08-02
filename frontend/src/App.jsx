// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";

// function App() {
//   const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     const fetchLatestData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/v1/latestDroneData/getlocation");
//         if (response.data) {
//           setCoordinates({ lat: response.data.lat, lng: response.data.lng });
//         }
//         console.log("response is ", response.data.lat);
//         console.log("data is ", coordinates);
//       } catch (error) {
//         console.error("Error fetching latest drone data:", error);
//       } 
//     };

//     fetchLatestData();

//     // const intervalId = setInterval(fetchLatestData, 5000); // Fetch every 5 seconds
//     // return () => clearInterval(intervalId);
//   }, []);
//   console.log("cordinates is ", coordinates);


//   useEffect(() => {
//     if (markerRef.current && mapRef.current) {
//       const { lat, lng } = coordinates;
//       const position = new window.google.maps.LatLng(lat, lng);
//       markerRef.current.setPosition(position);
//       mapRef.current.panTo(position);
//     }
//   }, [coordinates]);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
//     script.async = true;
//     window.initMap = initMap;
//     document.head.appendChild(script);
//   }, []);

//   const initMap = () => {
//     const map = new window.google.maps.Map(document.getElementById("map"), {
//       center: { lat: 0, lng: 0 },
//       zoom: 4,
//     });
//     const marker = new window.google.maps.Marker({
//       position: { lat: 0, lng: 0 },
//       map: map,
//     });
//     mapRef.current = map;
//     markerRef.current = marker;
//   };

//   return (
//     <div>
//       <h1>Live Location</h1>
//       <div id="map" style={{ height: "80vh", width: "100%" }}></div>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/latestDroneData/getLocation");
        if (response.data) {
          setCoordinates({ lat: response.data.lat, lng: response.data.lng });
        }
      } catch (error) {
        console.error("Error fetching latest drone data:", error);
      }
    };

    fetchLatestData();

    const intervalId = setInterval(fetchLatestData, 5000); // Fetch every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  function SetViewOnClick({ coords }) {
    const map = useMap();
    useEffect(() => {
      map.setView([coords.lat, coords.lng], map.getZoom());
    }, [coords, map]);
    return null;
  }

  return (
    <div>
      <h1>Live Location</h1>
      <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={13} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[coordinates.lat, coordinates.lng]}></Marker>
        <SetViewOnClick coords={coordinates} />
      </MapContainer>
    </div>
  );
}

export default App;
