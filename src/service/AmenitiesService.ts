import * as dotenv from 'dotenv';
import {AmenityMapper} from "@/amenity-mapping/AmenityMapper";
import {Toilet} from "@/domain/Toilet";
import {OsmAmenityType} from "@/osm-domain/OsmAmenityType";
import {IOsmAmenity} from "@/osm-domain/IOsmAmenity";
import {OsmAmenitiesReturn} from "@/osm-domain/OsmAmenitiesReturn";
import {Location} from "@/domain/Location";

dotenv.config();

export class AmenitiesService {

    private location: Location | undefined;

    getCurrentLocation() {
        const useMockLocation: boolean = process.env.MOCK_LOCATION === "true";

        const defaultCentre: number[] = [51.509865, -0.118092];

        if (useMockLocation) {
            console.warn("Geolocation is not supported.");
            this.location = {
                lat: defaultCentre[0],
                lon: defaultCentre[1],
            }
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
                console.log("Got position", position.coords);

                this.location = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };
            },
            (error: GeolocationPositionError) => {
                console.error("Error getting position:", error);
            }
        );
    }

    async getNearbyAmenities(type: OsmAmenityType, radius: number) : Promise<Toilet[]> {
        const queryString : string | undefined =  this.getNearbyAmenitiesQuery(type, radius);

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

    getNearbyAmenitiesQuery(type: OsmAmenityType, radius: number) : string | undefined {
        if (!this.location){
            console.error("Current location unknown. Unable to get nearby amenities");
            return;
        }

        return `
            [out:json];
            node["amenity" = "` + type + `"](around:` + radius + `, ` + this.location.lat + `, ` + this.location.lon + `);
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
