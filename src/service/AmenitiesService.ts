import * as dotenv from 'dotenv';
import {AmenityMapper} from "@/amenity-mapping/AmenityMapper";
import {Toilet} from "@/domain/Toilet";
import {OsmAmenityType} from "@/osm-domain/OsmAmenityType";
import {IOsmAmenity} from "@/osm-domain/IOsmAmenity";
import {OsmAmenitiesReturn} from "@/osm-domain/OsmAmenitiesReturn";
import {Location} from "@/domain/Location";

dotenv.config();

export class AmenitiesService {

    static async getCurrentLocation(): Promise<Location> {
        const useMockLocation = true;

        // const useMockLocation: boolean = process.env.MOCK_LOCATION === "true";
        // const defaultCentre: Location = { lat: 51.509865, lon: -0.118092 }; // isles of scilly
        // const defaultCentre: Location = { lat: 34.669813, lon: 135.508161 }; // osaka
        // const defaultCentre: Location = { lat: 28.618413, lon: 77.200153 }; // new delhi
        const defaultCentre: Location = { lat: 35.679160, lon: 139.771879 }; // tokyo

        if (useMockLocation) {
            console.warn("Using mock location.");
            return defaultCentre;
        }

        return new Promise<Location>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    console.log("Got position", position.coords);
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error: GeolocationPositionError) => {
                    console.error("Error getting position:", error);
                    reject(error);
                }
            );
        });
    }


    async getNearbyAmenities(type: OsmAmenityType, location: Location, radius: number) : Promise<Toilet[]> {
        const queryString : string | undefined =  this.getNearbyAmenitiesQuery(type, location, radius);

        if (!queryString) return [];

        const osmAmenitiesJson = await this.queryOpenStreetMaps(queryString) as OsmAmenitiesReturn;
        const osmAmenities: OsmAmenitiesReturn = {
            ...osmAmenitiesJson,
        }

        const amenities: Toilet[] = [];
        if (osmAmenities.hasOwnProperty('elements')){
            osmAmenities.elements.forEach(function (osmAmenity: IOsmAmenity) {
                const amenity: Toilet | undefined =  <Toilet>AmenityMapper.MapAmenity(osmAmenity);
                if (amenity) {
                    amenities.push(amenity);
                }
            });
        } else {
            return [];
        }

        return amenities;
    }

    getNearbyAmenitiesQuery(type: OsmAmenityType, location: Location, radius: number) : string | undefined {
        if (!location){
            console.error("Current location unknown. Unable to get nearby amenities");
            return;
        }

        return `
            [out:json];
            node["amenity" = "` + type + `"](around:` + radius + `, ` + location.lat + `, ` + location.lon + `);
            out;
        `;
    }

    async queryOpenStreetMaps(queryString: string): Promise<object> {
        console.log("query", queryString);
        const api = await fetch('https://overpass-api.de/api/interpreter?', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: queryString
        });

        return await api.json();
    }


}
