"use client";

import React, {useEffect, useState} from "react";
import {AmenitiesService} from "@/service/AmenitiesService";
import {OsmAmenityType} from "@/osm-domain/OsmAmenityType";
import {IAmenity} from "@/domain/IAmenity";
import {Location} from "@/domain/Location";
import LocationsMap from "@/app/components/locationsMap";
import styles from "./page.module.css";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const Page = () => {
    const [amenities, setAmenities] = useState<IAmenity[]>([]);
    const [currentLocation, setCurrentLocation] = useState<Location>();
    const [selectedAmenityType, setSelectedAmenityType] = useState<OsmAmenityType>(OsmAmenityType.toilets);
    const [distanceInput, setDistanceInput] = useState<number>(200);
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchTrigger, setSearchTrigger] = useState<number>(0);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const location = await AmenitiesService.getCurrentLocation();
                setCurrentLocation(location);
            } catch (error) {
                console.error("Failed to get location:", error);
            }
        };
        fetchLocation();
    }, []);

    const handleFindClick: () => Promise<void> = async () => {
        if (!currentLocation) return;

        const amenitiesService = new AmenitiesService();

        const results: IAmenity[] = await amenitiesService.getNearbyAmenities(selectedAmenityType, currentLocation, distanceInput);
        setAmenities(results);
        setSearchTrigger(prev => prev + 1);
        setIsExpanded(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleFindClick();
        }
    };

    function getCappedValue(newValue: number, oldValue: number, maxValue: number): number {
        if (newValue > maxValue) return oldValue;
        return newValue;
    }

    return (
        <div className={styles.container}>
            <motion.div className={styles.card}>
                {/* Toggle Header (Always Visible) */}
                <div className={styles.toggleHeader} onClick={() => setIsExpanded(!isExpanded)}>
                    <h1 className="text-2xl font-bold">Find</h1>
                    {isExpanded ? <ChevronUp size={24}/> : <ChevronDown size={24}/>}
                </div>

                {/* Animated Expandable Content */}
                <motion.div
                    initial={false}
                    animate={{height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0}}
                    transition={{duration: 0.3, ease: "easeInOut"}}
                    className={styles.animatedContainer}
                >
                    <div className={styles.innerContent}>
                        <select
                            className={styles.selectBox}
                            value={selectedAmenityType}
                            onChange={(e) => setSelectedAmenityType(e.target.value as OsmAmenityType)}
                        >
                            <option value={OsmAmenityType.toilets}>🚻 Toilets</option>
                            <option value={OsmAmenityType.drinking_water}>💧 Drinking Water</option>
                            {/*<option value={OsmAmenityType.atm}>💰 ATM</option>*/}
                        </select>

                        <h1 className="text-2xl font-bold mb-2 mt-2">Within (m)</h1>
                        <div className={styles.formItemContainer}>
                            <input
                                type="number"
                                min={0}
                                max={1000}
                                step={50}
                                value={distanceInput}
                                onChange={(e) => setDistanceInput(getCappedValue(Number(e.target.value), distanceInput, 2000))}
                                onKeyDown={handleKeyDown}
                                className={styles.input}
                            />
                            <button onClick={handleFindClick} className={styles.button}>Find</button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>


            <div>
                {currentLocation && (
                    <LocationsMap center={currentLocation} amenities={amenities} distance={distanceInput} searchTrigger={searchTrigger} />
                )}
            </div>

        </div>
    );
};

export default Page;
