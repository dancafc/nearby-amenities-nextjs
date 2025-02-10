"use client";

import L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import {useEffect} from "react";
import {IAmenity} from "../../backend/domain/IAmenity";
import {Location} from "../../backend/domain/Location";

const hereIcon = new L.Icon({
    iconUrl: "/here.png", // Uses the image from public/
    iconSize: [36, 36],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const amenityIcon = new L.Icon({
    iconUrl: "/amenity.png", // Uses the image from public/
    iconSize: [28, 28],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// Function to adjust zoom smoothly
const AdjustMapView = ({center, distance, amenities, searchTrigger}: {
    center: Location;
    distance: number;
    amenities: IAmenity[];
    searchTrigger: number;
}) => {
    const map = useMap();

    useEffect(() => {
        if (searchTrigger === 0) return; // Don't trigger on initial render

        const bounds = L.latLngBounds([
            [center.lat - distance / 111000, center.lon - distance / 111000],
            [center.lat + distance / 111000, center.lon + distance / 111000],
        ]);
        if (amenities.length > 0) {
            amenities.forEach(amenity => bounds.extend([amenity.location.lat, amenity.location.lon]));
        }
        map.flyToBounds(bounds, {duration: 0.5});
    }, [searchTrigger]); // 🚀 Now only runs when "Find" is pressed

    return null;
};

const LocationsMap = ({center, amenities, distance, searchTrigger}: {
    center: Location;
    amenities: IAmenity[];
    distance: number,
    searchTrigger: number
}) => {
    return (
        <MapContainer center={[center.lat, center.lon]} zoom={13} scrollWheelZoom={true}
                      style={{height: "100vh", width: "100vw"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            />

            {/* Adjust map view dynamically */}
            <AdjustMapView
                center={center}
                distance={distance}
                amenities={amenities}
                searchTrigger={searchTrigger}
            />

            {/* Current location marker */}
            <Marker position={[center.lat, center.lon]} icon={hereIcon}>
                <Popup>📍 You are here</Popup>
            </Marker>

            {/* Display all amenities */}
            {amenities.map((amenity, index) => (
                <Marker key={index} position={[amenity.location.lat, amenity.location.lon]} icon={amenityIcon}>
                    <Popup>
                        <strong>{amenity.type}</strong> <br/>
                        {Object.entries(amenity)
                            .filter(([key, value]) => key !== "type" && key !== "location" && key !== "access" && value !== undefined && value !== false) // Exclude type & location, remove undefined
                            .map(([key, value]) => (
                                <div key={key}>
                                    <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}: </strong>
                                    {value === true ? "✅" : String(value)}
                                </div>
                            ))}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LocationsMap;
