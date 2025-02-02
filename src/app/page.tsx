"use client";

import {useState} from "react";
import {AmenitiesService} from "@/service/AmenitiesService";
import {OsmAmenityType} from "@/osm-domain/OsmAmenityType";
import {IAmenity} from "@/domain/IAmenity";
import styles from "./page.module.css";

const Page = () => {
    const [amenities, setAmenities] = useState<IAmenity[]>([]);
    const [selectedAmenity, setSelectedAmenity] = useState<OsmAmenityType>(OsmAmenityType.toilets);

    const handleFindClick = async () => {
        const amenitiesService = new AmenitiesService();
        await amenitiesService.getCurrentLocation();
        const results = await amenitiesService.getNearbyAmenities(selectedAmenity, 1000);
        setAmenities(results);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className="text-2xl font-bold mb-4">Find Nearby Amenities</h1>

                <div className={styles.selectContainer}>
                    <select
                        className={styles.selectBox}
                        value={selectedAmenity}
                        onChange={(e) => setSelectedAmenity(e.target.value as OsmAmenityType)}
                    >
                        <option value={OsmAmenityType.toilets}>🚻 Toilets</option>
                        <option value={OsmAmenityType.drinking_water}>💧 Drinking Water</option>
                    </select>
                    <button onClick={handleFindClick} className={styles.button}>Find</button>
                </div>
            </div>

            <div className={styles.amenitiesList}>
                <h2 className="text-xl font-semibold mb-3">Results:</h2>
                {amenities.length === 0 ? (
                    <p className="text-gray-500 text-center">No amenities found.</p>
                ) : (
                    <ul>
                        {amenities.map((amenity: IAmenity) => (
                            <li key={`${amenity.location.lat}-${amenity.location.lon}`} className={styles.resultItem}>
                                <p className={styles.resultText}>📍 Lat: {amenity.location.lat},
                                    Lon: {amenity.location.lon}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Page;
