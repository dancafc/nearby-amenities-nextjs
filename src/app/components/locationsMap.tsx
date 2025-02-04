"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import { IAmenity } from "@/domain/IAmenity";
import { Location } from "@/domain/Location";

const hereIcon = new L.Icon({
    iconUrl: "/here.png", // Uses the image from public/
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const amenityIcon = new L.Icon({
    iconUrl: "/amenity.png", // Uses the image from public/
    iconSize: [16, 16],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// Function to adjust zoom smoothly
const AdjustMapView = ({ center, distance, amenities, searchTrigger }: {
    center: Location;
    distance: number;
    amenities: IAmenity[];
    searchTrigger: number;
}) => {
    const map = useMap();

    useEffect(() => {
        if (searchTrigger === 0) return; // Don't trigger on initial render

        if (amenities.length > 0) {
            const bounds = L.latLngBounds([
                [center.lat - distance / 111000, center.lon - distance / 111000],
                [center.lat + distance / 111000, center.lon + distance / 111000],
            ]);

            amenities.forEach(amenity => bounds.extend([amenity.location.lat, amenity.location.lon]));

            map.flyToBounds(bounds, { duration: 0.5 });
        } else {
            map.flyTo([center.lat, center.lon], 13, { duration: 0.5 });
        }
    }, [searchTrigger]); // 🚀 Now only runs when "Find" is pressed

    return null;
};

const LocationsMap = ({ center, amenities, distance, searchTrigger }: { center: Location; amenities: IAmenity[]; distance: number, searchTrigger: number }) => {
    return (
        <MapContainer center={[center.lat, center.lon]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh", width: "100vw" }}>
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
                        <strong>{amenity.type}</strong> <br />
                        Location: {amenity.location.lat}, {amenity.location.lon}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LocationsMap;
